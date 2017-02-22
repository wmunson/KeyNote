
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
	
	for (i=0;i<stocks.length;i++){
		const li = document.createElement("li");
		li.setAttribute('class','stockTick')
		li.setAttribute('id',stocks[i].Symbol)
		
		if (stocks[i].Name){
			const name = document.createTextNode("NAME: "+stocks[i].Name+", EXCHANGE: "+stocks[i].Exchange);
			li.appendChild(name);
			addEvent(li)
			
			ul.appendChild(li);
		}
		else{
			const symbol = document.createTextNode("SYMBOL: "+stocks[i].Symbol+", EXCHANGE: "+stocks[i].Exchange);
			li.appendChild(symbol);
			addEvent(li)

			ul.appendChild(li);
		}
	}
}


const addEvent=function(li){
	li.addEventListener('mouseover',function(){
		var tick = this.id
		console.log('tick:'+tick);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				
				const parent = document.querySelector('#'+tick);
				const data = JSON.parse(this.responseText);
				console.log(data);
				
				const divTop = document.createElement('div');
				divTop.setAttribute('class','stockDiv');
				
				const divInn = document.createElement('div');
				divInn.setAttribute('class','innDiv');
				
				const ul = document.createElement('ul');
				ul.setAttribute("id",'hoverUl');

				var lSym = document.createElement('li');
				lSym.innerHTML=data['Symbol'];
				ul.appendChild(lSym)

				var ltime = document.createElement('li');
				ltime.innerHTML=data['Timestamp'];
				ul.appendChild(ltime);

				var lLP = document.createElement('li');
				lLP.innerHTML="$"+data['LastPrice'];
				ul.appendChild(lLP)

				var lCP = document.createElement('li');
				lCP.innerHTML="%"+data['ChangePercent'];
				ul.appendChild(lCP)

				var lMC = document.createElement('li');
				lMC.innerHTML=data['MarketCap'];
				ul.appendChild(lMC)

				var lvol = document.createElement('li');
				lvol.innerHTML=data['Volume'];
				ul.appendChild(lvol)

				var lhigh = document.createElement('li');
				lhigh.innerHTML="$"+data['High'];
				ul.appendChild(lhigh)

				var llow = document.createElement('li');
				llow.innerHTML="$"+data['Low'];
				ul.appendChild(llow)

				var lopen = document.createElement('li');
				lopen.innerHTML="$"+data['Open'];
				ul.appendChild(lopen)

				// var text=document.createTextNode('text');
				divInn.appendChild(ul);
				divTop.appendChild(divInn);

				parent.appendChild(divTop);
			}
		}
		xhttp.open("GET", "/stock/more/"+tick, true);
		xhttp.send();

	})
	li.addEventListener('mouseout',function(){
		var tick = '#'+this.id
		var node = document.querySelector('.stockDiv'); 
		node.setAttribute("class","remove")
		node.removeChild(node.firstChild);
	})
}


// document.querySelector('.stockTick').addEventListener('click',function(){
// 	console.log(this.id)
// })

