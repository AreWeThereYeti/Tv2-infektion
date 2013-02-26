function getStartDate(){
	console.log('getStartDate ran');
	// queryCartoDb('SELECT MIN(time) FROM infektionskort_2',function(data){
	// 	callback(data.rows[0].min)
	// });
	start_time=all_data[0][0][0]*1000;
	start_time=new Date(start_time).setHours(0);
	start_time=new Date(start_time).setMinutes(0);
	return start_time=new Date(start_time).setSeconds(0);
}

function getEndDate(){
	console.log('getStartDate ran');
	// queryCartoDb('SELECT MAX(time) FROM infektionskort_2',function(data){;
	// 	callback(data.rows[0].max)
	// });
	end_time=all_data[all_data.length-1][0][0]*1000;
}

function get_time_row(){
	
}

// function getAllDates(callback){
// 	console.log('getStartDate ran');
// 	// queryCartoDb('SELECT time FROM infektionskort_2',function(data){
// 	// 	dates=[];
// 	// 	for(var i=0;i<data.rows.length-1;i++){
// 	// 		dates[i]=data.rows[i].time;
// 	// 	}
// 	// 	callback(dates);
// 	// });
// }