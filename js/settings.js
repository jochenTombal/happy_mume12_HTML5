$('#settings').live('pageinit', function() {

    var show_socmedia_wu_gts = get_socmedia_checkbox();
    
    // Check the checkbox again if it should be checked
    if(show_socmedia_wu_gts == 1){
        $('#show_socmedia_wu_gts').attr("checked",true).checkboxradio("refresh");
    } else{
        $('#show_socmedia_wu_gts').attr("checked",false).checkboxradio("refresh");
    }
    
    $('#save_settings_btn').click(function(){
        var show_socmedia_wu_gts = $('#show_socmedia_wu_gts:checked').val();
        
        // Save as integers (actually strings) because these are easy to check
        // Localstorage only accepts strings in firefox...
        if(show_socmedia_wu_gts ==  "on"){
            show_socmedia_wu_gts = 1;
        } else{
            show_socmedia_wu_gts = 0;
        }

        store_socmedia_checkbox(show_socmedia_wu_gts);
        
        console.log(show_socmedia_wu_gts);
    });
});