// Label to show if user is awake or sleeping at the top of the startpage
var asleep = "<strong>User sleeping!</strong>";
var awake = "<strong>User awake!</strong>";

function background_sleeping(){
	$('#index').css('background-image', "url('img/night.jpg')");
	$('#index').css('background-repeat','repeat-y');
	$('#index').css('background-position','center center');
	$('#index').css('background-attachment','scroll');
	$('#index').css('background-size','100% 100%'); 
}
	
function background_awake(){
	$('#index').css('background-image', "url('img/sunrise.jpg')");
	$('#index').css('background-repeat','repeat-y');
	$('#index').css('background-position','center center');
	$('#index').css('background-attachment','scroll');
	$('#index').css('background-size','100% 100%'); 
}

// Change page to get the results
function change_to_results(){
	$.mobile.changePage('#gettheresults');
}

// Change page to going to sleep
function change_to_gts(){
	var userSleep = isUserSleeping();
			
	// Check if user was already sleeping (user shouldn't be here!)
	if(userSleep == 1){
		alert("You are already sleeping!");
		
	} else{            
		$.mobile.changePage('#goingtosleep');
	}
}

// Change page to waking up
function change_to_wu(){
	var userSleep = isUserSleeping();
        
	if(userSleep == 0 || userSleep == null){
		alert("You are already awake!");
		
	} else{           
		$.mobile.changePage('#wakingup');
	}
}

// Check if user is sleeping by getting the userSleeping-boolean from localstorage
function isUserSleeping(){
    if (typeof(localStorage) == 'undefined') {
        alert('HTML5 localstorage not supported');
        return null;
    } else{
        var userSleeping = localStorage.getItem("userSleeping");
        console.log("isUserSleeping called: " + userSleeping);
        return userSleeping;
    }
}
    
// Store boolean (key = userSleeping, value = true)
function setUserSleeping(){
    console.log("setUserSleeping called");
    if (typeof(localStorage) == 'undefined') {
        alert('HTML5 localstorage not supported');
    } else {
        try{
            localStorage.setItem("userSleeping", 1);
        } catch(e){
			alert('Quota probably exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
        }
    }
}
    
// Store boolean (key = userSleeping, value = false) 
function setUserAwake(){
    console.log("setUserAwake called");
    if (typeof(localStorage) == 'undefined') {
        alert('HTML5 localstorage not supported');
    } else {
        try{
			localStorage.setItem("userSleeping", 0);
        } catch(e){
			alert('Quota probably exceeded!');
        }
    }
}

// STARTPAGE
$('#index').live('pageinit', function() {
	
	// Initialize start and end range (used at search page)
	localStorage.setItem("start_range",0);
	localStorage.setItem("end_range",0);
	
    // Check at load if user is sleeping and set correct label and background at startpage
    var loadCheckSleep = isUserSleeping();
	
    if(loadCheckSleep == 1){
        $('#homescreen_status').html(asleep);
		background_sleeping();
    } else{            
        $('#homescreen_status').html(awake);
		background_awake();
    }
});

// GOING TO SLEEP SCREEN
$('#goingtosleep').live('pageinit', function() {
    $('#goingtosleep_btn_goodnight').click(function(){

        var userSleep = isUserSleeping();
	
		// Input field recreational hours should be checked
		var rec_hours = $('#recreational_hours').val();
		var isnum = $.isNumeric(rec_hours);
			
		// Check if user was already sleeping (user shouldn't be here!)	
		if(userSleep == 1){
			alert("You are already sleeping! Please use the back button.");
				return false;
		} else if(!isnum || (rec_hours > 24)){
			alert("Recreational hours not correct!");
				return false;
		} else{
			// Set user is sleeping
            setUserSleeping();
	    
	    // Change status on homescreen
	    $('#homescreen_status').html(asleep);
		background_sleeping();
	    
        // Save data   
	    $.fn.gts_savedata();
		
		// Check if we should redirect to social media or to homescreen
		var show_socmedia_wu_gts = get_socmedia_checkbox();
		
		console.log("show soc media:" + show_socmedia_wu_gts);
		if(show_socmedia_wu_gts == 1){
			$.mobile.changePage('#facebook');
		} else{
			$.mobile.changePage('#index');
		}
            return true;
		}
    });
});
	
// WAKING UP SCREEN
$('#wakingup').live('pageinit', function() {
    $('#wakingup_btn_goodmorning').click(function(){        
        var userSleep = isUserSleeping();
        
        if(userSleep == 0 || userSleep == null){
            alert("You are already awake! Please use the back button.");
            return false;
        } else{
            // Set user is awake
            setUserAwake();
	    
			// Change status on homescreen
			$('#homescreen_status').html(awake);
			background_awake();
			
			// Save data
			$.fn.wu_savedata();
			
			// Check if we should redirect to social media or to homescreen
			var show_socmedia_wu_gts = get_socmedia_checkbox();
			
			console.log("show soc media:" + show_socmedia_wu_gts);
			if(show_socmedia_wu_gts == 1){
				$.mobile.changePage('#facebook');
			} else{
				$.mobile.changePage('#index');
			}
            return true;
        }
    });
});