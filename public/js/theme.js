const htmlElem = document.querySelector("html");
const themeBtn = document.getElementById("themeBtn");
const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  return theme;
};
let currentTheme = localStorage.getItem("theme") || setTheme("dark"),
  newTheme;
htmlElem.classList.add(currentTheme);

themeBtn.addEventListener("click", () => {
  htmlElem.classList.remove("light");
  currentTheme = localStorage.getItem("theme") || setTheme("dark");
  currentTheme === "dark"
    ? (newTheme = setTheme("light"))
    : (newTheme = setTheme("dark"));
  htmlElem.classList.add(newTheme);
});
