const imageNames = [
    "IMG_0241.jpg", "IMG_1041.jpg", "IMG_1283.jpg", "IMG_1286.jpg", "IMG_1380.jpg",
    "IMG_1866.jpg", "IMG_4809.jpg", "IMG_5952.jpg", "IMG_6501.jpg", "IMG_6815.jpg",
    "IMG_7327.jpg", "IMG_7959.jpg", "IMG_7974.jpg", "IMG_8162.jpg", "IMG_8205.jpg",
    "IMG_8468.jpg", "IMG_8596.jpg", "IMG_8951.jpg", "IMG_8968.jpg", "IMG_8982.jpg",
    "IMG_8986.jpg", "IMG_9019.jpg", "IMG_9177.jpg", "IMG_9918.jpg", "IMG_9930.jpg"
];

// Function to shuffle images randomly
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Shuffle image order
const shuffledImages = shuffleArray(imageNames);

// Create images array for gallery
const images = shuffledImages.map(name => ({
    title: name.replace(/_/g, " ").replace(".jpg", ""), // Convert filename to a readable title
    url: `/${name}`
}));

const FLIP_SPEED = 750;
let flipTiming = {
    duration: FLIP_SPEED,
    iterations: 1
};

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
