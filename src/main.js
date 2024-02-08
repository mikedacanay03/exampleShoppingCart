let shop = document.getElementById("shop");

// everytime you choose an item it stores inside the basket
// let basket = [];

// retrieving the data from the local storage and place inside the application

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      // destructure
      let { id, title, image, price, desc } = item;
      // search data in local storage and place inside the basket
      // if data does not exist place an empty array
      let search = basket.find((item) => item.id === id) || [];
      return `<div id=product-id-${id} class="item">
        <img width="218" src="${image}" alt="" />
        <div class="details">
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h5>₱${price}</h5>
            <div class="buttons">
              
              <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
              <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
              <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};

generateShop();

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
  // console.log(basket);
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

  //select all the item in the basket that is empty and remove from the basket
  basket = basket.filter((cart) => cart.item !== 0);

  // set local storage to save  all the data
  localStorage.setItem("data", JSON.stringify(basket));
};

// update to increase the items when click
let update = (id) => {
  let search = basket.find((item) => item.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  generateShop();
  calculation();
};

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
