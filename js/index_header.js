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
// 영화 항목 클릭 이벤트 처리
document.addEventListener('click', function (event) {
  const movieElement = event.target.closest('[id^="movie-"]');
  if (movieElement) {
    const movieId = movieElement.id.split('-')[1];
    navigateToMovieDetail(movieId);
  }
});

// 영화 상세 페이지로 이동하는 함수
function navigateToMovieDetail(movieId) {
  window.location.href = `detail.html?id=${movieId}`;
  console.log(`Navigating to movie detail page for movie ID ${movieId}`);
}
