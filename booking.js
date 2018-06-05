

function phonenumber(inputtxt)
{
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (phoneRegex.test(subjectString)) {
        var formattedPhoneNumber =
            subjectString.replace(phoneRegex, "($1) $2-$3");
    } else {
        // Invalid phone number
    }
}


$(".submit").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements
    var newReservation = {
      customerName: $("#reserve-name").val().trim(),
      phoneNumber: $("#reserve-phone").val().trim(),
      customerEmail: $("#reserve-email").val().trim(),
      customerID: $("#reserve-unique-id").val().trim()
    };

    console.log(newReservation);

    // This line is the magic. It"s very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a tables is available or not.

    $.post("/api/tables", newReservation,
      function(data) {

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
