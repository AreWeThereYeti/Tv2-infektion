function queryCartoDb(query,callback){
	
	//http://{account}.cartodb.com/api/v2/sql?q={SQL statement}
	
	//query that works:
	//'http://tv2.cartodb.com/api/v2/sql?q=select%20*%20from%20infektionskort%20where%20cartodb_id%20%3E%2090'

	//console.log('queryCartoDb ran with url: ' + 'http://tv2.cartodb.com/api/v2/sql?q='+query);

	$.ajax({
		type: "GET",
		url: 'http://tv2.cartodb.com/api/v2/sql?q='+query,
		dataType: "jsonp",
		success: function(data){
			callback(data);
		},
		error:function(err){
			alert('something went wrong when trying to get data from cartoDB');
		}
	});
}

//select * from infektionskort where time > 1327737605000