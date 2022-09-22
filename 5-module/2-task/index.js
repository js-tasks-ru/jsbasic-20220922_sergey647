function toggleText() {
  let btn = document.getElementsByClassName("toggle-text-button")[0];
  btn.onclick = function () {
    let text = document.getElementById("text");
    text.hidden = !text.hidden;
  };
}
