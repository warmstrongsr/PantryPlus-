import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBtn({ handleSubmit }) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		handleSubmit(inputValue);
	};

	return (
		<>
			<div className="hero-image">
				<div className="bg">
					<div className="lightning flashit">
						
						<div className="container">
							{/* <!-- Header Row --> */}
							<div className="row mt-3">
								<div className="col text-white-50">
									<h1 className="text-center" id="top-header"></h1>
								</div>
							</div>
							{/* <!-- Form Row --> */}
							<div className="row mt-5 mb-3">
								<form onSubmit={handleFormSubmit} id="ingredientForm">
									<div className="form-group form-inline">
										<input
											type="text"
											name="city"
											className="form-control w-100"
											placeholder="Start entering your items."
											value={inputValue}
											onChange={handleInputChange}
										/>
										<div className="container">
											<input
												type="submit"
												value="Submit"
												className="btn btn-outline-light btn-secondary w-100 mt-3 mb-3"
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
