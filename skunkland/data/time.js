function syear(day, val2, val3, val4) {
	if (typeof day == 'number') {
		day = new Date(day, (val2 - 1), (val3 || 1), (val4 || 1));
		if (!val3) val2 = 'noday';
	}
	const lsy = (day.getFullYear() - 2012 + ((day - new Date(day.getFullYear(),0,1)) / 86400000 + 61) / 365) * 72 + 1;
	return `<span title="${day.toLocaleString("en", { month:"long" })} ${val2 != "noday" ? `${day.getDate()}, ` : ""}${day.getFullYear()}">${val2 == "full" || val4 ? `${new Date(~~lsy, ~~(lsy % 1 * 12)).toLocaleString("en",{month:"long"})} of ` : ""}SY ${~~lsy}</span>`;
}

function sy(a, b, c, d) { document.write(syear(a, b, c, d)) }
