import * as XLSX from 'xlsx';
import { getIconFromType } from "./icons";
import { FirstPAge, Groups } from "./types";


export const getFirstPage = (workbook: XLSX.WorkBook) => {
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const firstSheetData = XLSX.utils.sheet_to_json<FirstPAge>(firstSheet);


  const firstPage: Groups = firstSheetData.reduce((acc: Groups, row: FirstPAge) => {
    const { type, tray } = row;

    // Initialize group if it doesn't exist
    const group = acc[type] || (acc[type] = {});

    // Initialize tray array if it doesn't exist
    const trayArray = group[tray] || (group[tray] = []);

    // Add row to the tray array
    trayArray.push({ ...row, icon: getIconFromType(type) });

    return acc;
  }, {});

  return firstPage;
}