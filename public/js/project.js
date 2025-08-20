const projectsContainer = document.getElementById("projects-container");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentGroup = [];
let currentIndex = 0;

fetch("projects.json")
  .then(res => res.json())
  .then(data => {
    data.forEach((project, i) => {
      // Create project card
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");

      projectDiv.innerHTML = `
        <h3>${project.title}</h3>
        <div class="project-thumb">
          <img src="${project.images[0]}" alt="${project.title} Thumbnail" class="thumb" data-index="${i}">
        </div>
        <p>${project.description}</p>
        <a href="${project.site}" target="_blank">View Project Site</a>
        <p>View my work on <a href="${project.github}" target="_blank">GitHub</a></p>
      `;

      projectsContainer.appendChild(projectDiv);
    });

    // Attach click listeners to thumbnails
    document.querySelectorAll(".thumb").forEach((thumb, i) => {
      thumb.addEventListener("click", () => {
        fetch("projects.json")
          .then(res => res.json())
          .then(projects => {
            currentGroup = projects[i].images; // set current group of images
            currentIndex = 0; // start at first image
            lightboxImg.src = currentGroup[currentIndex];
            lightbox.style.display = "flex";
          });
      });
    });
  });

// Lightbox controls
closeBtn.addEventListener("click", () => lightbox.style.display = "none");

prevBtn.addEventListener("click", () => {
  if (currentGroup.length) {
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    lightboxImg.src = currentGroup[currentIndex];
  }
});

nextBtn.addEventListener("click", () => {
  if (currentGroup.length) {
    currentIndex = (currentIndex + 1) % currentGroup.length;
    lightboxImg.src = currentGroup[currentIndex];
  }
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});