import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);

 
const nameDiv = document.getElementById('name');
const emailDiv = document.getElementById('email');
const genderDiv = document.getElementById('gender');

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Enter your name';
nameDiv.appendChild(nameInput);

const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.placeholder = 'Enter your email';
emailDiv.appendChild(emailInput);

const genderInput = document.createElement('input');
genderInput.type = 'text';
genderInput.placeholder = 'Enter your gender';
genderDiv.appendChild(genderInput);

const insertBtn = document.getElementById("insert")
const updateBtn = document.getElementById("update")
const removeBtn = document.getElementById("remove")

insertBtn.addEventListener("click", (event) => {
    event.preventDefault()

    const userName = nameInput.value;
    const userEmail = emailInput.value;
    const userGender = genderInput.value;
})
