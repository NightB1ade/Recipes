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
		var randomArrayNumber = Math.floor(Math.random() * unchosenOptionsJSON.length);

		resultOptionsJSON.push(
			unchosenOptionsJSON.splice(randomArrayNumber,1)[0]
		);
	}

	WriteResults();
}




function RowRerandomise(RowNumber) {
	var randomArrayNumber = Math.floor(Math.random() * unchosenOptionsJSON.length);

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




function VariantRerandomise(item,variant) {
	var result = resultOptionsJSON[item];
	var randomVariant = Math.floor(Math.random() * (result.variants.length - 1));
	var newVariant = (randomVariant == variant ? result.variants.length - 1 : randomVariant);

	var variantHTML = '<td><button class="btn btn-outline-secondary"'
			+ ' onclick="VariantRerandomise(' + item + ',' + newVariant + ')">'
			+ '<i class="bi bi-shuffle"></i></button>'
		+ '</td>'
		+ '<td>' + result.variants[newVariant] + '</td>';

	document.getElementById("ResultsOutput_" + item + "_Variant").innerHTML = variantHTML;
}




function WriteResults() {
	var resultsOutput = document.getElementById("ResultsOutput");
	var resultsHTML = "";

	resultOptionsJSON.forEach(
		(item,i) => {
			resultsHTML
				+= '<div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mt-3">'
					+ '<div class="card">'
						+ '<div class="card-body">'
							+ '<table class="table table-borderless w-auto">'
								+ '<tr>'
									+ '<td class="me-1"><button class="btn btn-outline-secondary"'
										+ ' onclick="RowRerandomise(' + i + ')">'
										+ '<i class="bi bi-shuffle"></i></button></td>'
									+ '<td><h5>' + item.name + '</h5></td>'
								+ '</tr>';

			if (item.variants.length >= 1) {
				var randomVariant = Math.floor(Math.random() * item.variants.length);

				resultsHTML += '<tr id="ResultsOutput_' + i + '_Variant">'
						+ '<td><button class="btn btn-outline-secondary"'
							+ ' onclick="VariantRerandomise(' + i + ',' + randomVariant + ')">'
							+ '<i class="bi bi-shuffle"></i></button>'
						+ '</td>'
						+ '<td>' + item.variants[randomVariant] + '</td>'
					+ '</tr>';
			}

			resultsHTML
							+= '</table>'
						+ '</div>'
					+ '</div>'
				+ '</div>';
		}
	);

	resultsOutput.innerHTML = resultsHTML;
}




function OnDocumentLoad() {
	fetch("{{ 'MealOptions.json?v=' | append: site.github.build_revision }}")
		.then(x => x.text())
		.then(y => mealOptionsJSON = JSON.parse(y));

	randomiseButton = document.getElementById("RandomiseButton");
}
