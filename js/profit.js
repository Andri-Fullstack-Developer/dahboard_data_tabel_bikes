const csvFile_profit = "capstone_team_5_data _leaning.csv";

$.get(csvFile_profit, (data) => {
  function parseCSV(data) {
    const lines = data.split("\n");
    const headers = lines[0].split(",");
    const rows = lines.slice(3);

    return rows.map((row) => {
      const values = row.split(",");
      return headers.reduce((object, header, index) => {
        object[header.trim()] = values[index].trim();
        return object;
      }, {});
    });
  }

  function sumProfit(data) {
    return data.reduce((sum, row) => {
      const Profit = parseFloat(row.Profit);
      return sum + (isNaN(Profit) ? 0 : Profit);
    }, 0);
  }

  function formatRevenue(Profit) {
    // Menghitung nilai dalam juta dan membulatkannya
    const profitInMillions = (Profit / 1_000_000).toFixed(1);
    return `Rp. ${profitInMillions} jt`;
  }

  const parsedData = parseCSV(data);
  const totalProfit = sumProfit(parsedData);

  const formattedProfit = formatRevenue(totalProfit);

  $("#profit").html(formattedProfit);
  //   console.log("Total Profit: ", totalProfit);
});
