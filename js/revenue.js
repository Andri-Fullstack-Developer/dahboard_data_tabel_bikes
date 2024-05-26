const csvFile = "capstone_team_5_data _leaning.csv";
$.get(csvFile, (data) => {
  function parseCSV(data) {
    const lines = data.split("\n");
    const headers = lines[0].split(",");
    const rows = lines.slice(1);

    return rows.map((row) => {
      const values = row.split(",");
      return headers.reduce((object, header, index) => {
        object[header.trim()] = values[index].trim();
        return object;
      }, {});
    });
  }

  function sumRevenue(data) {
    return data.reduce((sum, row) => {
      const revenue = parseFloat(row.Revenue);
      return sum + (isNaN(revenue) ? 0 : revenue);
    }, 0);
  }

  function formatRevenue(revenue) {
    // Menghitung nilai dalam juta dan membulatkannya
    const revenueInMillions = (revenue / 1_000_000).toFixed(1);
    return `Rp. ${revenueInMillions} jt`;
  }

  const parsedData = parseCSV(data);
  const totalRevenue = sumRevenue(parsedData);

  const formattedRevenue = formatRevenue(totalRevenue);

  $("#revenue").html(formattedRevenue);
  //   console.log("Total Revenue: ", totalRevenue);
});
