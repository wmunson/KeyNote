//////////////////////////////////////////////////////////////////
////Brings up manage box and autofills info//////////////////////
/////////////////////////////////////////////////////////////////

document.getElementById('baseAccount').addEventListener('click',function(){
	document.getElementById('baseMenu').classList.add('active');
	// document.getElementById('baseDrop').classList.add('active');
	getInfo(event);
});

const getInfo = function(event){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			var data = JSON.parse(this.responseText);
			console.log(data)
			var first = data['first_name']
			var last = data['last_name']
			var user = data['username']
			var email = data['email']
			document.getElementById('email').setAttribute("value",email);
			document.getElementById('user').setAttribute("value",user);
			document.getElementById('first').setAttribute("value",first);
			document.getElementById('last').setAttribute("value",last);
		}	
	}

	xhttp.open("GET", "/manage", true);
	xhttp.send();
};

//////////////////////////////////////////////////////////////////
//////removes manage box/////////////////////////////////////
////////////////////////////////////////////////////////////

document.getElementById('conClick').addEventListener('click',function(){
	document.getElementById('baseMenu').classList.remove('active');
	document.getElementById('baseDrop').classList.remove('active');

});

///////////////////////////////////////////////////////////////////
////changes the input fields for editing and back to readonly/////
//////////////////////////////////////////////////////////////////

const makeEdit = function(event){
		event.preventDefault();
		// console.log('nope!');
		// document.getElementsByClassName("accInput").removeAttribute("readonly");
		document.getElementById('last').removeAttribute("readonly");
		document.getElementById('email').classList.add("editing");
		document.getElementById('user').removeAttribute("readonly");
		document.getElementById('user').classList.add("editing");
		
		// document.getElementById('pass').removeAttribute("readonly");
		// document.getElementById('pass').classList.add("editing");
		
		document.getElementById('first').removeAttribute("readonly");
		document.getElementById('first').classList.add("editing");
		
		document.getElementById('last').removeAttribute("readonly");
		document.getElementById('last').classList.add("editing");
		
		document.getElementById('edit').setAttribute("value","Update");
		document.getElementById('edit').classList.add("editer");

		document.getElementById('form').setAttribute("action","/account")
			
};

const update= function(){
	// document.getElementById('edit').addEventListener('click',function(){
		document.getElementById('email').setAttribute("readonly","");
		document.getElementById('email').classList.remove("editing");
		
		document.getElementById('user').setAttribute("readonly","");
		document.getElementById('user').classList.remove("editing");
		
		// document.getElementById('pass').setAttribute("readonly","");
		// document.getElementById('pass').classList.remove("editing");
		
		document.getElementById('first').setAttribute("readonly","");
		document.getElementById('first').classList.remove("editing");
		
		document.getElementById('last').setAttribute("readonly","");
		document.getElementById('last').classList.remove("editing");
		
		document.getElementById('edit').setAttribute("value","Edit");
		document.getElementById('edit').classList.remove("editer");

}


document.getElementById('edit').addEventListener('click',function(event){
	// console.log(this.classList)
	if (this.classList=="editer"){
		update();
		// postInfo();
	}
	else{
		makeEdit(event)
	}
});

/////send updated account info to DB through ajax/////////

const postInfo = function(){
	// var first = document.getElementById('first')
	// var last = document.getElementById('last')
	// var user = document.getElementById('user')
	// var email = document.getElementById('email')
	// var jsonObj = "{'first_name':"+first+",'last_name':"+last+",'username':"+user+",'email':"+email+"}"
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readystate == 4 && this.ststus == 200){
			jsonObj = xhttp.responseText;
		}
	};
	xhttp.open("POST","/account", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();


	console.log(first.value);
}

