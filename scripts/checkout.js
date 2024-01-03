document.addEventListener('DOMContentLoaded', function() {
    //Get the checkout element by it's ID
    var checkoutForm = document.getElementById('checkout-form');

    if (checkoutForm) {
        //Add event listener to handle form submission
        checkoutForm.addEventListener("submit", function(event) {
            //Prevent default submission behaviour
            event.preventDefault();
            //Call function to process checkout
            processCheckout();
        });
    }
});

//Function to process checkout
function processCheckout() {
    //Get value of card number and CVV from form
    var cardNumber = document.getElementById('cardNumber').value;
    var cardCvv = document.getElementById('cardCvv').value;

    //Check if entered values match hardcoded values
    if (cardNumber === "1234 5678 9102 3456" && cardCvv === "123") {
        //Display success message and reset cart
        displayCheckoutStatus(true);
        resetCart();
    } else {
        //Display failure message
        displayCheckoutStatus(false);
    }
}

//Function to display checkout status
function displayCheckoutStatus(isSuccess) {
    //Get elements that display the messages
    var successElement = document.getElementById("purchase-success");
    var errorElement = document.getElementById("purchase-error");

    if (isSuccess) {
        //Show success message and hide error message
        successElement.classList.remove("d-none");
        errorElement.classList.add("d-none");
    } else {
        //Show error message and hide success message
        successElement.classList.add("d-none");
        errorElement.classList.remove("d-none");
    }
}

//Function to reset cart
function resetCart() {
    //Clear cart in local storage by setting it to empty array
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
}

//Function to update cart count
function updateCartCount() {
    //Get all elements that display cart count
    var cartCountElements = document.querySelectorAll('#mobile-cart-count, #desktop-cart-count');
    //Set text content of each element to 0
    cartCountElements.forEach(el => el.textContent = '0');
}
