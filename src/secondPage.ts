import * as XLSX from 'xlsx';
import { getIconFromType } from "./icons";
import { SecondPage } from "./types";


export const getSecondPage = (workbook: XLSX.WorkBook) => {
  const secondSheet = workbook.Sheets[workbook.SheetNames[1]];
  const secondSheetData = XLSX.utils.sheet_to_json<SecondPage>(secondSheet);
  const secondPage = secondSheetData.reduce((acc: Record<string, SecondPage[]>, row: SecondPage, index: number) => {
    const { type } = row;

    if (!type) {
      if (!acc.default) acc.default = [];
      acc.default.push(row);
      return acc;
    }
    if (!acc[type]) acc[type] = [];

    acc[type].push({ ...row, icon: getIconFromType(type) });

    return acc;
  }, {} as Record<string, SecondPage[]>);

  return secondPage;
}