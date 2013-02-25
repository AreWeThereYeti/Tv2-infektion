function addToMap(map,data){
	// console.log('add to map ran with data: ');
	// console.log(data);
	// window.data=data;
	for(var i=0;i<data.rows.length;i++){
		//L.marker([data.rows[i].lat, data.rows[i].lon]).addTo(map);
		//map.addLayer(layer);
		
		var point = map.latLngToContainerPoint([data.rows[i].lat, data.rows[i].lon]);
/* 		var magnitude = [data.rows[i].mag]; /* clustering of multiple incident in a time period */	 
	
		$("body").append("<img src='img/sprite.png' alt='sprite' class='markeranim' style='top: "+(point.y-12+)+"px; left: "+(point.x-12)+"px;'></img>")
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
					console.log('removing animation');
			      $(this).remove();
			    }
			}
		);
	}
}