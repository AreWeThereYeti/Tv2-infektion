var start_time=1326441605;	//: Fri Jan 13 2012 09:00:05 GMT+0100 (CET)
var end_time=1332023416;		//: Thu Feb 21 2013 17:36:06 GMT+0100 (CET)
var diff=end_time-start_time;

var time_span=diff/1000;
var map;
var day_interval=1;				//frame jump in days
var time_interval=1000;  //frame time in ms
var prev_scroll_val=0;

$(document).ready(function() {
	console.log('creating visualization');
	//layer_url='http://tv2.cartodb.com/api/v1/viz/3839/viz.json';
	
	//obs!!! remember to update paper height, width on window resize!!
	window.paper = Raphael(0,0,$(window).width(),$(window).height());
	
	//getStartDate();
	getAllDates(function(dates){
		console.log('get all dates returned');
		// leaflet stuff
		map = new L.Map('map', { 
				    shareable: true,
				    title: true,
				    description: true,
				    search: false,
				    tiles_loader: true,
				    zoom: 7,
				    center: [56,10]
				  });
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
		


		// var box = window.vis.addOverlay({
		//   type: 'infobox',
		//   template: '<p>test</p>',
		//   width: 200, // width of the box
		//   position: 'bottom|right' // top, bottom, left and right are available
		// });

		$("#graphcontainer").click(function() {	
			// add layer to existing map
			time=new Date(start_time*1000);
			window.anim=setInterval(function(){queryAndAdd(time.setDate(time.getDate()+day_interval))},time_interval);
		});


		// setup slider functionality
		$("#slider").slider({
			min: 0,
			max: dates.length-1,
		  slide: function( event, ui ) {
				console.log(ui.value);
				time=dates[ui.value];
				console.log(time);

				var date=new Date(time*1000);
				$('#date-txt').html(date);

				//add to map
				queryAndAdd(time);
				//prev_scroll_val=time;
			}
		});
	
	
	});
});

// function queryAndAdd(query){
// 	t1_date=new Date(query);
// 	t1=query/1000;
// 	t2=(t1_date.setDate(t1_date.getDate()+day_interval))/1000;
// 	console.log('showing between dates:');
// 	console.log(new Date(t1*1000));
// 	console.log(new Date(t2*1000));
// 	
// 	queryCartoDb('SELECT * FROM infektionskort WHERE time BETWEEN '+ t1	+ ' AND ' + t2,function(data){
// 		addToMap(map,data);
// 	});
// }

function queryAndAdd(t){
	// 
	// console.log('showing between dates:');
	// console.log(new Date(t1*1000));
	// console.log(new Date(t2*1000));
	queryCartoDb('SELECT * FROM infektionskort_2 WHERE time='+t.toString(),function(data){
		addToMap(map,data);
	});
}

