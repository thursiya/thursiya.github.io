Date.prototype.getDOY = function() {
	const onejan = new Date(this.getFullYear(), 0, 1);
	return (this - onejan) / 86400000;
}

function syear(day,val2,val3,val4) {
	if (typeof day == 'number') {
		day = new Date(day, (val2 - 1), (val3 || 1), (val4 || 0));
		if (!val3) val2 = 'noday';
	}
	const longsy = (day.getFullYear() - 2012 + (day.getDOY() + 61) / 365) * 72 + 1;
	const syr = ~~(longsy);
	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const skunkmonth = ~~(longsy % 1 * 12);
	let out = `<span title='${month[day.getMonth()]} `;
	if (val2 != "noday") {
		out += `${day.getDate()}, `;
	}
	out += `${day.getFullYear()}'>`;
	if (val2 == "full" || val4) {
		out += `${month[skunkmonth]} of `;
	}
	out += `SY ${syr}</span>`;
	return out;
}

function sy(a,b,c,d) { document.write(syear(a,b,c,d)) }
