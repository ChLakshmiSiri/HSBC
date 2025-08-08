// document.addEventListener("DOMContentLoaded", async () => {
//     const tbody = document.getElementById("stocksBody");
//     const spentEl = document.getElementById("spent");
//     const earnedEl = document.getElementById("earned");
//     const statusEl = document.getElementById("status");
  
//     try {
//       const [stocksRes, summaryRes] = await Promise.all([
//         fetch("http://localhost:3019/api/stocks"),
//         fetch("http://localhost:3019/api/portfolio/summary")
//       ]);
  
//       const stocks = await stocksRes.json();
//       const summary = await summaryRes.json();
  
//       stocks.forEach(stock => {
//         const row = document.createElement("tr");
  
//         row.innerHTML = `
//           <td>${stock.ticker_symbol}</td>
//           <td>${stock.company_name}</td>
//           <td>${stock.total_quantity}</td>
//           <td>$${stock.avg_buy_price}</td>
//           <td>$${stock.current_price}</td>
//           <td>$${stock.total_invested}</td>
//           <button class="bubble-button" onclick="openSellModal('${row.ticker_symbol}')">📉 Sell</button>

//         `;
  
//         tbody.appendChild(row);
//       });
  
//       spentEl.textContent = `$${summary.totalSpent}`;
//       earnedEl.textContent = `$${summary.totalEarned}`;
  
//       const profitLoss = summary.totalEarned - summary.totalSpent;
//       statusEl.textContent = profitLoss >= 0 ? `Profit 💚 +$${profitLoss}` : `Loss 💔 -$${Math.abs(profitLoss)}`;
//       statusEl.style.color = profitLoss >= 0 ? "green" : "red";
//     } catch (err) {
//       console.error("Fetch error:", err);
//       statusEl.textContent = "Failed to load ❌";
//       statusEl.style.color = "gray";
//     }
//   });
  

//   function openSellModal(ticker) {
//     document.getElementById('sellTicker').value = ticker;
//     document.getElementById('sellModal').style.display = 'block';
//   }
  
//   function closeSellModal() {
//     document.getElementById('sellModal').style.display = 'none';
//   }
  
//   document.getElementById('sellForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const ticker = document.getElementById('sellTicker').value;
//     const quantity = parseInt(document.getElementById('sellQty').value);
//     const price = parseFloat(document.getElementById('sellPrice').value);
  
//     const res = await fetch('http://localhost:3019/api/stocks', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ticker_symbol: ticker, quantity, price }),
//     });
  
//     if (res.ok) {
//       alert('✨ Stock sold successfully!');
//       closeSellModal();
//       location.reload();
//     } else {
//       alert('Oops! Something went wrong while selling!');
//     }
//   });
document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.getElementById("stocksBody");
    const spentEl = document.getElementById("spent");
    const earnedEl = document.getElementById("earned");
    const statusEl = document.getElementById("status");
  
    try {
      const [stocksRes, summaryRes] = await Promise.all([
        fetch("http://localhost:3019/api/stocks"),
        fetch("http://localhost:3019/api/portfolio/summary")
      ]);
  
      if (!stocksRes.ok || !summaryRes.ok) throw new Error("Failed to fetch");
  
      const stocks = await stocksRes.json();
      const summary = await summaryRes.json();
  
      stocks.forEach(stock => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${stock.ticker_symbol}</td>
          <td>${stock.company_name}</td>
          <td>${stock.quantity}</td>
          <td>$${stock.buy_price}</td>
          <td>$${stock.current_price || 0}</td>
          <td>$${(stock.quantity * stock.buy_price).toFixed(2)}</td>
          <td><button class="bubble-button" onclick="openSellModal('${stock.ticker_symbol}')">📉 Sell</button></td>
        `;
  
        tbody.appendChild(row);
      });
  
      spentEl.textContent = `$${summary.totalSpent || 0}`;
      earnedEl.textContent = `$${summary.totalEarned || 0}`;
  
      const profitLoss = summary.totalEarned - summary.totalSpent;
      statusEl.textContent = profitLoss >= 0 ? `Profit 💚 +$${profitLoss}` : `Loss 💔 -$${Math.abs(profitLoss)}`;
      statusEl.style.color = profitLoss >= 0 ? "green" : "red";
    } catch (err) {
      console.error("Fetch error:", err);
      statusEl.textContent = "Failed to load ❌";
      statusEl.style.color = "gray";
    }
  });
  
  function openSellModal(ticker) {
    document.getElementById('sellTicker').value = ticker;
    document.getElementById('sellModal').style.display = 'block';
  }
  
  function closeSellModal() {
    document.getElementById('sellModal').style.display = 'none';
  }
  
  document.getElementById('sellForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ticker = document.getElementById('sellTicker').value;
    const quantity = parseInt(document.getElementById('sellQty').value);
    const price = parseFloat(document.getElementById('sellPrice').value);
  
    const res = await fetch('http://localhost:3019/api/stocks/process-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker_symbol: ticker, quantity, price, type: "SELL" }),
    });
  
    if (res.ok) {
      alert('✨ Stock sold successfully!');
      closeSellModal();
      location.reload();
    } else {
      alert('Oops! Something went wrong while selling!');
    }
  });
  