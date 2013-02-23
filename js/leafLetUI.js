function addToMap(map,data){
	console.log('add to map ran with data: ');
	console.log(data);
	window.data=data;
	for(var i=0;i<data.rows.length;i++){
		//L.marker([data.rows[i].lat, data.rows[i].lon]).addTo(map);
		var layer = new R.Pulse(
			[data.rows[i].lat,data.rows[i].lon], 
			5,
			{'stroke': '#c22828', 'fill': '#c22828'}, 
			{'stroke': '#c22828', 'stroke-width': 5}
		);
		map.addLayer(layer);
	}
}