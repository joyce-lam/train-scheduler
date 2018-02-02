// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNZmWs1i2GxE_dqVlRmIKndDPS_7doi4g",
  authDomain: "train-scheduler-dcd94.firebaseapp.com",
  databaseURL: "https://train-scheduler-dcd94.firebaseio.com",
  projectId: "train-scheduler-dcd94",
  storageBucket: "",
  messagingSenderId: "662175775724"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFreq = "";

$("#submit").on("click", function(event) {
  event.preventDefault();

  trainName = $("#name-input").val().trim();
  trainDestination = $("#destination-input").val().trim();
  trainTime = $("#time-input").val().trim();
  trainFreq = $("#freq-input").val().trim();

  console.log(trainFreq);

  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainTime: trainTime,
    trainFreq: trainFreq,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added",
  function(snapshot) {
    var snapValue = snapshot.val();

 //  $(".schedule-view").empty();

    var trainRowName = $("<td>").text(snapValue.trainName);
    var trainRowDestination = $("<td>").text(snapValue.trainDestination);
    var trainRowFreq = $("<td>").text(snapValue.trainFreq);
    // var trainRowArrival = $("<td>").text(sv.);
    // var trainRowMinute = $("<td>").text();

    $(".schedule-view").append(trainRowName, trainRowDestination, trainRowFreq);

  })









