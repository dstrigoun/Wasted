/** THIS RUNS WHEN THE USERS LOGIN STATE CAHANGES **/

var firebaseRef = firebase.database().ref();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
	
   $("#signOutBtn").text("Welcome " + firebase.auth().currentUser.email + ". Click to logout");
  
	

  } else {
   

    // No user is signed in.
    $("#signOutBtn").text("Sign in / Sign Up");
	$("#signOutBtn").click(
  function(){

	window.location = 'http://students.bcitdev.com/A00541112/WebpageMobile/index.html'

	
  }
);


  }
});


/** SORTING BY EXPIRY **/

function expiryOrganized() {

		document.getElementById("table_body").innerHTML = "";
	firebaseRef.orderByChild("expiry").on("child_added", snap => {
	var name = snap.child("name").val();
	var expiry = snap.child("expiry").val();
	var id = snap.key;
	var childAuthor = snap.child("author").val();
	var thisAuthor = firebase.auth().currentUser.uid;

	
	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 2;
	var dddd = today.getDate() + 1;

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	today = mm + '/' + dd + '/' + yyyy;
	todayAgain = mm + '/' + ddd + '/' + yyyy;
	todayAgainAgain = mm + '/' + dddd + '/' + yyyy;
	
	var daysLeft = expiry.substring(3,5) - dd;
	
	if (daysLeft < 0) {
		daysLeft = 0;
	}
	
	if (expiry.substring(0,2) > mm) {
		daysLeft = expiry.substring(0,2) - mm + ' months';
	}
	
	if (expiry.substring(6,10) > yyyy) {
		daysLeft = expiry.substring(6,10) - yyyy + ' years';
	}
	
	
	if (childAuthor == thisAuthor) {
	
		if ( expiry <= today && expiry.substring(6,10) <= yyyy) {
	
	
	var html = '<tr style="background-color: red;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
	
		} else if ( expiry == todayAgain || expiry == todayAgainAgain) {
		
	
	var html = '<tr style ="background-color: yellow;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	
	$(html).appendTo('#table_body');
		
		
		}else {
			
	var html = '<tr id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
			
		}
    }

	
  });
 
}



/** SORTING BY ALPHABET **/


function alphabetOrganized() {


		document.getElementById("table_body").innerHTML = "";
	firebaseRef.orderByChild("name").on("child_added", snap => {var name = snap.child("name").val();
	var expiry = snap.child("expiry").val();
	var id = snap.key;
	var childAuthor = snap.child("author").val();
	var thisAuthor = firebase.auth().currentUser.uid;

	
	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 2;
	var dddd = today.getDate() + 1;

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	today = mm + '/' + dd + '/' + yyyy;
	todayAgain = mm + '/' + ddd + '/' + yyyy;
	todayAgainAgain = mm + '/' + dddd + '/' + yyyy;
	
	var daysLeft = expiry.substring(3,5) - dd;
	
	if (daysLeft < 0) {
		daysLeft = 0;
	}
	
	if (expiry.substring(0,2) > mm) {
		daysLeft = expiry.substring(0,2) - mm + ' months';
	}
	
	if (expiry.substring(6,10) > yyyy) {
		daysLeft = expiry.substring(6,10) - yyyy + ' years';
	}
	
	
	if (childAuthor == thisAuthor) {
	
		if ( expiry <= today && expiry.substring(6,10) <= yyyy) {
	
	
	var html = '<tr style="background-color: red;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
	
		} else if ( expiry == todayAgain || expiry == todayAgainAgain) {
		
	
	var html = '<tr style ="background-color: yellow;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	
	$(html).appendTo('#table_body');
		
		
		}else {
			
	var html = '<tr id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
			
		}
    }

	
  });
}


/**  SUBMITTING AN ITEM INTO THE DATABASE     **/





function submitClick() {
	
var itemName = document.getElementById("itemName");
var expiryName = document.getElementById("datepicker");
var firebaseRef = firebase.database().ref();	


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

	
	var itemText = capitalizeFirstLetter(itemName.value);
	var expiryText = expiryName.value;
	
	var author = firebase.auth().currentUser.uid;
	var email = firebase.auth().currentUser.email;
	

	
	
	firebaseRef.push({
		'expiry': expiryText,
		'name': itemText,
		'author': author,
		'email': email
	});
	
	window.location.reload();
}


/**  REMOVING AN ITEM FROM THE DATABSE  **/

function removeClick(obj) {
	var id = obj.id;
	//alert(id);
	firebaseRef.child(id).remove();
	window.location.reload();
}


/** LOADING THE TABLE OF ITEMS FROM DATABASE BY USER **/


var z = 1;
if (z == 1) {
firebaseRef.orderByChild("expiry").on("child_added", snap => {
	var name = snap.child("name").val();
	var expiry = snap.child("expiry").val();
	var id = snap.key;
	var childAuthor = snap.child("author").val();
	var thisAuthor = firebase.auth().currentUser.uid;

	
	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 2;
	var dddd = today.getDate() + 1;

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	today = mm + '/' + dd + '/' + yyyy;
	todayAgain = mm + '/' + ddd + '/' + yyyy;
	todayAgainAgain = mm + '/' + dddd + '/' + yyyy;
	
	var daysLeft = expiry.substring(3,5) - dd;
	
	if (daysLeft < 0) {
		daysLeft = 0;
	}
	
	if (expiry.substring(0,2) > mm) {
		daysLeft = expiry.substring(0,2) - mm + ' months';
	}
	
	if (expiry.substring(6,10) > yyyy) {
		daysLeft = expiry.substring(6,10) - yyyy + ' years';
	}
	
	
	if (childAuthor == thisAuthor) {
	
		if ( expiry <= today && expiry.substring(6,10) <= yyyy) {
	
	
	var html = '<tr style="background-color: red;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
	
		} else if ( expiry == todayAgain || expiry == todayAgainAgain) {
		
	
	var html = '<tr style ="background-color: yellow;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	
	$(html).appendTo('#table_body');
		
		
		}else {
			
	var html = '<tr id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
			
		}
    }

	
  });
  

}



/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    
	
	firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

	window.location.reload();
	
  }
);