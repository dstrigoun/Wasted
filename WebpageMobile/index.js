
/** THIS RUNS WHEN THE USERS LOGIN STATE CAHANGES **/

var firebaseRef = firebase.database().ref();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
	//user is signed in
   $("#signOutBtn").text("Welcome " + firebase.auth().currentUser.email + ". Click to logout");

   
  } else {
   
    // No user is signed in.
    $("#signOutBtn").text("Sign in / Sign Up");


	//window.location = 'http://students.bcitdev.com/A00541112/WebpageMobile/index.html'	



  }
});









/**  SUBMITTING AN ITEM INTO THE DATABASE -- On click takes the values of the two input boxes and pushes them into the database    **/


function submitClick() {
	
var itemName = document.getElementById("itemName");
var expiryName = document.getElementById("datepicker");
var firebaseRef = firebase.database().ref();	


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
	var itemText = capitalizeFirstLetter(itemName.value);
	//don't look at the stuff ahead too closely pls
	if(itemName.value == "Wasted" || itemName.value == "wasted") {
		window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		return false;
	}
	
	if(itemName.value == "Baby" || itemName.value == "baby") {
		alert('goo goo ga ga?');
		window.location.href = "http://imgur.com/a/f7YWK";
		return false;
	}
	
	if(itemName.value == "Barrel Roll" || itemName.value == "barrel roll") {
	/*
		document.getElementByTagName("body").style.-moz-animation-name = "roll";
		document.getElementByTagName("body").style.-moz-animation-duration = "4s";
		document.getElementByTagName("body").style.-moz-animation-iteration-count = "1";
		document.getElementByTagName("body").style.-webkit-animation-name = "roll";
		document.getElementByTagName("body").style.-webkit-animation-duration = "4s";
		document.getElementByTagName("body").style.-webkit-animation-iteration-count = "1"; */
		return false;
	}
	
	if(itemName.value == "Alex" || itemName.value == "alex") {
		alert('Please don\'t kill me Alex.');
		window.location.href = "http://imgur.com/a/hy2aT";
		return false;
	}
	
	if(itemName.value == "Misha" || itemName.value == "misha") {
		alert('oh boy, you guys are in for a treat');
		window.location.href = "https://www.youtube.com/watch?v=nZMwKPmsbWE";
		return false;
	}
	
	if(itemName.value == "Dasha" || itemName.value == "dasha") {
		alert('wow what a cool person! So smart and funny and cute!!!!');
		return false;
	}
	
	if(itemName.value == "Simran" || itemName.value == "simran") {
		//something baby related? 
		return false;
	}
	
	if(itemName.value == "Bhagwan" || itemName.value == "bhagwan") {
		//something sleep related??
		return false;
	}
	
	
	var expiryText = expiryName.value;
	var expiryTextAgain = expiryText.substr(6, 9);
	var expiryTextFinal = expiryTextAgain + "/" + expiryText.substr(0, 5);
	
	
	
	
	var author = firebase.auth().currentUser.uid;
	var email = firebase.auth().currentUser.email;
	
	firebaseRef.push({
		'expiry': expiryTextFinal,
		'name': itemText,
		'author': author,
		'email': email
	});
	
	window.location.reload();
}


/**  REMOVING AN ITEM FROM THE DATABSE -- Removes the selected item from the database **/

function removeClick(obj) {
	var id = obj.id;
	//alert(id);
	firebaseRef.child(id).remove();
	window.location.reload();
}


/** LOADING THE TABLE OF ITEMS FROM DATABASE BY USER -- pulls user specific values from the database and then populates the table **/

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

	today = yyyy + '/' + mm + '/' + dd;
	todayAgain = yyyy + '/' + mm + '/' + ddd;
	todayAgainAgain = yyyy + '/' + mm + '/' + dddd;
	
	var daysLeft;
	var monthsLeft = expiry.substring(5,7);
	var yearsLeft = expiry.substring(0, 4);
	var moreYears = yearsLeft - yyyy;
	
	
	
	if(yearsLeft > yyyy && monthsLeft >= mm){
		
		daysLeft = "~year";
		
	} else if(yearsLeft > yyyy ) {
		
		daysLeft = "~" + (monthsLeft - mm + 12) + " months";
		
	} else {
		
		daysLeft = expiry.substring(8, 10) - dd;
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
	
	/** start of datables**/
	$(document).ready(function() {
    var table = $('#fridge').DataTable();
	
	
	//var classHighlight = 'highlight'; 

	//.click() will return the result of $('.thumbnail')
	//I save it for future reference so I don't have to query the DOM again
	
	
	/*
	var $fridge = $('tr').click(function(e) {
		e.preventDefault();
		//run removeClass on every element
		//if the elements are not static, you might want to rerun $('.thumbnail')
		//instead of the saved $thumbs
		//$fridge.removeClass(classHighlight);
		//add the class to the currently clicked element (this)
		
		if (!$(this).hasClass('highlight')) {
			//alert('this is NOT highlighted');
			$(this).addClass('highlight');
		}  
		
	});
	
	*/
    
	} );
	/** end of datables **/
	
	
  }); 

}


/** click functionality **/
	
$(document).ready(function() {
    $('#fridge tbody').on('click', 'tr', function() {
		if($(this).hasClass('highlight')) {
			$(this).removeClass('highlight');
		} else {
			$(this).addClass('highlight');
		} 
    });
});
	



	


/* LOGOUT PROCESS -- Signs out the current user */

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



