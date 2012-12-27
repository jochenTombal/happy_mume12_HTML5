// Arrays to convert storage data to nice html
var conv_mood = ["<font color=\"red\">Horrible</font>",
                 "<font color=\"orange\">Bad</font>",
                 "Average",
                 "<font color=\"darkgreen\">Good</font>",
                 "<font color=\"lightgreen\">Excellent</font>"];
    
var conv_soc_quan = ["<font color=\"red\">None</font>",
                 "<font color=\"orange\">Not much</font>",
                 "Average",
                 "<font color=\"darkgreen\">A little</font>",
                 "<font color=\"lightgreen\">A lot</font>"];
    
var conv_stress = ["<font color=\"lightgreen\">None</font>",
                 "<font color=\"darkgreen\">Not much</font>",
                 "Average",
                 "<font color=\"orange\">A little</font>",
                 "<font color=\"red\">A lot</font>"];

// Find one date in storage and return id where we can find it
function find_wu_data_exact_helper(findwudate){
		
        var nr_of_items_wu_arrays = get_nr_items_wu_arrays();
    
		var wu_time_arr = get_wu_time_arr();

        var wu_time = new Array();
        
        var i;
        for(i=0; i<=nr_of_items_wu_arrays; i++){
            var date_in_storage = new Date(parseInt(wu_time_arr[i]));
            
            // Set hour so dates are exactly the same
            date_in_storage.setHours(0,0,0,0);
			
			var date_in_storage_mill = date_in_storage.getTime();
			var findwudate_mill = findwudate.getTime();
            
            if(date_in_storage_mill == findwudate_mill){
                console.log("Day in storage!");
                return i;
            }
        }
        
        return -1;
    }

// Find start date (equal or higher to findwudate that is provided)
function find_wu_data_start_helper(findwudate){
		
        var nr_of_items_wu_arrays = get_nr_items_wu_arrays();
    
        var wu_time_arr = get_wu_time_arr();
        
        var wu_time = new Array();
        
        var i;
        for(i=0; i<=nr_of_items_wu_arrays; i++){
            
            var date_in_storage = new Date(parseInt(wu_time_arr[i]));
            date_in_storage.setHours(0,0,0,0);
            
            var date_in_storage_mill = date_in_storage.getTime();
			var findwudate_mill = findwudate.getTime();
			
            if(date_in_storage_mill >= findwudate_mill){
                console.log("Start date in storage!");
                return i;
            }
        }   
    return -1;
}

// Find end date for range (which is equal or smaller than the end date provided by the user)
function find_wu_data_end_helper(findwudate){

        var nr_of_items_wu_arrays = get_nr_items_wu_arrays();
    
        var wu_time_arr = get_wu_time_arr();
        
        var wu_time = new Array();
        
        var i;
		
		if(nr_of_items_wu_arrays == 0){
			var date_in_storage = new Date(parseInt(wu_time_arr[0]));
			date_in_storage.setHours(0,0,0,0);
				
				
			var date_in_storage_mill = date_in_storage.getTime();
			var findwudate_mill = findwudate.getTime();
			
			if(date_in_storage_mill <= findwudate_mill){
				return 0;
			} else{
				return -1;
			}
		} else{
			for(i=(nr_of_items_wu_arrays); i>=0; i--){
				
				var date_in_storage = new Date(parseInt(wu_time_arr[i]));
				date_in_storage.setHours(0,0,0,0);
				
				var date_in_storage_mill = date_in_storage.getTime();
				var findwudate_mill = findwudate.getTime();
				
				if(date_in_storage_mill <= findwudate_mill){
					console.log("End date in storage!");
					return i;
				}
			}
		}
        
    return -1;
}

// Get time as string
function get_time_string(st_date){
	
	var sec = st_date.getSeconds();
	var min = st_date.getMinutes();
	var hour = st_date.getHours();
	
	if(sec < 10){
		sec = '0' + sec;
	}
	if(min < 10){
		min = '0' + min;
	}
	if(hour < 10){
		hour = '0' + hour;
	}
	
	var return_time = hour + ":" + min + ":" + sec;
	
	return return_time;
	
}

// Convert booleans into 'yes' or 'no' html
function get_boolean_color_string(boolean_input){
        if(boolean_input == 'true'){
            return '<font color="lightgreen">Yes</font>';
        } else{
			return '<font color="red">No</font>';
        }
}

// Convert boolean into 'yes' or 'no' strings
function get_boolean_string(boolean_input){
        if(boolean_input == 'true'){
            return 'Yes';
        } else{
			return 'No';
        }
}
    
// Functions to get gts and wu data from storage (for one specific index) which is then converted and passed back to caller
function get_gts_data_index(i){    
    var gts_time_arr = get_gts_time_arr();
    var gts_mood_arr = get_gts_mood_arr();
	var gts_soc_qual_arr = get_gts_soc_qual();
	var gts_soc_quan_arr = get_gts_soc_quan();
	var gts_stress_work_arr = get_gts_stress_work_arr();
	var gts_stress_nonwork_arr = get_gts_stress_nonwork_arr();
	var gts_rec_hours_arr = get_gts_rec_hours_arr();
	var gts_rec_enough_arr = get_gts_rec_hours_enough_arr();
	var gts_alcohol_arr = get_gts_alcohol_arr();
	var gts_caffeine_arr = get_gts_caffeine_arr();
	var gts_loc_arr = get_gts_location_arr();

	// Convert millis to date
    var st_date = new Date(parseInt(gts_time_arr[i]));
	
    // Get time as string
    var time = get_time_string(st_date);
	
    // Get date as string with format DD/MM/YYYY	
	var converted_date = st_date.getDate() + "/" + (st_date.getUTCMonth()+1) + "/" + st_date.getUTCFullYear()
        
    var alc = get_boolean_string(gts_alcohol_arr[i]);
    var caf = get_boolean_string(gts_caffeine_arr[i]);
    var enough_rec = get_boolean_color_string(gts_rec_enough_arr[i]);
    
    // Return all data as array
	var ret_arr = [gts_loc_arr[i],converted_date,time,conv_mood[parseInt(gts_mood_arr[i])],conv_mood[parseInt(gts_soc_qual_arr[i])],
					conv_soc_quan[parseInt(gts_soc_quan_arr[i])],conv_stress[parseInt(gts_stress_work_arr[i])],
					conv_stress[parseInt(gts_stress_nonwork_arr[i])],gts_rec_hours_arr[i],enough_rec,
					alc,caf];
		
	return ret_arr;
}

// Get waking up data at certain index
function get_wu_data_index(i){    
    var wu_time_arr = get_wu_time_arr();
	var wu_sleep_qual = get_wu_sleep_qual();
	var wu_mood_arr = get_wu_mood_arr();
	var wu_enough_sleep = get_wu_enough_sleep();
    
    // Convert stored milliseconds to date
    var st_date = new Date(parseInt(wu_time_arr[i]));

    // Get time from date
	var time = get_time_string(st_date);
		
    // Get date as string with format DD/MM/YYYY	
	var converted_date = st_date.getDate() + "/" + (st_date.getUTCMonth()+1) + "/" + st_date.getUTCFullYear();
		
    // Convert boolean to html (with color)
    var enough_sleep = get_boolean_color_string(wu_enough_sleep[i]);
    
    // Return all data as array
	var return_arr = [converted_date,time,conv_mood[parseInt(wu_mood_arr[i])],conv_mood[parseInt(wu_sleep_qual[i])],
					  enough_sleep];
        
    return return_arr;
}