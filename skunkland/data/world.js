const city = [];
const homepage = "https://thursiya.github.io/skunkland/";

function worldData(state) {
	fetch(homepage + "data/census.txt").then(v => v.text()).then(v => {
		buildCityArray(v);
		fetch(homepage + "data/nations.txt").then(v2 => v2.text()).then(v2 => {
			drawInfoWindow(buildStateObject(v2, state));
			if (state.divisions) regions(state);
		});
	});
}

function buildCityArray(data) {
	city.push(...data.split('\n').filter(v => v).
		map(v => v.replace(/\s*,\s*/g, ',').trim().split(',')).
		map(v => ({ name: v[0], state: v[1], pop: Math.ceil(((Number(v[2]) / 2 + Number(v[3])) * (Number(v[5]) || 1) + Number(v[4]) / 2) * 10) * 100, date: new Date(v[6], Number(v[7]) - 1, v[8]) })).
		map(v => Object.assign(v, { output: { state: v.state ? `<a href="${v.state}">${v.state}</a>` : "<i>Skunkland</i>", pop: v.pop.toLocaleString("en", {useGrouping: true}), date: syear(v.date) } })));
}

function buildStateObject(data, state) {
	return data.split('\n').filter(v => v).map(v => v.split(',')).
		map(v => Object.assign({ name: v[0], type: v[1] || "State", player: v[2] || "None", motto: v[3] || "---", capital: v[4] || "None", 
			demonym: v[5] || v[0], gov: v[6] || v[1] || "None", tallbuilding: v[11], tallstructure: v[12]}, 
			v[7] && { lang: v[7] }, v[8] && { money: v[8] }, v[9] && { faith: v[9] }, v[10] && { animal: v[10] })).find(v => v.name == state.name);
}

function drawInfoWindow(state) {
	function subTable(...arr) {
		let stOut = `<tr><td style="padding: 5px;"><table class="info">`;
		arr.forEach(v => stOut += `<tr><td style="font-weight: bold; width: 90px;">${v[0]}</td><td>${v[1]}</td></tr>`);
		return `${stOut}</table></td></tr>`;
	}

	const bigcity = city.slice(0).sort((a, b) => b.pop - a.pop).sort((a, b) => a.state.localeCompare(b.state)).filter(v => v.state == state.name)[0] || { name: "None", output: { pop: "Uninhabited" } };
	let out = `<table style="width: 300px;"><tr><th>${state.type} of ${state.name}</th></tr>
 		<tr><td><img src="../images/flags/${state.name} (Wool).png" width="150"><br><i>${state.motto || "---"}</i></td></tr>
   		<tr><td style="padding: 0;"><img src="../../maps/regional/${state.name}.jpg" width="298"></td></tr>
		${subTable(["Capital", state.capital], ["Largest City", `${bigcity.name} (${bigcity.output.pop})`])}
		${subTable(["Demonym", state.demonym])}
  		${subTable(["<span style=\"font-size: 0.7rem\">Government</span>", state.gov])}`;
	const arr = [];
	if (state.lang) arr.push(["Language", state.lang]);
	if (state.money) arr.push(["Currency", state.money]);
	if (state.faith) arr.push(["Religion", state.faith]);
	if (arr[0]) out += subTable(...arr);
	if (state.animal) out += subTable(["Animal", state.animal]);
	out += `${subTable(["Tallest Building", state.tallbuilding], ["Tallest Structure", state.tallstructure])}
 		<tr><td><img src="../images/banners/${state.name}.png" width="64"></td></tr></table>`;

	document.getElementById("stateflag").src = `../images/flags/${state.name}.png`;
	document.getElementById("statetitle").innerHTML = `The ${state.type} of ${state.name}`;
	document.getElementById("infowindow").innerHTML = out;
}

function regions(state) {
	let out = `<div class="contentheader round">Regions of ${state.name}</div><div>`;
	for (const d of state.divisions) {
		out += `<table style="margin-bottom: 20px;"><tr><th>Flag</th><th>${d.type || "Region"}</th><th>Largest<br>Settlement</th><th>Notable Builds</th></tr>`;
		d.regions.forEach(r => out += `<tr><td><img src="../images/flags/${state.name}/${r.name}.png" height="50" alt="Flag of ${r.name} ${d.type || "Region"}"></td>
 			<td><a href="${r.name}.htm"><b>${r.name.startsWith(state.name) ? r.name.replace(`${state.name} `, "") : r.name}</b></a></td>
    			<td>${r.city || "-"}</td>
			<td>${r.builds || "-"}</td></tr>`);
		out += "</table></div>";
	}
	
	document.getElementById("maininfo").innerHTML += out;
}

function settlements(state, region, type = "Region", settleArr = [{ name: "None", founded: "-" }]) {
	fetch(homepage + "data/census.txt").then(v => v.text()).then(v => {
		buildCityArray(v);
		let out = "<table><tr><th>Settlements</th><th>Population</th><th>Founded</th></tr>";
		for (const s of settleArr) out += `<tr><td>${s.name}</td><td>${city.find(v => v.name == s.name)?.output.pop || "-"}</td><td>${s.founded || "Unknown"}</td></tr>`;
		out += "</table>";
		
		document.getElementById("regionflag").src = `../images/flags/${state}/${region}.png`;
		document.getElementById("regiontitle").innerHTML = `${region} ${type}`;
		document.getElementById("regionmap").innerHTML = `<a href="../../maps/regional/${state}/${region}.png" target="_blank"><img src="../../maps/regional/${state}/${region}.png" alt="${region} ${type} Map" height="300"  style="display:block; margin: 20px auto"></a>`;
		document.getElementById("infowindow").innerHTML = out;
	});
}

function pic(name) {
	document.write(`<div><a href="${homepage}gallery/images/${name}.jpg" target="_blank"><img src="${homepage}gallery/images/${name}.jpg" alt="${name}" height="300" style="display: block; margin: 20px auto"></a></div>`);
}
