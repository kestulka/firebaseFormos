// firebase boilerplate

import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// -------------------

const insertButton = document.getElementById("insertBtn");
const getOneButton = document.getElementById("getOneBtn");
const getAllButton = document.getElementById("getAllBtn");
const updateButton = document.getElementById("updateBtn");
const deleteButton = document.getElementById("deleteBtn");

function clearInputFields() {
  document.getElementById("userIdInput").value = "";
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("favouriteFoodInput").value = "";
}

// functionality

insertButton.addEventListener("click", (event) => {
  event.preventDefault();

  const idValue = userIdInput.value;
  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;
  const emailValue = emailInput.value;
  const favoriteFoodValue = favouriteFoodInput.value;

  // noriu padaryti, kad id(+ idValue) neimtu is irasyto formoje
  set(ref(db, "users/" + idValue), {
    userId: idValue,
    username: usernameValue,
    password: passwordValue,
    email: emailValue,
    favoriteFood: favoriteFoodValue,
  })
    .then(() => {
      alert("user has been added!");
    })
    .catch((error) => {
      alert(error);
    });
  clearInputFields();
});

const dbRef = ref(getDatabase());

getOneButton.addEventListener("click", (event) => {
  event.preventDefault();

  const idValue = userIdInput.value;

  get(child(dbRef, `users/${idValue}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val()); // jei norima su alert displayinti: alert(JSON.stringify(snapshot.val(), null, 2));
      } else {
        alert(`no such data with id: ${idValue} is available`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  clearInputFields();
});

const usersRef = ref(db, "users"); // reference i "users" firebase collectiona

getAllButton.addEventListener("click", (event) => {
  event.preventDefault();

  get(usersRef)
    .then((snapshot) => {
      // then naudojamas kartu su get sinchroniskai, kai data gaunama, tada(then) ir vykdomas kodas
      const users = [];
      snapshot.forEach((childSnapshot) => {
        // iteruoja per kiekviena eilute sarase
        users.push(childSnapshot.val()); // is tos eilutes paimama reiksme supushinama i users array
      });
      console.log(users);
    })
    .catch((error) => {
      console.log(error);
    });
});
