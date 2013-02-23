function addToMap(map,data){
	// console.log('add to map ran with data: ');
	// console.log(data);
	// window.data=data;
	for(var i=0;i<data.rows.length;i++){
		L.marker([data.rows[i].lat, data.rows[i].lon]).addTo(map);
		var point=map.latLngToLayerPoint([data.rows[i].lat, data.rows[i].lon]);	
		// console.log(point.x);
		// console.log(point.y);
	}
}