const city = [];
const homepage = "https://thursiya.github.io/skunkland/data/";

function worldData(nation) {
	fetch(homepage + "census.txt").then(v => v.text()).then(v => {
		buildCityArray(v);
		fetch(homepage + "nations.txt").then(v2 => v2.text()).then(v2 => drawInfoWindow(buildNationObject(v2, nation)));
	});
}

function buildCityArray(data) {
	city.push(...data.split('\n').filter(v => v).
		map(v => v.replace(/\s*,\s*/g, ',').trim().split(',')).
		map(v => ({ name: v[0], state: v[1], pop: Math.ceil(((Number(v[2]) / 2 + Number(v[3])) * (Number(v[5]) || 1) + Number(v[4]) / 2) * 10) * 100, date: new Date(v[6], Number(v[7]) - 1, v[8]) })).
		map(v => Object.assign(v, { output: { state: v.state ? `<a href="${v.state}">${v.state}</a>` : "<i>Skunkland</i>", pop: v.pop.toLocaleString("en", {useGrouping: true}), date: syear(v.date) } })));
	console.log(city);
}

function buildNationObject(data, nation) {
	return data.split('\n').filter(v => v).map(v => v.split(',')).
		map(v => ({ name: v[0], type: v[1] || "State", player: v[2] || "None", motto: v[3] || "---", capital: v[4] || "None", 
			demonym: v[5] || v[0], gov: v[6] || v[1] || "None", tallbuilding: v[11], tallstructure: v[12] })).
		map(v => Object.assign(v, v[7] && { lang: v[7] }, v[8] && { money: v[8] }, v[9] && { faith: v[9] }, v[10] && { animal: v[10] })).find(v => v.name == nation);
}

function drawInfoWindow(state) {
	console.log(state);
	function subTable(...arr) {
		let stOut = `<tr><td style="padding: 5px;"><table class="info">`;
		arr.forEach(v => stOut += `<tr><td style="${v[0] == "Government" ? " font-size: 11px; " : ""}font-weight: bold; width: 90px;">${v[0]}</td><td>${v[1]}</td></tr>`);
		return `${stOut}</table></td></tr>`;
	}

	const bigcity = city.toSorted((a, b) => b.pop - a.pop).toSorted((a, b) => a.state.localeCompare(b.state)).filter(v => v.state == state.name)[0] || { name: "None", output: { pop: "Uninhabited" } };
	let out = `<table style="width: 300px;"><tr><th>${state.type} of ${state.name}</th></tr>
 		<tr><td><img src="../images/${state.name} Flag (Wool).png" width="150"><br><i>${state.motto || "---"}</i></td></tr>
   		<tr><td style="padding: 0;"><img src="../../maps/regional/${state.name}.jpg" width="298"></td></tr>
		${subTable(["Capital", state.capital], ["Largest City", `${bigcity.name} (${bigcity.output.pop})`])}
		${subTable(["Demonym", state.demonym])}
  		${subTable(["Government", state.gov])}`;
	const arr = [];
	if (state.lang) arr.push(["Language", state.lang]);
	if (state.money) arr.push(["Currency", state.money]);
	if (state.faith) arr.push(["Religion", state.faith]);
	if (arr[0]) out += subTable(arr);
	if (state.animal) out += subTable(["Animal", state.animal]);
	out += `${subTable(["Tallest Building", state.tallbuilding], ["Tallest Structure", state.tallstructure])}
 		<tr><td><img src="../images/${state.name} Banner.png" width="64"></td></tr></table>`;

	document.getElementById("statetitle").innerHTML = `The ${state.type} of ${state.name}`;
	document.getElementById("infowindow").innerHTML = out;
}

function regions(nation, rtype, regions, bigsettles, builds, nflag) {
	var out = "<table><tr><th>Flag</th><th>" + rtype + "</th><th>Largest<br>Settlement</th><th>Notable Builds</th></tr>";
		for (var i = 0; i < regions.length; i++) {
			var rname = regions[i];
			if (nflag) rname = nation + " " + regions[i];
			out += "<tr><td><img src='images/" + rname + " Flag.png' height='50' alt='Flag of " + rname + " " + rtype + "'></td>";
			out += "<td><a href='" + nation + "/" + regions[i] + ".php'><b>" + regions[i] + "</b></a></td>";
			out += "<td>" + (bigsettles[i] || "-") + "</td><td>";
			for (var j = 0; j < builds[i].length; j++) {
				out += builds[i][j] + "<br>"
			}
			out += "</td></tr>";
		}
		out += "</table><br>";
		document.write(out);
}
