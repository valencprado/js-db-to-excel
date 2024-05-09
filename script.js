const sqlite3 = require('better-sqlite3');
const ExcelJS = require('exceljs');

const formData = {
// columns selected by a checkbox form
}


const db = sqlite3('data.db');
const workbook = new ExcelJS.Workbook();

for(column of Object.values(formData)) {
  
  const rows = db.prepare(`SELECT * FROM ${column}`).all();
  

  const worksheet = workbook.addWorksheet(`${column}`);
  

  const headers = Object.keys(rows[0]); // header is the first row
  worksheet.addRow(headers);
  
  rows.forEach(row => {
    const values = Object.values(row);
    worksheet.addRow(values); // populates the rows
  });
  
  
}
  
  workbook.xlsx.writeFile('data.xlsx') // write the final file with all the sheets set
  .then(() => {
    console.log('Excel file created successfully.');
  })
  .catch(err => {
    console.error('Error creating Excel file:', err);
  });