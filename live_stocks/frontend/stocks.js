document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("stocksBody");
  const spentEl = document.getElementById("spent");
  const earnedEl = document.getElementById("earned");
  const statusEl = document.getElementById("status");

  try {
    const [stocksRes, summaryRes] = await Promise.all([
      fetch("http://localhost:3000/api/stocks/stocks/grouped"),
      fetch("http://localhost:3000/api/stocks/portfolio/summary")
    ]);

    const stocks = await stocksRes.json();
    const summary = await summaryRes.json();

    stocks.forEach(stock => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${stock.ticker_symbol}</td>
        <td>${stock.company_name}</td>
        <td>${stock.total_quantity}</td>
        <td>$${stock.avg_buy_price}</td>
        <td data-current-price="${stock.current_price}">$${stock.current_price}</td>
        <td>
          <button class="bubble-button" onclick="openSellModal('${stock.ticker_symbol}', ${stock.current_price})">📉 Sell</button>
        </td>
      `;

      tbody.appendChild(row);
    });

    spentEl.textContent = `$${summary.totalSpent}`;
    earnedEl.textContent = `$${summary.totalEarned}`;

    const profitLoss = summary.totalEarned - summary.totalSpent;
    statusEl.textContent = profitLoss >= 0 ? `Profit +$${profitLoss}` : `Loss -$${Math.abs(profitLoss)}`;
    statusEl.style.color = profitLoss >= 0 ? "green" : "red";
  } catch (err) {
    console.error("Fetch error:", err);
    statusEl.textContent = "Failed to load ❌";
    statusEl.style.color = "gray";
  }

  // 💸 Dynamic total update
  const qtyInput = document.getElementById('sellQty');
  const priceInput = document.getElementById('sellPrice');
  const totalDisplay = document.getElementById('sellTotalDisplay');

  // qtyInput.addEventListener('input', () => {
  //   const qty = parseInt(qtyInput.value);
  //   const unitPrice = parseFloat(priceInput.dataset.unitPrice);
  //   if (!isNaN(qty) && !isNaN(unitPrice)) {
  //     const total = qty * unitPrice;
  //     priceInput.value = total.toFixed(2);
  //     totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  //   }
  // });

  //deletion of stocks
  qtyInput.addEventListener('input', () => {
    const qty = parseInt(qtyInput.value);
    const unitPrice = parseFloat(priceInput.dataset.unitPrice);
  
    if (!isNaN(qty) && !isNaN(unitPrice)) {
      const total = qty * unitPrice;
      // Only display total separately, don’t update price input
      totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }
  });
  
});

// 💸 Open Modal
function openSellModal(ticker, currentPrice) {
  const qtyInput = document.getElementById('sellQty');
  const priceInput = document.getElementById('sellPrice');
  const totalDisplay = document.getElementById('sellTotalDisplay');

  document.getElementById('sellTicker').value = ticker;
  qtyInput.value = 1;
  priceInput.value = currentPrice.toFixed(2);
  priceInput.dataset.unitPrice = currentPrice;
  totalDisplay.textContent = `Total: $${currentPrice.toFixed(2)}`;

  document.getElementById('sellModal').style.display = 'block';
}

// ❌ Close Modal
function closeSellModal() {
  document.getElementById('sellModal').style.display = 'none';
}


function removeStockRowIfEmpty(ticker, soldQty) {
  const rows = document.querySelectorAll("#stocksBody tr");
  for (const row of rows) {
    const symbol = row.children[0].textContent;
    if (symbol === ticker) {
      const currentQty = parseInt(row.children[2].textContent);
      if (currentQty - soldQty <= 0) {
        row.remove(); // remove row if quantity is now zero
      } else {
        // update quantity and maybe other values if needed
        row.children[2].textContent = currentQty - soldQty;
      }
      break;
    }
  }
}



// ✅ Submit Sell
// document.getElementById('sellForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const ticker = document.getElementById('sellTicker').value;
//   const quantity = parseInt(document.getElementById('sellQty').value);
//   const price = parseFloat(document.getElementById('sellPrice').value);

//   const res = await fetch('http://localhost:3000/api/transactions/sell', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ticker_symbol: ticker, quantity, price }),
//   });

//   if (res.ok) {
//     alert('✨ Stock sold successfully!');
//     closeSellModal();
//     location.reload();
//   } else {
//     alert('Oops! Something went wrong while selling!');
//   }
// });



//deletion of stocks

document.getElementById('sellForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const ticker = document.getElementById('sellTicker').value;
  const qtyInput = document.getElementById('sellQty');
  const priceInput = document.getElementById('sellPrice');

  const quantity = Number(qtyInput.value);
  const price = Number(priceInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    showToast('Quantity must be a positive number!', 'error');
    return;
  }

  const res = await fetch('http://localhost:3000/api/transactions/sell', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticker_symbol: ticker, quantity, price }),
  });

  if (res.ok) {
    showToast('✨ Stock sold successfully!', 'success');
    closeSellModal();
    removeStockRowIfEmpty(ticker, quantity);
    setTimeout(() => location.reload(), 1500);
  } else {
    const errMsg = await res.text();
    showToast(`Oops! Something went wrong while selling!\n${errMsg}`, 'error');
  }
});


const homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", () => {
      window.location.href = "landing_page.html";
});

// Toast function ✨
function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  // Animate and remove
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
