
///////////////////////////////////////
// Basic Animations for ToggleBar// 

var checkClass = function(event){
	if (event.target.id === "performance"){
	document.getElementById('peDiv').classList.add('activeBox')
	}
	if (event.target.id === "overview"){
	document.getElementById('ovDiv').classList.add('activeBox')
	}
	if (event.target.id === "comments"){
	document.getElementById('coDiv').classList.add('activeBox')
	}
	if (event.target.id === "news"){
	document.getElementById('neDiv').classList.add('activeBox')
	}
}


var makeClass=function(event){
	document.getElementById('peDiv').classList.remove('activeBox')
	document.getElementById('ovDiv').classList.remove('activeBox')
	document.getElementById('coDiv').classList.remove('activeBox')
	document.getElementById('neDiv').classList.remove('activeBox')
	
	document.getElementById('overview').classList.remove('activeTab')
	document.getElementById('performance').classList.remove('activeTab')
	document.getElementById('news').classList.remove('activeTab')
	document.getElementById('comments').classList.remove('activeTab')
	
	document.getElementById(event.target.id).classList.add('activeTab')

	// console.log(event.target.id)
	checkClass(event)

}


var pe = document.getElementById('performance')
var ov =document.getElementById('overview')
var co =document.getElementById('comments')
var ne =document.getElementById('news')

var array=[pe,ov,ne,co]

for (let i=0;i<array.length;i++){
	array[i].addEventListener('click', makeClass)
}


//////////////////////////////////////////////
//Calling data for Performance graph//////////
//////////////////////////////////////////////

var setArray=function(val, title){
	var newArr=[]
	newArr.push(title)
	for (i=0; i<val.length; i++){
		newArr.push(val[i])
	}
	// console.log('newArr:'+ newArr)
	return newArr
}


Array.prototype.max = function(){
	return Math.max.apply(null, this);
};

Array.prototype.min = function(){
	return Math.min.apply(null, this);
};


var loadGraphData = function(){
	var name = document.getElementById('etfName').innerHTML;
	// console.log(name);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
		var data=JSON.parse(this.responseText);
		var date=setArray(data['date_list'], 'x')
		var etfPrice=setArray(data['etf'], 'YourTheme')
		var spPrice=setArray(data['SandP'], 'S&P')
		var priceMax= data['etf'].max()
		var priceMin= data['etf'].min()
		var name = data['Name'].toString()
		// console.log('name:'+name)	
		// console.log(data['etf'])	
		// console.log(etfPrice.toString())	
		// console.log(spPrice.toString())	
		// console.log(typeof(name))	
		// console.log(typeof(etfPrice[0]))	
		
		require.config({
			baseUrl: '/js',
			paths: {
    		d3: "http://d3js.org/d3.v3.min"
  			}
		});

		require(["d3", "c3"], function(d3, c3) {
  			
  			c3.generate({
    			bindto: '.performGraph',
    			data: {
			        x: 'x',
			        columns: [
			            date,
			            etfPrice,
			            spPrice

			        ],
			        names: {
			        		YourTheme: name
			        },
			        axes:{
			        	YourTheme: 'y2'
			        }
			    },
			    axis: {
			      	y: {
			      		label: {
			      			text: 'S&P',
			      			position: 'outer-middle'
			      		}
			      	},


			      	y2:{
			   			show: true,
			   			label: {
			   				text: name,
			   				position: 'inner-middle'
			   			},
			   			// tick:{
			   			// 	values: data['etf']
			   			// }
			   			},
			        x: {
			            type: 'timeseries',
			            tick: {
			                // this also works for non timeseries data
			                values: data['date_list']
			            }
			        }
			   	}
	    	})

	  			});
			};


			};	
	
	xhttp.open("GET","/graph/"+name, true);
	xhttp.send();
};

loadGraphData()


////////////////////////////////////////////////
/////// Overview graph ///////////////////


require.config({
			baseUrl: '/js',
			paths: {
    		d3: "http://d3js.org/d3.v3.min"
  			}
		});

{require(["d3", "c3"], function(d3, c3) {
  	var arr=makeDonArr();
  	var title = document.getElementById('etfName').innerHTML;
  	// getGraphVal();
	var chart = c3.generate({
	    bindto: '.donGraph',
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


/////// making donut graph array /////

const makeDonArr = function(){
	var data = document.getElementById('hidden').innerHTML;
	var list = JSON.parse(data);
	console.log(list['result']);
	// arr = [];
	// for (i=0;i<list.length;i++){

	// }
	return list['result'];
};

///////////////////////////////////////
///////// modify button ///////////////
////////////          //////////////

document.getElementById('modInput').addEventListener('click',function(event){
	var name = document.getElementById('etfName').innerHTML;
	console.log(name);
	document.getElementById('modify').setAttribute('action','/build/'+name);
});



///////////////////////////////////////
////////// save button //////////////
//////////            /////////////////

document.getElementById('saveInput').addEventListener('click',function(){
	var name = document.getElementById('etfName').innerHTML;
	document.getElementById('save').setAttribute('action','/save/'+name);
});



