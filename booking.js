$('document').ready(function() {

var service = decodeURI(window.location.href.split('=')[1]);

console.log(service);

$('#book-service').value = service;

function submitButton(){
$(".submit").on("click", function (event) {
  event.preventDefault();
  console.log("hello");

  //phone number validation to work on

  // function phonenumber() {
  //   var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  //   if (phoneRegex.test(subjectString)) {
  //     var formattedPhoneNumber =
  //       subjectString.replace(phoneRegex, "($1) $2-$3");
  //   } else {
  //     // Invalid phone number
  //   }
  // }


  // phonenumber(inputtxt);
  // Here we grab the form elements
  var newBooking = {
    firstName: $("#book-first").val().trim(),
    lastName: $("#book-last").val().trim(),
    city: $("#book-city").val().trim(),
    state: $("#book-state").val().trim(),
    zip: $("#book-zip").val().trim(),
    telephone: $("#book-phone").val().trim(),
    email: $("#book-email").val().trim(),


  };

  console.log(newBooking);

  // This line is the magic. It"s very similar to the standard ajax function we used.
  // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
  // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
  // depending on if a tables is available or not.

  $.post("/api/tables", newReservation,
    function (data) {

      // If a table is available... tell user they are booked.
      if (data) {
        alert("Yay! You are officially booked!");
      }

      // If a table is available... tell user they on the waiting list.
      else {
        alert("Sorry you are on the wait list");
      }

      // Clear the form when submitting
      $("#reserve-name").val("");
      $("#reserve-phone").val("");
      $("#reserve-email").val("");
      $("#reserve-unique-id").val("");

    });

});

}

});