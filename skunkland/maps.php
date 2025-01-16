<?php include 'data/header.htm'; ?>

	<div class="contentheader round">Current World Political Map</div>
		<div class="gallery">
			<img src="maps/Skunkland World Political Map.jpg" width="935" alt="Skunkland Political Map" usemap="#worldmap">
			<?php /*
			<map name="worldmap">
				<!-- Spawn & Miscellaneous -->
					<area alt="Century Build" shape="rect" coords="389,479,423,506" href="gallery/images/Century Build.jpg" target="_blank">
					<area alt="Desert Town" shape="rect" coords="301,410,353,429" href="gallery/images/Desert Town.jpg" target="_blank">
					<area alt="Igloo at Spawn" shape="rect" coords="346,523,377,543" href="gallery/images/Igloo at Spawn.jpg" target="_blank">
					<area alt="Space Town" shape="circle" coords="337,493,16" href="gallery/images/Space Town.jpg" target="_blank">
					<area alt="Spawn" shape="rect" coords="366,541,408,563" href="gallery/images/Spawn.jpg" target="_blank">
				<!-- Tseles Protectorate & the West -->
					<area alt="Badrum Capital" shape="circle" coords="50,390,20" href="gallery/images/Badrum Capital.jpg" target="_blank">
					<area alt="Black Jack Farm" shape="rect" coords="287,325,325,353" href="gallery/images/Black Jack Farm.jpg" target="_blank">
					<area alt="Cadwgan" shape="circle" coords="129,563,15" href="gallery/images/Cadwgan.jpg" target="_blank">
					<area alt="Castle Gorllewin" shape="rect" coords="180,488,214,509" href="gallery/images/Castle Gorllewin.jpg" target="_blank">
					<area alt="Delve" shape="circle" coords="269,485,15" href="gallery/images/Delve.jpg" target="_blank">
					<area alt="Bright Farm" shape="circle" coords="229,494,16" href="gallery/images/Bright Farm.jpg" target="_blank">
					<area alt="Braille" shape="circle" coords="165,486,15" href="gallery/images/Braille.jpg" target="_blank">
					<area alt="Speurach Torr" shape="circle" coords="189,576,20" href="galler/images/Speurach Torr.jpg" target="_blank">
				<!-- Crevatia -->
					<area alt="Anderson's Crossing" shape="rect" coords="385,203,420,232" href="gallery/images/Andersons Crossing.jpg" target="_blank">
					<area alt="Baetica" shape="rect" coords="447,327,478,346" href="gallery/images/Baetica.jpg" target="_blank">
					<area alt="Bentley Bay" shape="circle" coords="383,381,12" href="gallery/images/Bentley Bay.jpg" target="_blank">
					<area alt="Crevasse" shape="circle" coords="410,390,16" href="gallery/images/Crevasse.jpg" target="_blank">
					<area alt="Crevasse Graveyard" shape="rect" coords="384,352,424,371" href="gallery/images/Crevasse Graveyard.jpg" target="_blank">
					<area alt="CPC Power Plant" shape="circle" coords="425,434,12" href="gallery/images/CPC Power Plant.jpg" target="_blank">
					<area alt="Dojo" shape="circle" coords="459,174,16" href="gallery/images/Dojo at Dawn.jpg" target="_blank">
					<area alt="Eweton at Night" shape="rect" coords="382,318,427,349" href="gallery/images/Eweton at Night.jpg" target="_blank">
					<area alt="Fort Resolution" shape="rect" coords="283,138,332,173" href="gallery/images/Fort Resolution.jpg" target="_blank">
					<area alt="Gickerville" shape="rect" coords="324,37,371,58" href="gallery/images/Gickerville.jpg" target="_blank">
					<area alt="Noricum" shape="rect" coords="283,205,323,229" href="gallery/images/Noricum.jpg" target="_blank">
					<area alt="Stellarton" shape="rect" coords="298,276,337,300" href="galler/images/Stellarton.jpg" target="_blank">
					<area alt="William's Harbour" shape="rect" coords="326,344,365,374" href="galler/images/Williams Harbour.jpg" target="_blank">
				<!-- Gavel -->
					<area alt="Baths Palace" shape="rect" coords="598,319,641,340" href="gallery/images/Baths Palace.jpg" target="_blank">
					<area alt="Celestia" shape="circle" coords="568,281,23" href="gallery/images/Celestia Corolla.jpg" target="_blank">
					<area alt="Ghibli Port" shape="rect" coords="536,403,583,424" href="gallery/images/Ghibli Port.jpg" target="_blank">
					<area alt="GPC Solar Plant" shape="rect" coords="476,352,515,369" href="gallery/images/GPC Solar Plant.jpg" target="_blank">
					<area alt="Great Gate of Gavel" shape="circle" coords="489,435,12" href="gallery/images/Great Gate of Gavel.jpg" target="_blank">
					<area alt="Lunar Hill" shape="rect" coords="595,380,634,400" href="gallery/images/Lunar Hill.jpg" target="_blank">
					<area alt="New Kingsburg" shape="circle" coords="498,397,18" href="gallery/images/New Kingsburg.jpg" target="_blank">
					<area alt="Operis National Distribution Center" shape="rect" coords="593,267,634,290" href="gallery/images/Operis Warehouse.jpg" target="_blank">
					<area alt="Persson International Airport" shape="circle" coords="629,243,24" href="gallery/images/Persson Airport.jpg" target="_blank">
					<area alt="Pristina State Capitol" shape="rect" coords="509,391,538,411" href="gallery/images/Pristina State Capitol at Dawn.jpg" target="_blank">
					<area alt="Zephyr Prison" shape="rect" coords="430,260,470,300" href="gallery/images/Zephyr Prison.jpg" target="_blank">
				<!-- Communes & the East -->
					<area alt="Moon Base" shape="rect" coords="650,391,692,421" href="gallery/images/Moon Base.jpg" target="_blank">
					<area alt="Porcinia" shape="rect" coords="766,270,802,291" href="gallery/images/Porcinia.jpg" target="_blank">
					<area alt="South Shore" shape="rect" coords="635,300,689,323" href="gallery/images/South Shore.jpg" target="_blank">
					<area alt="Twisty Tower" shape="circle" coords="658,338,12" href="gallery/images/Twisty Tower.jpg" target="_blank">
				<!-- Koku & the South -->
					<area alt="Boatmurdered Entrance" shape="circle" coords="775,519,12" href="gallery/images/Boatmurdered Entrance.jpg" target="_blank">
					<area alt="Dragon Ridge" shape="rect" coords="560,669,602,700" href="gallery/images/Dragon Ridge.jpg" target="_blank">
					<area alt="Koku's Tall Ship" shape="circle" coords="613,465,12" href="gallery/images/Tall Ship.jpg" target="_blank">
					<area alt="Lut Gholein Station" shape="rect" coords="654,640,695,665" href="galler/images/Lut Gholein Station.jpg" target="_blank">
					<area alt="Pacman Tree" shape="circle" coords="566,459,12" href="gallery/images/Pacman Tree.jpg" target="_blank">
					<area alt="Sofia" shape="rect" coords="543,605,572,625" href="gallery/images/Sofia.jpg" target="_blank">
				<!-- Far South (nebby) -->
					<area alt="Unnamed City Cathedral" shape="circle" coords="869,757,16" href="gallery/images/Unnamed City Cathedral.jpg" target="_blank">
			</map>
			*/ ?>
		</div>
		<p>
			Click on map locations to load screen shots. Current as of March 2020.
			( <a href="https://drive.google.com/file/d/1LRJQ8R0zdD5zfVhuMH-S5bs9inB9Vp6P/view?usp=sharing"
			target="_blank">Full Quality PNG File Download</a> )
		</p>
		<br>
		
	<div class="contentheader round">Past Political Maps</div>
	<?php
		$maps = glob('maps/Old Political Map*');
		rsort($maps);
		$links = array("https://drive.google.com/file/d/0B0KxjcJqLLD4THJiaVBHTzg2Nnc/view?usp=sharing",
			"https://drive.google.com/file/d/0B0KxjcJqLLD4Q1BZMFRoOEFyOFk/view?usp=sharing",
			"https://drive.google.com/file/d/0B0KxjcJqLLD4YUd3ZEJRV2laV00/view?usp=sharing",
			"https://drive.google.com/file/d/0B0KxjcJqLLD4M1FDY2lZQVlzdU0/view?usp=sharing",
			"https://drive.google.com/file/d/0B0KxjcJqLLD4dUxSdEpEb0xEYjQ/view?usp=sharing",
			"maps/Old Political Map 6.jpg",
			"maps/Old Political Map 5.jpg",
			"maps/Old Political Map 4.jpg",
			"maps/Old Political Map 3.jpg",
			"maps/Old Political Map 2.jpg",
			"maps/Old Political Map 1.jpg");
		$titles = array("July 2017",
			"January 2017",
			"July 2016",
			"January 2016",
			"July 2015",
			"December 2014",
			"June 2014",
			"December 2013",
			"July 2013",
			"December 2012",
			"August 2012");
		for ($i = 0; $i < count($maps); $i++) {
			if ($i % 3 == 0) {
				echo "<div class='row'>";
			}
			echo "<div class='col-4'>";
			echo "<a href='".$links[$i]."' target='_blank'>";
			echo "<img src='".$maps[$i]."' height='200' style='display:block;margin:auto' alt='Skunkland Old Political Map (".$titles[$i].")'>";
			echo "<p style='text-align:center'>".$titles[$i]."</p></a></div>";
			if ($i % 3 == 2 || $i == count($maps)) {
				echo "</div>";
			}
		}
	?>

<?php include 'data/footer.htm'; ?>