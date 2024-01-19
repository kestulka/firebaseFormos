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
