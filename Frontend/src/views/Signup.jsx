import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ flashMessage }) {
	const navigate = useNavigate();

	const handleSignup = (event) => {
		event.preventDefault();
		// console.log(event);
		let password = event.target.password.value;
		let confirmPass = event.target.confirmPass.value;
		if (password !== confirmPass) {
			flashMessage("Passwords do not match", "warning");
		} else {
			// Make the Post Request to Flask API
			console.log("Passwords do match! Hooray!!");

			let myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			let formData = JSON.stringify({
				username: event.target.username.value,
				email: event.target.email.value,
				password,
			});

			fetch("http://localhost:5000/api/users", {
				method: "POST",
				headers: myHeaders,
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						flashMessage(data.error, "danger");
					} else {
						flashMessage(`${data.username} has been created`, "success");
						navigate("/");
					}
				});
		}
	};

	return (
		<div className="row">
			<div className="col">
				<div className="card mt-3">
					<div className="card-header text-center">Sign Up Here!</div>
					<div className="card-body">
						<form action="" onSubmit={handleSignup}>
							<div className="form-group">
								<input
									type="text"
									name="email"
									className="form-control my-3"
									placeholder="Enter Email"
								/>
								<input
									type="text"
									name="username"
									className="form-control my-3"
									placeholder="Enter Username"
								/>
								<input
									type="password"
									name="password"
									className="form-control my-3"
									placeholder="Enter Password"
								/>
								<input
									type="password"
									name="confirmPass"
									className="form-control my-3"
									placeholder="Confirm Password"
								/>
								<input
									type="submit"
									value="Sign Up"
									className="btn btn-success w-100"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}