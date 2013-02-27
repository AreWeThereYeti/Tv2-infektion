function getDB(callback){
	url='http://tv2.cartodb.com/api/v2/sql?q=SELECT time, geo FROM infektionskort_2 ORDER BY time&api_key=6df5723b5b2cedbc8e6a3b43886cce62742fd734';
	$.ajax({
	  dataType: "jsonp",
	  url: url,
	  success: function(data){
			callback(parseDBData(data))
		}
	});

}

// function parseDBData(data){ 
// 	var p_data=[];
// 	for(var i=0;i<data.rows.length;i++){
// 		p_data[i]=[];
// 		p_data[i][0]=data.rows[i].time;
// 		p_data[i][1]=data.rows[i].geo.split(';')
// 		if(p_data[i][1][p_data[i][1].length-1]==''){
// 			p_data[i][1].pop();
// 		}
// 		for(var j=0;j<p_data[i][1].length;j++){
// 			p_data[i][1][j]=p_data[i][1][j].split('-');
// 		}
// 	}
// 	return p_data;
// }

function parseDBData(data){ 
	var p_data=[];
	for(var i=0;i<data.rows.length;i++){
		p_data[i]=[];
		p_data[i][0]=data.rows[i].time;
		p_data[i][1]=data.rows[i].geo.split(';')
		if(p_data[i][1][p_data[i][1].length-1]==''){
			p_data[i][1].pop();
		}
		for(var j=0;j<p_data[i][1].length;j++){
			p_data[i][1][j]=p_data[i][1][j].split('-');
			for(var k=0;k<p_data[i][1][j].length;k++){
				if (p_data[i][1][j][k]==''){
					p_data[i][1][j].splice(k,1);
				}
			}
		}
	}
	return p_data;
}