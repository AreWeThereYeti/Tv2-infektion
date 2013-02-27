var all_data;
var start_time;	// first recorded time 
var end_time;		// last recorded time
var diff;				// diff in days

var map;
var day_interval=1;				//frame jump in days
var time_interval=200;  //frame time in ms
var prev_scroll_val=0;
var plot_step;
var time_row;

var day=86400000;		//day i milliseconds

var play=false;
var marker_margin;
var current_day=0;

$(document).ready(function() {
	console.log('document is ready');	
	//obs!!! remember to update paper height, width on window resize!! (no need)
	window.paper = Raphael(0,0,$(window).width(),$(window).height());
  window.paper.canvas.id='svg-overlay';

	getDB(function(data){
		console.log('got DB');
		all_data=data;
		
		start_time=getStartDate();
		end_time=getEndDate();
		diff=Math.ceil(((end_time-start_time))/1000/60/60/24);
		
		plot_step=$('#plot').width()/diff;
		
		createMap();
		addEventListeners();
	});
});

function addEventListeners(){
	// setup slider functionality
	$("#slider").slider({
		min: 0,
		max: diff,
	  slide: function( event, ui ) {
			var val=ui.value;
			$('#svg-overlay').show();
			//var val=parseInt($('#slider').slider("option", "value"));
			if(play){
				play_pause();
			}
			var time=(val*day)+start_time;		//date time in milliseconds
			current_day=val;
			$('#line-container').css('margin-left',2*(plot_step*val));
			
			var date=new Date(time);
			setDateTxt(date)

			//add to map
			queryAndAdd(time);
		}
	});
	
	$('#svg-overlay').mousedown(function(){
		console.log('hiding layer');
		$(this).hide();
	});
	$('#svg-overlay').mouseup(function(){
		console.log('showing layer');
		$(this).show();
	});
}

function play_pause(){
	if(play){
		console.log('stopping animation');
		clearInterval(window.anim);
		pause_pos=
		play=false;
		$('#line-container').css('margin-left',0);

	}else{
		t=current_day;
		console.log('playing animation from day: ' + t);
		window.anim=setInterval(function(){
			$('#svg-overlay').show();
			if(t<all_data.length-1){
				var time_mili=(t*day)+(start_time);
				current_day=t;
				setDateTxt(new Date(time_mili));
				current_time=time_mili;
				queryAndAdd(time_mili);
				t+=1;
				var new_margin=parseFloat($('#line-container').css('margin-left'))+plot_step;
				$('#line-container').css('margin-left',new_margin);
			}
			else{
				clearInterval(window.anim);
			}
			$( "#slider" ).slider( "value", t );

		},time_interval);
		play=true;
	}
}

function queryAndAdd(t){
	// t is a date in milliseconds
	t2=t+day;
	t2=(t2-1000)/1000;
	t=t/1000;
	
	var data=get_time_row(t,t2);
	if(data[1]!=false){
		time_row=data[1];
	}
	if(data[0]){
		setCounterVal(get_counter_val(time_row));
		addToMap(map,data[0]);
	}
	
}


function setDateTxt(date){
	$('#day-txt').html(date.getDate());
	$('#month-txt').html(date.getMonth()+1);
	$('#year-txt').html(date.getFullYear());
}

function setCounterVal(counter){
	$('#counter_val').html(counter);
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
			{'marginTop':'-175px','marginLeft':'-175px','width':'300px','height':'300px','opacity':'0'},
			function(){
				$(this).css({'width':'100px','height':'100px','margin-left':'-50px','margin-top':'-50px','opacity':'1','display':'none'});
			}
		);
		$elem.parent().append($elem);
	}
});
