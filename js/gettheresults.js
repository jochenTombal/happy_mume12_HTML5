$('#gettheresults').live('pageinit', function() {
    $('#gtr_moodpies_uibar').click(function(){
        $.mobile.changePage('#moodpies_main',{transition: 'slideup',reverse: true});
    });
    
    $('#gtr_moodvariations_uibar').click(function(){
        $.mobile.changePage('#moodvariation',{transition: 'slide',reverse: true});
    });
    
    $('#gtr_search_uibar').click(function(){
        $.mobile.changePage('#searchpage',{transition: 'slide'});
    });
    
    $('#gtr_statistics_uibar').click(function(){
        $.mobile.changePage('#statisticspage',{transition: 'slideup'});
    });
    
    $('#gtr_center_uibar').click(function(){
        $.mobile.changePage('#testpage');
    });
});