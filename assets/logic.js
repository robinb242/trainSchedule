
    


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
//declare variables
    var trainName = " ";
    var destination = " ";
    var trainFirst = " ";
    var frequency = " ";
    var firstTimeConverted = " ";
    var currentTime = " ";
    var diffTime = " ";
    var tRemainder = " ";
    var minutesAway = " ";
    var nextArrival = " ";
    var nextArrivalFormatted = " ";
    var newTrain = " ";
    var keyHolder = " ";
    var getKey = " ";



//Submit button to add train
  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

//Assigns user input to a variable
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainFirst = moment($("#firstTrain-input").val().trim(), "HH:mm").format("X");
    frequency = $("#frequency-input").val().trim();

    firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % frequency;
    minutesAway = frequency - tRemainder;
    nextArrival = moment().add(minutesAway, "minutes");
    nextArrivalFormatted = moment(nextArrival).format("hh:mm");

    var trainName = ("#train-name-input").val().trim();
    var trainDestination = ("#destination-input").val().trim();
    var trainFirst = moment($("#firstTrain-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = ("#frequency-input").val().trim();


//Place user input variables into an array
//uploads train input to the database.
   database.ref().push({
        trainName: trainName,
        destination: destination,
        trainFirst: trainFirst,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
       
    });

        


//alerts a new train has been added to the schedule
    alert("New Train Successfully Added to Schedule");

 });
    

// Log to console
console.log(trainName);
console.log(destination);
console.log(trainFirst);
console.log(frequency);
console.log(nextArrival);
console.log(minutesAway);



//Clears text input boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#firstTrain-input").val("");
$("#frequency-input").val("");





//Creat Firebase event for adding a train to the database and a row to the HTML when a user 
//sumits an entry.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().trainFirst);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextArrival);
    console.log(childSnapshot.val().minutesAway);

 //stores everything in a variable
    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    trainFirst = childSnapshot.val().trainFirst;
    frequency = childSnapshot.val().frequency;
    nextArrival = childSnapshot.val().nextArrival;
    minutesAway = childSnapshot.val().minutesAway;
// Train Info
    
});
//add each trains data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  trainFirst + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");



$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     database.child(getKey).remove();

});











