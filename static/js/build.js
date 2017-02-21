
///////////////////////////////////////////////
/////////pie chart///////////////////////////
/////////////////////////////////////////////

require.config({
			baseUrl: '/js',
			paths: {
    		d3: "http://d3js.org/d3.v3.min"
  			}
		});
require(["d3", "c3"], function(d3, c3) {
  			
	var chart = c3.generate({
	    bindto: '.pieChart',
	    data: {
	        columns: [
	            ["setosa", 0.2],
	            ["versicolor", 1.4],
	            ["virginica", 2.5],
	        ],
	        type : 'donut',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	    },
	    donut: {
	        title: "Techie"
	    }
	});


});

//////////////////////////////////////////////
/////search stocks functions///////////////
////////////////////////////////////////////

document.getElementById('searchStocks').addEventListener('keyup', function(event){
	event.preventDefault()
	if(event.keyCode == 13){ 
	console.log('good');
	}
});


const searchStock = function(event){

}