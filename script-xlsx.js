const sqlite3 = require('better-sqlite3');
const db = sqlite3('data.db');
const xlsx = require('xlsx')
const formData ={
  "usuarios-select": "usuarios",
  "produtos-select": "produtos"
}
function convertDbToExcel(formData) {
   const wb = xlsx.utils.book_new();
  for(tableName of Object.values(formData)) {
  const stmt = db.prepare(`SELECT * FROM ${tableName}`);
  const rows = stmt.all();

  const ws = xlsx.utils.json_to_sheet(rows);

  xlsx.utils.book_append_sheet(wb, ws, tab);

}
const excelFilePath = `data.xlsx`;
xlsx.writeFile(wb, excelFilePath);
console.log(`Excel file "${excelFilePath}" has been created successfully.`);

}

convertDbToExcel(formData)

