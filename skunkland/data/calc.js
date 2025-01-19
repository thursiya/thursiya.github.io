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
