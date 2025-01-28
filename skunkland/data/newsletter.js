function pic(name, loc = "gallery") {
	const file = {gallery: "../gallery/images", newsletter: "images", map: "../maps/political", specialmap: "../maps/special"};
	document.write(`<a href='${file[loc]}/${name}.jpg' target='_blank'><img src='${file[loc]/${name}.jpg' alt='${name}' height='300'></a>`);
}
