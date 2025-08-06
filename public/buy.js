document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
      });
    }
  
    const form = document.getElementById("transaction-form");
    if (form) form.addEventListener("submit", handleSubmit);
  });
  
  async function handleSubmit(e) {
    e.preventDefault();
  
    const symbolInput = document.getElementById("symbol");
    const symbol = symbolInput.value.trim().toUpperCase();
    const type = document.getElementById("type").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
  
    const datalistOptions = document.querySelectorAll("#symbols option");
    const validSymbols = Array.from(datalistOptions).map(opt => opt.value.toUpperCase());
    const isValidSymbol = validSymbols.includes(symbol);
  
    if (!isValidSymbol) {
      return alert("❌ Stock does not exist. Please choose a valid stock symbol from the list.");
    }
  
    if (!symbol || isNaN(quantity) || isNaN(price)) {
      return alert("Please enter all fields correctly.");
    }
  
    const payload = { ticker_symbol: symbol, type, quantity, price };
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      if (res.ok) {
        alert("✅ Transaction successful!");
        window.location = "analysis.html";
      } else {
        const error = await res.json();
        alert("❌ Error: " + (error.error || error.message));
      }
    } catch (err) {
      alert("❌ Network error: " + err.message);
    }
  }