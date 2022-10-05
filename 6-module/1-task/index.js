/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement("table");
    this.elem.setAttribute("border", "1");
    this.render();
    return this;
  }
  render() {
    let table = this.elem;
    let th, tr, td, button;
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    let head = thead.insertRow(0);
    const titles = ["Имя", "Возраст", "Зарплата", "Город", ""];
    const values = ["name", "age", "salary", "city", "x"];
    titles.forEach((item) => {
      th = document.createElement("th");
      th.innerHTML = item;
      head.append(th);
    });
    this.rows.forEach((item) => {
      tr = document.createElement("tr");
      values.forEach((val) => {
        td = document.createElement("td");
        if(val === 'x') {
          button = document.createElement("button");
          button.innerHTML = "X";
          td.append(button);
          button.addEventListener('click', this.onClick);
        } else {
          td.innerHTML = item[val];
        }
        tr.append(td);
        tbody.append(tr);
      });
    });
    table.append(thead);
    table.append(tbody);
  }
  onClick(e) {
    e.target.closest('tr').remove();
  }
}
