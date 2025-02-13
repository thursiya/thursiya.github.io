<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Gavel</title>
		<link rel="stylesheet" href="../../data/mc.css">
		<link rel="icon" href="../../images/pickaxe.png" type="image/x-icon">
		<script src="../../data/time.js"></script>
		<script src="../../data/world.js"></script>
	</head>
	<body>
		<header>
			<img id="stateflag" height="150" class="gallery" style="display:block; margin: 20px auto;">
		</header>
		<main>
			<div class="content round shadow">
				<div class="gallery">
					<div id="maininfo" style="flex: 1;">
						<div id="statetitle" class="contentheader round"></div>
						<p>
							The modern state of Gavel was founded in <script>sy(2011,11)</script> but traces its history back hundreds of years before Spawn. Gavel is 
							divided into 6 provinces, 3 states (previously independent countries), and 1 special administrative region that enjoys limited autonomy.
						</p>
					</div>
					<div id="infowindow" class="right" style="max-width: 300px;"></div>
				</div>
			</div>
		</main>
		<script>
			worldData("Gavel");
			regions({ name: "Gavel", division: "Province", regions: [
				{ name: "Anima", builds: "Nexus" },
				{ name: "Enlil", builds: "Persson Airport, Expo 400, Pyramid" },
				{ name: "Ghibli", city: "Lunar Hill", builds: "Funland, Ghibli Port, Observatory" },
				{ name: "Tercomciel", builds: "Celestia Corolla" },
				{ name: "Vayu" },
				{ name: "Zephyr", city: "Zefram", builds: "Zephyr Federal Prison" }] });
			regions({ name: "Gavel", division: "State", regions: [
				{ name: "Masovia", city: "Mellon Bay", builds: "Baths Palace, Doggy Magical HQ, Operis Warehouse" },
				{ name: "Pristina", city: "New Kingsburg", builds: "GPC Solar Plant, Great Gate of Gavel" },
				{ name: "Syldavia", builds: "Ottokar Fortress" }] });
			regions({ name: "Gavel", division: "Special Administrative Region", regions: [
				{ name: "Ehecatl" }] });
		</script>
	</body>
</html>
