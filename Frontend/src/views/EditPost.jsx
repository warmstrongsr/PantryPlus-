import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditPost({ loggedIn, flashMessage }) {
	const { postId } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState({});

	useEffect(() => {
		if (!loggedIn) {
			flashMessage("You must be logged in to edit posts", "danger");
			navigate("/login");
		}
	});

	useEffect(() => {
		async function fetchPostData() {
			let response = await fetch(`http://localhost:5000/api/recipes`);
			let data = await response.json();
			setPost(data);
		}
		fetchPostData();
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		editPost();
		async function editPost() {
			const title = e.target.title.value;
			const content = e.target.content.value;

			let formData = JSON.stringify({ title, content });

			let token = localStorage.getItem("token");

			let myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Authorization", `Bearer ${token}`);

			let response = await fetch(
				`https://kekambas-blog-api.onrender.com/api/posts/${postId}`,
				{
					method: "PUT",
					headers: myHeaders,
					body: formData,
				}
			);

			let data = await response.json();

			if (data.error) {
				flashMessage(data.error, "danger");
			} else {
				flashMessage(`${data.title} has been updated`, "success");
				navigate("/");
			}
		}
	};

	async function deletePost() {
		let token = localStorage.getItem("token");
		let myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);

		let response = await fetch(
			`https://kekambas-blog-api.onrender.com/api/posts/${postId}`,
			{
				method: "DELETE",
				headers: myHeaders,
			}
		);

		let data = await response.json();

		if (data.error) {
			flashMessage(data.error, "danger");
		} else {
			flashMessage(`${post.title} has been deleted`, "info");
			navigate("/");
		}
	}

	return (
		<div className="row">
			<div className="col">
				<div className="card mt-3">
					<div className="card-header text-center">Edit {post.title}</div>
					<div className="card-body">
						<form action="" onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									type="text"
									name="title"
									className="form-control my-3"
									defaultValue={post.title}
								/>
								<textarea
									name="content"
									className="form-control my-3"
									defaultValue={post.content}
								/>
								<input
									type="submit"
									value="Edit Post"
									className="btn btn-success w-100"
								/>
								<button
									type="button"
									className="btn btn-danger w-100"
									data-bs-toggle="modal"
									data-bs-target={`#deletePostModal-${post.id}`}
								>
									Delete
								</button>
							</div>
						</form>
					</div>
				</div>
				<div
					className="modal fade"
					id={`deletePostModal-${post.id}`}
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">
									Delete {post.title}?
								</h1>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								Are you sure you want to delete {post.title}? This action cannot
								be undone.
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<Link
									to="/"
									className="btn btn-danger"
									onClick={deletePost}
									data-bs-dismiss="modal"
								>
									Delete Post
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
