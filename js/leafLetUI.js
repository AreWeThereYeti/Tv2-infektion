function addToMap(map,data){
	
	for(var i=0;i<data.rows.length;i++){
		
		point_arr=data.rows[i].geo.split(';')
		for(var j=0;j<point_arr.length-1;j++){
			
			point_arr[j]=point_arr[j].split('-');
			
			
			var lat=point_arr[j][0];
			var lon=point_arr[j][1];
			var latlng = new L.LatLng(parseFloat(lat), parseFloat(lon));
	
			var point = map.latLngToContainerPoint(latlng);
			
			var magnitude = parseFloat(point_arr[j][2]); /* clustering of multiple incident in a time period */
			
			animateGeoPoint(point,magnitude);
		}
	}
}

function animateGeoPoint(point,magnitude,paper){

	// raphael setup
	id=point.x.toString()+';'+point.y.toString();

	// setup your circle
	var circle = window.paper.circle(point.x, point.y, 10);
	circle.attr("fill", "#f00");
	circle.attr("opacity","0.3")

	// assign an id to the svn node
	circle.node.id = 'circle';
	// pin a reference to the raphael object on the svg node
	$(circle.node).data('raphael',circle);
	
	var to_mag=2*magnitude;
	
	circle.animate(
		{
      r : to_mag	//animate radius
    },
		1000,
		'linear',
		function(){					
			circle.remove();
		}
	);
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
