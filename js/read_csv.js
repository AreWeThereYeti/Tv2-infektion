function readCSV(callback) {
	$.get('/all.txt', function(data) {
		data=data.split('n');
		for(var i=0;i<data.length;i++){
			data[i]=data[i].replace(/(\s+)?.$/, '');
			data[i]=data[i].split(',');
			window.the_data=data;
			for(var j=0;j<data[i].length;j++){
				console.log(data[i][1]);
				data[i][1]=data[i][1].split(';');
				// if(data[i][1] && data[i][1].length>0){
				// 	for(var k=0;k<data[i][1].length;k++){
				// 		data[i][1][k]=data[i][1][k].split(';');
				// 		if(data[i][1][k][data[i][1].length-1]==""){
				// 			data[i][1][k].pop();
				// 		}
				// 	}
				// }else{
				if(data[i][1].length>1 && data[i][1][data[i][1].length-1]==""){
					data[i][1][data[i][1].length-1].pop();
				}
			}
		}
		window.the_data=data;
		callback(data);
	});
}