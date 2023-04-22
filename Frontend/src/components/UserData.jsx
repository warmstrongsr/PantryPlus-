import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserData({ flashMessage, user, post, logUserIn }) {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");

	async function handleUpdateUser(event) {
		event.preventDefault();

		// Get the user's current username and password from state
		let stringToEncode = `${username}:${password}`;
		let myHeaders = new Headers();
		myHeaders.append("Authorization", `Basic ${btoa(stringToEncode)}`);

		// Make a request to update the user's info
		let response = await fetch(`/api/me/${user.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				username: newUsername,
				password: newPassword,
			}),
		});

		let data = await response.json();

		if (data.error) {
			flashMessage(data.error, "danger");
		} else {
			// Update the user's username and password in state
			setUsername(newUsername);
			setPassword(newPassword);

			// flash a success message and redirect
			flashMessage("You have successully updated your info", "success");
			navigate("/");
		}
	}

	async function handleDeleteUser(event) {
		event.preventDefault();

		// Make a request to delete the user's account
		let response = await fetch(`/api/users/${user.id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		let data = await response.json();

		if (data.error) {
			flashMessage(data.error, "danger");
		} else {
			// Remove the user's token from local storage and log them out
			localStorage.removeItem("token");
			logUserIn(false);

			// flash a success message and redirect to the home page
			flashMessage(data.success, "success");
			navigate("/");
		}
	}


	return (
		<div className="row">
			<div className="col">
				<div className="card mt-3">
					<div className="card-header text-center">Update Your Info Here!</div>
					<div className="card-body">
						<form onSubmit={handleUpdateUser}>
							<div className="form-group">
								<label htmlFor="username">Current Username</label>
								<input
									type="text"
									name="username"
									id="username"
									className="form-control my-3"
									placeholder="Enter Current Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
								<label htmlFor="password">Current Password</label>
								<input
									type="password"
									name="password"
									id="password"
									className="form-control my-3"
									placeholder="Enter Current Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label htmlFor="new-username">New Username</label>
								<input
									type="text"
									name="new-username"
									id="new-username"
									className="form-control my-3"
									placeholder="Enter New Username"
									value={newUsername}
									onChange={(e) => setNewUsername(e.target.value)}
								/>
								<label htmlFor="new-password">New Password</label>
								<input
									type="password"
									name="new-password"
									id="new-password"
									className="form-control my-3"
									placeholder="Enter New Password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>
							<div style={{ display: "flex", justifyContent: "center" }}>
						
								<button
									className="btn btn-success "
									type="submit"
									style={{ width: 500, marginRight: 50 }}
								
								>
									Update Account
								</button>
								<button
									className="btn btn-danger"
									onClick={handleDeleteUser}
									style={{ width: 500, marginLeft: 50 }}
									
								>
									Delete Account
								</button>
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

									