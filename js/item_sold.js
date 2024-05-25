const csvFile_ItemSold = "capstone_team_5_data _leaning.csv";

$.get(csvFile_ItemSold, (data) => {
  function parseCSV(data) {
    const lines = data.split("\n");
    const headers = lines[0].split(",");
    const rows = lines.slice(6);

    return rows.map((row) => {
      const values = row.split(",");
      return headers.reduce((object, header, index) => {
        object[header.trim()] = values[index].trim();
        return object;
      }, {});
    });
  }

  function sumItemSold(data) {
    return data.reduce((sum, row) => {
      const ItemSold = parseFloat(row.Order_Quantity);
      return sum + (isNaN(ItemSold) ? 0 : ItemSold);
    }, 0);
  }

  function formatRevenue(ItemSold) {
    // Menghitung nilai dalam juta
    const item_soldInMillions = ItemSold / 1_000;
    // Memformat angka dengan pemisah ribuan
    const formattedItemSold = item_soldInMillions.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `Rp. ${formattedItemSold} rb`;
  }

  const parsedData = parseCSV(data);
  const totalItemSold = sumItemSold(parsedData);

  const formattedItemSold = formatRevenue(totalItemSold);

  $("#itemSold").html(formattedItemSold);
  //   console.log("Total Item Sold: ", totalItemSold);
});
