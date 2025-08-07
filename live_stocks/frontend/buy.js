
// GENZ STYLE

// Chart Setup
// const years = ["2019", "2020", "2021", "2022", "2023", "2024"];
// const priceData = [160, 185, 140, 200, 220, 210];

// const ctx = document.getElementById("stockHistoryChart").getContext("2d");

// new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: years,
//     datasets: [{
//       label: "AAPL Over the Years 💹",
//       data: priceData,
//       borderColor: "#ff6fd8",
//       backgroundColor: "rgba(255, 111, 216, 0.1)",
//       borderWidth: 3,
//       tension: 0.3,
//       pointRadius: 6,
//       pointBackgroundColor: "#ff6fd8",
//     }]
//   },
//   options: {
//     scales: {
//       x: { ticks: { color: '#666' } },
//       y: { ticks: { color: '#666' } }
//     },
//     plugins: {
//       legend: {
//         labels: { color: '#666' }
//       }
//     }
//   }
// });

// // Handle form
// document.getElementById("buyForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   alert("Your order has been placed! 🎉✨");
// });



// GENZ STYLE - BACKEND INTEGRATION

console.log("buy.js loaded ✅");

window.onload = function () {
  const stockInfo = JSON.parse(localStorage.getItem('selectedStock'));
  const stockNameDiv = document.getElementById('stockName');

  if (stockInfo) {
    stockNameDiv.textContent = `You're snagging: ${stockInfo.symbol} at ₹${stockInfo.price}`;
  } else {
    stockNameDiv.textContent = "No stock selected. Go back and pick one! 😢";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const stockData = JSON.parse(localStorage.getItem('selectedStock'));

  if (stockData) {
    document.getElementById('ticker_symbol').value = stockData.symbol;
    document.getElementById('buy_price').value = stockData.price;
    document.getElementById('stockHeading').textContent = `📦 Buying ${stockData.symbol}`;
    // company name is optional; only set if field exists in HTML
    const companyInput = document.getElementById('companyName');
    if (companyInput) {
      companyInput.value = stockData.company || "";
    }
  }

  const form = document.getElementById("buyForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      ticker_symbol: document.getElementById("ticker_symbol").value,
      company_name: document.getElementById("companyName")?.value || null,
      buy_price: parseFloat(document.getElementById("buy_price").value),
      current_price: parseFloat(document.getElementById("buy_price").value),
      quantity: parseInt(document.getElementById("quantity").value),
      notes: document.getElementById("notes").value || ""
    };

    try {
      const res = await fetch("http://localhost:3000/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      alert("Snagged successfully! ✅");
      window.location.href = "index.html"; // or wherever
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to snag stock 😢 " + err.message);
    }
  });
});
