// Add a location to <select></select> list
function add_select_option(content){
    var selectoption = '<option value=' + content + '>' + content + '</option>';
        
    $('#select-location').append(selectoption);
        
    $('#select-location').selectmenu('refresh');
}

// Add location to list on location page and also to select-list on gts screen
function add_list_item(content){
    $('#locations_list').append($("<li></li>").text(content));

    $('#locations_list').listview('refresh');
    
    // Also adjust the select options on the GTS screen
    add_select_option(content);
    
}

// Initialize locations going to sleep screen
$('#goingtosleep').live('pageinit', function() {
    
    $('#select-location').empty(); //clear select-list
    
    var loc_array_gts = get_location_arr();
    if(loc_array_gts == -1){
        loc_array_gts = new Array();
    } else{
        var i;
        for(i=0; i < loc_array_gts.length; i++){
            add_select_option(loc_array_gts[i]);
        }
    }
});

// Add location page
$('#addlocation').live('pageinit', function() {

   $('#locations_list').empty();
   $('#select-location').empty();
   
   var loc_array = get_location_arr();
   if(loc_array == -1){
       loc_array = new Array();
   } else{
       var i;
        for(i=0; i < loc_array.length; i++){
            add_list_item(loc_array[i]);
        }
   }
   
   // Disable spaces (location is one word)
    $('#new_location').keypress(function( e ) {
        if(e.which === 32){
            return false;
        } else{
            return true;
        }
    });
   
   // Add new location to list if it wasn't already added and if location isn't empty
   $('#addbtn').click(function(){
        var item = $('#new_location').val();

        var item_in_array = jQuery.inArray(item,loc_array);
        
        if((item != "") && (item_in_array == -1)){
            // Put in list
            add_list_item(item);
            
            // Save
            loc_array.push(item);
            
            store_location_arr(loc_array);
            
            // Clear textbox
            $('#new_location').val('');
        } else if(item == ""){
            console.log("Location was empty!");
        } else{
            console.log("Location already added!");
        }
    });
   
   // Clear all locations
   $('#clearlist').click(function(){
        $('#locations_list').empty();
        $('#select-location').empty();
        
        remove_location_arr();
        
        loc_array.length = 0;
        
        $('#locations_list').listview('refresh');
        $('#select-location').selectmenu('refresh');
    });
});