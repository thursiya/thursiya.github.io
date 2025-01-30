function note(str) {
	document.write(`<span style="color: #999; font-size: 75%; font-style: italic">(${str})</span>`);
}

function pic(name, loc = "gallery") {
	const file = {gallery: "../gallery/images", newsletter: "images", map: "../maps/political", special: "../maps/special"};
	document.write(`<a href='${file[loc]}/${name}.jpg' target='_blank'><img src='${file[loc]}/${name}.jpg' alt='${name}' height='300' style='margin-left: 20px'></a>`);
}

function wiki(str) {
	document.write(`<a href="https://minecraft.wiki/w/${str}">${str}</a>`);
}
