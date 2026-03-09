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

document.addEventListener('DOMContentLoaded', () => {
  const previewBoxes = document.querySelectorAll('.ex_img');
  const SPEED = 150; // 초당 150px 이동

  previewBoxes.forEach((box) => {
    const img = box.querySelector('img');
    if (!img) return;

    const resetImage = () => {
      const currentY = getCurrentTranslateY(img);
      const returnDistance = Math.abs(currentY);
      const returnDuration = Math.max(returnDistance / SPEED, 0.4);

      img.style.transition = `transform ${returnDuration}s linear`;
      img.style.transform = 'translateY(0)';
    };

    const moveImage = () => {
      const hiddenHeight = img.offsetHeight - box.offsetHeight;

      if (hiddenHeight > 0) {
        const duration = Math.max(hiddenHeight / SPEED, 0.8);
        img.style.transition = `transform ${duration}s linear`;
        img.style.transform = `translateY(-${hiddenHeight}px)`;
      }
    };

    if (!img.complete) {
      img.addEventListener('load', () => {
        img.style.transform = 'translateY(0)';
      });
    }

    box.addEventListener('mouseenter', moveImage);
    box.addEventListener('mouseleave', resetImage);
  });

  window.addEventListener('resize', () => {
    previewBoxes.forEach((box) => {
      const img = box.querySelector('img');
      if (!img) return;
      img.style.transition = 'none';
      img.style.transform = 'translateY(0)';
    });
  });

  function getCurrentTranslateY(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m42;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.scroll-link, .section-link');
  const headerOffset = 20;

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.dataset.target;
      const targetEl = document.getElementById(targetId);

      if (!targetEl) return;

      const targetTop =
        targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
});

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