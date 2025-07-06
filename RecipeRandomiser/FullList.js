var mealOptionsJSON;




function WriteList() {
	var fullListOutput = document.getElementById("FullListOutput");
	var fullListHTML = "";

	for (let i = 0; i < mealOptionsJSON.length; i++) {
		var listItem = mealOptionsJSON[i];

		fullListHTML += '<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 mt-3">'
				+ '<div class="card">'
					+ '<div class="card-body">'
						+ listItem.name
					+ "</div>"
				+ "</div>"
			+ "</div>";
	}

	fullListOutput.innerHTML = fullListHTML;
}




function OnDocumentLoad() {
	fetch("MealOptions.json")
		.then(x => x.text())
		.then(y => mealOptionsJSON = JSON.parse(y))
		.then(z => WriteList());
}
