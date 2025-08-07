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

