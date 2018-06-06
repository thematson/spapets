$('document').ready(function () {


  var service;
  var content = $('.content');
  var loadingSpinner = $('#loading');
  content.css('display', 'block');
  loadingSpinner.css('display', 'none');;

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email',
    leeway: 60
  });

  var loginStatus = $('.container h4');
  var loginView = $('#login-view');
  var homeView = $('#home-view');

  // buttons and event listeners
  var homeViewBtn = $('#btn-home-view');
  var loginBtn = $('#qsLoginBtn');
  var logoutBtn = $('#qsLogoutBtn');

  homeViewBtn.click(function () {
    homeView.css('display', 'inline-block');
    loginView.css('display', 'none');
  });

  loginBtn.click(function (e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn.click(logout);



  //   $('#bath-btn').click(function () {
  //     service = 'Fast Bath';
  //     window.open('booking.html?service=' + service, '_self');
  // });
  // $('#groom-btn').click(function () {
  //     service = 'Superstar Groom';
  //     window.open('booking.html?service=' + service, '_self');

  // });
  // $('#day-btn').click(function () {
  //     service = 'Stellar Day Spa';
  //     window.open('booking.html?service=' + service, '_self');

  // });

  $('#bath-btn').click(function () {
    console.log('clicked');
    $('#book-service').val('Fast Bath - 45 Minute Service');
  });
  $('#groom-btn').click(function () {
    $('#book-service').val('Superstar Groom - 2 Hour Service');
  });
  $('#day-btn').click(function () {
    $('#book-service').val('Stellar Day Spa - All-Day Service');
  });

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function handleAuthentication() {
    webAuth.parseHash(function (err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.css('display', 'none');
        homeView.css('display', 'inline-block');
      } else if (err) {
        homeView.css('display', 'inline-block');
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function displayButtons() {
    if (isAuthenticated()) {
      loginBtn.css('display', 'none');
      logoutBtn.css('display', 'inline-block');
      // loginStatus.text('You are logged in!');
    } else {
      loginBtn.css('display', 'inline-block');
      logoutBtn.css('display', 'none');
      // loginStatus.text('You are not logged in! Please log in to continue.');
    }
  }
  

//   $("#bookingform").validate({
//     rules: {
//         email: {
//             required: true,
//             minlength: 8
//         },
//         pass: "required"
//     },
//     messages: {
//         email: {
//             required: "Please provide your Login",
//             minlength: "Your Login must be at least 8 characters"
//         },
//         pass: "Please provide your password"
//     }
// });







$("#bookingform").on('submit', function(event) {
      console.log("hello");



      var newBooking = {
        firstName: $("#book-first").val().trim(),
        lastName: $("#book-last").val().trim(),
        city: $("#book-city").val().trim(),
        state: $("#book-state").val().trim(),
        zip: $("#book-zip").val().trim(),
        telephone: $("#book-phone").val().trim(),
        email: $("#book-email").val().trim(),    
      };

      var template_params = {
        "book_first": newBooking.firstName,
        "book_last": newBooking.lastName,
        "book_service": "Spa",
        "book_email": newBooking.email,
        "book_phone": newBooking.telephone,
        "book_pet": "Horus",
        "book_breed": "Death Dog"
     }
     
     var service_id = "outlook";
     var template_id = "appointment_owner";
     emailjs.send(service_id,template_id,template_params)
     .then(function(){ 
    	console.log("Sent!");
    }, function(err) {
       console.log("Send email failed!\r\n Response:\n " + JSON.stringify(err));
    });

      const mailOptions = {
        from: 'no-reply@kwpetspa.com', // sender address
        to: 'eric.matson@superion.com', // list of receivers
        subject: 'A new appointment has been made', // Subject line
        html: '<p>'+newBooking.firstName+'</p>'// plain text body
      };


    
      console.log(newBooking);
    
      // This line is the magic. It"s very similar to the standard ajax function we used.
      // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
      // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
      // depending on if a tables is available or not.
    
      // $.post("/api/tables", newBooking,
      //   function (data) {
    
      //     // If a table is available... tell user they are booked.
      //     if (data) {
      //       alert("Yay! You are officially booked!");
      //     }
    
      //     // If a table is available... tell user they on the waiting list.
      //     else {
      //       alert("Sorry you are on the wait list");
      //     }
    
      //     // Clear the form when submitting
      //     $("#reserve-name").val("");
      //     $("#reserve-phone").val("");
      //     $("#reserve-email").val("");
      //     $("#reserve-unique-id").val("");
    
      //   });
    return false;
    });
    
    


  handleAuthentication();

  



});