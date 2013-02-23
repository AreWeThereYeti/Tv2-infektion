var start_time=1326441605;	//: Fri Jan 13 2012 09:00:05 GMT+0100 (CET)
var end_time=1361464566;		//: Thu Feb 21 2013 17:36:06 GMT+0100 (CET)
var diff=end_time-start_time;
var time_span=diff/1000;
var map;
var day_interval=5;				//frame jump in days
var time_interval=1000;  //frame time in ms
var prev_scroll_val=0;

$(document).ready(function() {
	console.log('creating visualization');
	//layer_url='http://tv2.cartodb.com/api/v1/viz/3839/viz.json';
	
	getStartDate();
	
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
		// add layer to existing map
		time=new Date(start_time*1000);
		console.log(new Date(time));
		window.anim=setInterval(function(){queryAndAdd(time.setDate(time.getDate()+day_interval))},time_interval);
	});
	
	
	// setup slider functionality
	$("#slider").slider({
	  slide: function( event, ui ) {
			// console.log(ui.value);
			if(prev_scroll_val<ui.value+1){
				var time=Math.round(prev_scroll_val*(diff/100)+start_time);
				var time_to=Math.round((ui.value+1)*(diff/100)+start_time);
			}
			else{
				var time_to=Math.round(prev_scroll_val*(diff/100)+start_time);
				var time=Math.round((ui.value+1)*(diff/100)+start_time);
			}

			var date=new Date(time*1000);
			// console.log('slider time is: ' + time);
			// console.log('slider date is: ' + date);
			
			$('#date-txt').html(date);
			
			//add to map
			queryAndAdd(time,time_to);
			
			prev_scroll_val=ui.value;
		}
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

function queryAndAdd(t1,t2){
	// 
	// console.log('showing between dates:');
	// console.log(new Date(t1*1000));
	// console.log(new Date(t2*1000));
	queryCartoDb('SELECT * FROM infektionskort WHERE time BETWEEN '+ t1	+ ' AND ' + t2,function(data){
		addToMap(map,data);
	});
}

