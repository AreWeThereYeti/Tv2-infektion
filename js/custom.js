console.log("document not ready");


$(document).ready(function() {
	console.log("document ready");
	console.log('creating visualization');
	
	layer_url='http://tv2.cartodb.com/api/v1/viz/3839/viz.json';
	
  // window.map=cartodb.createVis('map', 'http://tv2.cartodb.com/api/v1/viz/3839/viz.json', {
  //     shareable: true,
  //     title: true,
  //     description: true,
  //     search: false,
  //     tiles_loader: true,
  //     center_lat: 56,
  //     center_lon: 10,
  //     zoom: 7
  // }).done(function(vis, layers) {
  //   // layer 0 is the base layer, layer 1 is cartodb layer
  //   layers[1].on('featureOver', function(e, pos, latlng, data) {
  //     cartodb.log.log(e, pos, latlng, data);
  //   });
  //   // you can get the native map to work with it
  //   // depending if you use google maps or leaflet
  //   window.map = vis.getNativeMap();
  //   // map.setZoom(3)
  //   // map.setCenter(new google.maps.Latlng(...))
  // }).error(function(err) {
  //   console.log(err);
  // });

	var map = new L.Map('map', { 
	    // shareable: true,
	    // title: true,
	    // description: true,
	    // search: false,
	    // tiles_loader: true,
	    zoom: 7,
	    center: [56,10]
	  });
	L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
	  attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
	}).addTo(map);

	$("#graphcontainer").click(function() {
		
		cartodb.createLayer(map,{
				type: 'cartodb',
				options: {
	        table: 'infektionskort',
	        user_name: 'TV2',
	        query: 'select * from infektionskort where cartodb_id > 90',
					interactivity: "cartodb_id,the_geom,magnitude"
				}
	    })
			.on('done',function(layer) {
				console.log('done and adding layer');
				console.log(layer);
				layer.setInteraction(true);
				layer.on('featureOver', function(e, latlng, pos, data){
					console.log('featureOver ran');
				})
				.on('error', function(err) {
	        console.log('error: ' + err);
	      });
				console.log(layer);
			  map.addLayer(layer);
			})
			.on('error', function(err) {
	    	alert("some error occurred: " + err);
			})

	});
});



// $("#graphcontainer").click(function() {
// 	console.log('creating layer');
// 	cartodb.createLayer(window.map, {
// 	    type: 'cartodb',
// 	    options: {
// 	        table: 'infektionskort',
// 	        user_name: 'TV2',
// 	        query: 'select * from infektionskort where cartodb_id > 90'
// 	    }
// 		}).on('done',function(layer) {
// 			console.log('done and adding layer');
// 			console.log(layer);
// 		  map.addLayer(layer);
// 		}).on('error',function(err){
// 			console.log('error');
// 			console.log(err);
// 	});
// });


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