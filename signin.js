// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8ZiPYAeBjTqciBl44OKSlORADsBTX9ps",
  authDomain: "access-bd762.firebaseapp.com",
  projectId: "access-bd762",
  storageBucket: "access-bd762.firebasestorage.app",
  messagingSenderId: "68649471333",
  appId: "1:68649471333:web:9c4a7a78bd709d06c2e58c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


    //login
    const submit1 = document.getElementById("login-btn");
    submit1.addEventListener("click", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Account login successfully");
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    });
    
    // forgot password
    const forget1 = document.getElementById("forget1");
    forget1.addEventListener("click", function(event) {
        event.preventDefault();  // Prevents the form from submitting
    
        const email = document.getElementById("email").value;
    
        if(!email){
          alert("enter email address")
        }
    
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent! Check your inbox.");
            })
            .catch((error) => {
                alert(error.message);
                console.error("Error:", error.code, error.message);
            });
    });