function WriteList() {
	var fullListOutput = document.getElementById("FullListOutput");
	var fullListHTML = "";

	mealOptionsJSON.forEach((item,i) => {
		fullListHTML
			+= '<div class="col col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 mt-3">'
				+ '<div class="card">'
					+ '<div class="card-body">'
						+ '<h5 class="card-title">' + item.name + '</h5>';

		if (item.variants.length >= 1) {
			fullListHTML += '<ul>';

			item.variants.forEach((item) => {
				fullListHTML += '<li>' + item + '</li>'
			});

			fullListHTML += '</ul>';
		}

		fullListHTML
					+= '</div>'
				+ '</div>'
			+ '</div>';
	});

	fullListOutput.innerHTML = fullListHTML;
}
