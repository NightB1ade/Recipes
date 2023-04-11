function DecreasePortions() {
	document.getElementById("NumPortions").stepDown(1);

	PortionScaleUpdate();
}




function IncreasePortions() {
	document.getElementById("NumPortions").stepUp(1);

	PortionScaleUpdate();
}




function PortionScaleUpdate() {
	base = parseInt(document.getElementById("NumPortions").getAttribute("base"));
	scale = parseInt(document.getElementById("NumPortions").value);

	Array.from(document.getElementsByClassName("scale")).forEach((item, i) => {
		item.innerHTML = Math.round(parseFloat(item.getAttribute("num")) * 100 * scale / base) / 100;
	});
}
