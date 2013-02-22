

$(document).ready(function() {
	console.log("document ready");

	$("#graphcontainer").click(function() {
		console.log("Handler for .click() called.");
		
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
	
	var query = "SELECT cartodb_id,ST_AsGeoJSON(the_geom) as the_geom FROM {infektionskort} LIMIT 1"
	console.log(query);
});
	