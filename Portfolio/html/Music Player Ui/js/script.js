document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".progress");
    const playButton = document.querySelector(".play");
    
    let isPlaying = false;

    playButton.addEventListener("click", function () {
        if (!isPlaying) {
            progressBar.style.animation = "progressAnimation 5s linear forwards";
            isPlaying = true;
        } else {
            progressBar.style.animation = "none";
            isPlaying = false;
        }
    });
});
