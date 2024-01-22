// --------------------------- FIREBASE BOILER PLATE
import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

// -------------------------- ELEMENTS

let login = document.getElementById("loginForm")
let form = document.getElementById("carForm")
let carBrand = document.getElementById("carBrandInput");
let carModel = document.getElementById("carModelInput");
let carYear = document.getElementById("carYearInput");
let carPrice = document.getElementById("carPriceInput");
let favCarPhoto = document.getElementById("favoriteCarPhotoInput");
 
let registerBtn = document.getElementById("registerBtn")
let loginBtn = document.getElementById("loginBtn")
let signOutBtn = document.getElementById("signOutBtn")
let insertBtn = document.getElementById("insertBtn");
let getBtn = document.getElementById("getBtn");
let getAllBtn = document.getElementById("getAllBtn")
let deleteBtn = document.getElementById("deleteBtn");

// -------------------------- FUNCTIONS

const getData = function () {
    get(child(ref(db), "cars/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data");
        }
      })
      .catch((err) => {
        console.error(err);
      });
};

const createCard = (carData) => {
    const cardContainer = document.getElementById("cardContainer");
    const card = document.createElement("div");

    card.className = "card";
    card.innerHTML = `
      <h1>${carData.brand} ${carData.model}</h1>
      <h2>Year: ${carData.year}</h2>    
      <h3>Price: ${carData.price}</h3>
      <img src="${carData.photo}" style= "width: 500px; height: 500px"; alt="${carData.brand} ${carData.model} photo">
    `;
  
    cardContainer.appendChild(card);
};

const showCards = () => {
    const cardContainer = document.getElementById("cardContainer");

    cardContainer.innerHTML = ""; // isvalyti

    get(child(ref(db), "cars/"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const carsData = snapshot.val();

                for (const car in carsData) {
                    const carData = carsData[car];
                    createCard(carData);
                }
            } else {
                console.log("No data");
            }
        })
        .catch((err) => {
            console.error(err);
        });
};


// ------------------------------- EVENT LISTENERS


insertBtn.addEventListener("click", (event) => {
    event.preventDefault();
  
    const carData = {
      brand: carBrand.value,
      model: carModel.value,
      year: carYear.value,
      price: carPrice.value,
      photo: favCarPhoto.value,
    };

    set(push(ref(db, "cars/")), carData)
      .then(() => {
        alert("Car added successfully");
        form.reset();
        createCard(carData);
        getData();
      })
      .catch((error) => {
        alert(error);
      });
  });


registerBtn.addEventListener("click", (event) => {
    event.preventDefault()

    // console.log(emailInput.value, passwordInput.value)
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)

    const registerTime = new Date();
        set(ref(db, "/users/" + user.uid),{
        email: email,
        role:"simple",
        timestamp: `${registerTime}`,
    });
    console.log("New user created!")

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
})

loginBtn.addEventListener("click", (event) => {
    event.preventDefault()

    // console.log(emailInput.value, passwordInput.value)
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('user logged in', user)

    const loginTime = new Date();

        update(ref(db, "/users/" + user.uid),{
        timestamp: `${loginTime}`,
    });

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
})

signOutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    auth.signOut().then(() => {
        console.log('user has signed out')
    }).catch((error) => {
        console.log(error)
    })
})



// ------------------------------- LOAD BY DEFAULT

showCards()


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;

        get(child(ref(db), "/users/" + uid))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userDataFromDB = snapshot.val();
                    const userRole = userDataFromDB.role;
                    if (userRole === "admin") {
                        console.log("god mode");

                    } else {
                        console.log("nevykelis");
                    }
                } else {
                    console.log("no data");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } else{
        console.log("you are signed out")
    }
});