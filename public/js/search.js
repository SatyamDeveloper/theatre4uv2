const searchInput = document.getElementById("searchInput");
const clearInput = document.getElementById("clearInput");
const searchBtn = document.getElementById("searchBtn");
const searchList = document.getElementById("searchList");
const clickToSearch = document.getElementById("clickToSearch");
const searchForm = searchInput.parentElement;

clickToSearch.addEventListener('click',()=>{
  searchForm.parentElement.classList.add('clickSearch')
})

searchForm.addEventListener("click", () =>
  searchInput.value === "" ? searchInput.focus() : null
);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value != "") {
    searchForm.submit();
  }
});

{/* <iframe src="https://www.youtube.com/embed/SXr8Rb97nIk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

searchInput.addEventListener("input", () =>
  searchInput.value != ""
    ? (clearInput.classList.add("act"), searchList.classList.add("act"))
    : (clearInput.classList.remove("act"), searchList.classList.remove("act"))
);

searchInput.addEventListener("focusin", () =>
  searchInput.value != "" ? searchList.classList.add("act") : null
);

clearInput.addEventListener("click", () => {
  searchInput.focus();
  searchInput.value = "";
  clearInput.classList.remove("act");
  searchList.classList.remove("act");
  searchForm.parentElement.classList.remove('clickSearch')
});

searchBtn.addEventListener("click", () =>
  searchInput.value != "" ? searchForm.submit() : searchInput.focus()
);

const fetchSearchData = async () => {
  const bg = await fetch("/database/website");
  const a = await bg.json();
  return a[0].searchListData;
};

window.addEventListener("load", async () => {
  const searchListData = await fetchSearchData();

  searchListData.forEach((data) => {
    const p = document.createElement("p");
    p.innerText = data;
    searchList.appendChild(p);
  });

  const searchListItem = searchList.querySelectorAll("p");

  searchListItem.forEach((item) => {
    item.addEventListener("click", () => {
      searchInput.value = item.innerText;
      searchForm.submit();
      searchList.classList.remove("act");
    });
  });

  let searchStatus = false;
  searchForm.addEventListener("mouseleave", () => (searchStatus = false));
  searchForm.addEventListener("mouseenter", () => (searchStatus = true));

  document.addEventListener("click", () =>
    searchStatus === false ? searchList.classList.remove("act") : null
  );
});
