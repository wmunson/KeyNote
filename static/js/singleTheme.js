
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


//Calling data for Performance graph


var setArray=function(val, title){
	var newArr=[]
	newArr.push(title)
	for (i=0; i<val.length; i++){
		newArr.push(val[i])
	}
	console.log('newArr:'+ newArr)
	return newArr
}

var loadGraphData = function(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
		var data=JSON.parse(this.responseText);
		var date=setArray(data['date_list'], 'x')
		var price=setArray(data['price_list'], data['company'])
		console.log(date)	
		console.log(price)	
		
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
            price
        ]
    },
    axis: {
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
	
	xhttp.open("GET","/graph", true);
	xhttp.send();
};

loadGraphData()




