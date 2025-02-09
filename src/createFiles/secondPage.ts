import * as XLSX from 'xlsx';
import { getColorFromType, getIconFromType } from "./icons";
import { SecondPage, Type } from "./types";

/**
 * Represents a formatted card.
 */
interface Card {
  count: string;
  title: string;
  contents: string[];
  tags: string[];
  color: string;
  icon: string;
  icon_back?: string;
  title_size: string;
  card_font_size: string;
}

/**
 * The grouped structure for second page rows.
 */
interface SecondPageGroups {
  [type: string]: {
    [tray: string]: SecondPage[];
  };
}

/**
 * Groups second page rows by "type" and "tray", adding an icon to each row.
 */
const groupSecondPageRowsByTypeAndTray = (rows: SecondPage[]): SecondPageGroups =>
  rows.reduce<SecondPageGroups>((acc, row) => {
    const { type, tray } = row;
    if (!acc[type]) acc[type] = {};
    const trayKey = String(tray);
    if (!acc[type][trayKey]) acc[type][trayKey] = [];
    acc[type][trayKey].push({ ...row, icon: getIconFromType(type) });
    return acc;
  }, {});

/**
 * Converts the grouped second page rows into an array of Card objects.
 */
const formatSecondPageCards = (groups: SecondPageGroups): Card[] =>
  Object.entries(groups).flatMap(([type, trays]) => {
    const formattedType = type.toUpperCase();
    return Object.entries(trays).map(([tray, rows]) => {
      // Assume the rows are ordered by "from". Use the first and last rows to determine the range.
      const firstRow = rows[0];
      const lastRow = rows[rows.length - 1];

      const codeType = firstRow.code_type;
      const firstFrom = firstRow.from;
      // If "to" is available on the last row, use it; otherwise, just show the starting value.
      const lastTo = lastRow.to ? lastRow.to : firstFrom;

      const subtitleRange = `subtitle| desde ${codeType}-${firstFrom}${lastRow.to ? " hasta " + codeType + "-" + lastTo : ""}.`;

      const contents = [
        `subtitle | Caja ${tray}`,
        "ruler",
        "",
        `text| ${formattedType}.`,
        "ruler",
        "",
        subtitleRange,
        "ruler",
        "",
        "",
        "fill | 1",
        "",
        "ruler",
        `property | Caja | ${tray}`,
      ];

      return {
        count: "1",
        title: `${formattedType} CAJA ${tray}`,
        contents,
        tags: [],
        color: getColorFromType(type as Type),
        icon: getIconFromType(type as Type),
        icon_back: "",
        title_size: "25",
        card_font_size: "14",
      } as Card;
    });
  });

/**
 * Processes the second sheet of the workbook and returns an array of formatted cards.
 */
export const getSecondPage = (workbook: XLSX.WorkBook): Card[] => {
  const sheet = workbook.Sheets[workbook.SheetNames[1]];
  const data = XLSX.utils.sheet_to_json<SecondPage>(sheet);
  const groupedRows = groupSecondPageRowsByTypeAndTray(data);
  const cards = formatSecondPageCards(groupedRows);
  console.log("🚀 ~ Second Page Cards:", cards.length);
  return cards;
};