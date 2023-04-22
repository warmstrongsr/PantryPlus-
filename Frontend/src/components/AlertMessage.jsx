import React, { useEffect } from "react";

export default function AlertMessage({ category, message, flashMessage }) {
	useEffect(() => {
		const timeout = setTimeout(() => {
			flashMessage(null, null);
		}, 7000);
		return () => clearTimeout(timeout);
	}, [flashMessage]);

	return (
		<div
			className={`alert alert-${category} alert-dismissible fade show text-center`}
			role="alert"
		>
			<strong>{message}</strong>
			<button
				type="button"
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
				onClick={() => flashMessage(null, null)}
			></button>
		</div>
	);
}
