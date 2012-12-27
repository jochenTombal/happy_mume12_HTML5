// Getters, setters en delete functions for all arrays stored in localstorage

function get_nr_items_wu_arrays(){
    try{
        var nr_items_wu = parseInt(localStorage.getItem("nr_of_items_wu_arrays"));
        return nr_items_wu;
    } catch(e){
        console.log("No nr_of_items_wu_arrays in storage");
        return null;
    }
}

// Get ranges from localstorage
function get_start_range(){
    try{
        return parseInt(localStorage.getItem("start_range"));
    } catch(e){
        console.log("No startrange in storage");
        return -1;
    }
}
    
function get_end_range(){
    try{
        return parseInt(localStorage.getItem("end_range"));
    } catch(e){
        console.log("No endrange in storage");
        return -1;
    }
}

function get_wu_time_arr(){
    try{
        var wu_time_arr = localStorage.getItem("wu_time_arr").split(";");
        return wu_time_arr;
    } catch(e){
		console.log("No data in wu time array");
        alert('No data available!');
		return -1;
	}
}

function get_gts_time_arr(){
     try{
        var gts_time_arr = localStorage.getItem("gts_time_arr").split(";");
        return gts_time_arr;
    } catch(e){
		console.log("No data in gts time array");
        alert('No data available!');
		return -1;
	}
}

function get_wu_mood_arr(){
    try{
        var wu_mood_arr = localStorage.getItem("wu_mood_arr").split(";");
        return wu_mood_arr;
    } catch(e){
		console.log("No data in wu mood array");
        alert('No data available!');
		return -1;
	}
}

function get_gts_mood_arr(){
    try{
        var gts_mood_array = localStorage.getItem("gts_mood_arr").split(";");
        return gts_mood_array;
    } catch(e){
		console.log("No data in gts mood array");
        alert('No data available!');
		return -1;
	}
}

function get_gts_rec_hours_arr(){
    try{
        var gts_rec_hours_arr = localStorage.getItem("gts_rec_hours_arr").split(";");
        return gts_rec_hours_arr;
    } catch(e){
        console.log('no data');
        return -1;
    }
}

function get_gts_rec_hours_enough_arr(){
    try{
        var gts_rec_enough = localStorage.getItem("gts_rec_enough_arr").split(";");
        return gts_rec_enough;
    } catch(e){
        console.log('no data');
        return -1;
    }
}


function get_gts_stress_work_arr(){
    try{
        var work_stress = localStorage.getItem("gts_stress_work_arr").split(";");
        return work_stress;
    } catch(e){
        console.log('no data');
        return -1;
    }
}

function get_gts_stress_nonwork_arr(){
    try{
        var nonwork_stress = localStorage.getItem("gts_stress_nonwork_arr").split(";");
        return nonwork_stress;
    } catch(e){
        console.log('no data');
        return -1;
    }
}

function get_gts_soc_quan(){
    try{
        var socquan = localStorage.getItem("gts_soc_quan_arr").split(";");
        return socquan;
    } catch(e){
        console.log('no data');
        return -1;
    }
}

function get_gts_soc_qual(){
    try{
        var socqual = localStorage.getItem("gts_soc_qual_arr").split(";");
        return socqual;
    } catch(e){
        console.log('no data');
        return -1;
    }
}

function get_location_arr(){
    try{
        var loc_array_gts = localStorage.getItem("location_arr").split(";");
        return loc_array_gts;
    } catch(e){
        console.log('No data locations');
        return -1;
    }    
}

function store_location_arr(loc_array){
    try{
        localStorage.setItem("location_arr", loc_array.join(";"));
    } catch(e){
        alert("Can't store location!");
    }
}

function remove_location_arr(){
    localStorage.removeItem("location_arr");
}

function get_gts_location_arr(){
    try{
        var gts_loc_arr = localStorage.getItem("gts_loc_arr").split(";");
        return gts_loc_arr;
    } catch(e){
        console.log('No data locations');
        return 'NA';
    }
}

function get_wu_sleep_qual(){
    try{
        var wu_sleep_qual = localStorage.getItem("wu_sleep_qual").split(";");
        return wu_sleep_qual;
    } catch(e){
        console.log('No data');
        return -1;
    }
}

