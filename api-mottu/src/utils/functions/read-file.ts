import fs from "node:fs";
import path from "node:path";

import xlsx from "node-xlsx";

function excelDateToJSDate(excelDate: number) {
  const startDate = new Date(1900, 0, 1); // Excel base date
  const days = excelDate - 1; // Excel's day 1 is 1900-01-01, not 1900-01-00
  return new Date(startDate.setDate(days)).toISOString().split('T')[0]; // Retorna data em formato YYYY-MM-DD
}

export async function readFile() {
  const filePath = path.resolve(__dirname, "../../database/data.xlsx");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const workSheetFromFile = xlsx.parse(filePath);
  const sheet = workSheetFromFile.find((sheet) => sheet.name === 'Vendas & Aluguel - Dados');

  if (!sheet) {
    return null;
  }

  const formattedData = sheet.data.slice(1).map((row) => ({
    date: row[0] ? new Date(excelDateToJSDate(row[0])) : null,
    "A/V": String(row[1]),
    state: String(row[2]),
    entry_value: Number(row[3]) || 0,
    deposit: Number(row[4]) || 0,
  }));

  return formattedData
}
