const fetchBannerData = async () => {
  const bg = await fetch("/database/movie");
  const a = await bg.json();
  const b = await a.reverse().slice(0, 6);
  return a;
};

window.addEventListener("load", async () => {
  const bannerData = await fetchBannerData();

  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");
  const bannerImg = document.getElementById("bannerImg");
  const bannerTitle = document.getElementById("bannerTitle");
  const sliderContainer = bannerImg.parentElement;
  let sliderIndex = 0,
    slideInterval;

  bannerImg.style.background = `url(${bannerData[0].image}) center / cover no-repeat`;
  bannerTitle.innerText = bannerData[0].title;
  bannerImg.setAttribute("href", bannerData[0].link);
  slideInterval = setInterval(() => moveSlider(1), 3000);

  const moveSlider = (n) => {
    sliderIndex = sliderIndex + n;
    sliderIndex === bannerData.length && n > 0 ? (sliderIndex = 0) : null;
    sliderIndex < 0 && n < 0 ? (sliderIndex = bannerData.length - 1) : null;
    bannerImg.style.background = `url(${bannerData[sliderIndex].image}) center / cover no-repeat`;
    bannerTitle.innerText = bannerData[sliderIndex].title;
  };

  sliderContainer.addEventListener(
    "mouseleave",
    () => (slideInterval = setInterval(() => moveSlider(1), 3000))
  );
  sliderContainer.addEventListener("mouseenter", () =>
    clearInterval(slideInterval)
  );
  leftBtn.addEventListener("click", () => moveSlider(-1));
  rightBtn.addEventListener("click", () => moveSlider(1));
});
