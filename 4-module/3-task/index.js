function highlight(table) {
  let currentRow, available, gender, age;
  for (let row = 0; row < table.rows.length; row++) {
    currentRow = table.rows[row];
    available = currentRow.cells[3].getAttribute("data-available");
    gender = currentRow.cells[2].innerHTML;
    age = currentRow.cells[1].innerHTML;

    if (available === "true") {
      currentRow.classList.add("available");
    } else if (available === "false") {
      currentRow.classList.add("unavailable");
    } else {
      currentRow.hidden = "true";
    }
    if (gender === "m") {
      currentRow.classList.add("male");
    } else if (gender === "f") {
      currentRow.classList.add("female");
    }
    if (+age < 18) {
      currentRow.style.textDecoration = "line-through";
    }
  }
}
