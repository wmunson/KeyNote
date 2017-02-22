
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
	var name=this.value;
	console.log(name);
	searchStock(name);
	// stocksToDom(stocks);
	}
});


const searchStock = function(name){
// console.log(name)	
	var url = "/stock/"+name;
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				var data = JSON.parse(this.responseText);
				console.log(data)
				stocksToDom(data)
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();

}


const stocksToDom = function(stocks){
	var ul = document.getElementById('stockUl');
	
	
	var arr = []
	for (i=0;i<stocks.length;i++){
		const li = document.createElement("li");
		li.setAttribute('class','stockTick')
		li.setAttribute('id',stocks[i].Symbol)
		
		if (stocks[i].Name){
			const name = document.createTextNode(stocks[i].Name);
			li.appendChild(name);
			addEvent(li)
			
			ul.appendChild(li);
		}
		else{
			const symbol = document.createTextNode(stocks[i].Symbol);
			li.appendChild(symbol);
			addEvent(li)

			ul.appendChild(li);
		}
	}
}


const addEvent=function(li){
	li.addEventListener('click',function(){
	var tick = this.id
	
	})
}


// document.querySelector('.stockTick').addEventListener('click',function(){
// 	console.log(this.id)
// })

