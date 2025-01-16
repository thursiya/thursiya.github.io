<?php include 'data/header.htm'; ?>
	<div class="contentheader round">Random Screenshots</div>
		<div class="row">
			<?php
				$images = glob('gallery/images/*');
				shuffle($images);
				for ($i = 0; $i < 3; $i++) {
					echo "<div class='col-4'><a href='".$images[$i]."' target='_blank'><img src='".$images[$i]."' height='175'></a></div>";
				}
			?>
		</div>
		<br><br>
	
	<div class="contentheader round">General Gallery</div>
		<p>
			<a href="gallery/Skunkland.php">Skunkland General Gallery</a><br>
			<a href="gallery/Nether.php">Nether Gallery</a>
		</p>
		<div class="row">
			<div class="col-6">
				<ul>
					<li><a href="gallery/Aiur.php">Kingdom of Aiur</a>
					<li><a href="gallery/Amahn.php">Hanse of Amahn</a>
					<li><a href="gallery/Badrum.php">Imperium of Badrum</a>
					<li><a href="gallery/Boatmurdered.php">Miasma of Boatmurdered</a>
					<li><a href="gallery/Braille.php">Protectorate of Braille</a>
					<li><a href="gallery/Crevatia.php">D.P.R. of Crevatia</a>
				</ul>
			</div>
			<div class="col-6">
				<ul>
					<li><a href="gallery/Delve.php">Adhocracy of Delve</a>
					<li><a href="gallery/Faclair.php">Freenation of Faclair</a>
					<li><a href="gallery/Gavel.php">Republic of Gavel</a>
					<li><a href="gallery/Koku.php">Kingdom of Koku</a>
					<li><a href="gallery/Porcinia.php">Commune of Porcinia</a>
					<li><a href="gallery/SouthShore.php">Commune of South Shore</a>
				</ul>
			</div>
		</div>

<?php include 'data/footer.htm'; ?>