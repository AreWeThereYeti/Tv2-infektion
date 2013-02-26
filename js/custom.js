var start_time;	// first recorded time 
var end_time;		// last recorded time
var diff;				// diff in days

var map;
var day_interval=1;				//frame jump in days
var time_interval=200;  //frame time in ms
var prev_scroll_val=0;
var plot_step;

var day=86400000;		//day i milliseconds

var play=false;
var marker_margin

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
				plot_step=$('#plot').width()/dates.length;
				console.log(plot_step);
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
			if(play){
				play_pause();
			}
			time=(ui.value*day)+(start_time);		//date time in milliseconds

			var date=new Date(time);
			setDateTxt(date)

			//add to map
			queryAndAdd(time);
		}
	});
}

function play_pause(){
	if(play){
		console.log('stopping animation');
		clearInterval(window.anim);
		play=false;
	}else{
		console.log('playing animation');
		t=0;
		window.anim=setInterval(function(){
			if(t<dates.length-1){
				var time_mili=(t*day)+(start_time);
				setDateTxt(new Date(time_mili));
				queryAndAdd(time_mili);
				t+=1;
				var new_margin=parseFloat($('#line-container').css('margin-left'))+plot_step;
				$('#line-container').css('margin-left',new_margin);
			}
			else{
				clearInterval(window.anim);
			}
		},time_interval);
		play=true;
	}
}

function queryAndAdd(t){
	// t is a date in milliseconds
	t2=t+day;
	t2=(t2-1000)/1000;
	t=t/1000;
	
	// console.log(t);
	// console.log(t2);
	
	queryCartoDb('SELECT * FROM infektionskort_2 WHERE time BETWEEN '+ t	+ ' AND ' + t2,function(data){
		addToMap(map,data);
	});
}


function setDateTxt(date){
	$('#day-txt').html(date.getDate());
	$('#month-txt').html(date.getMonth()+1);
	$('#year-txt').html(date.getFullYear());
}


$(function() {
	$(document).keypress(function(e){
		if ((e.which && e.which == 32) || (e.keyCode && e.keyCode == 32)) {
			togglePlay();
			return false;
			} else {
			return true;
			}
	});
	
	$('#playbutton').click(function(){
		togglePlay();
		return false;
	});
	 
	function togglePlay(){
		play_pause();
		var $elem = $('#player').children(':first');
		$elem.stop().show().animate(
			{'marginTop':'-175px','marginLeft':'-175px','width':'350px','height':'350px','opacity':'0'},
			function(){
				$(this).css({'width':'100px','height':'100px','margin-left':'-50px','margin-top':'-50px','opacity':'1','display':'none'});
			}
		);
		$elem.parent().append($elem);
	}
});
