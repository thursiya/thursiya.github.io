<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Faclair</title>
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
				<div id="statetitle" class="contentheader round"></div>
				<div class="gallery">
					<div style="flex: 1;">
						<p>
							Faclair was founded in <script>sy(2014,4,1)</script>. It took on its current status as the Freenation of Faclair when it joined Braille and 
							Delve to form the Tseles Protectorate in <script>sy(2014,4,20,12)</script>. The nation has expanded from its intial settlement of Cadwgan 
							(pronounced 'KA-duh-gun').
						</p>
						<p>
							In <script>sy(2016,3,4)</script> Faclair adopted a new flag, replacing the old temporary flag and establishing itself as a truly independent 
							identity within the Tseles Confederation.
						</p>
						<img src="images/flags/archive/Faclair (Old).png" alt="Old Flag of Faclair" height="100" style="display:block; margin: auto;">
						<p>
							In <script>sy(2016,4,26)</script> Faclair abandoned its barter economy in favour of joining the market economy, using the Tseles Veridian 
							(&#10183;) as its default currency. This date also marked the formal dissolution of Endermere as its own settlement, with it being absorbed 
							into Cadwgan.
						</p>
						<p>
							Cirrus was founded in <script>sy(2015,10,14)</script>. Sartori was founded sometime around <script>sy(2017,11)</script>. Fairfield was founded 
							in <script>sy(2018,10,21)</script>.
						</p>

						<div id="regioninfo"></div>
					</div>
					<div id="infowindow" class="right" style="max-width: 300px;"></div>
				</div>
			</div>
		</main>
		<script>
			worldData("Faclair");
			regions({ name: "Faclair", division: "Province", regions: [
				{ name: "Capital", city: "Auverland", builds: "Cadwgan, World Tree, Cirrus, Leawood, Horse Track" },
				{ name: "Patria", city: "Patria Suburb", builds: "Red Rose Mall, Hospital, Skyscraper Trio, Hastings Manor" },
				{ name: "Sartori", city: "Sartori", builds: "Guardian Bridge, Aquarium" },
				{ name: "Orne" }] });
		</script>
	</body>
</html>

<?php $nation="Faclair"; $ntype="Freenation"; include '../data/header-world.htm'; ?>

	<script>
		infowindow("","Auverland","","Faelish","Unitary Collaborative Socialist Republic","Faelish","Tseles Veridian (&#10183;)","Traditional Pantheism","Alpine Marmot","Tseles Bank HQ (West Patria, 60m)","Kindegard Lighthouse (Auverland, 65m)");
	</script>
	
	
	<div style="clear:both"></div>

<?php include '../data/footer.htm'; ?>
