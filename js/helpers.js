function getStartDate(){
	start_time=all_data[0][0]*1000;
	start_time=new Date(start_time).setHours(0);
	start_time=new Date(start_time).setMinutes(0);
	return new Date(start_time).setSeconds(0);
}

function getEndDate(){
	return all_data[all_data.length-1][0]*1000;
}

function get_time_row(t1,t2){
	for(var i=0;i<all_data.length;i++){
		if(all_data[i][0]>t1 && all_data[i][0]<t2){
			return all_data[i][1];
		}
	}
	return false;
}