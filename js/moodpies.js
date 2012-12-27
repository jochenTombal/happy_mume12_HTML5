$.createPie = function(gts_or_wu,labelRenderTo,start,end){	
	var mood_arr;
	
	// Check which moodpie to create
	if(gts_or_wu == "gts"){
		var title = "Going to sleep moodpie";
		var smalltitle = "GTS moodpie";
		
		mood_arr = get_gts_mood_arr();
		if(mood_arr == -1){return;} // Check if there is data

	} else{
		var title = "Waking up moodpie";
		var smalltitle = "WU moodpie";
		
		mood_arr = get_wu_mood_arr();
		if(mood_arr == -1){return;}
	}

	// Initialize
    var moods = new Array;
    moods[0] = 0;
    moods[1] = 0;
    moods[2] = 0;
    moods[3] = 0;
    moods[4] = 0;
	
	var i;
    for(i=start; i <= end; i++){
        moods[mood_arr[i]]++;
    }
    
    var data = [['Horrible',moods[0]],['Bad',moods[1]],['Average',moods[2]],
                ['Good',moods[3]],['Excellent',moods[4]]];
    
	// Create pie
    var chart = new Highcharts.Chart({
            chart: {
                renderTo: labelRenderTo,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            colors: ['#DC143C',
                     '#FFA500',
                     '#9E9E9E',
                     '#548B54',
                     '#00EE00',
                     ],
            title: {
                text: title
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            	percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false, // No labels
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name + '</b>';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: smalltitle,
                data: [
                    ['Horrible',moods[0]],
                    ['Bad',moods[1]],
                    ['Average',moods[2]],
                    ['Good',moods[3]],
                    ['Excellent',moods[4]]
                ]
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

$('#wu_moodpie').live('pageshow', function() {
	var start = get_start_range();
    var end = get_end_range();
	
	// Which moodpie
	var type = "wu";
	// Which html container to put chart
	var container = 'container_wu_moodpie';
	
	$.createPie(type,container,start,end);
});


$('#gts_moodpie').live('pageshow', function() {
	var start = get_start_range();
    var end = get_end_range();
	
	// Which moodpie
	var type = "gts";
	// Which html container to put chart
	var container = 'container_gts_moodpie';

	$.createPie(type,container,start,end);
});