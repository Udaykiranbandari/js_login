// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider, 
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
const dataBase = getFirestore();


//sign up 
const submit = document.getElementById("sign-btn");
submit.addEventListener("click", function (event) {
    event.preventDefault();
    
    submit.disabled = true;  // Disable button
    submit.textContent = "Processing..."; // Show loading text

    const remail = document.getElementById("remail").value;
    const password = document.getElementById("rpassword").value;

    createUserWithEmailAndPassword(auth, remail, password)
        .then((userCredential) => {
            alert("Account registered successfully");
            window.location.href = "./signin.html";
        })
        .catch((error) => {
            alert(error.message);
        })
        .finally(() => {
            submit.disabled = false;  // Enable button again
            submit.textContent = "Sign Up"; // Reset button text
        });
});


// forgot password
const forget1 = document.getElementById("forget");
forget1.addEventListener("click", function(event) {
    event.preventDefault();  // Prevents the form from submitting

    const email = document.getElementById("remail").value;

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

// google register
document.getElementById("google").addEventListener("click", async () => {
  try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(dataBase, "users", user.uid), {
          email: user.email,
          name: user.displayName,
          profilePicture: user.photoURL
      }, { merge: true });

      alert("Google Sign-In successful!");
      window.location.href = "./firebase.html"; // Redirect after login
  } catch (error) {
      console.error("Google Sign-In Error: ", error);
      alert(error.message);
  }
});








