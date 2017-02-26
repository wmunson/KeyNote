
///////////////////////////////////////////////
/////////pie chart///////////////////////////
/////////////////////////////////////////////

/////////////// rendering graph ///////

require.config({
			baseUrl: '/js',
			paths: {
    		d3: "http://d3js.org/d3.v3.min"
  			}
		});

const graph = function(arr){require(["d3", "c3"], function(d3, c3) {
  	var title = document.getElementById('nameInput').value;
  	// var arr=[['data1',3],['data2',7]]
  	// getGraphVal();
	var chart = c3.generate({
	    bindto: '.pieChart',
	    data: {
	        columns: arr,
	        type : 'donut',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	    },
	    donut: {
	        title: title
	    }
	});


});
}


//////// updating graph info ///////

const getGraphVal = function(){
	
	var graphArr=[]
	var bar = document.querySelectorAll('.slideBar');
	var li = document.querySelectorAll('.ticker');
	// console.log(ul)
	// console.log(bar)
	// var li = docume
	for (i=0;i<li.length;i++){
		var arr=[]
		var tick = li[i].dataset.id;
		var val =  bar[i].value;
		// console.log('==========')
		// console.log(tick)
		// console.log(val)

		arr.push(tick);
		arr.push(val);
		graphArr.push(arr);
	}
	console.log(graphArr);
	return graphArr
}

///// event for sliders//////
const slideEvent = function(slide){
	slide.addEventListener('change',function(){
	var arr = getGraphVal();
	graph(arr);
	})	
}
//////////////////////////////////////////////
/////search stocks functions///////////////
////////////////////////////////////////////

////////////////////adds hover event////////

const hoverEvents=function(div){
	div.addEventListener('mouseover', function(){
		document.getElementById(div.id+'wes').classList.add('hovering');
		// console.log('hovering')
	});

	div.addEventListener('mouseout', function(){
		document.getElementById(div.id+'wes').classList.remove('hovering');
		// console.log('leaving');
		// console.log(event);

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
		var checkPrice=e.target.dataset.price
		var checkTick=e.target.dataset.id
		// console.log(checkTick.typeOf)
		var tick = document.createTextNode(e.target.dataset.id);
		var price = document.createTextNode(e.target.dataset.price);
		// console.log(tick)
		// console.log(price)

		if(checkPrice!=undefined){
			var ul = document.getElementById('queueTick');
			
			var li = document.createElement('li');
			li.setAttribute('class','ticker')
			li.setAttribute('data-id',checkTick)
			li.setAttribute('data-price',checkPrice)

			var slide = document.createElement('input');
			slide.setAttribute('type','range');
			slide.setAttribute('class','slideBar');
			slide.setAttribute('min',0);
			slide.setAttribute('max',100);
			slide.setAttribute('step',1);
			slide.setAttribute('value',0);
			slideEvent(slide);

			li.appendChild(tick);
			li.appendChild(price);
			li.appendChild(slide);
			ul.appendChild(li);
			
			var target = e.target
			target.style.display='none';
		}
		// getGraphVal()

	})
}

////////// search bar event ////////////

document.getElementById('searchStocks').addEventListener('keyup', function(event){
	console.log('enter')
	
	// event.preventDefault()
	if(event.keyCode == 13){ 
	document.querySelector('.load-wrapp').classList.remove('hidden');
	var name=this.value;
	setTimeout(function(){
		console.log('waiting')
		
		removeLi()
		

		// console.log(name);
		
		searchStock(name);
		document.querySelector('.load-wrapp').classList.add('hidden');
		// stocksToDom(stocks);
		},5000);
	
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
				// console.log(data['result'])
				stocksToDom(data['result'])
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
		input.setAttribute('value', 'Add '+stocks[i].Symbol+' to Queue');

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
			// console.log(data);
			
			if(data['void']){
				const divTop = document.createElement('div');
				divTop.setAttribute('class','stockDiv');
				
				const divInn = document.createElement('div');
				divInn.setAttribute('id',data['Symbol']+'wes');
				divInn.setAttribute('class','innDiv');
				
				const ul = document.createElement('ul');
				ul.setAttribute("id",'hoverUl');

				var lSym = document.createElement('li');
				lSym.innerHTML=data['void'];
				ul.appendChild(lSym)

				divInn.appendChild(ul);
				divTop.appendChild(divInn);

				parent.appendChild(divTop);

			}
			else{

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

				divInn.appendChild(ul);
				divTop.appendChild(divInn);

				parent.appendChild(divTop);
			}
			// var text=document.createTextNode('text');
			
			

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

////////////////////////////////////////
///////////// submit button ///////
//////////////////////////////////

document.getElementById('submit').addEventListener('click', function(event){
	// event.preventDefault();
	var name = document.getElementById('nameInput').value;
	// console.log(name);
	var descript = document.getElementById('etfDescript').value;
	// console.log(descript);
	var arr = makePickArr();
	console.log(arr);
	var data = {
		"Name": name,
		"Description": descript,
		"etf": arr
	};
	var param = JSON.stringify(data);
	document.getElementById('data').setAttribute('value',param);
	document.getElementById('subForm').setAttribute('action','/etf/'+name);

	
	// url = "http://127.0.0.1:5000/etf/"+name
	// var xhttp = new XMLHttpRequest
	// xhttp.onreadystatechange = function(){
	// 		if (this.readyState == 4 && this.status == 200){};
	// 	};
		
	// 	console.log(data);
	// 	console.log(typeof(param));
	// 	console.log(param);

	// xhttp.open("POST", url, true);
	// xhttp.setRequestHeader("Content-type","application/json");
	// xhttp.send(param);
		

});


//////////////// building pickle arr ////////

const makePickArr = function(){
	
	
	var pickArr=[]
	var bar = document.querySelectorAll('.slideBar');
	var li = document.querySelectorAll('.ticker');
	// console.log(ul)
	// console.log(bar)
	// var li = docume
	for (i=0;i<li.length;i++){
		var arr=[]
		var tick = li[i].dataset.id;
		var val =  bar[i].value;
		var price = li[i].dataset.price;
		// console.log('==========')
		// console.log(tick)
		// console.log(val)

		arr.push(tick);
		arr.push(val);
		arr.push(price);
		
		pickArr.push(arr);
	}
	console.log(pickArr);
	return pickArr
}