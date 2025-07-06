var mealOptionsJSON;
var randomiseButton;
var unchosenOptionsJSON;
var resultOptionsJSON;




function DecreaseRows() {
	document.getElementById("NumRows").stepDown(1);

	RowsUpdate();
}




function IncreaseRows() {
	document.getElementById("NumRows").stepUp(1);

	RowsUpdate();
}




function RandomiseRecipes() {
	var numRows = parseInt(document.getElementById("NumRows").value);

	unchosenOptionsJSON = [...mealOptionsJSON];
	resultOptionsJSON = [];

	randomiseButton.classList.remove("btn-primary");
	randomiseButton.classList.add("btn-secondary");

	for (let i = 0; i < numRows; i++) {
		var randomNumber = Math.random();
		var randomArrayNumber = Math.floor(randomNumber * unchosenOptionsJSON.length);

		resultOptionsJSON.push(
			unchosenOptionsJSON.splice(randomArrayNumber,1)[0]
		);
	}

	WriteResults();
}




function RowRerandomise(RowNumber) {
	var randomNumber = Math.random();
	var randomArrayNumber = Math.floor(randomNumber * unchosenOptionsJSON.length);

	unchosenOptionsJSON.push(
		resultOptionsJSON.splice(RowNumber,1
			,unchosenOptionsJSON.splice(randomArrayNumber,1)[0]
		)[0]
	);

	WriteResults();
}




function RowsUpdate() {
	randomiseButton.classList.remove("btn-secondary");
	randomiseButton.classList.add("btn-primary");
}




function WriteResults() {
	var resultsOutput = document.getElementById("ResultsOutput");
	var resultsHTML = "";

	for (let i = 0; i < resultOptionsJSON.length; i++) {
		var result = resultOptionsJSON[i];

		resultsHTML += '<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 mt-3">'
				+ '<div class="card">'
					+ '<div class="card-body">'
						+ '<button class="btn btn-outline-secondary"'
							+ ' onclick="RowRerandomise(' + i + ')"'
							+ '><i class="bi bi-shuffle"></i></button>'
						+ " " + result.name
					+ "</div>"
				+ "</div>"
			+ "</div>";
	}

	resultsOutput.innerHTML = resultsHTML;
}




function OnDocumentLoad() {
	fetch("MealOptions.json")
		.then(x => x.text())
		.then(y => mealOptionsJSON = JSON.parse(y));

	randomiseButton = document.getElementById("RandomiseButton");
}
