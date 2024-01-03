document.addEventListener('DOMContentLoaded', function () {
    //List of products with their details: SKU, name, price and image URL
    const products = {
        "E90HPAIS001": {
            name: "Air Intake System",
            price: "€299.99",
            imageUrl: "images/air-intake_1.jpeg"
        },
        "E90CSK002": {
            name: "Coilover Suspension Kit",
            price: "€749.99",
            imageUrl: "images/coilovers_1.jpeg"
        },
        "E90SSES003": {
            name: "Performance Exhaust System",
            price: "€599.99",
            imageUrl: "images/exhaust_1.png"
        },
        "E90ECUST004": {
            name: "ECU Software Tune",
            price: "€499.99",
            imageUrl: "images/ecu-tune.jpg"
        },
        "E90HFDP005": {
            name: "High-Flow Downpipe",
            price: "€349.99",
            imageUrl: "images/downpipe.jpg"
        },
        "E90BBK006": {
            name: "Sports Brake Kit",
            price: "€1,199.99",
            imageUrl: "images/brake-kit.jpg"
        },
        "E90CFRS007": {
            name: "Carbon Fiber Rear Spoiler",
            price: "€249.99",
            imageUrl: "images/spoiler.jpg"
        },
        "E90AEHK008": {
            name: "LED Angel Eye Headlight Conversion Kit",
            price: "€129.99",
            imageUrl: "images/angel-eyes.jpg"
        },
        "E90PCK009": {
            name: "Performance Clutch Kit",
            price: "€499.99",
            imageUrl: "images/clutch.jpg"
        },
        "E90LPW010": {
            name: "Performance Wheels",
            price: "€999.99 (set of 4)",
            imageUrl: "images/alloys.jpg"
        },
        "E90UTK011": {
            name: "Upgraded Turbocharger Kit",
            price: "€2,499.99",
            imageUrl: "images/turbocharger.png"
        },
        "E90SSK012": {
            name: "Performance Short Shift Kit",
            price: "€149.99",
            imageUrl: "images/short-shifter.png"
        }
    };

    //Function to update the number of items shown in the cart
    function updateCartCount() {
        //Find the elements on the page that show the cart count
        var cartCountElements = document.querySelectorAll('#mobile-cart-count, #desktop-cart-count');
        //Parse cart from local storage / default to empty array
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        //Variable to keep track of the total count
        var totalCount = 0;
        //Loop through each item in the cart to add up the quantities
        for (var i = 0; i < cart.length; i++) {
            totalCount += cart[i].quantity;
        }
        //Set the cart count elements to display the total number of items
        for (var j = 0; j < cartCountElements.length; j++) {
            cartCountElements[j].textContent = totalCount;
        }
    }


    // Function to add an item to the cart
    function addToCart(sku) {
        //Parse cart from local storage / default to empty array
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        //Look for the product in the cart by its SKU
        var productIndex = -1;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].sku === sku) {
                productIndex = i;
                break;
            }
        }
        //Increase quantity if product already in the cart
        if (productIndex !== -1) {
            cart[productIndex].quantity += 1;
        } else {
            //If the product is not in the cart add it with a quantity of 1
            cart.push({ sku: sku, quantity: 1 });
        }

        //Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        //Update the cart count display
        updateCartCount();
    }

    //Attach event listeners to the Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            //Get the product SKU from the button's data attribute
            const sku = this.getAttribute('data-sku');
            //Add product to cart
            addToCart(sku);
        });
    });

    //Function to display cart items on the page
    const displayCartItems = () => {
        //Select container where cart items are to be displayed
        const cartItemsContainer = document.getElementById('cart-items-container');
        if (!cartItemsContainer) return;

        //Parse cart from local storage / default to empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        //Clear current contents of cart items container
        cartItemsContainer.innerHTML = '';
        let grandTotal = 0;

        //Loop through each item in the cart
        cart.forEach(item => {
            //Retrieve the product detials from the list
            const product = products[item.sku];
            //Parse price and calculate total for the item
            const price = parseFloat(product.price.replace('€', ''));
            const total = price * item.quantity;
            //Add to grand total
            grandTotal += total;

            //Create new div to show the cart item
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card mb-3 cart-item';

            //Set the inner HTML of the div with the product details
            cardDiv.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid rounded-start card-img">
                    </div>
                    <div class="col-md-8 d-flex flex-column justify-content-between">
                        <div class="card-body">
                            <h5 class="card-title text-center">${product.name}</h5>
                        </div>
                        <div class="ms-auto p-2">
                            <p class="card-text">Price: €${price.toFixed(2)}</p>
                            <p class="card-text">Quantity: ${item.quantity}</p>
                            <p class="card-text"><b>Total: €${total.toFixed(2)}</b></p>
                            <button class="btn btn-danger remove-from-cart" data-sku="${item.sku}">Remove from Cart</button>
                        </div>
                    </div>
                </div>
            `;

            //Append the new div to the cart items container
            cartItemsContainer.appendChild(cardDiv);
        });

        //Create div to display the grand total
        const totalPriceDiv = document.createElement('div');
        totalPriceDiv.className = 'total-price-section mt-3';
        totalPriceDiv.innerHTML = `<h3>Total Price: €${grandTotal.toFixed(2)}</h3>`;
        //Append div to the cart items container
        cartItemsContainer.appendChild(totalPriceDiv);

        //Attach event listeners to the Remove from Cart buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                //Get product SKU from button's data attribute
                const sku = this.getAttribute('data-sku');
                //Remove product from the cart
                removeFromCart(sku);
            });
        });
    };

    //Function to remove an item from the cart
    function removeFromCart(sku) {
    //Parse cart from local storage / default to empty array
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    //Find index of the product in the cart
    var productIndex = -1;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].sku === sku) {
            productIndex = i;
            break;
        }
    }

    //If the product is found in the cart
    if (productIndex > -1) {
        //If the product has more than 1, decrease it
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            //If the product quantity is 1 remove from cart
            cart.splice(productIndex, 1);
        }

        //Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        //Update the cart count UI and refresh the cart items display
        updateCartCount();
        displayCartItems();
    }
}

    //Attach an event listener to the Checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function (event) {
            //Prevent default button click behaviour
            event.preventDefault();
            //Check if user is logged in
            if (localStorage.getItem('loggedIn') === '1') {
                //Continue to checkout page if true
                window.location.href = 'checkout.html';
            } else {
                //Go to login page if not logged in
                window.location.href = 'login.html';
            }
        });
    }

    //Inititalize the cart count and display the cart items
    updateCartCount();
    displayCartItems();
});
