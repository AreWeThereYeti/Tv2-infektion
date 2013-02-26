function addToMap(map,data){
	
	for(var i=0;i<data.rows.length;i++){
		
		point_arr=data.rows[i].geo.split(';')
		for(var j=0;j<point_arr.length-1;j++){
			
			point_arr[j]=point_arr[j].split('-');
			
			
			var lat=point_arr[j][0];
			var lon=point_arr[j][1];

			
			//leaflet way:
			// var latlng = new L.LatLng(parseFloat(lat), parseFloat(lon));
			// var point = map.latLngToContainerPoint(latlng);
			
			//google way:
			var latlng = new google.maps.LatLng(parseFloat(lat),parseFloat(lon));
			//top left: 58.008098,7.272949
			//top right: 58.378679,13.337402
			//bottom left: 54.380557,7.185059
			//bottom right: 54.521081,15.732422

			if(latlng.hb>54.380557 &&  latlng.hb<58.008098 && latlng.ib>7.185059 && latlng.ib<15.732422 ){
				var point=latlngToPoint(map, latlng, map.zoom);
				if(point){
					var magnitude = parseFloat(point_arr[j][2]); /* clustering of multiple incident in a time period */
					animateGeoPoint(point,magnitude);
				}
			}
		}
	}
}


function createMap(){
	
	var styles = [
	  {
	    "stylers": [
	      { "visibility": "simplified" }
	    ]
	  },{
	    "featureType": "water",
	    "stylers": [
	      { "saturation": 42 },
	      { "color": "#161615" }
	    ]
	  },{
	    "featureType": "landscape",
	    "stylers": [
	      { "color": "#7f7d80" }
	    ]
	  },{
	    "featureType": "road",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "poi",
	    "elementType": "geometry",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	  },{
	    "featureType": "road.highway",
	    "elementType": "geometry",
	    "stylers": [
	      { "visibility": "simplified" },
	      { "color": "#434343" }
	    ]
	  },{
	  },{
	    "elementType": "labels.icon",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      { "visibility": "on" }
	    ]
	  },{
	  }
	]
	// 
	//width: 648px bredde
	
	var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	
  var myOptions = {
    zoom: 7,
    center: new google.maps.LatLng(56, 10),
		streetViewControl:false,
 		scaleControl: false,
		mapTypeControl: false,
		overviewMapControl: false,
		panControl: false,
		zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
    }
  };
  map = new google.maps.Map(document.getElementById('map'),myOptions);
	//Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

function latlngToPoint(map, latlng){
	MyOverlay.prototype = new google.maps.OverlayView();
	MyOverlay.prototype.onAdd = function() { }
	MyOverlay.prototype.onRemove = function() { }
	MyOverlay.prototype.draw = function() { }
	function MyOverlay(map) { this.setMap(map); }
	var overlay = new MyOverlay(map);
	var projection = overlay.getProjection();
	try{
	  return projection.fromLatLngToContainerPixel(latlng);
	}
	catch(err){
		return false;
	}
}

function animateGeoPoint(point,magnitude,paper){

	// raphael setup
	//id=point.x.toString()+';'+point.y.toString();

	// setup your circle
	var circle = window.paper.circle(point.x, point.y, 10);
	circle.attr("fill", "#f00");
	circle.attr("opacity","0.3")

	// assign an id to the svn node
	circle.node.id = 'circle';
	// pin a reference to the raphael object on the svg node
	$(circle.node).data('raphael',circle);
	
	var to_mag=10*(Math.log(magnitude));
	
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
