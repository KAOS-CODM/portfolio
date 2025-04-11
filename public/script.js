const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentGroup = [];
let currentIndex = 0;

// Open lightbox with selected image
document.querySelectorAll(".project").forEach(project => {
    const imgs = project.querySelectorAll(".lightbox-link");

    imgs.forEach((img, index) => {
        img.addEventListener("click", function () {
            currentGroup = Array.from(imgs);
            currentIndex = index;
            lightboxImg.src = this.src;
            lightbox.style.display = "flex";
        });
    });
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Previous image
prevBtn.addEventListener("click", () => {
    if (currentGroup.length) {
        currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
        lightboxImg.src = currentGroup[currentIndex].src;
    }
});

// Next image
nextBtn.addEventListener("click", () => {
    if (currentGroup.length) {
        currentIndex = (currentIndex + 1) % currentGroup.length;
        lightboxImg.src = currentGroup[currentIndex].src;
    }
});

// Close on outside click
lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

fetch('projects.json')
.then(res => res.json())
.then(data => {
    const track = document.getElementById('slideshow-track');
    data.forEach(project => {
        const img = document.createElement('img');
        img.src = project.img;
        img.alt = project.alt;
        track.appendChild(img);
    });
    // Duplicate content to allow seamless scrolling
    data.forEach(project => {
        const img = document.createElement('img');
        img.src = project.img;
        img.alt = project.alt;
        track.appendChild(img);
    });
});