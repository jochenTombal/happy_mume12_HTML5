$('#tweet_dialog').live('pageshow', function() {
    
    //twttr.widgets.load();
    
    console.log("Twitter page");
    
    // Get tweet msg
    //var tweetmsg = localStorage.getItem("wu_gts_tweet_msg");
    
    // Fill in txtarea
    //$('#twttr_txtarea').val(tweetmsg);
    
    // Change tweet btn attribute data-text so the msg will be input in the popup
    //$('#twitter_btn').attr('data-text',tweetmsg);
    
    $twttr_btn_update = (function() {
        
        console.log("running method");
        // Remove existing iframe
        $('#tweetBtn iframe').remove();
        // Generate new markup
        var tweetBtn = $('<a></a>')
            .addClass('twitter-share-button')
            .attr('href', 'http://twitter.com/share')
            .attr('data-url', '#mume12#happy') // doesn't show url this way
            .attr('data-text', $('#twttr_txtarea').val())
            .attr('data-size','large')
            .attr('data-count','none');
        $('#tweetBtn').append(tweetBtn);
        twttr.widgets.load();
    });
    
    $twttr_btn_update();

});

$('#facebook').live('pageinit', function() {

    console.log("loading facebook page \n");
    
    var facebookmsg = localStorage.getItem("wu_gts_fb_msg");
    $('#fb_txtarea').val(facebookmsg);
    
    FB.getLoginStatus(function(response) {
        console.log("getting login status \n");
        if (response.status === 'connected') {
            // connected
            console.log("Connected to facebook");

        } else if (response.status === 'not_authorized') {
          console.log("Not authorized to connect to facebook");
          // App not yet authorized
        } else {
          // not_logged_in
          console.log("Not connected to facebook");
        }
    });

    $('#clearmsg_btn_fb').click(function(){
        $('#fb_txtarea').val("");
    });
    
    // Upload photo
    /*$('#uploadphoto_btn_fb').click(function(){
        var accessToken;
        
        
        //var filename = 'http://www.molten.pl/tv_test_image.gif';
        var filename = $('#file_input').val();
        
        console.log("Photo: " + filename);
        
        // Get status and accestoken!        
        FB.getLoginStatus(function(response) {

                    if (response.status === 'connected') {
                        // Get accesstoken
                        if (response.authResponse) {
                            accessToken = response.authResponse.accessToken;
                        }
                        
                        console.log("setting new status: " + $('#fb_txtarea').val());
                        
                        var msg_with_photo = $('#fb_txtarea').val();
                        FB.api('me/photos', 'post', {
                            message: msg_with_photo,
                            status: 'success',
                            access_token: accessToken,
                            url: filename
                        }, function(response) {
                            
                            if (!response || response.error) {
                                alert('Could not update status! You may have revoked this permission. Press the login-button if you want to re-authorize this app.');
                                
                                console.log(response.error);
                                console.log(response.error.message);
                           } else {
                                alert("Status updated!");
                           }
                        });
                      
                    } else if(response.status === 'not_authorized'){
                        alert("You have not authorized this app to update your status. Press the login-button please (if this doesn't work, try refreshing the page)");
                    } else { // not logged in
                        alert('Please log in first');
                    }              

            });
    });*/
    
    $('#setstatus_btn_fb').click(function(){
        // Show loading
        $.mobile.showPageLoadingMsg("b", "Setting status, please wait.", true);

        console.log("set status clicked");
            FB.getLoginStatus(function(response) {

                    if (response.status === 'connected') {
                        
                        console.log("setting new status: " + $('#fb_txtarea').val());
                        
                        var message_str = $('#fb_txtarea').val();
                        FB.api('/me/feed', 'post', { message: message_str}, function(response) {
                            
                            if (!response || response.error) {
                                $.mobile.hidePageLoadingMsg();
                                alert('Could not update status! You may have revoked this permission. Press the login-button if you want to re-authorize this app.');
                                
                                console.log(response.error);
                                console.log(response.error.message);
                           } else {
                                $.mobile.hidePageLoadingMsg();
                                alert("Status updated!");
                           }
                        });
                      
                    } else if(response.status === 'not_authorized'){
                        $.mobile.hidePageLoadingMsg();
                        alert("You have not authorized this app to update your status. Press the login-button please (if this doesn't work, try refreshing the page)");
                    } else { // not logged in
                        $.mobile.hidePageLoadingMsg();
                        alert('Please log in first');
                    }              

            });
    });
    
    /*function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Good to see you, ' + response.name + '.');
        });
    }*/
});