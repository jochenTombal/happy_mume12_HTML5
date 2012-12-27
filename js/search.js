// Functions to create listview of data

// Add new listitem from array of data and time
function add_list_item_search(content,time){

	var total_content = "";
	var i;
	for(i=0;i<content.length;i++){
		total_content += content[i] + '<br>';
	}
	total_content += '<p class="ui-li-aside">' + time + '</p>';
	
	$('#search_listview').append($('<li>' + total_content + '</li>'));
}

// Add listdivider
function add_list_divider_search(content){
    $('#search_listview').append($('<li data-role="list-divider">' + content + '</li>'));  
}

// Convert array with all data from going to sleep to nice html. This converted array is then passed on to create a listitem
function add_gts_item(content_array){
	// Convert contents to html
	var search_gts_date = 'Went to bed on: ' + content_array[1];
	var search_gts_time = '<strong>' + content_array[2] + '</strong>';
	
	var search_loc = '<br><font color="gray">Location:</font> ' + content_array[0];
	var search_gts_mood = '<font color="gray">Your mood:</font> ' + content_array[3];
	var search_gts_socqual = '<font color="gray">Social quality:</font> ' + content_array[4];
	var search_gts_socquan = '<font color="gray">Social quantity:</font> ' + content_array[5];
	var search_gts_stresswork = '<font color="gray">Work related stress:</font> ' + content_array[6];
	var search_gts_stressnonwork = '<font color="gray">Non-work related stress:</font> ' + content_array[7];
	var search_gts_rechours = '<font color="gray">Recreational hours:</font> ' + content_array[8];
	var search_gts_enoughrec = '<font color="gray">Enough recreation:</font> ' + content_array[9];
	var search_gts_alcohol = '<font color="gray">Alcohol last 3 hours:</font> ' + content_array[10];
	var search_gts_caffeine = '<font color="gray">Caffeine last 3 hours:</font> ' + content_array[11];
	
	// Put all html in array
	var converted_array = [search_loc,search_gts_mood,search_gts_socqual,search_gts_socquan,
						   search_gts_stresswork,search_gts_stressnonwork,search_gts_rechours,
						   search_gts_enoughrec,search_gts_alcohol,search_gts_caffeine];
	
	// Create listdivider with date
	add_list_divider_search(search_gts_date);
	// Create listitem with html in array and time
	add_list_item_search(converted_array,search_gts_time);
}

// Convert data in content_array to html and pass on to functions which create listdivider and listitem
function add_wu_item(content_array){
	var search_wu_date = 'Got out of bed on: ' + content_array[0];
	var search_wu_time = '<strong>' + content_array[1] + '</strong>';
	var search_wu_mood = '<br><font color="gray">Your mood:</font> ' + content_array[2];
	var search_wu_sleepqual = '<font color="gray">Sleep quality:</font> ' + content_array[3];
	var search_wu_enoughsleep = '<font color="gray">Slept enough?:</font> ' + content_array[4];
	
	var converted_array = [search_wu_mood,search_wu_sleepqual,search_wu_enoughsleep];
	
	add_list_divider_search(search_wu_date);
	add_list_item_search(converted_array,search_wu_time);
}

// Build the entire list for the interval chosen at the searchpage
function build_list(startlist,endlist){
	$('#search_listview').empty();
	
	var j;
	for(j=startlist;j<=endlist;j++){
		// Get going to sleep data for specific index
		var test_gts_array = get_gts_data_index(j);
		
		// Get waking up data for specific index
		var test_wu_array = get_wu_data_index(j);
		
		// Add listitem for gts data
		add_gts_item(test_gts_array);
		// Add listitem for wu data
		add_wu_item(test_wu_array);
	}
	
	$.mobile.changePage('#viewinterval',{ transition: "slide"});
	
	$('#search_listview').listview('refresh');
}

// Searchpage init. 
$('#searchpage').live('pageinit', function() {
	
	//Create mobiscrollers (datepickers)
	$(function(){
        $('#start_date_search').scroller({
            preset: 'date',
            minDate: new Date(2011,0,1),
            theme: 'jqm',
            display: 'inline',
            mode: 'scroller',
            dateOrder: 'mmD ddyy'
        });    
    });
	
	$(function(){
        $('#end_date_search').scroller({
            preset: 'date',
            minDate: new Date(2011,0,1),
            theme: 'jqm',
            display: 'inline',
            mode: 'scroller',
            dateOrder: 'mmD ddyy'
        });    
    });
	
	// Checkbox for one or two dates
	$('#only_one_day_checkbox').change(function(){
		if($('#only_one_day_checkbox').is(':checked')){
			$('#hider').fadeOut();
			$('#start_date_label').text('Date');
		} else{
			$('#hider').fadeIn();
			$('#start_date_label').text('Start date');
		}
	});
	
	// View data button searchpage
	$('#show_search_btn').click(function(){
		$.mobile.showPageLoadingMsg("b", "Loading data", true);
		
		var startdate = $('#start_date_search').scroller('getDate');
		startdate.setHours(0,0,0);
		
		var enddate = $('#end_date_search').scroller('getDate');
		enddate.setHours(0,0,0);
		
		var start_mill = startdate.getTime();
		var end_mill = enddate.getTime();
		
		// Check equal
		if(($('#only_one_day_checkbox').is(':checked')) || (end_mill == start_mill)){
			
			var startnr = find_wu_data_exact_helper(startdate);
			
			if(startnr >= 0){
				build_list(startnr,startnr);
			} else{
				alert('No data for that date!');
			}
			
			
		} else if(end_mill > start_mill){ // Check enddate larger than startdate
			
			var startnr = find_wu_data_start_helper(startdate); // start here
			
			var endnr = find_wu_data_end_helper(enddate); // end here
			
			if((startnr >= 0) && (endnr >=0)){
				build_list(startnr,endnr);
			} else{
				alert('No data for those dates!');
			}
			
		} else{
			alert('Incorrect dates!');
		}
		
		$.mobile.hidePageLoadingMsg();
	});
	
	// Set interval button. Saves start and end id to localstorage so the graphs can be built with this range
	$('#set_interval_btn').click(function(){
		var startdate = $('#start_date_search').scroller('getDate');
		startdate.setHours(0,0,0);
		
		var enddate = $('#end_date_search').scroller('getDate');
		enddate.setHours(0,0,0);
		
		var start_mill = startdate.getTime();
		var end_mill = enddate.getTime();
		
		// Check equal
		if(($('#only_one_day_checkbox').is(':checked')) || (end_mill == start_mill)){
			var startnr = find_wu_data_exact_helper(startdate);
			
			if(startnr >= 0){
				set_interval_range(startnr,startnr);
				alert('Interval set!');
			} else{
				alert('No data for that date!');
			}

		} else if(end_mill > start_mill){ // Check enddate larger than startdate
			
			var startnr = find_wu_data_start_helper(startdate); // start here
			
			var endnr = find_wu_data_end_helper(enddate); // end here
			
			if((startnr >= 0) && (endnr >=0)){
				set_interval_range(startnr,endnr);
				alert('Interval set!');
			} else{
				alert('No data for those dates!');
			}
			
		} else{
			alert('Incorrect dates!');
		}
	});
	
	// Set default interval button
	// Sets the interval so you can see all the data stored
	$('#set_entire_interval_btn').click(function(){
		$.mobile.showPageLoadingMsg("b", "Setting interval", true);
		
		var nr_items_entire_range = get_nr_items_wu_arrays();
		
		set_interval_range(0,nr_items_entire_range);
		
		alert('Default interval set!');
		
		$.mobile.hidePageLoadingMsg();
	});
	
});