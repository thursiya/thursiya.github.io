<?php include 'data/header.htm'; ?>

	<div class="contentheader round">Tour of Skunkland</div>
	<p>
		Want to get acquainted with our lovely server?  What better way than a tour by way of our subway
		system!  Our tour starts at spawn and you can click subway exits to learn more about the areas 
		around the subway stations.
	</p>
	<br>
	<div class="contentheader round" id="stationheader"></div>
		<table style="float:right">
			<tr>
				<td id="northwest" width="140" height="90"></td>
				<td id="north" width="140"></td>
				<td id="northeast" width="140"></td>
			</tr>
			<tr>
				<td id="west" width="140" height="90"></td>
				<th width="140"><span id="stationName"></span><br><span style="font-size:80%">Station</span></th>
				<td id="east" width="140"></td>
			</tr>
			<tr>
				<td id="southwest" width="140" height="90"></td>
				<td id="south" width="140"></td>
				<td id="southeast" width="140"></td>
			</tr>
		</table>
				
		<img id="picture" height='275'>
		<br>
		<p id="flavour"></p>
		<p id="nearby"></p>

	<div style="clear:both"></div>

<!--   *** Touring Script ***   -->

<script type="text/javascript">
	// Identify Station
	var url = self.location.search;
	var station = decodeURI(url.substring(url.lastIndexOf('?') + 1)) || "Spawn";
	var s1 = "<span style='font-size:80%'>";
	var s2 = "</span><br><br><a href='?";
	var s3 = "</a><br><br>";
	var sflight = s1 + "&#9992; FLIGHT &#9992;" + s2;
	
	// Reset Corner Station Borders
	northwest.style.border = "none";
	northeast.style.border = "none";
	southwest.style.border = "none";
	southeast.style.border = "none";
	
	// Select Station Data
	var sdat = "";
	switch (station) {
		case "Andersons Crossing":
			sdat = ["Andersons Crossing","The station serves as a stop-over on the long north rail through Crevatia from Eweton to Gickerville.","Anderson's Crossing, The Trident (The Dragon's Tail Inn, The Trident Nature Preserve, The Dojo)","Gickerville","Noricum","","Eweton"];
			break;
		case "Auverland":
			sdat = ["Auverland","Access to Faclair's largest city.","Auverland, Endermere","Jungle Tours","","West Patria","Auverland Market"];
			break;
		case "Auverland Market":
			sdat = ["Auverland Market","Southern station in Faclair's largest city.","Auverland, Faclair Central Warehouse","Auverland","","West Patria",""];
			break;
		case "Badrum Capital":
			sdat = ["Badrum Capital","This is a temporary station allowing fast land access to and from the Badrum Imperium.","Badrum Imperial City","","","Botanical Garden",""];
			break;
		case "Baetica":
			sdat = ["Baetica","Access to the town of Baetica and eastern Crevatia.","Baetica, Gavel western border","Zephyr Prison","Eweton","","Northside"];
			break;
		case "Baths Palace":
			sdat = ["Baths Palace","The Baths Palace was one of the first isolated custom builds.  The station is incomplete so all exits are closed.","Baths Palace, South Shore western border","Mellon Bay","Celestia","South Shore","Lunar Hill"];
			break;
		case "Boatmurdered":
			sdat = ["Boatmurdered","Currently the most eastern of the southern stations.  Access to Boatmurdered mountain stronghold.  The south exit stops over at the Yanacocha mob spawner first.","Boatmurdered","","Southeast Koku","","Lut Gholein"];
			break;
		case "Botanical Garden":
			sdat = ["Botanical Garden","A tiny waypoint in Faclair enroute to Badrum. There is a large selection of flowers in the surrounding flower forest.","Braille border","","Badrum Capital","Braille","Jungle Tours"];
			break;
		case "Braille":
			sdat = ["Braille","Access to the town and protectorate of Braille.","Braille, Castle Gorllewin (Delve)","","Botanical Garden","Delve","Cadwgan"];
			break;
		case "Cadwgan":
			sdat = ["Cadwgan","Access to the town of Cadwgan and the Freenation of Faclair.","Cadwgan, Endermere","Braille","Jungle Tours","Ulve","West Patria"];
			break;
		case "Celestia":
			sdat = ["Celestia Corolla","This is the hub station of the Thurail Subway network which is why it has eight exits.  It is located at the heart of the city of Celestia (Tercomciel province, Gavel).","City of Celestia","","Zefram","Mellon Bay","Funland"];
			//northwest.innerHTML = s1 + "-- NORTHWEST --" + s2 + "Navy Base'>Navy Base" + s3;
			//northwest.style.border = "1px solid black";
			northeast.innerHTML = s1 + "-- NORTHEAST --" + s2 + "Persson Airport'>Persson Airport" + s3;
			northeast.style.border = "1px solid black";
			//southwest.innerHTML = s1 + "-- SOUTHWEST --" + s2 + "Casino'>Casino" + s3;
			//southwest.style.border = "1px solid black";
			southeast.innerHTML = s1 + "-- SOUTHEAST --" + s2 + "Baths Palace'>Baths Palace" + s3;
			southeast.style.border = "1px solid black";
			break;
		case "Century Build":
			sdat = ["Century Build","This is the site of the Century Build Competition, held during SY 200.  The site features statues by players who participated.","Crevatia south border","Crevasse","Space Town","Southside","Spawn"];
			break;
		case "Contested Village":
			sdat = ["Contested Village","The village contested between Gavel and Koku, located southeast of New Kingsburg.","New Kingsburg, Pristina Capitol","","Pristina Capitol","West Koku"];
			break;
		case "Crevasse":
			sdat = ["Crevasse","The second station ever constructed and first to feature the ubiquitous 4-way switch, built as a waypoint between New Kingsburg and Delve, it's now home to the capital of Crevatia.  The station has undergone significant renovations and no longer resembles its original form, now spanning the length of the city.","Crevasse City, Crevasse Pyramid, Mechwarrior, Bentley Bay, Volcano","Eweton","Desert Town","New Kingsburg","Century Build"];
			northeast.innerHTML = sflight + "Persson Airport'>Persson Airport" + s3;
			break;
		case "Cutters Junction":
			sdat = ["Cutters Junction","This is a stop-over station at Cutter's Junction, South Shore.","Cutter's Junction, Quarries","","Moon Base","Tree Tower"];
			break;
		case "Delve":
			sdat = ["Delve","This station is located just outside of the east entrance to Delve City which lets you walk through the famed Dragon Maw Gate.","Delve City, Treetop Village","Desert Town","Braille","Space Town","Ulve"];
			break;
		case "Desert Town":
			sdat = ["Desert Town","Desert Town is a designated neutral town.  It is open to all players to visit, trade in, and add to.","Desert Town, Mt. Pacifica, Delve eastern border, Crevatia western border","Williams Harbor","Delve","Crevasse","Space Town"];
			break;
		case "Dragon Ridge":
			sdat = ["Dragon Ridge","Currently the most southern station.  Dragon Ridge is the chief town in the Hanse of Amahn.","Dragon Ridge, Dragon Bones","Sofia","Red Rock","",""];
			break;
		case "Eweton":
			sdat = ["Eweton at Night","This station is so old it was built before Eweton was incorporated into Crevatia.","Eweton, Midgewater Swamp","Andersons Crossing","Williams Harbor","Baetica","Crevasse"];
			break;
		case "Faclair Airport":
			sdat = ["Faclair Airport","There is currently no subway station at the airport but one may be built in the future.","Auverland, Endermere, Glorious Farm","","","",""];
			northeast.innerHTML = sflight + "Persson Airport'>Persson Airport" + s3;
			break;
		case "Fort Resolution":
			sdat = ["Fort Resolution","At the end of the long dark tunnel the subway stops underground at the Fort Resolution monster spawner.","Fort Resolution","","","","Noricum"];
			break;
		case "Funland":
			sdat = ["Central Ghibli","This station is a waypoint in the middle of the province of Ghibli, Gavel, sitting between four important stations.  Funland will be a theme park developed in the future.  There is nothing here and all exits are closed.","Dead end desert roads","Celestia","New Kingsburg Airport","Lunar Hill","Ghibli Port"];
			break;
		case "Ghibli Port":
			sdat = ["Ghibli Port","This station exits on the docks of Ghibli Port (Ghibli province, Gavel).","Ghibli Port, Koku northern border","Funland","Pristina Capitol","","West Koku"];
			break;
		case "Gickerville":
			sdat = ["Gickerville","Currently the northernmost station in the subway network.  Access to Gickerville and northern Crevatia.","Gickerville","","","","Andersons Crossing"];
			break;
		case "Johnville":
			sdat = ["Johnville","Originally known as Tetriston, Johnville is the second largest independent settlement after Desert Town","Johnville","Southside","Spawn","","Sofia"];
			break;
		case "Jungle Tours":
			sdat = ["Jungle Tours","Tucked away in northwest Faclair is the Jungle Tours site, built to address the western shortfall of jungle.","Jungle Tours, Horse Track","Botanical Garden","","Cadwgan","Auverland"];
			break;
		case "Lunar Hill":
			sdat = ["Lunar Hill","Access to Lunar Hill (Ghibli province, Gavel).","Lunar Hill, Observatory, South Shore western border","Baths Palace","Funland","Moon Base",""];
			break;
		case "Lut Gholein":
			sdat = ["Lut Gholein Station","Access to Lut Gholein (Boatmurdered).  The east exit stops over at the Yanacocha mob spawner first.","Lut Gholein, Yanacocha Mine","Southeast Koku","Sofia","Boatmurdered",""];
			break;
		case "Mellon Bay":
			sdat = ["Operis Warehouse","This station provides access to the Operis National Distribution Center (Masovia state, Gavel) and the future town of Mellon Bay.","Operis National Distribution Center, Doggy Magical HQ","Persson Airport","Celestia","South Shore","Baths Palace"];
			break;
		case "Moon Base":
			sdat = ["Moon Base","This subway station is the only access to the inside of the Moon Base (South Shore).","Moon Base","South Shore","Lunar Hill","Cutters Junction","Southeast Koku"];
			break;
		case "New Kingsburg":
			sdat = ["New Kingsburg","This is where the subway system began (which is why the station is peculiarly built).  The four exits come out in the center of downtown New Kingsburg (Pristina state, Gavel), the first city of Skunkland.","New Kingsburg, Pristina Capitol","Northside","Crevasse","New Kingsburg Airport","Southside"];
			break;
		case "New Kingsburg Airport":
			sdat = ["New Kingsburg Regional Airport","In the northeast of New Kingsburg lies the regional airport (connecting directly to Persson International).","New Kingsburg, Smelter","Northside","New Kingsburg","Funland","Pristina Capitol"];
			northeast.innerHTML = sflight + "Persson Airport'>Persson Airport" + s3;
			break;
		case "Noricum":
			sdat = ["Noricum","This station exits in the town of Noricum (Crevatia).","Noricum, Fort Resolution","Fort Resolution","","Andersons Crossing","Stellarton"];
			break;
		case "Northside":
			sdat = ["Northside (New Kingsburg)","The northern suburb of New Kingsburg.","New Kingsburg, GPC Solar Plant","","Baetica","New Kingsburg Airport","New Kingsburg"];
			break;
		case "Persson Airport":
			sdat = ["Persson Airport","The station exits inside the Persson International Airport terminal (Enlil province, Gavel).","Persson International Airport","","Celestia","","Mellon Bay"];
			northwest.innerHTML = sflight + "West Patria'>Faclair Airport" + s3;
			northeast.innerHTML = sflight + "Crevasse'>Crevasse" + s3;
			southwest.innerHTML = sflight + "New Kingsburg Airport'>New Kingsburg Airport" + s3;
			break;
		case "Porcinia":
			sdat = ["Porcinia","Currently the most eastern station of the northern stations.  Access to the town and Commune of Porcinia.","Porcinia, Rainbow","","South Shore","","Tree Tower"];
			break;
		case "Pristina Capitol":
			sdat = ["Pristina State Capitol at Dawn","This station exits either to the basement or exterior of the Pristina State Capitol.","Pristina Capitol, New Kingsburg","New Kingsburg Airport","Southside","Ghibli Port","Contested Village"];
			break;
		case "Red Rock":
			sdat = ["Red Rock","The town of Red Rock is the hub of mesa mining.","Red Rock, otherwise nothing - it's in the middle of the Grand Mesa","Spawn","Ulve","Dragon Ridge",""];
			break;
		case "Sofia":
			sdat = ["Sofia","Sofia was a neutral town that joined the Hanse of Amahn in February 190.","Sofia, Castle Foundations, Cross on the Hill","","Johnville","Lut Gholein","Dragon Ridge"];
			break;
		case "Southeast Koku":
			sdat = ["Southeast Koku Station","This station is a stop-over on the way from Moon Base to Boatmurdered.  There is currently nothing to see here and the exits are closed.","Nothing","Moon Base","","Boatmurdered","Lut Gholein"];
			break;
		case "South Shore":
			sdat = ["South Shore","Access to the city of South Shore, capital of the Commune of South Shore.","South Shore, Twisty Tower, Gavel eastern border","Mellon Bay","Baths Palace","Porcinia","Moon Base"];
			break;
		case "Southside":
			sdat = ["Southside (New Kingsburg)","This is currently a placeholder station, one of the New Kingsburg inner city network.","New Kingsburg, Pristina Capitol, Great Gate of Gavel","New Kingsburg","Century Build","Pristina Capitol","Johnville"];
			break;
		case "Space Town":
			sdat = ["Space Town","Space Town is a public build site where any player can learn the ropes.","Space Town","Desert Town","Delve","Century Build","Spawn"];
			break;
		case "Spawn":
			sdat = ["Spawn","Spawn station is where it all begins!  Players spawning for the first time in Skunkland show up in the middle of a harsh snowy biome so we've created a welcoming house and there is a subway station to start your tour immediately.","The Welcoming House, Igloo","Century Build","Space Town","Johnville","Red Rock"];
			break;
		case "Stellarton":
			sdat = ["Stellarton","This station exits in the town of Stellarton (Crevatia).","Stellarton, Delve northern border","Noricum","","","Williams Harbor"];
			break;
		case "Tree Tower":
			sdat = ["Tree Tower","This station is the last on the eastern line and directly connects to the Far East Rail Link.","Tree Tower, abandoned builds","Porcinia","Cutters Junction","",""];
			break;
		case "Ulve":
			sdat = ["Ulve","Ulve is the capital and largest settlement in Ennist province, Delve.  The station is located in the Ulve Undermarket, beneath the castle of Ulvenstand.  Although not particularly close to the Arcane Factory, it is the closest subway station available.","Ulve, Ulvenstand, University of Ennist, Standing Stones","Delve","Cadwgan","Red Rock",""];
			break;
		case "West Koku":
			sdat = ["Pacman Tree","Access to the Kingdom of Koku.","Pacman Tree, Koku Fortress, Gavel southern border","Ghibli Port","Contested Village","",""];
			break;
		case "West Patria":
			sdat = ["West Patria","Access to Faclair's southeastern zone of Patria and the international airport.","Red Rose Mall, Faclair Airport, Market","Cadwgan","Auverland","","Auverland Market"];
			northeast.innerHTML = sflight + "Persson Airport'>Persson Airport" + s3;
			break;
		case "Williams Harbor":
			sdat = ["Williams Harbour","This station exits in the town of William's Harbour (Crevatia).","William's Harbour, Bentley Bay","Stellarton","","Eweton","Desert Town"];
			break;
		case "Zefram":
			sdat = ["Zefram","At the heart of Gavel's Zephyr province, the town of Zefram is the future home of the Gavel Space Agency and spaceport.  It is the site of the Year 300 Century Build.","Zefram, Century Build 300","","Zephyr Prison","Celestia",""];
			break;
		case "Zephyr Prison":
			sdat = ["Zephyr Prison","The station exits to an access tunnel with a short rail to the Zephyr Federal Mining Penal Colony (Zephyr province, Gavel).","Zephyr Prison","","","Zefram","Baetica"];
			break;
		default:
			sdat = ["Igloo at Spawn","This station does not exist.","See above","","","",""];
	}
	
	var stationpic = sdat[0],
		stationtext = sdat[1],
		nearsites = sdat[2],
		northExit = sdat[3],
		westExit = sdat[4],
		eastExit = sdat[5],
		southExit = sdat[6];
		
	// Display Station Header, Picture & Info
	stationheader.innerHTML = station + " Station";
	picture.src = "gallery/images/" + stationpic + ".jpg";
	flavour.innerHTML = stationtext;
	nearby.innerHTML = "Close by: " + nearsites;
		
	// Display Station Selector
	northExit ? north.innerHTML = s1 + "---- NORTH ----" + s2 + northExit + "'>" + northExit + s3 : north.style.border = "none";
	westExit ? west.innerHTML = s1 + "---- WEST ----" + s2 + westExit + "'>" + westExit + s3 : west.style.border = "none";
	eastExit ? east.innerHTML = s1 + "---- EAST ----" + s2 + eastExit + "'>" + eastExit + s3 : east.style.border = "none";
	southExit ? south.innerHTML = s1 + "---- SOUTH ----" + s2 + southExit + "'>" + southExit + s3 : south.style.border = "none";
	stationName.innerHTML = station;
	
</script>

<?php include 'data/footer.htm'; ?>