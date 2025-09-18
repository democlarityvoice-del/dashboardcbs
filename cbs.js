// Fake sample data
const fakeWriteoffs = [
  {
    client: "Demo Client A",
    id: "WO-10001",
    number: "000123",
    date: "2025-09-01",
    comment: "Adjustment - Services",
    invoices: [
      { id: "INV-001", date: "2025-08-15", description: "VoIP Adjust", amount: 59.99 },
      { id: "INV-002", date: "2025-08-20", description: "Support Credit", amount: 40.00 }
    ]
  },
  {
    client: "Demo Client B",
    id: "WO-10002",
    number: "000124",
    date: "2025-09-05",
    comment: "Billing Correction",
    invoices: [
      { id: "INV-003", date: "2025-08-25", description: "Incorrect Fee", amount: 45.00 }
    ]
  }
];

function loadWriteoffData() {
  const container = document.getElementById("writeoffContainer");
  container.innerHTML = "";

  fakeWriteoffs.forEach(writeoff => {
    const totalAmount = writeoff.invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const card = document.createElement("div");
    card.className = "writeoff-card";

    const invoiceHTML = writeoff.invoices.map(inv => `
      <div><strong>${inv.id}</strong> - ${inv.date} - ${inv.description} - $${inv.amount.toFixed(2)}</div>
    `).join("");

    const toggle = document.createElement("span");
    toggle.className = "toggle-invoices";
    toggle.textContent = "Toggle Invoices";

    const invoiceDiv = document.createElement("div");
    invoiceDiv.className = "invoice-details";
    invoiceDiv.innerHTML = invoiceHTML;

    toggle.addEventListener("click", () => {
      invoiceDiv.style.display = invoiceDiv.style.display === "none" ? "block" : "none";
    });

    card.innerHTML = `
      <div class="client-name">${writeoff.client}</div>
      <div>${writeoff.number} • Writeoff ID: ${writeoff.id}</div>
      <div>Writeoff Date: ${writeoff.date}</div>
      <div>Comment: ${writeoff.comment}</div>
      <div class="total-writeoff">$${totalAmount.toFixed(2)}</div>
    `;

    card.appendChild(toggle);
    card.appendChild(invoiceDiv);
    container.appendChild(card);
  });
}

function exportCSV() {
  let csv = "Client,Writeoff ID,Number,Date,Comment,Amount\n";
  fakeWriteoffs.forEach(w => {
    const totalAmount = w.invoices.reduce((sum, inv) => sum + inv.amount, 0);
    csv += `${w.client},${w.id},${w.number},${w.date},${w.comment},${totalAmount.toFixed(2)}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "writeoffs.csv";
  link.click();
}

// Load on page load
window.onload = loadWriteoffData;

