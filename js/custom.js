var start_time;	// first recorded time 
var end_time;		// last recorded time
var diff;				// diff in days

//var time_span=diff/1000;
var map;
var day_interval=1;				//frame jump in days
var time_interval=200;  //frame time in ms
var prev_scroll_val=0;

var day=86400000;		//day i milliseconds

$(document).ready(function() {
	console.log('creating visualization');
	//layer_url='http://tv2.cartodb.com/api/v1/viz/3839/viz.json';
	
	//obs!!! remember to update paper height, width on window resize!! (no need)
	window.paper = Raphael(0,0,$(window).width(),$(window).height());
	
	getStartDate(function(data){
		console.log('got start date: ' + data);
		start_time=data*1000;
		start_time=new Date(start_time).setHours(0);
		start_time=new Date(start_time).setMinutes(0);
		start_time=new Date(start_time).setSeconds(0);
		getEndDate(function(data){
			console.log('got end date: ' + data);
			end_time=data*1000;
			diff=Math.ceil(((end_time-start_time))/1000/60/60/24);
			console.log('diff in days: ' + diff);
			getAllDates(function(dates){
				console.log('get all dates returned');
				createMap();
				addEventListeners();
			});
		})
	});
});

function addEventListeners(){
	// setup slider functionality
	$("#slider").slider({
		min: 0,
		max: diff,
	  slide: function( event, ui ) {
			time=(ui.value*day)+(start_time);		//date time in milliseconds

			var date=new Date(time);
			setDateTxt(date)

			//add to map
			queryAndAdd(time);
			//prev_scroll_val=time;
		}
	});
	
	$("#play").click(function() {	
		// add layer to existing map
		console.log('clicked play');
		//time=new Date(start_time*1000);
		t=0;
		window.anim=setInterval(function(){
			if(t<dates.length-1){
				var date=new Date(dates[t]*1000);
				setDateTxt(date)
				queryAndAdd(dates[t]);
				t+=1;
			}
			else{
				clearInterval(window.anim);
			}
		},time_interval);
	});
	
	$("#stop").click(function() {
		clearInterval(window.anim);
	});
}

function queryAndAdd(t){
	// t is a date in milliseconds
	t2=t+day;
	t2=(t2-1000)/1000;
	


	console.log('showing between dates:');
	console.log(new Date(t));
	console.log(new Date(t2*1000));
	
	t=t/1000;
	
	console.log(t);
	console.log(t2);
	
	queryCartoDb('SELECT * FROM infektionskort_2 WHERE time BETWEEN '+ t	+ ' AND ' + t2,function(data){
		addToMap(map,data);
	});
}

// function queryAndAdd(t){
// 	// 
// 	// console.log('showing between dates:');
// 	// console.log(new Date(t1*1000));
// 	// console.log(new Date(t2*1000));
// 	queryCartoDb('SELECT * FROM infektionskort_2 WHERE time='+t.toString(),function(data){
// 		addToMap(map,data);
// 	});
// }

function setDateTxt(date){
	$('#day-txt').html(date.getDate());
	$('#month-txt').html(date.getMonth()+1);
	$('#year-txt').html(date.getFullYear());
}


