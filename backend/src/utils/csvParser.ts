import * as fs from 'fs';
import * as path from 'path';
import csv from "csv-parser";
import XLSX from "xlsx";
import { TaskData } from "../types/index.js";


export const parseFile = async (filePath: string): Promise<TaskData[]> => {
  const ext = path.extname(filePath).toLowerCase();
  const results: TaskData[] = [];

  if (ext === ".csv") {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          const firstName =
            row.FirstName || row["First Name"] || row.firstname?.trim();
          const phoneStr = row.Phone || row.phone?.trim();
          const phone = parseInt(phoneStr, 10);
          const notes = row.Notes || row.notes?.trim();

          if (firstName && !isNaN(phone) && notes) {
            results.push({ firstName, phone, notes });
          }
        })
        .on("end", () => {
          if (results.length > 0) {
            resolve(results);
          } else {
            reject(new Error("Invalid CSV format or no valid data"));
          }
        })
        .on("error", reject);
    });
  } else if (ext === ".xlsx" || ext === ".xls") {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet) as any[];

    jsonData.forEach((row) => {
      const firstName =
        row.FirstName || row["First Name"] || row.firstname?.toString().trim();
      const phoneStr = row.Phone || row.phone?.toString().trim();
      const phone = parseInt(phoneStr, 10);
      const notes = row.Notes || row.notes?.toString().trim();

      if (firstName && !isNaN(phone) && notes) {
        results.push({ firstName, phone, notes });
      }
    });

    if (results.length === 0) {
      throw new Error("Invalid XLSX/XLS format or no valid data");
    }
    return results;
  } else {
    throw new Error("Unsupported file type");
  }
};
