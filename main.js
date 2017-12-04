// Get the modal
var menumodal = document.getElementById('myMenuModal');

// Get the button that opens the modal
var menubtn = document.getElementById("myMenuBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
menubtn.onclick = function() {
    menumodal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    menumodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == menumodal) {
        menumodal.style.display = "none";
    }
}
