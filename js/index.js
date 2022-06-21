// portfolio functions

const p_btns = document.querySelector(".p-btns");
const p_btn = document.querySelectorAll(".p-btn");
const p_img_element = document.querySelectorAll(".img-overlay");

p_btns.addEventListener("click", (e) => {
  const p_btn_clicked = e.target;

  p_btn.forEach((curElem) => curElem.classList.remove("p-btn-active"));
  p_btn_clicked.classList.add("p-btn-active");

  const btn_num = p_btn_clicked.dataset.btnNum;

  const img_active = document.querySelectorAll(`.p-btn--${btn_num}`);

  if (btn_num == undefined)
    p_img_element.forEach((curElem) =>
      curElem.classList.remove("p-img-not-active")
    );
  else if (btn_num != 1) {
    p_img_element.forEach((curElem) =>
      curElem.classList.add("p-img-not-active")
    );
    img_active.forEach((curElem) =>
      curElem.classList.remove("p-img-not-active")
    );
  } else
    p_img_element.forEach((curElem) =>
      curElem.classList.remove("p-img-not-active")
    );
});

//progressbar animation

const sectionWorkData = document.querySelector(".section-work-data");
const notActive = document.querySelectorAll(".cv-progress-bar");

notActive.forEach((curElem) => {
  curElem.classList.add("notActive");
});
const workObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    const countPercent = document.querySelectorAll(".count-per");
    notActive.forEach((curElem) => {
      curElem.classList.remove("notActive");
    });

    countPercent.forEach((curElem) => {
      const updatePercent = () => {
        const targetPercent = parseInt(curElem.dataset.percent);
        const initialPercent = parseInt(curElem.innerText);
        if (initialPercent < targetPercent) {
          curElem.innerText = initialPercent + 1;
          setTimeout(updatePercent, 30);
        }
      };
      updatePercent();
    });
    observer.unobserve(sectionWorkData);
  },
  {
    root: null,
    threshold: 0,
  }
);

workObserver.observe(sectionWorkData);

// scroll to top btn
const heroElement = document.querySelector(".section-hero");
const footerElement = document.querySelector(".section-footer");
const scrollElement = document.createElement("div");
scrollElement.classList.add("scrollTop-style");
scrollElement.innerHTML = `<ion-icon name="arrow-up-outline" class = "scroll-top "></ion-icon>`;

footerElement.after(scrollElement);
const scrollTop = () => {
  heroElement.scrollIntoView({ behavior: "smooth" });
};
scrollElement.addEventListener("click", scrollTop);

// sticky nav bar

const obs = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    !entry.isIntersecting
      ? document.body.classList.add("sticky")
      : document.body.classList.remove("sticky");
    !entry.isIntersecting
      ? scrollElement.classList.remove("hidebtn")
      : scrollElement.classList.add("hidebtn");
  },
  { root: null, threshold: 0 }
);

obs.observe(heroElement);
// responsive navbar
const navbar = document.querySelector(".navbar-btn");
const header = document.querySelector(".header");

navbar.addEventListener("click", () => {
  header.classList.toggle("active");
});
