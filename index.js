const tabLinks = document.querySelectorAll('.desc');
const tabContents = document.querySelectorAll('.tab');

const openTab = (name , event) => {
  for (const tabLink of tabLinks) {
    tabLink.classList.remove('activeLink');
  }
  for (const tabContent of tabContents) {
    tabContent.classList.remove('active');
  }
event.currentTarget.classList.add('activeLink');
document.getElementById(name).classList.add('active');
};

  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");
  const navList = document.querySelector("nav ul");

  function openMenu() {
    navList.classList.add("show");
    menuIcon.classList.add("hide");
    closeIcon.classList.add("show");
  }

  function closeMenu() {
    navList.classList.remove("show");
    menuIcon.classList.remove("hide");
    closeIcon.classList.remove("show");
  }

