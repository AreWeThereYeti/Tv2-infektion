console.log("document not ready");


$(document).ready(function() {
	console.log("document ready");
	console.log('creating visualization');
	
	//layer_url='http://tv2.cartodb.com/api/v1/viz/3839/viz.json';
	
	// leaflet stuff
	var map = new L.Map('map', { 
	    shareable: true,
	    title: true,
	    description: true,
	    search: false,
	    tiles_loader: true,
	    zoom: 7,
	    center: [56,10]
	  });
	L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
	  attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
	}).addTo(map);
	
	// var box = window.vis.addOverlay({
	//   type: 'infobox',
	//   template: '<p>test</p>',
	//   width: 200, // width of the box
	//   position: 'bottom|right' // top, bottom, left and right are available
	// });

	$("#graphcontainer").click(function() {	
		console.log('clicked graphcontainer');
		L.marker([56.11, 10.44]).addTo(map);
	});
});


