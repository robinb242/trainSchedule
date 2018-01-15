
    


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLsrDZ0Ckb_rx7xm__rAiXEAmgDCtWgO0",
    authDomain: "clickcountdown-77d23.firebaseapp.com",
    databaseURL: "https://clickcountdown-77d23.firebaseio.com",
    projectId: "clickcountdown-77d23",
    storageBucket: "clickcountdown-77d23.appspot.com",
    messagingSenderId: "645824485301"
  };
  firebase.initializeApp(config);

//simplifies referencing firebase
  var database = firebase.database();



//Submit button to add train
  $("#add-train-btn").on("click", function(){


//Assigns user input to a variable
    var trainName = ("#train-name-input").val().trim();
    var trainDestination = ("#destination-input").val().trim();
    var trainFirst = ("#firstTrain-input").val().trim();
    var trainFrequency = ("#frequency-input").val().trim();

//Place user input variables into an array
    var newTrain = {
        trainName: trainName,
        destination: trainDestination,
        first: trainFirst,
        frequency: trainFrequency
    };

//uploads train input to the database.
database.ref().push(newTrain);

// Log to console
console.log(newTrain.trainName);
console.log(newtrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

//alert new train added to schedule
alert("New Train Successfully Added to Schedule");

//Clears text input boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#firstTrain-input").val("");
$("#frequency-input").val("");

});

//Creat Firebase event for adding a train to the database and a row to the HTML when a user 
//sumits an entry.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

 //stores everything in a variable
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

// Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainFrequency);

//Prettyify the Train Start?
var trainFirstPretty = moment.unix(trainFirst).format("HH:mm")


// Next Arrival and minutes away variables
var currentTime = moment.unix().format("HH:mm")

var minutesAway = (currentTime - trainFirstPretty) % trainFrequency 

var nextArrival = currentTime + minutesAway

//add each trains data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFirstPretty + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});



    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
   /* var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  </script>
*/




