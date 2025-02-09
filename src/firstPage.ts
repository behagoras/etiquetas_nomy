import * as XLSX from 'xlsx';
import { getIconFromType } from "./icons";
import { FirstPAge, Groups } from "./types";

export const getFirstPage = (workbook: XLSX.WorkBook) => {
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const firstSheetData = XLSX.utils.sheet_to_json<FirstPAge>(firstSheet);

  const firstPage: Groups = {};

  firstSheetData.forEach((row: FirstPAge) => {
    const { type, tray } = row;

    if (!firstPage[type]) firstPage[type] = {};
    if (!firstPage[type][tray]) firstPage[type][tray] = [];

    const rowWithIcon = { ...row, icon: getIconFromType(type) };
    firstPage[type][tray].push(rowWithIcon);
  });


  const chunkPages = Object.entries(firstPage).map(([type, trays]) => {
    return {
      [type]: Object.entries(trays).reduce((acc: { [tray: string]: FirstPAge[][] }, [tray, items]) => {
        acc[tray] = [];
        for (let i = 0; i < items.length; i += 11) {
          acc[tray].push(items.slice(i, i + 11));
        }
        return acc;
      }, {})
    };
  });


  return chunkPages;
};