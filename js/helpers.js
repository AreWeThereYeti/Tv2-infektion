function getStartDate(callback){
	console.log('getStartDate ran');
	queryCartoDb('SELECT MIN(time) FROM infektionskort_2',function(data){
		callback(data.rows[0].min)
	});
}

function getEndDate(callback){
	console.log('getStartDate ran');
	queryCartoDb('SELECT MAX(time) FROM infektionskort_2',function(data){;
		callback(data.rows[0].max)
	});
}

function getAllDates(callback){
	console.log('getStartDate ran');
	queryCartoDb('SELECT time FROM infektionskort_2',function(data){
		dates=[];
		for(var i=0;i<data.rows.length-1;i++){
			dates[i]=data.rows[i].time;
		}
		callback(dates);
	});
}