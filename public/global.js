// const stocks = ["AAPL", "GOOG", "MSFT", "TSLA", "AMZN", "NFLX", "NVDA", "META", "BABA", "INTC", "ORCL", "IBM", "CSCO", "ADBE", "PYPL"];
//     let stockData = {};
//     const generateStockData = () => {
//       stocks.forEach(symbol => {
//         const price = (Math.random() * 1500 + 50).toFixed(2);
//         const change = (Math.random() * 10 - 5).toFixed(2);
//         stockData[symbol] = {
//           price: price,
//           change: change,
//           history: stockData[symbol]?.history?.slice(-10) || []
//         };
//         stockData[symbol].history.push(+price);
//       });
//     };

//     const renderTable = () => {
//       const table = document.getElementById("stockTable");
//       table.innerHTML = "";
//       stocks.forEach(symbol => {
//         const { price, change } = stockData[symbol];
//         const changeClass = change >= 0 ? "positive" : "negative";
//         const row = `
//           <tr>
//             <td>${symbol}</td>
//             <td>$${price}</td>
//             <td class="${changeClass}">${change}%</td>
//             <td><button class="buy-btn" onclick="window.location.href='buy_${symbol}.html'">Buy</button></td>
//           </tr>
//         `;
//         table.innerHTML += row;
//       });
//     };

//     let multiLineChart, barChart;

//     const renderCharts = () => {
//       const lineCtx = document.getElementById('multiLineChart').getContext('2d');
//       const barCtx = document.getElementById('barChart').getContext('2d');

//       const labels = Array.from({length: stockData[stocks[0]].history.length}, (_, i) => i + 1);
//       const datasets = stocks.slice(0, 5).map(symbol => ({
//         label: symbol,
//         data: stockData[symbol].history,
//         borderColor: `hsl(${Math.random()*360}, 100%, 70%)`,
//         fill: false
//       }));

//       if (multiLineChart) multiLineChart.destroy();
//       multiLineChart = new Chart(lineCtx, {
//         type: 'line',
//         data: { labels, datasets },
//         options: { responsive: true, plugins: { legend: { labels: { color: "white" }}}}
//       });

//       if (barChart) barChart.destroy();
//       barChart = new Chart(barCtx, {
//         type: 'bar',
//         data: {
//           labels: stocks.slice(0, 10),
//           datasets: [{
//             label: 'Price (USD)',
//             data: stocks.slice(0, 10).map(s => stockData[s].price),
//             backgroundColor: stocks.slice(0, 10).map(s => stockData[s].change >= 0 ? '#00cc44' : '#ff3300')
//           }]
//         },
//         options: { responsive: true, plugins: { legend: { labels: { color: "white" }}}}
//       });
//     };

//     const updateData = () => {
//       generateStockData();
//       renderTable();
//       renderCharts();
//     };

//     generateStockData();
//     renderTable();
//     renderCharts();
//     setInterval(updateData, 10000);



// console.log("index.js loaded ✅");

// const stocks = ["AAPL", "GOOG", "MSFT", "TSLA", "AMZN", "NFLX", "NVDA", "META", "BABA", "INTC", "ORCL", "IBM", "CSCO", "ADBE", "PYPL"];
// let stockData = {};

// const generateStockData = () => {
//   stocks.forEach(symbol => {
//     const price = (Math.random() * 1500 + 50).toFixed(2);
//     const change = (Math.random() * 10 - 5).toFixed(2);
//     stockData[symbol] = {
//       price: price,
//       change: change,
//       history: stockData[symbol]?.history?.slice(-10) || []
//     };
//     stockData[symbol].history.push(+price);
//   });
// };

// const renderTable = () => {
//   const table = document.getElementById("stockTable");
//   table.innerHTML = "";

//   stocks.forEach(symbol => {
//     const { price, change } = stockData[symbol];
//     const changeClass = change >= 0 ? "positive" : "negative";

//     const row = document.createElement("tr");

//     row.innerHTML = `
//       <td>${symbol}</td>
//       <td>$${price}</td>
//       <td class="${changeClass}">${change}%</td>
//       <td><button class="buy-btn" data-symbol="${symbol}">Buy</button></td>
//     `;

//     table.appendChild(row);
//   });

//   attachBuyListeners(); // Attach event listeners *after* rendering the table
// };

// const attachBuyListeners = () => {
//   const buttons = document.querySelectorAll(".buy-btn");

//   buttons.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//       const symbol = btn.dataset.symbol;

