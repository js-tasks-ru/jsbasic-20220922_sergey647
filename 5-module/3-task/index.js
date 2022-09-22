function initCarousel() {
  let chosenPic = 1,
    pos = 0,
    el = document.getElementsByClassName("carousel__inner")[0];
  const offsetWidth = el.offsetWidth;

  let arrowLeft = document.getElementsByClassName("carousel__arrow_left ")[0];
  let arrowRight = document.getElementsByClassName("carousel__arrow_right")[0];

  const arrowInit = function (picNo) {
    arrowRight.style.display = picNo === 4 ? "none" : "";
    arrowLeft.style.display = picNo === 1 ? "none" : "";
  };

  arrowInit(chosenPic);
  arrowRight.onclick = function () {
    pos = pos - offsetWidth;
    el.style.transform = `translateX(${pos}px)`;
    chosenPic++;
    arrowInit(chosenPic);
  };
  arrowLeft.onclick = function () {
    pos = pos + offsetWidth;
    chosenPic--;
    el.style.transform = `translateX(${pos}px)`;
    arrowInit(chosenPic);
  };
}
