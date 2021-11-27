const fetchFilterData = async () => {
  const bg = await fetch("/database/website");
  const a = await bg.json();
  return a[0].filter;
};

window.addEventListener("load", async () => {
  const filterData = await fetchFilterData();

  const leftCon = document.getElementById("leftCon");
  const rightCon = document.getElementById("rightCon");
  const filters = document.getElementById("filters");
  const currentUrl = new window.URL(document.URL).pathname;

  filters.scrollLeft === 0
      ? leftCon.classList.add("off")
      : leftCon.classList.remove("off");
    filters.scrollLeft + filters.offsetWidth > filters.scrollWidth - 2
      ? ((filters.scrollLeft = filters.scrollWidth),
        rightCon.classList.add("off"))
      : rightCon.classList.remove("off");

  filterData.forEach((data) => {
    const a = document.createElement("a");
    a.setAttribute("href", data.link);
    data.link === currentUrl ? a.classList.add("active") : null;
    a.innerText = data.value;
    filters.appendChild(a);
  });

  filters.addEventListener("wheel", (e) => {
    e.preventDefault();
    filters.scrollLeft += e.deltaY;
  });

  filters.addEventListener("scroll", () => {
    filters.scrollLeft === 0
      ? leftCon.classList.add("off")
      : leftCon.classList.remove("off");
    filters.scrollLeft + filters.offsetWidth > filters.scrollWidth - 2
      ? ((filters.scrollLeft = filters.scrollWidth),
        rightCon.classList.add("off"))
      : rightCon.classList.remove("off");
  });

  const clickToScroll = (howMuch) => {
    filters.scrollLeft += howMuch;
  };

  leftCon
    .querySelector(".btn")
    .addEventListener("click", () => clickToScroll(-125));
  rightCon
    .querySelector(".btn")
    .addEventListener("click", () => clickToScroll(125));
});
