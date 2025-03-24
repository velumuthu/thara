import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJstztwK4tEYGCxitjlS6Tu9uQUvpxkXs",
    authDomain: "thara-ai.firebaseapp.com",
    projectId: "thara-ai",
    storageBucket: "thara-ai.appspot.com",
    messagingSenderId: "570219477650",
    appId: "1:570219477650:web:3ca7a8a297ccfd1a02444b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const submit = document.getElementById("register-btn");

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

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const dialog = document.createElement("div");
                dialog.style.position = "fixed";
                dialog.style.top = "50%";
                dialog.style.left = "50%";
                dialog.style.transform = "translate(-50%, -50%)";
                dialog.style.backgroundColor = "#fff";
                dialog.style.padding = "20px";
                dialog.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                dialog.style.borderRadius = "8px";
                dialog.style.zIndex = "1000";
                dialog.style.display = "flex";
                dialog.style.flexDirection = "column";
                dialog.style.alignItems = "center";
                dialog.innerText = "Account Created Successfully!";

                const closeButton = document.createElement("button");
                closeButton.innerText = "Close";
                closeButton.style.marginTop = "10px";
                closeButton.style.padding = "5px 10px";
                closeButton.style.border = "none";
                closeButton.style.backgroundColor = "#007BFF";
                closeButton.style.color = "#fff";
                closeButton.style.borderRadius = "4px";
                closeButton.style.cursor = "pointer";

                closeButton.addEventListener("click", () => {
                  document.body.removeChild(dialog);
                });

                dialog.appendChild(closeButton);
                document.body.appendChild(dialog);

                dialog.appendChild(closeButton);
                document.body.appendChild(dialog);
                console.log("User:", userCredential.user);
            })
            .catch((error) => {
                alert(error.message);
                console.error("Error:", error);
            });
    });
});