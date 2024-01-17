let screenWidth = 0;
const nav = document.getElementById("navigate");
const letterN = document.getElementById("changeColour");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("closeMenu");
const openMenu = document.getElementById("openMenu");
const menuClicks = document.getElementsByClassName("menuClick");
const navLinks = document.querySelectorAll(".nav-link");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
});

navLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
});

function handleLinkClick() {
    navLinks.forEach(link => {
        if (link.classList.contains("active")) link.classList.remove("active");
    });

    this.classList.add("active");
}

document.addEventListener("scroll", () => {
  if (window.scrollY) {
    nav.classList.add("blue");
    letterN.classList.add("white");
  } else {
    nav.classList.remove("blue");
    letterN.classList.remove("white");
  }
});

closeMenu.addEventListener("click", () => {
  menu.classList.add("hiddenNav");
  menu.classList.remove("divMenu");
  openMenu.classList.remove("hiddenNav");
});

openMenu.addEventListener("click", () => {
  menu.classList.add("divMenu");
  menu.classList.remove("hiddenNav");
  openMenu.classList.add("hiddenNav");
});

for (let i = 0; i < menuClicks.length; i++) {
  menuClicks[i].addEventListener("click", () => {
    menu.classList.add("hiddenNav");
    menu.classList.remove("divMenu");
    openMenu.classList.remove("hiddenNav");
  });
}
