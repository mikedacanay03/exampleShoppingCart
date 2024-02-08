let label = document.getElementById("label");
let shopping_Cart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket);

// displaying the total number of items added and decreases on the iconCart
// used reduce method to add the previous item and next item to get the total
let calculation = () => {
  let cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = basket
    .map((x) => x.item)
    .reduce((item, prevItem) => item + prevItem, 0);
};
// invoke the function to store the items number in the cartIcon.
calculation();

let generateCartItems = () => {
  // initialize the total price
  // let totalPrice = 0;

  // check if basket have an item
  if (basket.length !== 0) {
    return (shopping_Cart.innerHTML = basket
      .map((cart) => {
        let { id, item } = cart;
        // let totalPrice = item * search.price;
        // match the id on the basket into shopItemsData Array(id)
        let search = shopItemsData.find((data) => data.id === id) || [];

        // destructure the object(search)
        let { image, title, price } = search;

        // calculate the price for each item
        // let itemPrice = search.price * item;
        // Accumulate The total Price
        // totalPrice += itemPrice;

        return `

      <div class="cart-Item">
          <img width="100" src=${image} alt="" />
          <div class="details">
          <div class="title-price-x">
            
              <p>${title}</p>
              <p> ₱${price}</p>
              <i onclick="removeCart(${id})" class="fa-solid fa-x"></i>
            

          </div>

          <div class="buttons">
              
              <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                
              </div>

          <div class="total">
            <h3 class="totalPrice">Total Price:</h3>
            <h3 class="totalPrice">₱${item * price}</h3>
          </div>
      
      </div>
      </div>
      `;
      })
      .join(""));

    // display the total Price
    // shopping_Cart.innerHTML += `<div>Total Price: ${totalPrice}</div>`;
  } else {
    shopping_Cart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back To Home</button>
    </a>
    `;
  }
};
generateCartItems();

let increment = (id) => {
  let selectedItem = id;

  // this function searches if the item already exist in the basket
  // if not exist it will push inside the basket
  // if exist it increases the item
  let search = basket.find((item) => item.id === selectedItem);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  //  re-render the updated  total price for each item
  generateCartItems();

  update(selectedItem);

  // set local storage to save  all the data
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;

  // this function searches if the item decreases in the basket
  // it will stop the process when the item hits 0
  // if exist it decreases the item
  let search = basket.find((item) => item.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  // console.log(basket);

  update(selectedItem);

  //select all the item in the basket that is empty and remove data from the basket
  basket = basket.filter((cart) => cart.item !== 0);

  // re render generate cart items if basket has a zero value
  //   and updated the toal price for each item
  generateCartItems();

  // set local storage to save  all the data
  localStorage.setItem("data", JSON.stringify(basket));
};

// update to increase the items when click
let update = (id) => {
  let search = basket.find((item) => item.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

// remove the each entire cart
// invoke the function inside the icon X
let removeCart = (id) => {
  let selectedItem = id;
  // console.log(selectedItem);
  basket = basket.filter((cart) => cart.id != selectedItem);

  // re-render generate cart items  each cart remove
  generateCartItems();

  // update the total amount
  totalAmount();

  // update the cartIcon Item
  calculation();

  // update the local storage when remove cart
  localStorage.setItem("data", JSON.stringify(basket));
};

// function to clear the cart
let clearBasket = () => {
  basket = [];
  // update the generate cart items
  generateCartItems();
  // update cart icon items
  calculation();
  // local storage
  localStorage.setItem("data", JSON.stringify(basket));

  // invoke clearBasket function inside totalAmount on button
  // clear cart
};

// function to display total amount of basket
let totalAmount = () => {
  // check if basket exist or not
  if (basket.length !== 0) {
    let amount = basket
      .map((Price_item) => {
        let { item, id } = Price_item;
        let search = shopItemsData.find((data) => data.id === id) || [];
        return item * search.price;
      })
      .reduce((prev, next) => prev + next, 0);
    // console.log(amount);
    label.innerHTML = `
    <div class="totalBill">
    <h3 class="totalPrice">Total Bill:</h3>
    <h3 class="totalPrice">₱${amount}</h3>
    </div>
    <button class="checkout">Checkout</button>
    <button onclick="clearBasket()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

// invoke the function inside the update function to update the total bill
//  invoke the function again inside the remove cart function to update the total bill once the user remove the cart

totalAmount();
