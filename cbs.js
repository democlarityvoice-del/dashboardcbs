// --- Fake Writeoffs Data ---
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

    // Create the main card with Tailwind styling
    const card = document.createElement("div");
    card.className = "bg-white border rounded-lg shadow p-4";

    // Card content
    card.innerHTML = `
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">${writeoff.client}</h2>
        <span class="text-gray-500">${writeoff.number} • ID: ${writeoff.id}</span>
      </div>
      <div class="text-sm text-gray-600 mt-2">
        <div>Writeoff Date: ${writeoff.date}</div>
        <div>Comment: ${writeoff.comment}</div>
      </div>
      <div class="text-lg font-bold text-right text-clarity-orange mt-2">
        $${totalAmount.toFixed(2)}
      </div>
      <button class="mt-3 text-clarity-orange font-semibold hover:underline toggle-invoices">
        Toggle Invoices
      </button>
    `;

    // Invoice details (hidden by default)
    const invoiceDiv = document.createElement("div");
    invoiceDiv.className = "mt-3 hidden border-t pt-3 space-y-2";

    writeoff.invoices.forEach(inv => {
      const row = document.createElement("div");
      row.className = "flex justify-between text-sm";
      row.innerHTML = `
        <span class="font-mono font-semibold">${inv.id}</span>
        <span>${inv.date}</span>
        <span>${inv.description}</span>
        <span class="font-mono">$${inv.amount.toFixed(2)}</span>
      `;
      invoiceDiv.appendChild(row);
    });

    // Toggle logic
    const toggleBtn = card.querySelector(".toggle-invoices");
    toggleBtn.addEventListener("click", () => {
      invoiceDiv.classList.toggle("hidden");
    });

    card.appendChild(invoiceDiv);
    container.appendChild(card);
  });
}

// Load data on page load
window.onload = loadWriteoffData;

