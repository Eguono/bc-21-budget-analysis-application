$(document).ready(function () {


    $("#saveBudget").on("click", () => {
        let section = $("#eguono").val().toLowerCase();
        let month = $("#month").val().toLowerCase();
        let income = $("#income").val();
        let rent = $("#rent").val();
        let utilities = $("#utilities").val();
        let insurance = $("#insurance").val();
        let groceries = $("#groceries").val();
        let health = $("#health").val();
        let entertainment = $("#entertainment").val();
        let restaurant = $("#restaurant").val();
        let personalcare = $("#personalcare").val();
        let servicecharges = $("#servicecharges").val();
        let shopping = $("#shopping").val();
        let gifts = $("#gifts").val();
        let travel = $("#travel").val();
        let other = $("#other").val();
        console.log(month, `${month}`);
        let budget = {
                income: income,
                rent: rent,
                utilities: utilities,
                insurance: insurance,
                groceries: groceries,
                health: health,
                entertainment: entertainment,
                restaurant: restaurant,
                personalcare: personalcare,
                servicecharges: servicecharges,
                shopping: shopping,
                gifts: gifts,
                travel: travel,
                other: other
        }
        
        localStorage.setItem(section, [`${month}: ${JSON.stringify(budget)}`] );
        
        console.log(localStorage.getItem(JSON.parse(actual)));
    });
});