//       // For now, redirect to buy_AAPL.html
//       // Later: redirect to `buy_${symbol}.html`
//       window.location.href = `buy.html`;
//     });
//   });
// };

// let multiLineChart, barChart;

// const renderCharts = () => {
//   const lineCtx = document.getElementById('multiLineChart').getContext('2d');
//   const barCtx = document.getElementById('barChart').getContext('2d');

//   const labels = Array.from({ length: stockData[stocks[0]].history.length }, (_, i) => i + 1);

//   const datasets = stocks.slice(0, 5).map(symbol => ({
//     label: symbol,
//     data: stockData[symbol].history,
//     borderColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
//     fill: false
//   }));

//   if (multiLineChart) multiLineChart.destroy();
//   multiLineChart = new Chart(lineCtx, {
//     type: 'line',
//     data: { labels, datasets },
//     options: {
//       responsive: true,
//       plugins: { legend: { labels: { color: "white" } } }
//     }
//   });

//   if (barChart) barChart.destroy();
//   barChart = new Chart(barCtx, {
//     type: 'bar',
//     data: {
//       labels: stocks.slice(0, 10),
//       datasets: [{
//         label: 'Price (USD)',
//         data: stocks.slice(0, 10).map(s => stockData[s].price),
//         backgroundColor: stocks.slice(0, 10).map(s => stockData[s].change >= 0 ? '#00cc44' : '#ff3300')
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: { legend: { labels: { color: "white" } } }
//     }
//   });
// };

// const updateData = () => {
//   generateStockData();
//   renderTable();       // Also calls attachBuyListeners()
//   renderCharts();
// };

// generateStockData();
// renderTable();           // Also calls attachBuyListeners()
// renderCharts();
// setInterval(updateData, 10000);


// GENZ STYLE

console.log("index.js loaded ✅");

const stocks = ["AAPL", "GOOG", "MSFT", "TSLA", "AMZN", "NFLX", "NVDA", "META", "BABA", "INTC", "ORCL", "IBM", "CSCO", "ADBE", "PYPL"];
let stockData = {};

const generateStockData = () => {
  stocks.forEach(symbol => {
    const price = (Math.random() * 1500 + 50).toFixed(2);
    const change = (Math.random() * 10 - 5).toFixed(2);
    stockData[symbol] = {
      price: price,
      change: change,
      history: stockData[symbol]?.history?.slice(-10) || []
    };
    stockData[symbol].history.push(+price);
  });
};

const renderTable = () => {
  const table = document.getElementById("stockTable");
  table.innerHTML = "";

  stocks.forEach(symbol => {
    const { price, change } = stockData[symbol];
    const changeClass = change >= 0 ? "positive" : "negative";

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${symbol}</td>
      <td>$${price}</td>
      <td class="${changeClass}">${change}%</td>
      <td><button class="buy-btn" data-symbol="${symbol}">Snag it </button></td>
    `;

    table.appendChild(row);
  });

  attachBuyListeners(); // Attach event listeners *after* rendering the table
};

const attachBuyListeners = () => {
  const buttons = document.querySelectorAll(".buy-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const symbol = btn.dataset.symbol;
      const price = stockData[symbol].price;
      handleBuy(symbol, price); // <-- Use the function you already wrote!
    });    
  });
};

let multiLineChart, barChart;

const renderCharts = () => {
  const lineCtx = document.getElementById('multiLineChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');

  const labels = Array.from({ length: stockData[stocks[0]].history.length }, (_, i) => i + 1);

  const datasets = stocks.slice(0, 5).map(symbol => ({
    label: symbol,
    data: stockData[symbol].history,
    borderColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
    fill: false
  }));

  if (multiLineChart) multiLineChart.destroy();
  multiLineChart = new Chart(lineCtx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "black" } } }
    }
  });

  if (barChart) barChart.destroy();
  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: stocks.slice(0, 10),
      datasets: [{
        label: 'Price (USD)',
        data: stocks.slice(0, 10).map(s => stockData[s].price),
        backgroundColor: stocks.slice(0, 10).map(s => stockData[s].change >= 0 ? '#6ceeb3' : '#ff9999')
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "black" } } }
    }
  });
};

const updateData = () => {
  generateStockData();
  renderTable();
  renderCharts();
};

generateStockData();
renderTable();
renderCharts();
setInterval(updateData, 10000);

function handleBuy(stockSymbol, stockPrice) {
  localStorage.setItem('selectedStock', JSON.stringify({
    symbol: stockSymbol,
    price: stockPrice
  }));
  window.location.href = 'buy.html';
}
