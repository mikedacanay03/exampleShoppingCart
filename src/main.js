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

// Added a script file for contact.html page, Mar. 20, 2024
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", ()=> {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(nav => {
    nav.addEventListener("click", ()=> {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
})


const form = document.getElementById('myForm');
const fname = document.getElementById('fname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

function sendMail() {
    const bodyMessage = `Name: ${fname.value}<br>
        Email: ${email.value}<br>
        Phone Number: ${phone.value}<br>
        Message: ${message.value}`;

    // smtpjs function
    Email.send({
        SecureToken: "c2e1b26c-6005-4afb-b85d-89562fa5342f",
        To: "michaeldacanay958@gmail.com",
        From: "michaeldacanay958@gmail.com",
        Subject: subject.value,
        Body: bodyMessage, 
    }).then((message) => {
        if(message == "OK"){
            Swal.fire({
                title: "Success!",
                text: "Message Sent Successfully!",
                icon: "success",
            });
        }
    });
}

// check inputs
function checkInputs() {
    const items = document.querySelectorAll(".item");

    for(const item of items) {
        if(item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }
        if(items[1].value != ""){
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        });
        if(item === phone) {
            checkPhoneNumber();
        }

        item.addEventListener("keyup", () => {
            if(item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

// check email
function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})?$/;

    const errorTextEmail = document.querySelector(".error.email");

    if(!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != "") {
            errorTextEmail.innerText = "Enter a Valid Email Address";
        } else {
            errorTextEmail.innerText = "Email Address Required";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

// check phone number
function checkPhoneNumber() {
    const phoneRegex = /((\+[0-9]{2})|0)[.\- ]?9[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{4}/; //checked for 11 digits

    const errorTextPhone = document.querySelector(".error.phone");

    if(!phone.value.match(phoneRegex)) {
        phone.classList.add("error");
        phone.parentElement.classList.add("error");

        if(phone.value != "") {
            errorTextPhone.innerText = "Enter a valid 11 digits Phone Number";

        } else {
            errorTextPhone.innerText = "Phone Number must Required";
        }
    } else {
        phone.classList.remove("error");
        phone.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (
        !fname.classList.contains("error") &&
        !email.classList.contains("error") &&
        !phone.classList.contains("error") &&
        !subject.classList.contains("error") &&
        !message.classList.contains("error") 
        
    ) {
        sendMail();
        form.reset();
        return false;
    }
})
