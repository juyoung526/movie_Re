let video = document.querySelector(".video"),
  folder = document.querySelector(".folder"),
  heart = document.querySelector(".heart");

//header 마우스 이벤트
video.addEventListener("mouseenter", showV);
function showV() {
  let submenu = document.querySelector(".main .videoSub");
  submenu.style.display = "block";
}

video.addEventListener("mouseleave", hideV);
function hideV() {
  let submenu = document.querySelector(".main .sub");
  submenu.style.display = "none";
}

folder.addEventListener("mouseenter", showF);
function showF() {
  let submenu = document.querySelector(".main .folderSub");
  submenu.style.display = "block";
}

folder.addEventListener("mouseleave", hideF);
function hideF() {
  let submenu = document.querySelector(".main .folderSub");
  submenu.style.display = "none";
}

heart.addEventListener("mouseenter", showH);
function showH() {
  let submenu = document.querySelector(".main .heartSub");
  submenu.style.display = "block";
}

heart.addEventListener("mouseleave", hideH);
function hideH() {
  let submenu = document.querySelector(".main .heartSub");
  submenu.style.display = "none";
}
