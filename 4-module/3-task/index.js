function highlight(table) {
  let rows = table.tBodies[0].rows;

  for (let row of rows) {
    let statusCell = row.cells[3];
    let dataAvailable = statusCell.getAttribute("data-available");

    if (dataAvailable) {
      row.classList.add(dataAvailable === "true" ? "available" : "unavailable");
    } else {
      row.hidden = true;
    }

    let genderCell = row.cells[2];
    let gender = genderCell.textContent.trim();
    row.classList.add(gender === "m" ? "male" : "female");

    let ageCell = row.cells[1];
    let age = parseInt(ageCell.textContent, 10);
    if (age < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
