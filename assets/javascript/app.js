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
var destination = "";
var trainTime = "";
var frequency = "";

