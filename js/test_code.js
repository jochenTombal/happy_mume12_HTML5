$('#testpage').live('pageinit', function() {
    $('#load_testdata').click(function(){
        remove_all_data();
        load_test_data();
        
        alert('Test data loaded!');
    });
    
});

function remove_all_data(){
    localStorage.removeItem("userSleeping");
    
    // addlocation page
    localStorage.removeItem("location_arr");
    
    // gts page
    localStorage.removeItem("gts_time_arr");
	localStorage.removeItem("gts_mood_arr");
	localStorage.removeItem("gts_soc_qual_arr");
	localStorage.removeItem("gts_soc_quan_arr");
	localStorage.removeItem("gts_stress_work_arr");
	localStorage.removeItem("gts_stress_nonwork_arr");
	localStorage.removeItem("gts_rec_hours_arr");
	localStorage.removeItem("gts_rec_enough_arr");
	localStorage.removeItem("gts_alcohol_arr");
	localStorage.removeItem("gts_caffeine_arr");
	localStorage.removeItem("gts_loc_arr");
	    
	localStorage.removeItem("nr_of_items_gts_arrays");

    // wu page
	localStorage.removeItem("wu_time_arr");
	localStorage.removeItem("wu_sleep_qual");
	localStorage.removeItem("wu_mood_arr");
	localStorage.removeItem("wu_enough_sleep");
	    
	localStorage.removeItem("nr_of_items_wu_arrays");
}

function load_test_data(){
    
    // Start gts time
    var gts_time = 1325372400000 + 81000000;
    var wu_time;
    
    // Random int between 0 and 4 (both included)
    var random = Math.floor(Math.random() * 5);
    
    var nr_of_items_gts_arrays = -1;
    var nr_of_items_wu_arrays = -1;
    
    // gts arrays
    var gts_time_arr = new Array();
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
    
    // locationpage arrays
    var loc_array = ['Kot','Home','Girlfriend'];
    
    // wu arrays
    var wu_time_arr = new Array();
    var wu_sleep_qual = new Array();
    var wu_mood_arr = new Array();
    var wu_enough_sleep = new Array();
    
    
    var i;
    
    for(i=0;i<=365;i++){
        // gts
        gts_time_arr.push(gts_time + (i * 86400000));
        
        gts_mood_arr.push(Math.floor(Math.random() * 5));
        
        gts_soc_qual_arr.push(Math.floor(Math.random() * 5));
        gts_soc_quan_arr.push(Math.floor(Math.random() * 5));
        
        gts_stress_work_arr.push(Math.floor(Math.random() * 5));
        gts_stress_nonwork_arr.push(Math.floor(Math.random() * 5));
        
        gts_rec_hours_arr.push(Math.floor(Math.random() * 20));
        
        if(Math.floor(Math.random() * 2) == 1){
            gts_rec_enough_arr.push(true);
        } else{
            gts_rec_enough_arr.push(false);
        }
        
        if(Math.floor(Math.random() * 2) == 1){
            gts_alcohol_arr.push(true);
        } else{
            gts_alcohol_arr.push(false);
        }
        
        if(Math.floor(Math.random() * 2) == 1){
            gts_caffeine_arr.push(true);
        } else{
            gts_caffeine_arr.push(false);
        }
        
        gts_loc_arr.push(loc_array[Math.floor(Math.random() * 3)]);
        
        nr_of_items_gts_arrays++;
        
        // wu
        wu_time_arr.push(gts_time + (i * 86400000) + 32400000);
        
        wu_sleep_qual.push(Math.floor(Math.random() * 5));
        
        wu_mood_arr.push(Math.floor(Math.random() * 5));
        
        if(Math.floor(Math.random() * 2) == 1){
            wu_enough_sleep.push(true);
        } else{
            wu_enough_sleep.push(false);
        }
        
        nr_of_items_wu_arrays++;
    }
    
    
    // Save gts
    try{
        localStorage.setItem("userSleeping", 0);
        
        localStorage.setItem("wu_gts_fb_msg",'teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');
        localStorage.setItem("wu_gts_tweet_msg",'another TESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
        
        // locationspage 
        localStorage.setItem("location_arr", loc_array.join(";"));
        
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
    
    // Save wu
    try{
	    localStorage.setItem("wu_time_arr", wu_time_arr.join(";"));
	    localStorage.setItem("wu_sleep_qual", wu_sleep_qual.join(";"));
	    localStorage.setItem("wu_mood_arr", wu_mood_arr.join(";"));
	    localStorage.setItem("wu_enough_sleep", wu_enough_sleep.join(";"));
	    
	    localStorage.setItem("nr_of_items_wu_arrays",nr_of_items_wu_arrays);
	} catch(e){
				alert('Quota probably exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
    }
}