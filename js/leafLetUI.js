function addToMap(map,data){
	console.log('addToMap ran');
	console.log(data);
	
	for(var i=0;i<data.rows.length;i++){
		
		point_arr=data.rows[i].geo.split(';')
		for(var j=0;j<point_arr.length-1;j++){
			
			point_arr[j]=point_arr[j].split('-');
			
			
			var lat=point_arr[j][0];
			var lon=point_arr[j][1];
			var latlng = new L.LatLng(parseFloat(lat), parseFloat(lon));
	
			var point = map.latLngToContainerPoint(latlng);
			var magnitude = parseFloat(point_arr[j][2]); /* clustering of multiple incident in a time period */
			console.log('lat lon: ' + lat + ' , ' + lon);
			console.log('magnitude: ' + magnitude);
	
			$("body").append("<img src='img/sprite.png' alt='sprite' class='markeranim' style='top: "+(point.y-12)+"px; left: "+(point.x-12)+"px;'></img>")
			$(".markeranim:last-child").animate(
				{
					'width'		: '+=25',
					'height'	: '+=25',
					'top' 		: '-=13',
					'left' 		: '-=13',
					'opacity'	:	0

				},
				{
					duration:500,
					complete: function(){
			      $(this).remove();
			    }
				}
			);
		}
	}
	
	
/*
	----------------------------------
	leaf leat marker example:
	----------------------------------
	
	//L.marker([data.rows[i].lat, data.rows[i].lon]).addTo(map);
	//map.addLayer(layer);
	
	var inf_marker = L.icon({
    iconUrl: 'img/sprite.png',

    iconSize:     [51, 51], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76], // point from which the popup should open relative to the iconAnchor
    opacity:	  [0.5]
    });


    L.marker([51.5, -0.09], {icon: inf_marker}).addTo(map).bindPopup("Andreas har en lille pik!");
    var marker = L.marker([51.5, -0.09]).addTo(map);
*/
}