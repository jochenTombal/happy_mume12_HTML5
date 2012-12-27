$.createMoodVar = function(start,end){   
    var wu_time_arr = get_wu_time_arr();
    if(wu_time_arr == -1){return;}
    
    var wu_mood_arr = get_wu_mood_arr();
    if((wu_mood_arr == -1)){return;}
    
    var gts_mood_arr = get_gts_mood_arr();
    if(wu_mood_arr == -1){return;}
    
    
    var dates = new Array();
    var wu_moods = new Array();
    var gts_moods = new Array();
    
    var new_date;
    
    var i;

    // Counter for dates array
    // Would otherwise start at a number greater than 0
    // This would show wrong dates on the graph
    // Don't forget to increment in for-loop
    var dates_counter = 0;
    
    for(i=start; i<=end; i++){
        
        // Don't forget to typecast (are strings otherwise)
        wu_moods.push(parseInt(wu_mood_arr[i]));
        gts_moods.push(parseInt(gts_mood_arr[i]));
        
        new_date = new Date(parseInt(wu_time_arr[i]));
        
        dates[dates_counter] = (new_date.getDate()) + "/" + (new_date.getUTCMonth()+1) + "/" + new_date.getUTCFullYear();
        
        dates_counter++;
    }
    
    var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container_moodvariation',
                type: 'column'
            },
            title: {
                text: 'Mood Variations'
            },
            xAxis: {
                categories: dates
            },
            yAxis: {
                min: 0,
                max: 4,
                allowDecimals: false,
                title: {
                    text: 'Moods'
                },
            },
            tooltip: {
                formatter: function() {
                    var mood;
                    if(this.y == 0){
                        mood="Horrible";
                    } else if(this.y == 1){
                        mood="Bad";
                    } else if(this.y == 2){
                        mood="Average";
                    } else if(this.y == 3){
                        mood="Good";
                    } else if(this.y == 4){
                        mood="Excellent";
                    }
                    return ''+
                        "Mood: "+mood;
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
                series: [{
                name: 'GTS',
                data: gts_moods
    
            }, {
                name: 'WU',
                data: wu_moods
            }],
            exporting: {
				buttons: { 
					exportButton: {
						enabled:true
					},
					printButton: {
						enabled:false
					}
				}
			}
        });
}

$('#moodvariation').live('pageinit', function() {
    $('#confirm_box').hide();
    $('#container_moodvariation').hide();
    
    $('#yes_btn_moodvar').click(function(){
        var start = get_start_range();
        var end = get_end_range();
        
        $('#confirm_box').hide();
        $('#container_moodvariation').show();
        $.createMoodVar(start,end);
    });
    
    $('#no_btn_moodvar').click(function(){
        $('#confirm_box').hide();
        $.mobile.changePage('#gettheresults', { transition: "slide"});
    });
});

$('#moodvariation').live('pageshow', function() {
    
    var start = get_start_range();
    var end = get_end_range();
    
    var end_start = end-start + 1;
    
    // Check if user wants to show graph (more than 7 entries could be unclear)
    if(end_start > 7){
        $('#warning_msg').text(end_start + ' results are about to be shown. Do you want to continue?');
        $('#container_moodvariation').hide();
        $('#confirm_box').show();
    } else{
        $('#container_moodvariation').show();
        $.createMoodVar(start,end);
    }
});