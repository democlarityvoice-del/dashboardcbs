// --- Fake Writeoffs Data ---
const fakeWriteoffs = [
  {
    clientId: "125864",
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
    clientId: "123937",
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

const tableBody = document.getElementById("writeoffTableBody");

// --- Load Writeoffs into Table ---
function loadWriteoffs() {
  tableBody.innerHTML = "";

  fakeWriteoffs.forEach(writeoff => {
    const totalAmount = writeoff.invoices.reduce((sum, inv) => sum + inv.amount, 0);

    // Main summary row
    const mainRow = document.createElement("tr");
    mainRow.classList.add("border-b", "writeoff-row");
    mainRow.setAttribute("data-id", writeoff.id);

    mainRow.innerHTML = `
      <td class="p-3">${writeoff.clientId}</td>
      <td class="p-3">${writeoff.client}</td>
      <td class="p-3">${writeoff.id}</td>
      <td class="p-3 date-cell">${writeoff.date}</td>
      <td class="p-3 font-semibold text-right">$${totalAmount.toFixed(2)}</td>
      <td class="p-3">${writeoff.invoices.length} invoice${writeoff.invoices.length > 1 ? "s" : ""}</td>
      <td class="p-3 text-center">
        <button class="expand-btn text-blue-600 font-bold">></button>
      </td>
    `;

    // Event listener for expansion
    mainRow.querySelector(".expand-btn").addEventListener("click", () => {
      toggleInvoices(writeoff);
    });

    tableBody.appendChild(mainRow);
  });
}

// --- Toggle Invoice Rows ---
function toggleInvoices(writeoff) {
  const existing = document.querySelector(`.invoice-row[data-parent="${writeoff.id}"]`);

  if (existing) {
    // Collapse: remove invoice rows
    existing.remove();
  } else {
    // Expand: create a NEW invoice row
    const invoiceRow = document.createElement("tr");
    invoiceRow.classList.add("invoice-row", "bg-gray-50");
    invoiceRow.setAttribute("data-parent", writeoff.id);

    // Build nested table for invoices
    let invoiceHTML = `
      <td colspan="7" class="p-3">
        <table class="w-full text-sm border border-gray-200 rounded">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 text-left">Invoice ID</th>
              <th class="p-2 text-left">Date</th>
              <th class="p-2 text-left">Description</th>
              <th class="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
    `;

    writeoff.invoices.forEach(inv => {
      invoiceHTML += `
        <tr class="border-t">
          <td class="p-2 font-mono">${inv.id}</td>
          <td class="p-2">${inv.date}</td>
          <td class="p-2">${inv.description}</td>
          <td class="p-2 text-right">$${inv.amount.toFixed(2)}</td>
        </tr>
      `;
    });

    invoiceHTML += `
          </tbody>
        </table>
      </td>
    `;

    invoiceRow.innerHTML = invoiceHTML;

    // Insert right below its parent write-off
    const parentRow = document.querySelector(`.writeoff-row[data-id="${writeoff.id}"]`);
    parentRow.insertAdjacentElement("afterend", invoiceRow);
  }
}

// Initialize on page load
window.onload = loadWriteoffs;


