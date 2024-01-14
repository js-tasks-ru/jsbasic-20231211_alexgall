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
    this.elem = document.createElement('table');
    this.createTable(rows);
  }

  createTable(data) {
    this.elem.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        ${data.map(row => `
          <tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button class="delete-btn">X</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;

    // Добавляем обработчики для кнопок удаления
    this.elem.querySelectorAll('.delete-btn').forEach(button => {
      button.onclick = () => {
        button.closest('tr').remove();
      };
    });
  }
}