// Center the dragable div on startpage
jQuery.fn.horizontal_center_drag = function () {
    this.css("left", Math.max(0, ((($(window).width() - this.outerWidth()) / 2) - ($(window).width()) * 0.03153125) +
                                                $(window).scrollLeft()) + "px");
    return this;
}

// Center dragable div when orientation changes
$(window).bind( 'orientationchange', function(e){
	$('#selector_startpage').horizontal_center_drag();
});

// Center dragable div everytime startpage is shown (because maybe orientation has changed)
$('#index').live('pageshow', function() {
	$('#selector_startpage').horizontal_center_drag();	
});

// Drag and drop initialization
$('#index').live('pageinit', function() {
	
	var drag_clicked = false;
     
    var gts_clicked = false;
    var wu_clicked = false;
    var res_clicked = false;
    
    $('#selector_startpage').click(function(){
		$('#selector_startpage').toggleClass('ui-btn-up-e').toggleClass('ui-btn-down-e');	
		
        if(drag_clicked){
            drag_clicked = false;
			$('#txt_selector').text('Drag');
        } else{
            drag_clicked = true;
			$('#txt_selector').text('Tap');
        }
    });
    
    $('#drop_results').click(function(){
        if(drag_clicked){
			change_to_results();
        }
    });
    
    $('#drop_gts').click(function(){
        if(drag_clicked){
			change_to_gts();
        }
    });
    
    $('#drop_wu').click(function(){
        if(drag_clicked){
			change_to_wu();
        }
    });
     
     $(function() {
		$( "#selector_startpage" ).draggable({
			revert: true,
			opacity: 0.35,
			start: function( event, ui ) {
				 $(this).appendTo('index_page_content'); 
			},
			stop: function( event, ui ) {
			}
		});
        
        $( "#drop_results" ).droppable({
            drop: function( event, ui ) {
                $( this )
                    .addClass( "ui-state-highlight" );
					change_to_results();
            }
        });
        
        $( "#drop_gts" ).droppable({
            drop: function( event, ui ) {
                $( this )
                    .addClass( "ui-state-highlight" );
					change_to_gts();
            }
        });
        
        $( "#drop_wu" ).droppable({
            drop: function( event, ui ) {
                $( this )
                    .addClass( "ui-state-highlight" );
					change_to_wu();
            }
        });
    });
});