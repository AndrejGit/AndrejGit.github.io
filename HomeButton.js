var homeButton = document.getElementById("homeButton");

homeButton.addEventListener("mouseenter", mouseIn);
homeButton.addEventListener("mouseout", mouseExit);
homeButton.addEventListener("mousedown", clicked);
homeButton.addEventListener("mouseup", released);

function mouseIn() {
    homeButton.style.backgroundColor = "#505050";
}

function mouseExit() {
    homeButton.style.backgroundColor = "#282828";
}

function clicked() {
    homeButton.style.backgroundColor = "#707070";
}

function released() {
    homeButton.style.backgroundColor = "#AAAAAA";
    homeButton.style.backgroundColor = "#505050";
    window.location.assign("index.html");
}