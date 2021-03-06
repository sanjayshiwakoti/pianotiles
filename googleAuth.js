 // Enter a client ID for a web application from the Google Developer Console.
      // The provided clientId will only work if the sample is run directly from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // In your Developer Console project, add a JavaScript origin that corresponds to the domain
      // where you will be running the script.
       var clientId = '410226944903-3aj1cnibc7j1jesoulgb18oua08tk3bi.apps.googleusercontent.com';

      // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
      // The provided key works for this sample only when run from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // To use in your own application, replace this API key with your own.
         var apiKey = 'AIzaSyAg04ukktKiRm-DhTZ-vtzaW1x79FA_9sw';
      // To enter one or more authentication scopes, refer to the documentation for the API.
      var scopes = 'https://www.googleapis.com/auth/userinfo.email';
      // Use a button to handle authentication the first time.
      function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
      }
      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }
      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }
      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }
      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.load('plus', 'v1', function() {
          var request = gapi.client.plus.people.get({
            'userId': 'me'
          });
          request.execute(function(resp) {
            var heading = document.createElement('h4');
            var image = document.createElement('img');
            image.src = resp.image.url;
            heading.appendChild(image);
            heading.appendChild(document.createTextNode(resp.displayName));
            document.getElementById('content').appendChild(heading);
            document.getElementById('google_id').value=resp.id;
            document.getElementById('email').value=resp.emails[0].value;
            document.getElementById('google_name').value=resp.displayName;
            if(resp.url){
                 document.getElementById('profile_url').value=resp.url;
            }
           if(resp.cover){
            document.getElementById('profile_image_url').value=resp.cover.coverPhoto.url;
        }
          });
        });
      }
      
     function submitScore(){
         var form = $("#gamescore");
         if($('#google_id').val()==''){
             alert('Please Authorize before submitting score.');
             return false;
         }
         if($('#score').val()==''){
             alert('Please play the game to set score.');
             return false;
         }
         var formData = form.serialize()
          $.ajax({
                        type: "post",
                        url: "http://ribbit.lftechnology.com/api/insertscore.php",
                        data: {formData: formData
                        },
                        dataType: "Json",
                        success: function (response) {
                           alert(response.message);
                           $('#score').val('');
                        },
                        error: function () {
                            alert('There was Problem')
                        }
                    });
         return true;
     }
