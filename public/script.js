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
    const symbol = document.getElementById("symbol").value.trim().toUpperCase();
    const type = document.getElementById("type").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
  
    if (!symbol || isNaN(quantity) || isNaN(price)) {
      return alert("Please enter all fields correctly.");
    }
  
    const payload = { ticker_symbol: symbol, type, quantity, price };
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  
    if (res.ok) {
      alert("✅ Transaction successful!");
      window.location = "analysis.html"; // Navigate to transactions/analysis
    } else {
      const error = await res.json();
      alert("❌ Error: " + (error.error || error.message));
    }
  }
  