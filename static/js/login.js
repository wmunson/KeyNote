

document.getElementById('signUp').addEventListener("click",
  function(){
    document.getElementById('changer1').classList.remove("active");
    document.getElementById('changer2').className += " active";
     
  }
);

document.getElementById('loginUp').addEventListener("click",
  function(){
    document.getElementById('changer2').classList.remove("active");
    document.getElementById('changer1').className += " active";
     
  }
);
