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

database.ref().on("child_added", function(childSnapshot) {
    childSnapshot.val();
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().trainFreq);
    renderRows(childSnapshot.val());
})


function renderRows(snap) {
    var trainRow = $("<tr>");
    var trainRowName = $("<td>").text(snap.trainName);
    var trainRowDestination = $("<td>").text(snap.trainDestination);
    var trainRowFreq = $("<td>").text(snap.trainFreq);
    var trainRowArrival = $("<td>").text(calculateArrival(snap.trainTime, snap.trainFreq));
    console.log(trainRowArrival);
    // var trainRowMinute = $("<td>").text();
    trainRow.append(trainRowName, trainRowDestination, trainRowFreq, trainRowArrival);
    $(".table").append(trainRow);
}

function calculateArrival(trainTime, freqMinute) {
    console.log(trainTime);
    console.log(freqMinute);

    var startHHmm = trainTime.split(":")
    startInMin = trainTime[0]*60 + trainTime[1];
    console.log(startInMin);

    var now = moment().format("HH:mm");
    console.log(now);
    var nowHHmm = now.split(":")
    console.log(nowHHmm);
    var nowInMin = parseInt(nowHHmm[0]*60) + parseInt(nowHHmm[1]);
    console.log(nowInMin);

    var diff = nowInMin - startInMin;
    console.log(diff);

    var noOfTrains = Math.ceil(diff / freqMinute);
    console.log(noOfTrains);

    var minutesInDay = ((noOfTrains*freqMinute - diff) + nowInMin);
    console.log(minutesInDay);

    var hours = Math.floor(minutesInDay/60);
    var minutes = (minutesInDay - hours*60);

    if (hours < 10) {
        hours = "0" + hours;
    } 

    if (minutes === 0) {
        minutes = "00";
    } else if (minutes <10) {
        minutes = "0" + minutes;
    }

    var nextTrainTime = hours + ":" + minutes;
    console.log(nextTrainTime);
    return nextTrainTime;
}





