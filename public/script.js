document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('transactionForm');
    const tickerSelect = document.getElementById('ticker_symbol');
    const transactionList = document.getElementById('transactionList');
  
    // Populate ticker dropdown
    const stocks = await fetch('/api/stocks').then(res => res.json());
    stocks.forEach(stock => {
      const opt = document.createElement('option');
      opt.value = stock.ticker_symbol;
      opt.text = stock.ticker_symbol;
      tickerSelect.appendChild(opt);
    });
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        ticker_symbol: form.ticker_symbol.value,
        type: form.type.value,
        quantity: parseInt(form.quantity.value),
        price: parseFloat(form.price.value)
      };
  
      await fetch('/api/stocks/process-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      form.reset();
      loadTransactions();
    });
  
    async function loadTransactions() {
      const transactions = await fetch('/api/transactions').then(res => res.json());
      transactionList.innerHTML = '';
      transactions.forEach(tx => {
        const li = document.createElement('li');
        li.textContent = `${tx.ticker_symbol} - ${tx.type} ${tx.quantity} @ ${tx.price} on ${new Date(tx.timestamp).toLocaleString()}`;
        transactionList.appendChild(li);
      });
    }
  
    loadTransactions();
  });
  