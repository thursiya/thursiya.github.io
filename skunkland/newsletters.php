<?php include 'data/header.htm'; ?>

	<div class="contentheader round">The Skunkland Newsletter</div>
	<p><b>Latest Newsletter:</b> <span id='latestNews'></span></p>
	<p>
		As part of the Skunkland server community we release a newsletter about the goings on of the 
		server every few months.  These newsletters keep players up to date on new developments in the 
		game, what other players are working on, and current build areas.  If you would like to include 
		something in a future newsletter please contact thursiya.
	</p>
	<br>
	<div class="contentheader round">Newsletter Archive</div>
	<div class="row">
		<div id="leftcol" class="col-6"></div>
		<div id="rightcol" class="col-6"></div>
	</div>

	<script>
		var nl = ["August 2012", "September 2012", "October 2012", "November/December 2012",
				"January/February 2013", "March/July 2013", "August/October 2013", "November/December 2013",
				"January/March 2014", "April/May 2014", "June 2014", "July/August 2014", "September/November 2014", "December 2014/January 2015",
				"February/March 2015", "April/June 2015", "July 2015", "August/September 2015", "October/November 2015", "December 2015",
				"January/February 2016", "March 2016", "April/May 2016", "June/July 2016", "August/September 2016", "October/December 2016",
				"January/February 2017", "March/April 2017", "May/June 2017", "July 2017/March 2018",
				"April/September 2018","October/November 2018","December 2018/October 2019",
				"November 2019/January 2020","February/April 2020"];
		var count = nl.length;
		document.getElementById('latestNews').innerHTML = "<a href='newsletters/news" + count + ".htm' target='_blank'><i>" + nl[count - 1] + "</i></a>";
		var half = Math.floor(count / 2);
		var nr = nl.slice(0, half).reverse();
		nl = nl.slice(half).reverse();
		var out = "";
		nl.forEach(function (v, i) {out += "<li><a href='newsletters/news" + count + ".htm' target='_blank'>" + v + "</a>"; count--});
		document.getElementById('leftcol').innerHTML = out;
		var out = "";
		nr.forEach(function (v, i) {out += "<li><a href='newsletters/news" + count + ".htm' target='_blank'>" + v + "</a>"; count--});
		document.getElementById('rightcol').innerHTML = out;
	</script>

<?php include 'data/footer.htm'; ?>