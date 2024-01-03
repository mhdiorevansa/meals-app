import "../css/style.css";
import Image from "../images/baked-chicken-wings-asian-style-tomatoes-sauce-plate.jpg";

document.addEventListener("DOMContentLoaded", () => {
	const mealsListElement = document.getElementById("meals-list");
	const descriptionCardElement = document.getElementById("description-card");
	const searchInput = document.getElementById("search-input");

	const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

	fetch(allMealsUrl)
		.then((response) => response.json())
		.then((data) => {
			const meals = data.meals || [];
			mealsListElement.innerHTML =
				'<div class="row">' +
				meals
					.map((meal, index) => {
						if (index > 0 && index % 4 === 0) {
							return '</div><div class="row">' + createMealCard(meal);
						}
						return createMealCard(meal);
					})
					.join("") +
				"</div>";

			const viewDetailsButtons = document.querySelectorAll(".view-details-btn");
			viewDetailsButtons.forEach((button) => {
				button.addEventListener("click", (event) => {
					event.preventDefault();
					const mealId = button.getAttribute("data-meal-id");
					displayMealDescription(mealId);
				});
			});

			searchInput.addEventListener("input", () => {
				const searchTerm = searchInput.value.toLowerCase();
				const filteredMeals = meals.filter((meal) => {
					return meal.strMeal.toLowerCase().includes(searchTerm);
				});

				mealsListElement.innerHTML =
					'<div class="row">' +
					filteredMeals
						.map((meal, index) => {
							if (index > 0 && index % 4 === 0) {
								return '</div><div class="row">' + createMealCard(meal);
							}
							return createMealCard(meal);
						})
						.join("") +
					"</div>";
			});
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
			mealsListElement.innerHTML = "<p>Error fetching data</p>";
		});

	const mealImageElement = document.getElementById("img-hero");
	mealImageElement.src = Image;

	function createMealCard(meal) {
		return `
        <div class="col-md-3 col-6 mb-3">
            <div class="card h-100 p-3" style="border-radius: 15px !important;
            border: 1px solid rgba(255, 255, 255, 0.25);
            background-color: rgba(255, 255, 255, 0.45);
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(15px);">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body p-0">
                    <h5 class="card-title meal-name text-truncate mt-3" data-meal-id="${
											meal.idMeal
										}">${meal.strMeal}</h5>
                    <p class="card-text text-justify text-truncate">${meal.strInstructions.slice(
											0,
											80
										)}...</p>
                    <a href="#" class="btn view-details-btn" data-meal-id="${
											meal.idMeal
										}">View Details</a>
                </div>
            </div>
        </div>
    `;
	}

	function displayMealDescription(mealId) {
		const mealDetailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

		fetch(mealDetailUrl)
			.then((response) => response.json())
			.then((data) => {
				const meal = data.meals && data.meals[0];
				if (meal) {
					const mealImageElement = document.getElementById("meal-description-image");
					mealImageElement.src = meal.strMealThumb;
					mealImageElement.alt = meal.strMeal;

					const descriptionTitleElement = document.getElementById("meal-description-title");
					const descriptionTextElement = document.getElementById("meal-description-text");
					descriptionTitleElement.textContent = meal.strMeal;
					descriptionTextElement.textContent = meal.strInstructions;

					const mealCategoryBadgeElement = document.getElementById("meal-category-badge");
					mealCategoryBadgeElement.textContent = meal.strCategory;
					mealCategoryBadgeElement.classList.add("badge", "bg-primary");
					descriptionCardElement.classList.remove("d-none");

					descriptionCardElement.scrollIntoView({ behavior: "smooth" });
				}
			})
			.catch((error) => {
				console.error("Error fetching meal details:", error);
				descriptionCardElement.classList.add("d-none");
			});
	}
});
