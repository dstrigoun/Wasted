firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

   
	
	window.location = 'http://students.bcitdev.com/A00989687/WASTED2/Webpage4/links.html'


  } else {

    

    // No user is signed in.
    


  }
});


/*SignIn Process */

$("#loginBtn").click(

function(){
	
	var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
        $("#signInError").show().text(errorMessage);

  
  
  // ...
});
if(user){
		  window.location = 'http://students.bcitdev.com/A00969281/Webpage4_mobile/index.html'
	  }
	}
);



/*Signup Process */

$("#signUpBtn").click(

function(){
	
	var email = $("#signUpEmail").val();
    var password = $("#signUpPassword").val();

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
        $("#signUpError").show().text(errorMessage);

  
  
  // ...
});
if(user){
		  window.location = 'http://students.bcitdev.com/A00969281/Webpage4_mobile/index.html'
	  }
	}
);

