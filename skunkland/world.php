<?php include 'data/header.htm'; ?>

	<div class="contentheader round">The World of Skunkland</div>
	<p>
		Most players on the Skunkland server have decided to give their build a national identity.  This
		section focuses on detailed information about nation-state builds.  Some players have formed 
		confederations of nations (such as the protectorates in the west).  Those players who have not or
		do not wish to take part in national identities have their builds marked by a purple boundary on
		the political map.
	</p>
	<p style="text-align:center;font-size:150%">
		<i>~ <a href="world/projects.htm">Current Player Projects</a> ~</i>
	</p>
	<br>
	
	<div class="contentheader round">Nations of Skunkland</div>
	<div class="row">
		<div class="col-8">
			<table>
				<tr>
					<th>Flag</th>
					<th>Nation</th>
					<th>Player(s)</th>
				</tr>
				<tbody id="tabledata2"></tbody>
			</table>
		</div>	
		<div class="col-4">
			<table>
				<tr><th>Timeline of Skunkland</th></tr>
				<tr>
					<td>
						<table class="info">
							<tbody id="tabledata1"></tbody>
							<tr>
								<td width="55"><b>SY 1</b></td>
								<td>Year of Spawn</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr><td><i>~ <a href="world/calculations.htm">Time Calculation</a> ~</i></td></tr>
				<tr><td><i>~ <a href="world/census.htm">Census of Skunkland</a> ~</i></td></tr>
			</table>
		</div>
	</div>

<script>
var xmlhttp1 = new XMLHttpRequest();
var xmlhttp2 = new XMLHttpRequest();
var url1 = "data/nations.txt";
var url2 = "data/events.txt";

xmlhttp2.onreadystatechange = function() {
	if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
		var evt = (xmlhttp2.responseText).split('\n');
		var out = "";
		for(var i = 0; i < evt.length; i++) {
			evt[i] = evt[i].split(',');
			out += "<tr><td width='60'><b>" + syear(new Date(evt[i][0], evt[i][1] - 1, evt[i][2])) + "</b></td>";
			out += "<td>" + evt[i][3] + "</td></tr>";
		}
		document.getElementById("tabledata1").innerHTML = out;
	}
}
xmlhttp2.open("GET", url2, true);
xmlhttp2.send();

xmlhttp1.onreadystatechange = function() {
	if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
		var nat = (xmlhttp1.responseText).split('\n');
		var out = "";
		for(var i = 0; i < nat.length; i++) {
			nat[i] = nat[i].split(',');
			out += "<tr><td><img src='world/images/" + nat[i][0] + " Flag.png' height='50' alt='Flag of " + nat[i][0] + "' title='" + (nat[i][3] ? "Temporary Flag of " + nat[i][0] : "") + "'></td>";
			out += "<td><a href='world/" + nat[i][0] + ".php'><span class='title'>" + nat[i][1] + " of " + nat[i][0] + "</span></a></td>";
			out += "<td>" + nat[i][2] + "</td></tr>";
		}
		document.getElementById("tabledata2").innerHTML = out;
	}
}
xmlhttp1.open("GET", url1, true);
xmlhttp1.send();
</script>
	
<?php include 'data/footer.htm'; ?>