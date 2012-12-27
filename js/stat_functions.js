// Convert time in millis to string
function convert_time(time_mill){
    var secs = Math.round(((time_mill % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
	var mins = Math.round((time_mill % (1000 * 60 * 60)) / (1000 * 60));
	var hours = Math.round(time_mill / (1000 * 60 * 60));
    
    if(secs < 10){
        secs = '0' + secs;
    }
    if(mins < 10){
        mins = '0' + mins;
    }
    if(hours < 10){
        hours = '0' + hours;
    }
    
    return (hours + ':' + mins + ':' + secs);
}

// Set interval text at averages page
function set_interval_string(startdate,enddate){
    var conv_startdate = new Date(parseInt(startdate));
    var conv_enddate = new Date(parseInt(enddate));
		
    var range_string = conv_startdate.getDate() + "/" + (conv_startdate.getUTCMonth()+1) + "/" + conv_startdate.getUTCFullYear() + ' - '
                        + conv_enddate.getDate() + "/" + (conv_enddate.getUTCMonth()+1) + "/" + conv_enddate.getUTCFullYear();
        
        
    $('#range_text').text(range_string);
}

// Calculate average time slept over interval
function average_time_slept(start,end){
        
    var gts_time_arr = get_gts_time_arr();
    if(gts_time_arr == -1){return 'NA';}
    
    var wu_time_arr = get_wu_time_arr();
    if(wu_time_arr == -1){return 'NA';}
    
    set_interval_string(wu_time_arr[start],wu_time_arr[end]);
    
    var total_time = 0;
    var i;
    for(i=start; i<=end; i++){
        total_time += (parseInt(wu_time_arr[i]) - parseInt(gts_time_arr[i]));
    }
    
    var difference = parseInt(end) - parseInt(start) + 1;
    
    var average_time;
    
    if(difference == 0){
        average_time = total_time;
    } else{
        average_time = total_time/difference;
    }
    
    return convert_time(average_time);
}

function average_time_recreational(start,end){
        
    var gts_rec_hours_arr = get_gts_rec_hours_arr();
    if(gts_rec_hours_arr == -1){return 'NA';}
    
    var total_time = 0;
    var i;
    for(i=start; i<=end; i++){
        total_time += parseFloat(gts_rec_hours_arr[i]);
    }
    
    var difference = parseInt(end) - parseInt(start) + 1;
    
    var average_time = 0;
    
    if(difference == 0){
        average_time = total_time;
    } else{
        average_time = total_time/difference;
    }
    
    return average_time.toFixed(2); // Two decimals
}

function average_work_stress(start,end){
    var work_stress = get_gts_stress_work_arr();
    if(work_stress == -1){return 'NA';}
    
    var total_stress = 0;
    
    for(i=start; i<=end; i++){
        total_stress += parseInt(work_stress[i]);
    }
    
    var difference = parseInt(end) - parseInt(start) + 1;

    var average_stresswork = 0;
    
    if(difference == 0){
        average_stresswork = total_stress;
    } else{
        average_stresswork = total_stress/difference;
    }

    return conv_stress[Math.round(average_stresswork)];
}

function average_nonwork_stress(start,end){
    var nonwork_stress = get_gts_stress_nonwork_arr();
    if(nonwork_stress == -1){return 'NA';}

    var total_stress = 0;
    var i;
    for(i=start; i<=end; i++){
        total_stress += parseInt(nonwork_stress[i]);
    }
    
    var difference = parseInt(end) - parseInt(start) + 1;

    var average_stress_nonwork = 0;
    
    if(difference == 0){
        average_stress_nonwork = total_stress;
    } else{
        average_stress_nonwork = total_stress/difference;
    }

    return conv_stress[Math.round(average_stress_nonwork)];
}

function average_socquan(start,end){
    var socquan = get_gts_soc_quan();
    if(socquan == -1){return 'NA';}

    var total_socquan = 0;
    var i;
    for(i=start; i<=end; i++){
        total_socquan += parseInt(socquan[i]);
    }
    
    var difference = parseInt(end) - parseInt(start) + 1;

    var average_soc_quan = 0;
    
    if(difference == 0){
        average_soc_quan = total_socquan;
    } else{
        average_soc_quan = total_socquan/difference;
    }

    return conv_soc_quan[Math.round(average_soc_quan)];
}

function average_socqual(start,end){
    var socqual = get_gts_soc_qual();
    if(socqual == -1){return 'NA';}
    
    var total_socqual = 0;
    
    for(i=start; i<=end; i++){
        total_socqual += parseInt(socqual[i]);
    }
    
    var difference = parseInt(end) - parseInt(start) + 1;

    var average_soc_qual = 0;
    
    if(difference == 0){
        average_soc_qual = total_socqual;
    } else{
        average_soc_qual = total_socqual/difference;
    }

    return conv_mood[Math.round(average_soc_qual)];
}

function locations_slept(start,end){
    // All locations
    var loc_array_gts = get_location_arr();
    if(loc_array_gts == -1){return 'NA';}
    
    // Locations used when going to sleep
    var gts_loc_arr = get_gts_location_arr();
    if(gts_loc_arr == -1){return 'NA';}
    
    // Sleep quality
    var wu_sleep_qual = get_wu_sleep_qual();
    if(wu_sleep_qual == -1){return 'NA';}

    var i;
    var total_socqual = 0;
    
    var locations_slept = new Array();
    var sleepqual_loc = new Array();
    locations_slept.length = loc_array_gts.length;
    sleepqual_loc.length = loc_array_gts.length;
    
    // fill counting array
    for(i=0;i<loc_array_gts.length;i++){
        locations_slept[i] = 0;
        sleepqual_loc[i] = 0;
    }
    
    for(i=start; i<=end; i++){
        var index_loc = jQuery.inArray(gts_loc_arr[i], loc_array_gts);
        
        locations_slept[index_loc]++;
        
        sleepqual_loc[index_loc] += parseInt(wu_sleep_qual[i]);
    }
    
    var return_html = '';

    for(i=0;i<loc_array_gts.length;i++){
        var times_slept_there = locations_slept[i];
        
        if(times_slept_there == 0){
                return_html += '<strong><font color="gray">' + loc_array_gts[i] + ': </font></strong>' + times_slept_there + ' time(s)<br>';
        } else{
            var average_sleepqual = Math.round(sleepqual_loc[i]/times_slept_there);
                
            return_html += '<strong><font color="gray">' + loc_array_gts[i] + ': </font></strong>' + times_slept_there + ' time(s) ('
                        + conv_mood[average_sleepqual] +' sleep quality)<br>'; 
        }
    }

    return return_html;
}

$('#statisticspage').live('pageshow', function() {
    $.mobile.showPageLoadingMsg("b", "Calculating averages", true);
    
    // Get range to calculate averages
    var start = get_start_range();
    var end = get_end_range();
    
    // Calculate average time slept
    var sleep_average = average_time_slept(start,end);
    
    // Average recreational time
    var rec_average = average_time_recreational(start,end);
    
    // Stress averages
    var average_stresswork = average_work_stress(start,end);
    var average_stressnonwork = average_nonwork_stress(start,end);
    
    // Social averages
    var average_social_qual = average_socqual(start,end);
    var average_social_quan = average_socquan(start,end);
    
    // Which locations slept and average quality of sleep at that location
    var popular_locations = locations_slept(start,end);

    // Convert averages to html en show
    $('#averages_listitem').html('<strong><font color="gray">Time slept: </font></strong>' + sleep_average + '<br>' +
                                 '<strong><font color="gray">Recreational time(h): </font></strong>' + rec_average +'<br>' +
                                 '<strong><font color="gray">Quality of social interaction: </font></strong>' + average_social_qual +'<br>' +
                                 '<strong><font color="gray">Amount of social interaction: </font></strong>' + average_social_quan +'<br>' +
                                 '<strong><font color="gray">Work related stress: </font></strong>' + average_stresswork + '<br>' +
                                 '<strong><font color="gray">Non work related stress: </font></strong>' + average_stressnonwork);
    
    $('#locations_text').text('Times slept at locations');
    $('#locations_slept_listitem').html(popular_locations);
    
    $.mobile.hidePageLoadingMsg();
});