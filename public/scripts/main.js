src="https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js"

var firebaseConfig = {
    apiKey: "AIzaSyB_FGLrYcB1n7XOdNkqxKfBBE6TErGPVUw",
    authDomain: "my-profile-6a2db.firebaseapp.com",
    databaseURL: "https://my-profile-6a2db.firebaseio.com",
    projectId: "my-profile-6a2db",
    storageBucket: "",
    messagingSenderId: "763112332439",
    appId: "1:763112332439:web:a5211253ecf7d097"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('contactForm').addEventListener('submit', submitForm);

// Reference messages collection
var messagesRef = firebase.database().ref('Users/{userId}/');

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');


  saveMessage(name, email, message);


  document.getElementById('contactForm').reset();
  grecaptcha.reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    message:message
  });

}