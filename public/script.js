// Fetch stock symbols for dropdown
async function fetchStockSymbols() {
    const res = await fetch('/api/stocks');
    const data = await res.json();
    const select = document.getElementById('ticker_symbol');
    data.forEach(stock => {
      const option = document.createElement('option');
      option.value = stock.ticker_symbol;
      option.textContent = `${stock.ticker_symbol} - ${stock.company_name}`;
      select.appendChild(option);
    });
  }
  
  // Fetch transactions for table
  async function fetchTransactions() {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    const tbody = document.querySelector('#transactionsTable tbody');
    tbody.innerHTML = '';
    data.forEach(tx => {
      const row = `<tr>
        <td>${tx.id}</td>
        <td>${tx.ticker_symbol}</td>
        <td>${tx.type}</td>
        <td>${tx.quantity}</td>
        <td>${tx.price}</td>
        <td>${new Date(tx.timestamp).toLocaleString()}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  }
  
  // Submit form
  document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      ticker_symbol: document.getElementById('ticker_symbol').value,
      type: document.getElementById('type').value,
      quantity: parseInt(document.getElementById('quantity').value),
      price: parseFloat(document.getElementById('price').value)
    };
  
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  
    if (res.ok) {
      await fetchTransactions();
      e.target.reset();
    }
  });
  
  // Live timestamp
  function updateTime() {
    document.getElementById('updatedTime').textContent = 'Updated: ' + new Date().toLocaleTimeString();
  }
  setInterval(updateTime, 1000);
  
  // Init
  fetchStockSymbols();
  fetchTransactions();
  updateTime();
  