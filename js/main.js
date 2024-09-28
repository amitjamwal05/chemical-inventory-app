let chemicals = [
    { id: 1, chemical_name: "Sodium Chloride", vendor: "Chemical Co.", density: "2.16 g/cm³", viscosity: "0.89 mPa·s", packaging: "Bag", pack_size: "1kg", unit: "kg", quantity: 100 },
    { id: 2, chemical_name: "Potassium Nitrate", vendor: "Nitrate Solutions", density: "1.98 g/cm³", viscosity: "0.80 mPa·s", packaging: "Box", pack_size: "500g", unit: "g", quantity: 50 },
    { id: 3, chemical_name: "Ammonium Sulfate", vendor: "Sulfate Supply", density: "1.77 g/cm³", viscosity: "1.00 mPa·s", packaging: "Bag", pack_size: "1kg", unit: "kg", quantity: 75 },
    { id: 4, chemical_name: "Calcium Carbonate", vendor: "Calcium Corp.", density: "2.71 g/cm³", viscosity: "0.60 mPa·s", packaging: "Bottle", pack_size: "1L", unit: "L", quantity: 30 },
    { id: 5, chemical_name: "Boric Acid", vendor: "Boric Supply", density: "1.43 g/cm³", viscosity: "0.70 mPa·s", packaging: "Box", pack_size: "250g", unit: "g", quantity: 20 },
    { id: 6, chemical_name: "Hydrochloric Acid", vendor: "Acid Co.", density: "1.19 g/cm³", viscosity: "0.89 mPa·s", packaging: "Bottle", pack_size: "500ml", unit: "ml", quantity: 40 },
    { id: 7, chemical_name: "Sulfuric Acid", vendor: "Sulfuric Supply", density: "1.84 g/cm³", viscosity: "1.12 mPa·s", packaging: "Drum", pack_size: "5L", unit: "L", quantity: 25 }
];

// Function to load data into the table
function loadTableData() {
    const tableBody = document.querySelector("#chemicalTable tbody");
    tableBody.innerHTML = "";

    chemicals.forEach(chemical => {
        const row = document.createElement("tr");
        row.onclick = () => selectRow(row);
        Object.values(chemical).forEach(text => {
            const cell = document.createElement("td");
            cell.textContent = text;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

// Function to select a row
let selectedRowIndex = -1;
function selectRow(row) {
    const rows = document.querySelectorAll("#chemicalTable tbody tr");
    rows.forEach(r => r.classList.remove("selected"));
    row.classList.add("selected");
    selectedRowIndex = Array.from(rows).indexOf(row);
}

// Sorting function
function sortTable(columnIndex) {
    const table = document.getElementById("chemicalTable");
    const rows = Array.from(table.rows).slice(1);

    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent;
        const cellB = b.cells[columnIndex].textContent;

        if (!isNaN(cellA) && !isNaN(cellB)) {
            return parseFloat(cellA) - parseFloat(cellB);
        }
        return cellA.localeCompare(cellB);
    });

    // Append sorted rows back to the table body
    const tableBody = document.querySelector("#chemicalTable tbody");
    rows.forEach(row => tableBody.appendChild(row));
}

// Add row functionality
document.getElementById("addRow").addEventListener("click", () => {
    const newRow = {
        id: chemicals.length + 1,
        chemical_name: "New Chemical",
        vendor: "New Vendor",
        density: "0.00 g/cm³",
        viscosity: "0.00 mPa·s",
        packaging: "New Packaging",
        pack_size: "0kg",
        unit: "kg",
        quantity: 0
    };
    chemicals.push(newRow);
    loadTableData();
});

// Move row up functionality
document.getElementById("moveUp").addEventListener("click", () => {
    if (selectedRowIndex === -1) {
        alert("Please select a row first to move the row up side.");
        return;
    }
    if (selectedRowIndex > 0) {
        const movedRow = chemicals[selectedRowIndex];
        chemicals.splice(selectedRowIndex, 1);
        chemicals.splice(selectedRowIndex - 1, 0, movedRow);
        selectedRowIndex--;
        loadTableData();
        selectRow(document.querySelectorAll("#chemicalTable tbody tr")[selectedRowIndex]);
    }
});

// Move row down functionality
document.getElementById("moveDown").addEventListener("click", () => {
    if (selectedRowIndex === -1) {
        alert("Please select a row first to move the row Down side.");
        return;
    }
    if (selectedRowIndex < chemicals.length - 1 && selectedRowIndex !== -1) {
        const movedRow = chemicals[selectedRowIndex];
        chemicals.splice(selectedRowIndex, 1);
        chemicals.splice(selectedRowIndex + 1, 0, movedRow);
        selectedRowIndex++;
        loadTableData();
        selectRow(document.querySelectorAll("#chemicalTable tbody tr")[selectedRowIndex]);
    }
});

// Function to select a row
function selectRow(row) {
    const rows = document.querySelectorAll("#chemicalTable tbody tr");
    rows.forEach(r => r.classList.remove("selected")); 
    row.classList.add("selected"); 
    selectedRowIndex = Array.from(rows).indexOf(row);
}

// Delete row functionality
document.getElementById("deleteRow").addEventListener("click", () => {
    if (selectedRowIndex !== -1) {
        if (confirm("Are you sure you want to delete this row?")) {
            chemicals.splice(selectedRowIndex, 1);
            alert("Deleted successfully!");
            selectedRowIndex = -1; 
            loadTableData();
        }
    }
});

// Refresh data functionality
document.getElementById("refreshData").addEventListener("click", () => {
    location.reload(); 
});
// Save data functionality
document.getElementById("saveData").addEventListener("click", () => {
    const jsonData = JSON.stringify(chemicals, null, 2);
    console.log("Data saved:", jsonData);
});

// Load initial data into the table
loadTableData();
