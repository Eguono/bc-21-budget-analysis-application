(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyCjDo9VOUoYzlfxcr0_jcS9lt9UJ0hEUns",
    authDomain: "budget-app-c94f8.firebaseapp.com",
    databaseURL: "https://budget-app-c94f8.firebaseio.com",
    projectId: "budget-app-c94f8",
    storageBucket: "budget-app-c94f8.appspot.com",
    messagingSenderId: "202134943736",
};
firebase.initializeApp(config);


$(document).ready(function () {

});

console.log(data);
// console.log(this);

let drawChart = () => {
    let data = google.visualization.arrayToDataTable(data);

    let options = {
        backgroundColor: { stroke: "#000", strokeWidth: 4, fill: '#bbb' },
        title: 'Most Popular Pies',
        titleTextStyle: { fontSize: 18 },
        tooltip: { showColorCode: true },
        sliceVisibilityThreshold: .10,
        pieResidueSliceColor: '#109618',
        pieResidueSliceLabel: 'Everything else',
        is3D: true
    };

    let chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
}
google.load('visualization', '1.0', {
    'packages': ['corechart'],
    'callback': drawChart
});
},{}]},{},[1]);
