import * as XLSX from 'xlsx';
import { getIconFromType } from "./icons";
import { ThirdPage } from "./types";


export const getThirdPage = (workbook: XLSX.WorkBook) => {
  const thirdSheet = workbook.Sheets[workbook.SheetNames[2]];
  const thirdSheetData = XLSX.utils.sheet_to_json<ThirdPage>(thirdSheet);

  const thirdPage = thirdSheetData.reduce((acc: Record<string, ThirdPage[]>, row: ThirdPage, index: number) => {
    const { type } = row;

    if (!type) {
      if (!acc.default) acc.default = [];
      acc.default.push({ ...row, type: '', icon: getIconFromType('default') });
      return acc;
    }

    if (!acc[type]) acc[type] = [];

    acc[type].push({ ...row, icon: getIconFromType(type) });

    return acc;
  }, {} as Record<string, ThirdPage[]>);

  return thirdPage;
}