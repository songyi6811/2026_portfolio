// document.addEventListener("DOMContentLoaded", () => {
//   if (typeof fullpage === "undefined") {
//     console.error("fullpage.js가 로드되지 않았어요. script 순서/CDN을 확인하세요.");
//     return;
//   }

//   new fullpage("#fullpage", {
//     autoScrolling: true,
//     navigation: true,
//     scrollingSpeed: 700,
//     verticalCentered: false, 
//   });
// });


Fancybox.bind("[data-fancybox]", {
  Thumbs: { autoStart: true }, // 아래 썸네일 띠(원하면 false)
  Toolbar: { display: ["close"] },
  infinite: true,
});

const el = document.getElementById("typewriter");

const texts = [
  "Thank you for watching!",
  "웹퍼블리셔 윤송이였습니다."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 80;        // 타이핑 속도
const deleteSpeed = 55;      // 지우는 속도
const pauseAfterType = 1100; // 다 쓴 뒤 멈춤(ms)
const pauseAfterDelete = 350;// 다 지운 뒤 멈춤(ms)

function tick() {
  const current = texts[textIndex];

  if (!isDeleting) {
    // typing
    charIndex++;
    el.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      // pause then start deleting
      setTimeout(() => {
        isDeleting = true;
        tick();
      }, pauseAfterType);
      return;
    }

    setTimeout(tick, typeSpeed);
  } else {
    // deleting
    charIndex--;
    el.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      // move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;

      setTimeout(tick, pauseAfterDelete);
      return;
    }

    setTimeout(tick, deleteSpeed);
  }
}

tick();