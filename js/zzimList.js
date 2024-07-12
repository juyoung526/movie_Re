let pick = document.querySelector(".pick");
let zzimList = document.querySelector("#zzimList");
console.log(pick);
console.log(zzimList);

pick.addEventListener("click", (event) => {
  event.preventDefault();
  zzimList.classList.toggle("action");
});
