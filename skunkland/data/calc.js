const xmlhttp = new XMLHttpRequest();
const url = "https://thursiya.github.io/skunkland/data/census.txt";
let city = [];

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		const cities = (xmlhttp.responseText).split('\n');
		city = buildArray(cities);
	}
}
xmlhttp.open("GET", url, false);
xmlhttp.send();

function shuffle(arr) {
	let i = arr.length;
	while (i != 0) {
		let r = ~~(Math.random() * i);
		i--;
		[arr[i], arr[r]] = [arr[r], arr[i]];
  	}
	return arr;
}

function buildArray(arr) {
	for(var i = 0; i < arr.length; i++) {
		// Remove spaces before and after commas and leading or ending spaces
		arr[i] = arr[i].replace(/\s*,\s*/g, ',');
		arr[i] = arr[i].trim();
		arr[i] = arr[i].split(',');
		// Convert 4 pop values into 1 string (with commas) and one numerical population value
		var thispop = pp(Number(arr[i][2]),Number(arr[i][3]),Number(arr[i][4]),Number(arr[i][5]))
		var popstring = thispop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	// convert ####### to #,###,###)
		arr[i].splice(2,4,popstring);
		arr[i].splice(3,0,thispop);
		// Convert 3 date numbers to a date value
		census = new Date(Number(arr[i][4]),Number(arr[i][5])-1,Number(arr[i][6]));
		arr[i].splice(4,3,census);
	}
	return arr;
}

function pp(jobs,beds,tourbeds,bonus) {
	if (typeof jobs == 'string') {
		for(var i = 0; i < city.length; i++) {
			if (city[i].indexOf(jobs) > -1) return (document.write(city[i][2]));
		}
		document.write("Uninhabited");
	}
	else {
		var homes = beds * 2;
		var tourists = tourbeds / 2;
		var maxpop = (homes + jobs) / 2;
		var p = Math.ceil((maxpop * bonus + tourists) * 10) * 100;
		return p;
	}
}

Date.prototype.getDOY = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return (this - onejan) / 86400000;
}

function syear(day,val2,val3,val4) {
	if (typeof day == 'number') {
		day = new Date(day, (val2 - 1), (val3 || 1), (val4 || 0));
		if (!val3) val2 = 'noday';
	}
	var longsy = (day.getFullYear() - 2012 + (day.getDOY() + 61) / 365) * 72 + 1;
	var sy = Math.floor(longsy);
	var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var skunkmonth = Math.floor(longsy % 1 * 12);
	var out = "<span title='" + month[day.getMonth()] + " ";
	if (val2 != "noday") {
		out += day.getDate() + ", ";
	}
	out += day.getFullYear() + "'>";
	if (val2 == "full" || val4) {
		out += month[skunkmonth] + " of ";
	}
	out += "SY " + sy + "</span>";
	return out;
}

function sy(a,b,c,d) { document.write(syear(a,b,c,d)) }

function pic(name,loc,title) {
	fileloc = (loc == 1) ? 'newsletters':'gallery';
	document.write("<td><a href='" + fileloc + "/images/" + name + ".jpg' target='_blank'><img src='" + fileloc + "/images/" + name + ".jpg' alt='" + name + "' height='175'><br><br>" + (title || name) + "</a></td>");
}
