const displayTableInfo = [
  "population",
  "area",
  "currencies",
  "languages",
  "callingCodes",
  "topLevelDomain",
];

function displayCountryInfo(countries) {
  for (let country of countries) {
    // const card = $("#template .card").clone(true).appendTo('#list');
    const newCard = $(`
    <div class="card">
    <div class="image">
      <img src="" alt="flag">
    </div>
    <div class="content">
       <header>
         <h2 class="title"></h2>
         <div class="code"></div>
       </header>
       <main>
         <table>

         </table>
       </main>
    </div>
  </div>`);
    $("#list").append(newCard);
    const table = newCard.find("table");
    const img = newCard.find("img");
    const headerTitle = newCard.find("header .title");
    const headerCode = newCard.find("header .code");

    console.log(country);
    // set flag
    img.attr("src", country.flag);
    // set header
    headerTitle.text(country.name);
    headerCode.text(country.cioc);

    // general info
    for (let info of displayTableInfo) {
      table.append(getFormatedData(info, country[info]));
    }
  }
}

// ovde pozivamo krajnje sve metode
function getFormatedData(name, data) {
  switch (name) {
    case "currencies":
      return generateTemplate("Currency", getCurrency(data));
    case "languages":
      return generateTemplate("Language", getLanguages(data));
    case "area":
      return generateTemplate("Region", getArea(data));
    case "population":
      return generateTemplate("Population", getPopulation(data));
    case "callingCodes":
      return generateTemplate("Area Code", getCallingCodes(data));
    case "topLevelDomain":
      return generateTemplate("Top Level Domain", getTopLevelDomain(data));
  }
}

// ovde formiramo templejt da svuda bude struktura ista
function generateTemplate(rowName, rowValue) {
  return `<tr>
    <th>${rowName}</th>
    <td>${rowValue}</td>
  </tr>`;
}
// za populaciju
function getPopulation(num) {
  return num;
}

// za area
function getArea(num) {
  return num;
}
// za valutu
function getCurrency(array) {
  return array
    .map((currency) => `${currency.name} - ${currency.symbol}`)
    .join(",");
}

// za jezik
function getLanguages(array) {
  return array.map((lang) => `${lang.name}`).join(",");
}

// za pozivni broj
function getCallingCodes(array) {
  return `+ ${array[0]}`;
}

// za ime top domena
function getTopLevelDomain(array) {
  return array[0];
}

// live search for country
$("#search").on("keypress", function () {
  const search = this.value;
  console.log(search);
  if (search.length < 3) return;
  $.get(
    "https://serene-tundra-03072.herokuapp.com/https://restcountries.com/v2/name/" +
      search
  )
    .done(function (data) {
      $("#list").html("");
      displayCountryInfo(data);
    })
    .fail(function (err) {
      console.log("Doslo je do greske");
      alert("Doslo je do greske");
    });
});

// live search for country
$("#btn").on("click", function () {
  const search = document.getElementById('search').value;
  console.log(search);
  if (search.length < 3) return;
  $.get(
    "https://serene-tundra-03072.herokuapp.com/https://restcountries.com/v2/name/" +
      search
  )
    .done(function (data) {
      $("#list").html("");
      displayCountryInfo(data);
    })
    .fail(function (err) {
      console.log("Doslo je do greske");
      alert("Doslo je do greske");
    });
});
