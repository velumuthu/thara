import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAJstztwK4tEYGCxitjlS6Tu9uQUvpxkXs",
    authDomain: "thara-ai.firebaseapp.com",
    projectId: "thara-ai",
    storageBucket: "thara-ai.appspot.com",
    messagingSenderId: "570219477650",
    appId: "1:570219477650:web:3ca7a8a297ccfd1a02444b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    const submit = document.getElementById("login-btn");

    submit.addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById("uname").value.trim();
        const password = document.getElementById("pass").value.trim();

        if (email === "" || password === "") {
            alert("Email and Password cannot be empty.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email address.");
            return;
        }

        console.log("Email:", email, "Password:", password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User:", userCredential.user);
                localStorage.setItem('loggedIn', 'true');
                window.location.replace("index.html");
            })
            .catch((error) => {
                alert(error.message);
                console.error("Error:", error);
            });
    });
});
