const link = document.querySelectorAll(".link");
const sliderContainer = document.querySelector(".slider1");
const slide = document.querySelectorAll(".slide1");
const SAvatarContainer = document.querySelector(".avatar-slider");
const avatarSlide = document.querySelectorAll(".slide-avo");
const dotContainer = document.querySelector(".dots");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const video = document.querySelector("video");
const menu = document.querySelector(".menu");
const sliders = document.querySelector(".sliders");
const card = document.querySelectorAll(".card");
const back = document.querySelector(".back");

let avatarHeight = avatarSlide[0].clientWidth;
let slideHeight = slide[0].clientHeight;
let currentIndexAvatar = 0;
let currentIndex = 0;
let autoPlayInterval;
let preveuosIndex = 0;
let state = false;
let lastTouchY = 0;
let lastScrollTime = 0;
let ili = avatarSlide.length - 1 === currentIndexAvatar;
const SCROLL_DELAY = 800;
const SWIPE_THRESHOLD = 100;

let slideInterval;

function updateSlider() {
  sliderContainer.style.transform = `translateY(${
    -currentIndex * slideHeight
  }px)`;
  link.forEach((item, index) =>
    item.classList.toggle("active", index === currentIndex)
  );
  if (currentIndex === 1) {
    console.log(true);
    auto()
    
    video.pause();
  } else if(currentIndex === 2) {
    video.pause()
    console.log(2);
    clearInterval(autoPlayInterval)
    
  }else{
    video.play()
  }

}

function ChangeSlide(delta) {
  const now = Date.now();
  if (now - lastScrollTime < SCROLL_DELAY) return;
  lastScrollTime = now;
  currentIndex = (currentIndex + delta + slide.length) % slide.length;
  updateSlider();
}

link.forEach((item) =>
  item.addEventListener("click", () => {
    currentIndex = parseInt(item.getAttribute("data-index"));
    updateSlider();
  })
);
sliderContainer.addEventListener("touchstart", (event) => {
  lastTouchY = event.touches[0].clientY;
});

sliderContainer.addEventListener("touchmove", (event) => {
  let touchY = event.touches[0].clientY;
  let deltaY = lastTouchY - touchY;

  if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
    ChangeSlide(deltaY > 0 ? 1 : -1);
    lastTouchY = touchY;
  }
});
sliderContainer.addEventListener("wheel", (event) => {
  if (
    Math.abs(event.deltaY) > Math.abs(event.deltaX) &&
    Math.abs(event.deltaY) > 50
  ) {
    ChangeSlide(event.deltaY > 0 ? 1 : -1);
  }
  op()
});

back.addEventListener("click", () => {
  menu.classList.remove("hidden");
  sliders.classList.add("hidden");
});

function avatarChange() {
  SAvatarContainer.style.transform = `translateX(${
    -currentIndexAvatar * avatarHeight - 10
  }px)`;
}
function nextSlide() {
  if (currentIndexAvatar >= avatarSlide.length - 1) return;

  currentIndexAvatar++;
  avatarChange();

  if (currentIndexAvatar === avatarSlide.length) {
    currentIndexAvatar = 0;
    SAvatarContainer.style.transform = `translateX(${
      -currentIndexAvatar * avatarHeight
    }px)`;
  }
}
next.addEventListener("click", () => {
  nextSlide();
  op()
});

function prevSlide() {
  if (currentIndexAvatar <= 0) return;
  currentIndexAvatar--;
  avatarChange();
  updateDots();
}
prev.addEventListener("click", () => {
  prevSlide();
  op()

});

function goToSlide(index) {
  currentIndexAvatar = index;
  avatarChange();
  updateDots();
}

video.addEventListener("ended", () => {
  currentIndex += 1;
  updateSlider();
  video.pause();
  if (currentIndexAvatar >= avatarSlide.length - 1) {
    clearInterval(autoPlayInterval);
    return;
  }

  clearInterval(autoPlayInterval);
  auto()
});
function auto() {
   autoPlayInterval = setInterval(() => {
    nextSlide();
    op()
    avatarChange();
    if (currentIndexAvatar >= avatarSlide.length - 1) {
      clearInterval(autoPlayInterval);
    }
  }, 4000)
}
function op() {
  if (currentIndexAvatar === 0) {
    prev.classList.add("disable");
  } else if (currentIndexAvatar === avatarSlide.length - 1) {
    next.classList.add("disable");
  } else {
    next.classList.remove("disable");
    prev.classList.remove("disable");
  }
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndexAvatar);
  });
}
function closeAll() {
  document.querySelector(".container").classList.add("hidden");
}
let isMuted = video.muted;
function mute() {
  const vol = document.querySelector(".volume");
  if (isMuted) {
    video.muted = false;
    isMuted = false;
    vol.innerHTML = `<i class="bi bi-volume-up-fill"></i>`;
  } else {
    video.muted = true;
    isMuted = true;
    vol.innerHTML = `<i class="bi bi-volume-mute-fill"></i>`;
  }
}
