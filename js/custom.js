console.log("document not ready");


$(document).ready(function() {
	console.log("document ready");

	$("#graphcontainer").click(function() {
		alert("Handler for .click() called.");
		
		cartodb.createLayer(map, {
		    type: 'cartodb',
		    options: {
		        table: 'infektionskort',
		        user_name: 'TV2',
		        query: 'select * from infektionskort where cartodb_id > 10000'
		    }
			}).on('done',function(layer) {
			    map.addLayer(layer);
			}).on('error',function(err){
				console.log('error');
				console.log(err);
		});
	});
});


/*

Overlay.prototype = {
  graph: function(divid){

    var
    startTime = this.conflictmaps.first().time.getTime(),
    endTime   = this.conflictmaps.last().time.getTime(),
    data      = this.conflictmaps.getDeathToll(endTime+10000),
    timeStep  = 300;

    var // margins and dimensions
    m = [0, 0, 0, 0],
    w = config.graph.width  - m[1] - m[3],
    h = config.graph.height - m[0] - m[2];

    var
    x = d3.time.scale().domain([startTime, endTime]).range([0, w]),
    y = d3.scale.linear().domain([0, d3.max(data, function(d) { return d[1]; })]).range([h, 0]);

    // create a line function that can convert data[] into x and y points
    var line1 = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d) {
      // return the X coordinate where we want to plot this datapoint
      return x(d[0]);
    })
    .y(function(d) {
      // return the Y coordinate where we want to plot this datapoint
      return y(d[1]); // use the 1st index of data (for example, get 20 from [20,13])
    })

    var line2 = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d) {
      // return the X coordinate where we want to plot this datapoint
      return x(d[0]);
    })
    .y(function(d) {
      // return the Y coordinate where we want to plot this datapoint
      return y(d[2]); // use the 2nd index of data (for example, get 13 from [20,13])
    })

    // Add an SVG element with the desired dimensions and margin.
    var graph = d3.select("#" + divid).append("svg:svg")
    .attr("width",  w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    // add lines
    // do this AFTER the axes above so that the line is above the tick-lines
    graph.append("svg:path").attr("d", line1(data)).attr("class", "data1");
    graph.append("svg:path").attr("d", line2(data)).attr("class", "data2");
  },
*/