$(document).ready(function () {
  $("#myTable").DataTable({
    responsive: true,
    pagingType: "simple_numbers", // Menampilkan nomor halaman sederhana (1, 2, 3, ...)
  });
});
const csvFile_tabelData = "capstone_team_5_data _leaning.csv";

$.get(csvFile_tabelData, (data) => {
  const rows = data.split("\n");

  for (let i = 1; i < rows.length && i <= 10; i++) {
    // Hanya mengambil 10 baris pertama
    const rowData = rows[i].split(",");
    const selectedColumns = [
      i, // Nomor urutan
      rowData[8],
      rowData[10],
      rowData[15],
      rowData[14],
      rowData[16],
    ]; // Mengambil kolom yang dipilih
    addRowToTable(selectedColumns);
  }
});

function addRowToTable(data) {
  const tableBody = document.getElementById("tableBody");
  const newRow = document.createElement("tr");

  data.forEach((cell) => {
    const newCell = document.createElement("td");
    newCell.textContent = cell;
    newRow.appendChild(newCell);
  });

  tableBody.appendChild(newRow);
}
