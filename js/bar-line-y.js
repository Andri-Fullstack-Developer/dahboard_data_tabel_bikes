const csvFile_bar_line_y = "capstone_team_5_data _leaning.csv";

$.get(csvFile_bar_line_y, (data) => {
  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split(",");
  const countryIndex = headers.indexOf("Country");
  const genterIndex = headers.indexOf("Customer_Gender");

  const targetCountries = [
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Canada",
    "Australia",
  ];

  const genderConst = targetCountries.reduce((acc, gender) => {
    acc[gender] = {
      M: 0,
      F: 0,
    };
    return acc;
  }, {});

  lines.slice(1).forEach((line) => {
    const columns = line.split(",");
    const gender = columns[countryIndex];
    const genderIndex = columns[genterIndex];

    if (targetCountries.includes(gender)) {
      if (genderConst[gender][genderIndex] !== undefined) {
        genderConst[gender][genderIndex] += 1;
      }
    }
  });

  const United_StatesMale = [];
  const United_StatesFemale = [];

  const United_KingdomMale = [];
  const United_KingdomFemale = [];

  const GermanyMale = [];
  const GermanyFemale = [];

  const FranceMale = [];
  const FranceFemale = [];

  const CanadaMale = [];
  const CanadaFemale = [];

  const AustraliaMale = [];
  const AustraliaFemale = [];

  targetCountries.forEach((gender) => {
    const counts = genderConst[gender];

    if (counts) {
      switch (gender) {
        case "United States":
          United_StatesMale.push(counts.M);
          United_StatesFemale.push(counts.F);
          break;
        case "United Kingdom":
          United_KingdomMale.push(counts.M);
          United_KingdomFemale.push(counts.F);
          break;
        case "Germany":
          GermanyMale.push(counts.M);
          GermanyFemale.push(counts.F);
          break;
        case "France":
          FranceMale.push(counts.M);
          FranceFemale.push(counts.F);
          break;
        case "Canada":
          CanadaMale.push(counts.M);
          CanadaFemale.push(counts.F);
          break;
        case "Australia":
          AustraliaMale.push(counts.M);
          AustraliaFemale.push(counts.F);
          break;
        default:
          break;
      }
    }
  });

  // console.log("United States Male:", United_StatesMale);
  // console.log("United States Female:", United_StatesFemale);

  // console.log("United Kingdom Male:", United_KingdomMale);
  // console.log("United Kingdom Female:", United_KingdomFemale);

  // console.log("Germany Male:", GermanyMale);
  // console.log("Germany Female:", GermanyFemale);

  // console.log("France Male:", FranceMale);
  // console.log("France Female:", FranceFemale);

  // console.log("Canada Male:", CanadaMale);
  // console.log("Canada Female:", CanadaFemale);

  // console.log("Australia Male:", AustraliaMale);
  // console.log("Australia Female:", AustraliaFemale);

  // Diahgraj
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "United States",
        "Australia",
        "United Kingdom",
        "Germany",
        "France",
        "Canada",
      ],
      datasets: [
        {
          label: "M",
          data: [
            United_StatesMale,
            AustraliaMale,
            United_KingdomMale,
            GermanyMale,
            FranceMale,
            CanadaMale,
          ],
          // borderWidth: 2,
          backgroundColor: "#00838F",
          // barThickness: 16,
          // categoryPercentage: 9,
          // barPercentage: 3,
        },
        {
          label: "F",
          data: [
            United_StatesFemale,
            AustraliaFemale,
            United_KingdomFemale,
            GermanyFemale,
            FranceFemale,
            CanadaFemale,
          ],
          // borderWidth: ,
          backgroundColor: "#4DD0E1",
          // barThickness: 16,
          // categoryPercentage: 9,
          // barPercentage: 3,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + " jt";
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 10, // Adjust the font size here
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.x !== null) {
                label += context.parsed.x + " jt";
              }
              return label;
            },
          },
        },
        datalabels: {
          anchor: "end",
          align: "right",
          formatter: function (value, context) {
            return value + " jt";
          },
          color: "white",
          font: {
            weight: "bold",
            size: 3,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
});