function get_wu_enough_sleep(){
    try{
        var wu_enough_sleep = localStorage.getItem("wu_enough_sleep").split(";");
        return wu_enough_sleep;
    } catch(e){
        console.log('No data');
        return -1;
    }
}

function get_socmedia_checkbox(){
    try{
        var socmedia_checkbox = localStorage.getItem("show_socmedia_wu_gts");
        return socmedia_checkbox;
    } catch(e){
        console.log('No value for checkbox saved');
        return -1;
    }
}

function store_socmedia_checkbox(show_socmedia_wu_gts){
    try{
        localStorage.setItem("show_socmedia_wu_gts",show_socmedia_wu_gts);
    } catch(e){
        alert("Can't store checkbox value!");
    }
}

function get_gts_alcohol_arr(){
    try{
        var gts_alcohol_arr = localStorage.getItem("gts_alcohol_arr").split(";");
        return gts_alcohol_arr;
    } catch(e){
        console.log("No alc data");
        return -1;
    }
}

function get_gts_caffeine_arr(){
    try{
        var gts_caffeine_arr = localStorage.getItem("gts_caffeine_arr").split(";");
        return gts_caffeine_arr;
    } catch(e){
        console.log("No caf data");
        return -1;
    }
}


// Store interval start and end
function set_interval_range(start_range,end_range){
	localStorage.setItem("start_range",start_range);
	localStorage.setItem("end_range",end_range);
}

// Helper arrays (for creating sentences)
var mood_and_socqual = ["horrible",
                        "bad",
                        "average",
                        "good",
                        "excellent"];
    
var stress = ["none",
              "not much",
              "average",
              "a little",
              "a lot"];
	
var soc_quan = ["no",
                "not much",
                "average",
                "a little",
                "a lot of"];

