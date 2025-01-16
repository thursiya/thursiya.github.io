<?php include 'data/header.htm'; ?>

	<div class="contentheader round">Welcome</div>
		<p><b><i><img src="images/pickaxe.png">
			The Skunkland Server has been retired and continued support will be limited. The server has 
			moved to </b>172.218.226.74:25565<b>. Everything should keep working as before but there will be 
			no more building competitions organized. Players are welcome to continue in Skunkland (making 
			sure to	keep it griefing free) but will not have the benefit of regular admin support or any 
			further	newsletter updates. If you would like a user added to the whitelist please contact 
			thursiya. Being the only continuous players, Shylilie, SpaceSkunks, and thursiya have moved 
			onto a new private server, Skyliya, and may open it to select players in the future. The 
			Skunkland economy will continue to be supported for players who wish to use it (just contact 
			thursiya) but do not expect any new updates. Happy building!
		</b></i></p>
		<p><img src="images/map.png">
			The latest political map is <a href="maps.php">here</a> and now available as an original, 
			high quality download. Our maps include the names our players give to the lands and places 
			of Skunkland so if you would like to add names for your region please submit them to 
			thursiya.
		</p>
		<p><img src="images/compass.png">
			New to the server?  Planning out a travel route on the subway system?  Well you're in luck! 
			The <a href="tour.php">Tour section</a> will take you from Spawn to any of the other subway 
			stations in Skunkland.
		</p>
		<!--p>
			<i>(Apparently something in our server settings is preventing the server status widget from 
			working, so it has been replaced by a current time in Skunkland widget)</i>
		</p-->
		<br>
	<div class="contentheader round">Random Facts of Skunkland</div>
		<div id="randomfact" style="margin-left:auto;margin-right:auto;max-width:600px;text-align:center;font:italic 150% Georgia,serif"></div>
		<br>
	<div class="contentheader round">Latest Newsletter</div>
		<p><a href="newsletters/news35.htm" target="_blank"><b>February/April 2020</b></a></p>
		<br>
	<div class="contentheader round">News</div>
		<div id="newsbreak0"></div>
		<script>
			var fact_xmlhttp = new XMLHttpRequest();
			var fact_url = "data/facts.txt";
		
			fact_xmlhttp.onreadystatechange = function() {
				if (fact_xmlhttp.readyState == 4 && fact_xmlhttp.status == 200) {
					var facts = (fact_xmlhttp.responseText).split('\n');
					document.getElementById("randomfact").innerHTML = facts[Math.floor(Math.random() * facts.length)];
				}
			}
			fact_xmlhttp.open("GET", fact_url, false);
			fact_xmlhttp.send();
		
			var news_xmlhttp = new XMLHttpRequest();
			var news_url = "data/news.txt";
			var news = [];

			news_xmlhttp.onreadystatechange = function() {
				if (news_xmlhttp.readyState == 4 && news_xmlhttp.status == 200) {
					var headlines = (news_xmlhttp.responseText).split('\n');
					var out = "";
					var newsfeed = [];
					var last = headlines.length - 1;
					for (var i = 0; i <= last; i++) {
						news[i] = eval('[' + headlines[i] + ']');
						function swap (str, p1) {
							if (p1.search("news") > -1) return ("<a href='newsletters/" + p1 + ".htm' target='_blank'>");
							if (p1 == 'Q') return ("<blockquote class='grey'>");
							if (p1 == '/Q') return ("</i></blockquote>");
							var out = "<img src='images/";
							if (p1 == 'C') out += "compass";
							if (p1 == 'G') out += "painting";
							if (p1 == 'M') out += "map";
							if (p1 == 'N') out += "bookshelf";
							if (p1 == 'T') out += "craft";
							if (p1 == 'W') out += "pickaxe";
							out += ".png' height='16'>";
							return out;
						}
						news[i][3] = news[i][3].replace(/{(.*?)}/g,swap);
						out += '<p><span class="grey">' + news[i][0] + '-' + ('0' + news[i][1]).slice(-2);
						if (news[i][2] > 0) out += '-' + ('0' + news[i][2]).slice(-2);
						out += '</span><br>' + news[i][3] + '</p>';
						if ((i % 6 == 5) || (i == last)) {
							var newsset = Math.floor(i / 6) + 1;
							if (i < last) out += '<div id="button' + newsset + '" onclick="toggletext(' + newsset + ')" style="text-align:center;font-weight:bold">&#x25BC; More News &#x25BC;</div><br><div id="newsbreak' + newsset + '" style="display:none"></div>';
							document.getElementById("newsbreak" + (newsset - 1)).innerHTML = out;
							out = "";
						} 
					}					
				}
			}
			news_xmlhttp.open("GET", news_url, false);
			news_xmlhttp.send();
		
			function toggletext(cid) {
				if (document.getElementById("newsbreak" + cid).style.display == "none") {
					document.getElementById("newsbreak" + cid).style.display = "block";
					document.getElementById("button" + cid).innerHTML = "&#x25B2; Less News &#x25B2;";
				} else {
					document.getElementById("newsbreak" + cid).style.display = "none";
					document.getElementById("button" + cid).innerHTML = "&#x25BC; More News &#x25BC;";
				}
			}
		</script>
		
<?php include 'data/footer.htm'; ?>