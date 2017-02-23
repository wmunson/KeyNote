
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

////////////////////adds hover event////////

const hoverEvents=function(div){
	div.addEventListener('mouseover', function(){
		document.getElementById(div.id+'wes').classList.add('hovering');
		console.log('hovering')
	});

	div.addEventListener('mouseout', function(){
		document.getElementById(div.id+'wes').classList.remove('hovering');
		console.log('leaving');
		console.log(event);

	});
}

/////////refreshes ul list//////

const removeLi = function(){
	var parent = document.querySelector('#stockUl');
	while(parent.firstChild){
		parent.removeChild(parent.firstChild)
	}
}



//////////////adds click event for queueing stock////

const queueEvent = function(input){
	input.addEventListener('click',function(e){
		// console.log(e.target.dataset.id)
		
		var tick = document.createTextNode(e.target.dataset.id);
		var price = document.createTextNode('PRICE: '+e.target.dataset.price);
		console.log(tick)
		console.log(price)

		var ul = document.getElementById('queueTick');
		
		var li = document.createElement('li');
		li.setAttribute('class','ticker')

		var slide = document.createElement('input');
		slide.setAttribute('type','range');
		slide.setAttribute('class','slideBar');
		slide.setAttribute('min',0);
		slide.setAttribute('max',100);
		slide.setAttribute('step',1);
		slide.setAttribute('value',0);

		li.appendChild(tick);
		li.appendChild(price);
		li.appendChild(slide);
		ul.appendChild(li);



	})
}

////////// search bar event ////////////

document.getElementById('searchStocks').addEventListener('keyup', function(event){
	event.preventDefault()
	if(event.keyCode == 13){ 
	removeLi()
	var name=this.value;
	console.log(name);
	searchStock(name);
	
	// stocksToDom(stocks);
	}
});


///////ajax for search bar///////////

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

///////appends returned stock info to ul///////

const stocksToDom = function(stocks){
	var ul = document.getElementById('stockUl');
	
	for (i=0;i<stocks.length;i++){
		const li = document.createElement("li");
		li.setAttribute('class','stockTick');
		
		const div = document.createElement('div');
		div.setAttribute('class','listCon');
		div.setAttribute('id', stocks[i].Symbol);
		
		const input = document.createElement('input');
		input.setAttribute('type','submit');
		input.setAttribute('class','queueBut');
		input.setAttribute('data-id', stocks[i].Symbol);
		// input.setAttribute('data-price', stocks[i].LastPrice);

		queueEvent(input);

		if (stocks[i].Name){
			const name = document.createTextNode("NAME: "+stocks[i].Name+", EXCHANGE: "+stocks[i].Exchange);
			div.appendChild(name)
			// addInput(stocks[i].Symbol);
			addDiv(stocks[i].Symbol);
			div.appendChild(input);
			hoverEvents(div);
			li.appendChild(div);
			ul.appendChild(li);
			
		}
		else{
			const symbol = document.createTextNode("SYMBOL: "+stocks[i].Symbol+", EXCHANGE: "+stocks[i].Exchange);
			div.appendChild(symbol)
			// addInput(stocks[i].Symbol);
			addDiv(stocks[i].Symbol);
			div.appendChild(input);
			hoverEvents(div);
			li.appendChild(div);
			ul.appendChild(li);
		}
	
	}
	
}




// const addInput = function(symbol){
// 	const parent = document.querySelector('#'+symbol);
// 	const input = document.createElement('input');
// 		input.setAttribute('type','submit');
// 		input.setAttribute('class','queueBut');
// 		input.setAttribute('data-id', symbol);
// 		parent.appendChild(input);
// }


////creates divs for stock info hover box//////////

const addDiv=function(symbol){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			const parent = document.querySelector('#'+symbol);
			const input = document.querySelector('[data-id="'+symbol+'"]')
			
			const data = JSON.parse(this.responseText);
			console.log(data);
			
			input.setAttribute('data-price',data['LastPrice']);

			const divTop = document.createElement('div');
			divTop.setAttribute('class','stockDiv');
			
			const divInn = document.createElement('div');
			divInn.setAttribute('id',data['Symbol']+'wes');
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
		xhttp.open("GET", "/stock/more/"+symbol, true);
		xhttp.send();

}




// li.addEventListener('mouseout',function(){
// 		var tick = '#'+this.id
// 		var node = document.querySelector('.stockDiv'); 
// 		node.setAttribute("class","remove")
// 		node.removeChild(node.firstChild);
// 	})

// document.querySelector('.stockTick').addEventListener('click',function(){
// 	console.log(this.id)
// })



