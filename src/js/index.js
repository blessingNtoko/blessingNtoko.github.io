const navLinks = document.querySelectorAll(".nav-link");

document.addEventListener("DOMContentLoaded", () => {
  navLinks.forEach(link => {
    if (window.location.href === link.href) {
      link.classList.add("active");
    };
  });
});
