function syear(day,val2,val3,val4) {
	if (typeof day == 'number') {
		day = new Date(day, (val2 - 1), (val3 || 1), (val4 || 0));
		if (!val3) val2 = 'noday';
	}
	const longsy = (day.getFullYear() - 2012 + ((day - new Date(day.getFullYear(),0,1)) / 86400000 + 61) / 365) * 72 + 1;
	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return `<span title='${month[day.getMonth()]} ${val2 != "noday" ? `${day.getDate()}, ` : ""}${day.getFullYear()}'>${val2 == "full" || val4 ? `${month[~~(longsy % 1 * 12)]} of ` : ""}SY ${~~longsy}</span>`;
}

function sy(a,b,c,d) { document.write(syear(a,b,c,d)) }
