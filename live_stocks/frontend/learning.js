document.addEventListener("DOMContentLoaded", () => {
    const stocks101 = [
      "📈 A stock is a tiny piece of a company — owning it means you're a partial owner!",
      "💸 The stock market is where people buy/sell these shares.",
      "📊 Prices change based on supply, demand, and company performance.",
      "🧠 Investing is not gambling — it's about making informed choices.",
      "🚀 Long-term investing tends to be safer than quick trades.",
    ];
  
    const usefulLinks = [
      { name: "Investopedia – Stocks", url: "https://www.investopedia.com/terms/s/stock.asp" },
      { name: "Groww – Beginner's Guide", url: "https://groww.in/blog/how-to-invest-in-stock-market" },
      { name: "NSE India – Learn Basics", url: "https://www.nseindia.com/learn/market-basics" },
      { name: "TradingView – Real Charts", url: "https://in.tradingview.com/" },
      { name: "Moneycontrol – Market News", url: "https://www.moneycontrol.com/" },
    ];
  
    const stocks101List = document.getElementById("stocks101List");
    const usefulLinksList = document.getElementById("usefulLinksList");
  
    // Populate Stocks 101
    stocks101.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      stocks101List.appendChild(li);
    });
  
    // Populate useful links
    usefulLinks.forEach(link => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      a.style.color = "#7f5af0";
      a.style.textDecoration = "none";
      a.style.fontWeight = "600";
      li.appendChild(a);
      usefulLinksList.appendChild(li);
    });
  
    // Home button click
    const homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", () => {
      window.location.href = "landing_page.html";
    });
  });
  