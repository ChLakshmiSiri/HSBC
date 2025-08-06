// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Load portfolio value
async function loadPortfolioValue() {
  try {
    const res = await fetch('/api/stocks/portfolio');
    const data = await res.json();
    document.getElementById('portfolio-value').textContent = data.total_value.toFixed(2);
  } catch (err) {
    console.error('Error loading portfolio:', err);
  }
}

// Load chart
async function drawChart() {
  try {
    const res = await fetch('/api/stocks');
    const stocks = await res.json();
    const labels = stocks.map(s => s.ticker_symbol);
    const values = stocks.map(s => s.quantity * s.buy_price);

    const ctx = document.getElementById('allocationChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Portfolio Allocation',
          data: values,
          borderWidth: 1
        }]
      }
    });
  } catch (err) {
    console.error('Chart error:', err);
  }
}

// Transactions
let allTransactions = [];

async function loadTransactions() {
  try {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    allTransactions = data;
    displayTransactions(data);
  } catch (err) {
    console.error('Transaction fetch error:', err);
  }
}

function displayTransactions(transactions) {
  const tbody = document.getElementById('transaction-body');
  tbody.innerHTML = '';
  transactions.forEach(tx => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tx.id}</td>
      <td>${tx.ticker_symbol}</td>
      <td>${tx.type}</td>
      <td>${tx.quantity}</td>
      <td>${tx.price}</td>
      <td>${new Date(tx.timestamp).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}

// Filter logic
document.getElementById('filter-form').addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('filter-type').value.toUpperCase();
  const symbol = document.getElementById('filter-symbol').value.toUpperCase();
  const date = document.getElementById('filter-date').value;

  const filtered = allTransactions.filter(tx =>
    (!type || tx.type === type) &&
    (!symbol || tx.ticker_symbol === symbol) &&
    (!date || tx.timestamp.startsWith(date))
  );

  displayTransactions(filtered);
});

document.getElementById('clear-filters').addEventListener('click', () => {
  document.getElementById('filter-type').value = '';
  document.getElementById('filter-symbol').value = '';
  document.getElementById('filter-date').value = '';
  displayTransactions(allTransactions);
});

// Load all on start
loadPortfolioValue();
drawChart();
loadTransactions();
