//Listen for submit
document.querySelector('#loan-form').addEventListener('submit', calculateResult);

//Calculate result
function calculateResult(e) {
    //Variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please check your numbers');
    }
    e.preventDefault();
}


function showError(error) {
    //Create a div
    const errorDiv = document.createElement('div');
    //Add a class
    errorDiv.className = 'alert alert-danger';
    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Insert in card above heading
    card.insertBefore(errorDiv, heading);

    //Clear error
    setTimeout(clearError, 3000);

}


function clearError() {
    document.querySelector('.alert').remove();
}