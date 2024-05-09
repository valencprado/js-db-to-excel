const sqlite3 = require('better-sqlite3');
const ExcelJS = require('exceljs');

const formData = {
  "armadilhas-select": "armadilhas",
  "ninhos-select": "ninhos"
}
// Open SQLite database file
const db = sqlite3('data.db');
const workbook = new ExcelJS.Workbook();

for(column of Object.values(formData)) {

  
  
  const rows = db.prepare(`SELECT * FROM ${column}`).all();
  

  const worksheet = workbook.addWorksheet(`${column}`);
  
  // Add headers
  const headers = Object.keys(rows[0]);
  worksheet.addRow(headers);
  
  // Add rows
  rows.forEach(row => {
    const values = Object.values(row);
    worksheet.addRow(values);
  });
  
  
}
  // Save the workbook to a file
  workbook.xlsx.writeFile('data.xlsx')
  .then(() => {
    console.log('Excel file created successfully.');
  })
  .catch(err => {
    console.error('Error creating Excel file:', err);
  });