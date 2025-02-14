// Get image paths from HTML
const imageElements = document.querySelectorAll("#image-container div");
const imageNames = Array.from(imageElements).map(el => el.getAttribute("data-image"));

// Function to shuffle images randomly
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Shuffle images
const shuffledImages = shuffleArray(imageNames);

// Create images array for gallery
const images = shuffledImages.map(url => ({
    title: url.split("/").pop().replace(/_/g, " ").replace(".jpg", ""),
    url: url
}));

const FLIP_SPEED = 750;
let flipTiming = { duration: FLIP_SPEED, iterations: 1 };

// Flip animations
let flipAnimationTop = [
    { transform: "rotateX(0)" },
    { transform: "rotateX(-90deg)" },
    { transform: "rotateX(-90deg)" }
];
let flipAnimationBottom = [
    { transform: "rotateX(90deg)" },
    { transform: "rotateX(90deg)" },
    { transform: "rotateX(0)" }
];

let flipAnimationTopReverse = [
    { transform: "rotateX(-90deg)" },
    { transform: "rotateX(-90deg)" },
    { transform: "rotateX(0)" }
];
let flipAnimationBottomReverse = [
    { transform: "rotateX(0)" },
    { transform: "rotateX(90deg)" },
    { transform: "rotateX(90deg)" }
];

const flipGallery = document.getElementById("flip-gallery");
const flipUnite = flipGallery.querySelectorAll(".unite");

let currentIndex = 0;

function updateGallery(currentIndex, isReverse = false) {
    const topAnimation = isReverse ? flipAnimationTopReverse : flipAnimationTop;
    const bottomAnimation = isReverse ? flipAnimationBottomReverse : flipAnimationBottom;

    flipGallery.querySelector(".overlay-top").animate(topAnimation, flipTiming);
    flipGallery.querySelector(".overlay-bottom").animate(bottomAnimation, flipTiming);

    flipGallery.style.setProperty("--title-y", "-1rem");
    flipGallery.style.setProperty("--title-opacity", 0);
    flipGallery.setAttribute("data-title", "");

    flipUnite.forEach((el, idx) => {
        let delay = (isReverse ? (idx !== 1 && idx !== 2) : (idx === 1 || idx === 2))
            ? FLIP_SPEED - 200
            : 0;

        setTimeout(() => setActiveImage(el), delay);
    });

    setTimeout(() => setImageTitle(), FLIP_SPEED * 0.5);
}

function setActiveImage(el) {
    el.style.backgroundImage = `url("${images[currentIndex].url}")`;
}

function setImageTitle() {
    flipGallery.setAttribute("data-title", images[currentIndex].title);
    flipGallery.style.setProperty("--title-y", "0");
    flipGallery.style.setProperty("--title-opacity", 1);
}

function updateIndex(increment) {
    const isReverse = increment < 0;
    currentIndex = (currentIndex + increment + images.length) % images.length;
    updateGallery(currentIndex, isReverse);
}

document.querySelectorAll("[data-gallery-nav]").forEach((btn) => {
    btn.addEventListener("click", () => updateIndex(parseInt(btn.dataset.galleryNav)));
});

function defineFirstImg() {
    flipUnite.forEach((el) => {
        setActiveImage(el);
        setImageTitle(el);
    });
}
defineFirstImg();
