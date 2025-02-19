function pic(name, loc = "gallery") {
	const file = {gallery: "../gallery/images", newsletter: "images", map: "../maps/political", special: "../maps/special"};
	document.write(`<div><a href="${file[loc]}/${name}.jpg" target="_blank"><img src="${file[loc]}/${name}.jpg" alt="${name}" style="max-height: 300px; max-width: 100%"></a></div>`);
}

function wiki(str) {
	document.write(`<a href="https://minecraft.wiki/w/${str}">${str}</a>`);
}
