

// document.getElementById('overview').addEventListener('click',
// 	function(){
// 		document.getElementById('peDiv').classList.remove('activeBox')
// 		document.getElementById('neDiv').classList.remove('activeBox')
// 		document.getElementById('coDiv').classList.remove('activeBox')
// 		document.getElementById('ovDiv').classList.add('activeBox')

// 	}
// );

// document.getElementById('performance').addEventListener('click',
// 	function(){
// 		document.getElementById('ovDiv').classList.remove('activeBox')
// 		document.getElementById('neDiv').classList.remove('activeBox')
// 		document.getElementById('coDiv').classList.remove('activeBox')
// 		document.getElementById('peDiv').classList.add('activeBox')

// 	}
// )

// document.getElementById('news').addEventListener('click',
// 	function(){
// 		document.getElementById('peDiv').classList.remove('activeBox')
// 		document.getElementById('ovDiv').classList.remove('activeBox')
// 		document.getElementById('coDiv').classList.remove('activeBox')
// 		document.getElementById('neDiv').classList.add('activeBox')

// 	}
// )

// document.getElementById('comments').addEventListener('click',
// 	function(){
// 		document.getElementById('peDiv').classList.remove('activeBox')
// 		document.getElementById('neDiv').classList.remove('activeBox')
// 		document.getElementById('ovDiv').classList.remove('activeBox')
// 		document.getElementById('coDiv').classList.add('activeBox')
		
// 		document.getElementById('coDiv').classList.remove('activetab')
// 		document.getElementById('coDiv').classList.remove('activetab')
// 		document.getElementById('coDiv').classList.remove('activetab')
// 		document.getElementById('coDiv').classList.add('activeTab')

// 	}
// )








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