function makeDiagonalRed(table) {
  let cell = 0;
  for (let row = 0; row < table.rows.length; row++) {
    table.rows[row].cells[cell].style.backgroundColor = "red";
    cell++;
  }
}
