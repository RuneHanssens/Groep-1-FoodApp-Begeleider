const categories = ['MOVEMENT', 'WATER', 'VEGETABLE', 'FRUIT', 'NUTS', 'STARCHPRODUCT', 'DAIRYFISHPOULTRY', 'FATTYFOOD', 'SNACK'];
let categoryString;
let usernameString;
let myChart;

render = data => {
  var ctx = document.getElementById("myChart").getContext("2d");
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Beweging", "Water", "Groenten", "Fruit", "Noten", "Graanproducten", "Vis, Gevogelte, ...", "Vlees", "Rest"],
      datasets: [
        {
          label: "Punten",
          data: data ? data.map(o => o.Points) : [],
          backgroundColor: data
            ? data.map(o =>
                o.OverMax == "true"
                  ? "rgba(255,99,132,0.2)"
                  : o.OverMin == "true"
                  ? "rgba(75, 192, 192, 0.2)"
                  : "rgba(255, 206, 86, 0.2)"
              )
            : [],
          borderColor: data
            ? data.map(o =>
                o.OverMax == "true"
                  ? "rgba(255,99,132,1)"
                  : o.OverMin == "true"
                  ? "rgba(75, 192, 192, 1)"
                  : "rgba(255, 206, 86, 1)"
              )
            : [],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              suggestedMax: 100
            }
          }
        ]
      },
      legend: {
        display: false
      },
      onClick: (event, elements) => onBarClick(elements),
    }
  });
};

focusGraph = () => {
  $("#myChart")[0].scrollIntoView({ block: "end", behavior: "smooth" });
  setTimeout(() => {
    window.scrollBy(0, 20);
  }, 300);
};

onBarClick = async elements => {
  if (elements) {
    if (elements[0]) {
      let category = categories[elements[0]._index];
      try {
        $("#myTable").empty();
        let data = await fetch(
          `http://193.191.177.8:10634/api/site/user/day/${category}?username=${usernameString}&date=${dateString}`
        );
        let jsonData = await data.json();
        console.log(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
          jsonData[i];
          $("#myTable").append(
            ` 
            <tr>
              <th scope="col">${i + 1}</th>
              <td scope="row">${jsonData[i]}</td>
            </tr>`
          );
        }
      } catch (error) {
        console.log(error);
      }
      if (elements.length > 0) {
        $("#table")[0].scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  }
};

submit = async () => {
  $("#myTable").empty();
  console.log("submitting data");
  let username = $("#userInput").val();
  let date = $("#mydatepicker").val();
  let errors = [];

  if (username != "" && username != null) {
    console.log("username OK");
  } else {
    errors.push("Vul een gebruikersnaam in");
  }

  if (date != null && date != "") {
    console.log("datum OK");
  } else {
    errors.push("Kies een datum");
  }

  if (errors.length == 0) {
    $("#errors").html("");

    console.log(
      `http://193.191.177.8:10634/api/site/day?date=${date}&username=${username}`
    );
    try {
      let data = await fetch(
        `http://193.191.177.8:10634/api/site/day?date=${date}&username=${username}`
      );

      console.log(data);
      if (data.status == 200) {
        let dataJson = await data.json();
        
        let graphData = [
          dataJson.MOVEMENT,
          dataJson.WATER,
          dataJson.VEGETABLE,
          dataJson.FRUIT,
          dataJson.NUTS,
          dataJson.STARCHPRODUCT,
          dataJson.DAIRYFISHPOULTRY,
          dataJson.FATTYFOOD,
          dataJson.SNACK,
        ]

        usernameString = username;
        render(graphData);
        console.log(graphData)
        focusGraph();
        dateString = date
        usernameString = username
        localStorage.setItem("username", username);
      } else {
        $("#errors").html(
          "<p>Er is iets misgegaan controleer alle gegevens of probeer later opnieuw.</p>"
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    let errorhtml = "";
    for (var i = 0; i < errors.length; i++) {
      errorhtml += "<p>" + errors[i] + "</p>";
      console.log(errorhtml);
    }
    $("#errors").html(errorhtml);
  }
};

formatDate = date => {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  let result = dd + "/" + mm + "/" + yyyy;
  return result;
};

getUsername = () => {
  $("#userInput").val(localStorage.getItem("username"));
};
