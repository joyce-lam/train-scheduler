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

//create a variable to reference the database
var database = firebase.database();

//initial values
var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFreq = "";

//function to listen to submit click to kick off funciton which collects user's input and pushes data to database
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

//function kicked off by child added to get snapshot of database
database.ref().on("child_added", function(childSnapshot) {
    childSnapshot.val();
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().trainFreq);
    renderRows(childSnapshot.val());
})

//function to render rows in table using the snapshot values
function renderRows(snap) {
    var trainRow = $("<tr>");
    var trainRowName = $("<td>").text(snap.trainName);
    var trainRowDestination = $("<td>").text(snap.trainDestination);
    var trainRowFreq = $("<td>").text(snap.trainFreq);
    var trainRowArrival = $("<td>").text(calculateArrival(snap.trainTime, snap.trainFreq));
    var trainRowMinute = $("<td>").text(calculateMinsAway(snap.trainTime, snap.trainFreq));
    trainRow.append(trainRowName, trainRowDestination, trainRowFreq, trainRowArrival, trainRowMinute);
    $(".table").append(trainRow);
}

//function to calculate arrival time 
function calculateArrival(trainTime, freqMinute) {
    console.log(trainTime);
    console.log(freqMinute);

    var startTime = moment(trainTime, "HH:mm");
    console.log(startTime);
    console.log(startTime.hour());
    console.log(startTime.minute());
    startTimeInMin = startTime.hour()*60 + startTime.minute();
    console.log(startTimeInMin);

    var diff = moment().diff(startTime, "minutes");
    console.log(diff);

    var noOfTrains = Math.ceil(diff / freqMinute);
    console.log(noOfTrains);

    var minsDiff = noOfTrains*freqMinute - diff;
    console.log(minsDiff);
    var resultTime = moment().add(minsDiff, "m");
    console.log(resultTime);
    console.log(moment(resultTime).format("HH:mm"));
    return moment(resultTime).format("HH:mm");
}

//function to calculate the time to the next train 
function calculateMinsAway(trainTime, freqMinute) {
    var nextTrainTime = calculateArrival(trainTime, freqMinute);
    nextTrainTime = moment(nextTrainTime, "HH:mm");
    console.log(nextTrainTime);

    var diff = moment(nextTrainTime).diff(moment(), "minutes");
    console.log(diff);
    return diff;
}
