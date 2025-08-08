document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("#transactionsTable tbody");
    const buyCountEl = document.getElementById("buyCount");
    const sellCountEl = document.getElementById("sellCount");
  
    try {
      const res = await fetch("http://localhost:3000/api/transactions");
      const data = await res.json();
  
      let buyCount = 0;
      let sellCount = 0;
  
      data.forEach(txn => {
        const row = document.createElement("tr");
  
        const symbol = document.createElement("td");
        symbol.textContent = txn.ticker_symbol;
  
        const type = document.createElement("td");
        type.textContent = txn.type === 'BUY' ? "💸 BUY" : "📤 SELL";
        type.className = txn.type === 'BUY' ? "buy" : "sell";
  
        const qty = document.createElement("td");
        qty.textContent = txn.quantity;
  
        const price = document.createElement("td");
        price.textContent = `$${txn.price}`;
  
        const time = document.createElement("td");
        const dateObj = new Date(txn.timestamp);
        time.textContent = dateObj.toLocaleString();
  
        row.append(symbol, type, qty, price, time);
        tableBody.appendChild(row);
  
        if (txn.type === 'BUY') buyCount++;
        else sellCount++;
      });
  
      buyCountEl.textContent = `💸 Total Buys: ${buyCount}`;
      sellCountEl.textContent = `💼 Total Sells: ${sellCount}`;
  
      // 🧁 Draw the donut chart!
      const ctx = document.getElementById("txnPieChart").getContext("2d");
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['BUY', 'SELL'],
          datasets: [{
            data: [buyCount, sellCount],
            backgroundColor: ['#b8e0ff', '#ffbad2'],
            borderColor: ['#7fbfff', '#ff89b0'],
            borderWidth: 2,
          }]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: '#444',
                font: {
                  family: 'Fredoka',
                  size: 14
                }
              },
              position: 'bottom'
            }
          },
          cutout: '70%', // cute lil donut 🍩
          animation: {
            animateScale: true
          }
        }
      });
  
    } catch (err) {
      console.error("Error loading transactions:", err);
      tableBody.innerHTML = `<tr><td colspan="5">Failed to load data 💔</td></tr>`;
    }
  });
  