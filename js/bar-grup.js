const csvFile_bar_grub = "capstone_team_5_data _leaning.csv";

$.get(csvFile_bar_grub, (data) => {
  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split(",");
  const countryIndex = headers.indexOf("Country");
  const productCategoryIndex = headers.indexOf("Product_Category");

  // Memeriksa apakah "Country" dan "Product_Category" ditemukan dalam header
  // if (countryIndex === -1 || productCategoryIndex === -1) {
  //   console.error(
  //     "Kolom 'Country' atau 'Product_Category' tidak ditemukan dalam header."
  //   );
  //   return;
  // }

  const targetCountries = [
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Canada",
    "Australia",
  ];

  const countryProductCount = targetCountries.reduce((acc, country) => {
    acc[country] = {
      Bikes: 0,
      Accessories: 0,
      Clothing: 0,
    };
    return acc;
  }, {});

  lines.slice(1).forEach((line) => {
    const columns = line.split(",");
    const country = columns[countryIndex];
    const productCategory = columns[productCategoryIndex];

    if (targetCountries.includes(country)) {
      if (countryProductCount[country][productCategory] !== undefined) {
        countryProductCount[country][productCategory] += 1;
      }
    }
  });

  // Tampilkan hasil
  // console.log("Country Product Count:", targetCountries);

  const United_StatesBikes = [];
  const United_StatesAccessories = [];
  const United_StatesClothing = [];

  const United_KingdomBikes = [];
  const United_KingdomAccessories = [];
  const United_KingdomClothing = [];

  const GermanyBikes = [];
  const GermanyAccessories = [];
  const GermanyClothing = [];

  const FranceBikes = [];
  const FranceAccessories = [];
  const FranceClothing = [];

  const CanadaBikes = [];
  const CanadaAccessories = [];
  const CanadaClothing = [];

  const australiaBikes = [];
  const australiaAccessories = [];
  const australiaClothing = [];

  targetCountries.forEach((country) => {
    const counts = countryProductCount[country];
    // console.log(
    //   `${country} - Bikes: ${counts.Bikes}, Accessories: ${counts.Accessories}, Clothing: ${counts.Clothing}`
    // );
    if (counts) {
      switch (country) {
        case "United States":
          United_StatesBikes.push(counts.Bikes);
          United_StatesAccessories.push(counts.Accessories);
          United_StatesClothing.push(counts.Clothing);
          break;
        case "United Kingdom":
          United_KingdomBikes.push(counts.Bikes);
          United_KingdomAccessories.push(counts.Accessories);
          United_KingdomClothing.push(counts.Clothing);
          break;
        case "Germany":
          GermanyBikes.push(counts.Bikes);
          GermanyAccessories.push(counts.Accessories);
          GermanyClothing.push(counts.Clothing);
          break;
        case "France":
          FranceBikes.push(counts.Bikes);
          FranceAccessories.push(counts.Accessories);
          FranceClothing.push(counts.Clothing);
          break;
        case "Canada":
          CanadaBikes.push(counts.Bikes);
          CanadaAccessories.push(counts.Accessories);
          CanadaClothing.push(counts.Clothing);
          break;
        case "Australia":
          australiaBikes.push(counts.Bikes);
          australiaAccessories.push(counts.Accessories);
          australiaClothing.push(counts.Clothing);
          break;
        default:
          break;
      }
    }
  });
  console.log("Bikes United States:", United_StatesBikes);
  console.log("Accessories United States:", United_StatesAccessories);
  console.log("Clothing United States:", United_StatesClothing);

  //   console.log("Bikes United Kingdom:", United_KingdomBikes);
  //   console.log("Accessories United Kingdom:", United_KingdomAccessories);
  //   console.log("Clothing United Kingdom:", United_KingdomClothing);

  //   console.log("Bikes Germany:", GermanyBikes);
  //   console.log("Accessories Germany:", GermanyAccessories);
  //   console.log("Clothing Germany:", GermanyClothing);

  //   console.log("Bikes France:", FranceBikes);
  //   console.log("Accessories France:", FranceAccessories);
  //   console.log("Clothing France:", FranceClothing);

  //   console.log("Bikes Canada:", CanadaBikes);
  //   console.log("Accessories Canada:", CanadaAccessories);
  //   console.log("Clothing Canada:", CanadaClothing);

  //   console.log("Bikes Australia:", australiaBikes);
  //   console.log("Asesoris Australia:", australiaAccessories);
  //   console.log("Cluud Australia;", australiaClothing);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Country", "Bikes", "Accessories", "Clothing"],
      [
        "United States",
        United_StatesBikes,
        United_StatesAccessories,
        United_StatesClothing,
      ],
      [
        "United Kingdom",
        United_KingdomBikes,
        United_KingdomAccessories,
        United_KingdomClothing,
      ],
      ["Germany", GermanyBikes, GermanyAccessories, GermanyClothing],
      ["France", FranceBikes, FranceAccessories, FranceClothing],
      ["Canada", CanadaBikes, CanadaAccessories, CanadaClothing],
      ["Australia", australiaBikes, australiaAccessories, australiaClothing],
    ]);

    var options = {
      height: 300,
      // width: 600,
      chartArea: {
        left: 50,
        top: 50,
        width: "80%",
        height: "70%",
      },
      series: {
        0: { color: "#006C80" }, // Bikes
        1: { color: "#0093A7" }, // Accessories
        2: { color: "#00C0CC" }, // Clothing
      },
      bar: { groupWidth: "50%" },
      isStacked: true,
      legend: {
        position: "top",
        alignment: "center",
        textStyle: {
          fontSize: 12,
        },
      },
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("bar-grub")
    );

    chart.draw(data, options);
  }

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
});
