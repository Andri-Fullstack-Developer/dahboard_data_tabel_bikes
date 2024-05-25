const csvFile_age = "capstone_team_5_data _leaning.csv";

let countYouth = 0;
let countYoungAdults = 0;
let countAdults = 0;
let countSeniors = 0;

$.get(csvFile_age, (data) => {
  // console.log(data);
  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const headers = lines[0].split(",");
  const ageIndex = headers.indexOf("Age_Group");

  const filterAgeGroups = [
    "Youth (<25)",
    "Young Adults (25-34)",
    "Adults (35-64)",
    "Seniors (64+)",
  ];

  lines.slice(1).forEach((line) => {
    const columns = line.split(",");
    const ageGroup = columns[ageIndex].trim();
    if (filterAgeGroups.includes(ageGroup)) {
      // Menghitung jumlah entri untuk setiap kelompok usia
      switch (ageGroup) {
        case "Youth (<25)":
          countYouth++;
          break;
        case "Young Adults (25-34)":
          countYoungAdults++;
          break;
        case "Adults (35-64)":
          countAdults++;
          break;
        case "Seniors (64+)":
          countSeniors++;
          break;
        default:
          break;
      }
    }
  });

  // Menampilkan jumlah entri untuk setiap kelompok usia
  // console.log("Youth (<25) count:", countYouth);
  // console.log("Young Adults (25-34) count:", countYoungAdults);
  // console.log("Adults (35-64) count:", countAdults);
  // console.log("Seniors (64+) count:", countSeniors);

  // Menghitung persentase untuk setiap kelompok usia
  const total = countYouth + countYoungAdults + countAdults + countSeniors;
  const youthPercentage = (countYouth / total) * 100;
  const youngAdultsPercentage = (countYoungAdults / total) * 100;
  const adultsPercentage = (countAdults / total) * 100;
  const seniorsPercentage = (countSeniors / total) * 100;

  // console.log("persen", youthPercentage);
  // console.log("persen", youngAdultsPercentage);
  // console.log("persen", adultsPercentage);
  // console.log("persen", seniorsPercentage);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Age Group", "Percentage"],
      ["Adults (35-64)", adultsPercentage],
      ["Young Adults (25-34)", youngAdultsPercentage],
      ["Youth (<25)", youthPercentage],
      ["Seniors (64+)", seniorsPercentage],
    ]);

    var options = {
      height: 280,
      // width: 200,
      chartArea: {
        left: 20,
        top: 20,
        width: "90%",
        height: "80%",
      },
      colors: ["#006C80", "#0093A7", "#00C0CC", "#00E5FF"], // Updated colors to match the image
      legend: {
        position: "bottom",
        alignment: "center",

        textStyle: {
          fontSize: 12,
        },
      },
      pieSliceText: "percentage",
      pieSliceTextStyle: {
        color: "black",
      },
      tooltip: {
        text: "percentage",
      },
      backgroundColor: "none",
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("pie-chart")
    );

    chart.draw(data, options);
  }

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
});
