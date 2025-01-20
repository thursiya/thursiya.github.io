function insertHeader () {
	document.getElementsByTagName('header')[0].innerHTML = `
		<div class='server round shadow'>
			<img src='images/clock.png' height='50' style='vertical-align:middle'>
			<span style='font:bold 36px georgia;vertical-align:middle' id='headdate'>${syear(new Date(),'full')}</span>
		</div>

		<div class='header round shadow' align='middle' id='headtitle' style='background-image:url("vistas/bgvista${~~((Math.random() * 13) + 1)}.jpg")'>
			<img src='images/server_name.gif' align='middle' style='padding-top:50px'>
		</div>

		<div class='navbar round shadow'>
			<div class='fl navitem home'>
				<a href='index.php'>Home</a>
			</div>
			<div class='fl navitem gall'>
				<a href='gallery.php'>Gallery</a>
			</div>
			<div class='fl navitem maps'>
				<a href='maps.php'>Maps</a>
			</div>
			<div class='fl navitem worl'>
				<a href='world.php'>World</a>
			</div>
			<div class='fl navitem news'>
				<a href='newsletters.php'>Newsletters</a>
			</div>
			<div class='fl navitem rule'>
				<a href='rules.php'>Rules</a>
			</div>
			<div class='fl navitem tour'>
				<a href='tour.php'>Tour</a>
			</div>
			<div class='fl navitem tool'>
				<a href='tools.php'>Tools</a>
			</div>
			<div class='fl navitem link'>
				<a href='links.php'>Links</a>
			</div>
		</div>`;
}
