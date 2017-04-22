

// console.log(this);
$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();

    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            console.log(modal, trigger);
        },
        complete: function () { } // Callback for Modal close
    }
    );

    $('select').material_select();
    $('.slider').slider();

});

let drawIncomeChart = () => {
    let options = {
        backgroundColor: { stroke: "#000", strokeWidth: 4, fill: '#bbb' },
        title: 'Income',
        titleTextStyle: { fontSize: 18 },
        tooltip: { showColorCode: true },
        is3D: true
    };

    let incomeData = $.ajax({
        url: window.location.href + "/incomeApi",
        dataType: "json",
        context: document.getElementById('chart'),
        success: function (serverData) {
            let chart, data;
            let dataTable = [];
            for (let datas in serverData) {
                dataTable.push([serverData[datas].incomeType, Number(serverData[datas].amount)]);
            }
            dataTable.sort(function (a, b) {
                if (a[0] === b[0]) {
                    return 0;
                }
                else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            });
            for (var i = 0; i < dataTable.length - 1; i++) {
                if (dataTable[i][0] === dataTable[i + 1][0]) {
                    dataTable[i][1] = dataTable[i][1] + dataTable[i + 1][1]
                    dataTable.splice(i + 1, 1)
                    i--
                }
            }
            dataTable.unshift(["Income", "Amount"])
            console.log(dataTable)
            data = google.visualization.arrayToDataTable(dataTable);
            chart = new google.visualization.PieChart(this);
            chart.draw(data, options);
            var barOptions = {
                backgroundColor: { stroke: "#000", strokeWidth: 4, fill: '#bbb' },
                title: 'Income',
                titleTextStyle: { fontSize: 18 },
                tooltip: { showColorCode: true },
                hAxis: {
                    title: "Amount Recieved",
                    titleTextStyle: { fontSize: 16 },
                    girdlines: { count: 8 }
                },
                vAxis: { title: "Various Incomes", titleTextStyle: { fontSize: 16 } }
            }
            var barchart = new google.visualization.BarChart(document.getElementById('barchartIncome'));
            barchart.draw(data, barOptions);
        }
    })
}
let drawExpenseChart = () => {
    let options = {
        backgroundColor: { stroke: "#000", strokeWidth: 4, fill: '#bbb' },
        title: 'Expense',
        titleTextStyle: { fontSize: 18 },
        tooltip: { showColorCode: true },
        is3D: true
    };

    let expenseData = $.ajax({
        url: window.location.href + "/expenseApi",
        dataType: "json",
        context: document.getElementById('expensechart'),
        success: function (serverData) {
            let chart, data;
            let dataTable = [];
            for (let datas in serverData) {
                dataTable.push([serverData[datas].expenseType, Number(serverData[datas].amount)]);
            }
            dataTable.sort(function (a, b) {
                if (a[0] === b[0]) {
                    return 0;
                }
                else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            });
            for (var i = 0; i < dataTable.length - 1; i++) {
                if (dataTable[i][0] === dataTable[i + 1][0]) {
                    dataTable[i][1] = dataTable[i][1] + dataTable[i + 1][1]
                    dataTable.splice(i + 1, 1)
                    i--
                }
            }
            dataTable.unshift(["Expense", "Amount"])
            console.log(dataTable)
            data = google.visualization.arrayToDataTable(dataTable);
            chart = new google.visualization.PieChart(this);
            chart.draw(data, options);
            var barOptions = {
                backgroundColor: { stroke: "#000", strokeWidth: 4, fill: '#bbb' },
                title: 'Expense',
                titleTextStyle: { fontSize: 18 },
                tooltip: { showColorCode: true },
                hAxis: {
                    title: "Amount",
                    titleTextStyle: { fontSize: 16 },
                    girdlines: { count: 8 }
                },
                vAxis: { title: "Various Expenses", titleTextStyle: { fontSize: 16 } }
            }
            var barchart = new google.visualization.BarChart(document.getElementById('barchartExpense'));
            barchart.draw(data, barOptions);
        }
    })

}
// google.load('visualization', '1.0', {
//     'packages': ['corechart'],
//     'callback': drawChart
// });
google.charts.load('current', { 'packages': ['corechart'] });

// Draw the pie chart for Sarah's pizza when Charts is loaded.
google.charts.setOnLoadCallback(drawIncomeChart);

// Draw the pie chart for the Anthony's pizza when Charts is loaded.
google.charts.setOnLoadCallback(drawExpenseChart);