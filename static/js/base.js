
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
			document.getElementById('first').setAttribute("value"first);
			document.getElementById('last').setAttribute("value",last);
		}	
	}

	xhttp.open("GET", "/manage", true);
	xhttp.send();
};












document.getElementById('conClick').addEventListener('click',function(){
	document.getElementById('baseMenu').classList.remove('active');
	document.getElementById('baseDrop').classList.remove('active');

});

const makeEdit = function(){
	
		// console.log('nope!');
		// document.getElementsByClassName("accInput").removeAttribute("readonly");
		document.getElementById('last'').removeAttribute("readonly");
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


document.getElementById('edit').addEventListener('click',function(){
	console.log(this.classList)
	if (this.classList=="editer"){
		update();
	}
	else{
		makeEdit()
	}
});


document.getElementById('edit')


