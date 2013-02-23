function getStartDate(){
	console.log('getStartDate ran');
	queryCartoDb('SELECT MIN(time) FROM infektionskort',function(data){
		console.log('returned query');
		console.log(data);
	});
}