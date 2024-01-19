// firebase setup

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

const idDiv = document.getElementById("id");
const nameDiv = document.getElementById("name");
const emailDiv = document.getElementById("email");
const genderDiv = document.getElementById("gender");

// -------------------

// creating html elements

const idInput = document.createElement("input");
idInput.type = "number";
idInput.placeholder = "Enter your id";
idDiv.appendChild(idInput);

const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.placeholder = "Enter your name";
nameDiv.appendChild(nameInput);

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.placeholder = "Enter your email";
emailDiv.appendChild(emailInput);

const genderInput = document.createElement("input");
genderInput.type = "text";
genderInput.placeholder = "Enter your gender";
genderDiv.appendChild(genderInput);

const insertBtn = document.getElementById("insert");
const updateBtn = document.getElementById("update");
const removeBtn = document.getElementById("remove");

// -------------------------------

// functionality

insertBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const userId = idInput.value;
  const userName = nameInput.value;
  const userEmail = emailInput.value;
  const userGender = genderInput.value;

  set(ref(db, "users/" + userId), {
    id: userId,
    username: userName,
    email: userEmail,
    gender: userGender,
  })
    .then(() => {
      alert("user added sucessfully");
    })
    .catch((error) => {
      alert(error);
    });
});

updateBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const userId = idInput.value;

  get(child(ref(db), `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        idInput.value = snapshot.val().id;
        nameInput.value = snapshot.val().name;
        emailInput.value = snapshot.val().email;
        genderInput.value = snapshot.val().gender;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