// Store data going to sleep and waking up
// Function to save all data for the gts screen
	$.fn.gts_savedata = function(){

		console.log("Going to sleep at " + $('#select-location').attr('value'));
		
		// Keep an integer telling us how many values are stored in one array
		var nr_of_items_gts_arrays = localStorage.getItem("nr_of_items_gts_arrays");
		
		/*
		 * 1: If this is the first time, create new arrays
		 * 2: If this is not the first time, get the strings stored (represent arrays) and split them again to form arrays
		*/ 
		if(nr_of_items_gts_arrays){
			console.log("nr of rows: " + nr_of_items_gts_arrays);
			nr_of_items_gts_arrays++;
			console.log("new nr of rows: " + nr_of_items_gts_arrays);
			
			var gts_time_arr = localStorage.getItem("gts_time_arr").split(";"); // Split the string to get an array
			//console.log("typeof gts_time_arr: " + typeof(gts_time_arr));
			
			var gts_mood_arr = localStorage.getItem("gts_mood_arr").split(";");
			var gts_soc_qual_arr = localStorage.getItem("gts_soc_qual_arr").split(";");
			var gts_soc_quan_arr = localStorage.getItem("gts_soc_quan_arr").split(";");
			var gts_stress_work_arr = localStorage.getItem("gts_stress_work_arr").split(";");
			var gts_stress_nonwork_arr = localStorage.getItem("gts_stress_nonwork_arr").split(";");
			var gts_rec_hours_arr = localStorage.getItem("gts_rec_hours_arr").split(";");
			var gts_rec_enough_arr = localStorage.getItem("gts_rec_enough_arr").split(";");
			var gts_alcohol_arr = localStorage.getItem("gts_alcohol_arr").split(";");
			var gts_caffeine_arr = localStorage.getItem("gts_caffeine_arr").split(";");
			var gts_loc_arr = localStorage.getItem("gts_loc_arr").split(";");
		} else{
			nr_of_items_gts_arrays = 0;
			//console.log("length null");
	
			var gts_time_arr = new Array();
			//console.log("typeof gts_time_arr: " + typeof(gts_time_arr));
			
			var gts_mood_arr = new Array();
			var gts_soc_qual_arr = new Array();
			var gts_soc_quan_arr = new Array();
			var gts_stress_work_arr = new Array();
			var gts_stress_nonwork_arr = new Array();
			var gts_rec_hours_arr = new Array();
			var gts_rec_enough_arr = new Array();
			var gts_alcohol_arr = new Array();
			var gts_caffeine_arr = new Array();
			var gts_loc_arr = new Array();
		}
		
		// Time
			// Get item value and push onto correct array
		var my_date = new Date();
		var my_time_mill = my_date.getTime(); // Time in milliseconds since January 1, 1970
		gts_time_arr.push(my_time_mill); // Push value onto array (seen as a stack)
		
		// Emotional parameters
			// Get item value and push onto correct array
		var mood = $('input[name=radio-choice-1]:checked','#gts_mood_radio_buttons').val();//    $('input[name=radioName]:checked', '#myForm').val()
		gts_mood_arr.push(mood);
			
		var socqual = $('input[name=radio-choice-2]:checked','#gts_soc_qual_radio_buttons').val();
		gts_soc_qual_arr.push(socqual);
			
		var socquan = $('input[name=radio-choice-3]:checked','#gts_soc_quan_radio_buttons').val();
		gts_soc_quan_arr.push(socquan);
			
		var gts_stress_work = $('input[name=radio-choice-4]:checked','#gts_stress_work_radio_buttons').val();
		gts_stress_work_arr.push(gts_stress_work);
			
		var gts_stress_nonwork = $('input[name=radio-choice-5]:checked','#gts_stress_nonwork_radio_buttons').val();
		gts_stress_nonwork_arr.push(gts_stress_nonwork);
		
		var rec_hours = $('#recreational_hours').val();
		gts_rec_hours_arr.push(rec_hours);
		
		var rec_enough_string;
		var rec_enough = $('#gts_enough_rec').is(':checked');
		if(rec_enough){
			rec_enough_string = ", which was enough.";
		} else{
			rec_enough_string = ", which was not enough.";
		}
		
		var yes_no;
		if(rec_enough){
			yes_no = 'Yes';
		} else{
			yes_no = 'No';
		}
		
		gts_rec_enough_arr.push(rec_enough);
		
		var alcohol = $('#gts_alcohol').is(':checked');
		gts_alcohol_arr.push(alcohol);
		
		var caffeine = $('#gts_caffeine').is(':checked');
		gts_caffeine_arr.push(caffeine);
		
		var loc_gts = $('#select-location').attr('value');
		gts_loc_arr.push(loc_gts);
		
		// Create tweetmsg and store it
		var gts_tweet_msg = "Location:" + loc_gts + ",Mood:" + mood_and_socqual[parseInt(mood)] + "," +
							"Social quantity:" + soc_quan[parseInt(socquan)] + ",Social quality:" +
							mood_and_socqual[parseInt(socqual)] + "," + "Stress work:" + stress[parseInt(gts_stress_work)] +
							",Stress non-work:" + stress[parseInt(gts_stress_nonwork)] + "," +
							"Recreational time:" + rec_hours + " h,Enough?:" + yes_no;
		
		// Already fill it in
		$('#twttr_txtarea').val(gts_tweet_msg);
		
		// Create facebookmsg and put it in the txtarea (this txtarea is known because the html is already loaded)
		var gts_facebook_msg = "I'm going to bed at " + loc_gts + ". My mood is " + mood_and_socqual[parseInt(mood)] + "." +
							" I had " + soc_quan[parseInt(socquan)] + " social interaction and the quality was " +
							mood_and_socqual[parseInt(socqual)] + "." + " I had " + stress[parseInt(gts_stress_work)] +
							" work related stress and " + stress[parseInt(gts_stress_nonwork)] + " non-work related stress." +
							"Today, I had " + rec_hours + " hour(s) of recreational time" + rec_enough_string;
							
		$('#fb_txtarea').val(gts_facebook_msg);

		// Save arrays
		try{
            localStorage.setItem("wu_gts_tweet_msg",gts_tweet_msg);
            localStorage.setItem("wu_gts_fb_msg",gts_facebook_msg);
            
			localStorage.setItem("gts_time_arr", gts_time_arr.join(";")); // Join the array to form a string which is stored
			localStorage.setItem("gts_mood_arr", gts_mood_arr.join(";"));
			localStorage.setItem("gts_soc_qual_arr", gts_soc_qual_arr.join(";"));
			localStorage.setItem("gts_soc_quan_arr", gts_soc_quan_arr.join(";"));
			localStorage.setItem("gts_stress_work_arr", gts_stress_work_arr.join(";"));
			localStorage.setItem("gts_stress_nonwork_arr", gts_stress_nonwork_arr.join(";"));
			localStorage.setItem("gts_rec_hours_arr", gts_rec_hours_arr.join(";"));
			localStorage.setItem("gts_rec_enough_arr", gts_rec_enough_arr.join(";"));
			localStorage.setItem("gts_alcohol_arr", gts_alcohol_arr.join(";"));
			localStorage.setItem("gts_caffeine_arr", gts_caffeine_arr.join(";"));
			localStorage.setItem("gts_loc_arr", gts_loc_arr.join(";"));
			
			localStorage.setItem("nr_of_items_gts_arrays",nr_of_items_gts_arrays);
		} catch(e){
			alert('Quota probably exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
		}
	}
    
    // Save data for waking up screen (same flow as previous function for gts)
    $.fn.wu_savedata = function(){
		var nr_of_items_wu_arrays = localStorage.getItem("nr_of_items_wu_arrays");
		
		if(nr_of_items_wu_arrays){
			nr_of_items_wu_arrays++;
			console.log("new nr of rows gts: " + nr_of_items_wu_arrays);
			
			var wu_time_arr = localStorage.getItem("wu_time_arr").split(";");
			var wu_sleep_qual = localStorage.getItem("wu_sleep_qual").split(";");
			var wu_mood_arr = localStorage.getItem("wu_mood_arr").split(";");
			var wu_enough_sleep = localStorage.getItem("wu_enough_sleep").split(";");
			
		} else{
			nr_of_items_wu_arrays = 0;
			console.log("length wu 0");
			
			var wu_time_arr = new Array();
			var wu_sleep_qual = new Array;
			var wu_mood_arr = new Array();
			var wu_enough_sleep = new Array();
		}
		
		// Time
		var my_date = new Date();
		var my_time_mill = my_date.getTime();
		wu_time_arr.push(my_time_mill);
		
		// Emotional parameters
		//var sleep_qual = $('#wu_sleep_qual').val();
		var sleep_qual = $('#wu_sleep_qual option:selected').val(); 
		wu_sleep_qual.push(sleep_qual);
		
		//var wu_mood = $('#wu_mood').val();
		var wu_mood = $('#wu_mood option:selected').val(); 
		wu_mood_arr.push(wu_mood);
		
		var enough_sleep_string;
		
		var enough_sleep = $('#enough_sleep').is(':checked');
		if(enough_sleep){
			enough_sleep_string = "I slept long enough.";
		} else{
			enough_sleep_string = "I did not sleep long enough.";
		}
		wu_enough_sleep.push(enough_sleep);
		
		// Create tweetmsg and store it
		var wu_tweet_msg = "I just got out of bed. Quality of sleep was " +  mood_and_socqual[parseInt(sleep_qual)] + ". My mood is " + mood_and_socqual[parseInt(wu_mood)] + ". " +
								enough_sleep_string;
		// Already fill it in
		$('#twttr_txtarea').val(wu_tweet_msg);
		
		// Create facebookmsg and store it
		var wu_facebook_msg = "I just got out of bed. Quality of sleep was " +  mood_and_socqual[parseInt(sleep_qual)] + ". My mood is " + mood_and_socqual[parseInt(wu_mood)] + ". " +
								enough_sleep_string;					
		$('#fb_txtarea').val(wu_facebook_msg);
		
		
		// Save arrays
		try{
            localStorage.setItem("wu_gts_tweet_msg",wu_tweet_msg);
            localStorage.setItem("wu_gts_fb_msg",wu_facebook_msg);
            
			localStorage.setItem("wu_time_arr", wu_time_arr.join(";"));
			localStorage.setItem("wu_sleep_qual", wu_sleep_qual.join(";"));
			localStorage.setItem("wu_mood_arr", wu_mood_arr.join(";"));
			localStorage.setItem("wu_enough_sleep", wu_enough_sleep.join(";"));
			
			localStorage.setItem("nr_of_items_wu_arrays",nr_of_items_wu_arrays);
		} catch(e){
			alert('Quota probably exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
		}
	}