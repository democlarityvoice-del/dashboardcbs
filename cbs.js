// --- Fake Writeoffs Data ---
alert("cbs.js has loaded successfully!");

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

// --- Render Writeoffs ---
function loadWriteoffData() {
  const container = document.getElementById("writeoffContainer");
  container.innerHTML = "";

  fakeWriteoffs.forEach(writeoff => {
    const totalAmount = writeoff.invoices.reduce((sum, inv) => sum + inv.amount, 0);

    // Create main card wrapper
    const card = document.createElement("div");
    card.className = "writeoff-card";

    // Build header section
    card.innerHTML = `
      <div class="client-name">${writeoff.client}</div>
      <div>${writeoff.number} • Writeoff ID: ${writeoff.id}</div>
      <div>Writeoff Date: ${writeoff.date}</div>
      <div>Comment: ${writeoff.comment}</div>
      <div class="total-writeoff">$${totalAmount.toFixed(2)}</div>
      <span class="toggle-invoices">Toggle Invoices</span>
    `;

    // Build invoices dropdown
    const invoiceDiv = document.createElement("div");
    invoiceDiv.className = "invoice-details";
    invoiceDiv.style.display = "none"; // start collapsed

    const invoiceHTML = writeoff.invoices.map(inv => `
      <div class="invoice-item">
        <strong class="id-number">${inv.id}</strong>
        <span class="date-display">${inv.date}</span>
        <span class="description">${inv.description}</span>
        <span class="currency">$${inv.amount.toFixed(2)}</span>
      </div>
    `).join("");

    invoiceDiv.innerHTML = invoiceHTML;

    // Toggle logic
    const toggle = card.querySelector(".toggle-invoices");
    toggle.addEventListener("click", () => {
      invoiceDiv.style.display = invoiceDiv.style.display === "none" ? "block" : "none";
    });

    card.appendChild(invoiceDiv);
    container.appendChild(card);
  });
}

// --- CSV Export ---
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

// Load data on page load
window.onload = loadWriteoffData;
