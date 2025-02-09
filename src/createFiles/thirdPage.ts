import * as XLSX from 'xlsx';
import { getColorFromType, getIconFromType } from "./icons";
import { ThirdPage, Type } from "./types";

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
 * Groups third page rows by the "type" field.
 * Rows with an empty type are grouped under "default".
 */
const groupThirdPageRowsByType = (rows: ThirdPage[]): Record<string, ThirdPage[]> =>
  rows.reduce<Record<string, ThirdPage[]>>((acc, row) => {
    // Use trimmed type or fallback to 'default'
    const key = row.type?.trim() || 'default';
    if (!acc[key]) acc[key] = [];
    // Add the row and include an icon based on the type
    acc[key].push({ ...row, icon: getIconFromType(key as Type) });
    return acc;
  }, {});

/**
 * Converts the grouped third page rows into an array of Card objects.
 * Each card displays the box information.
 */
const formatThirdPageCards = (grouped: Record<string, ThirdPage[]>): Card[] =>
  Object.entries(grouped).flatMap(([type, rows]) => {
    const formattedType = type === 'default' ? '~' : type.toUpperCase();
    return rows.map(row => {
      const box = row.box; // "box" field from the row
      const contents = [
        `subtitle | ${box}`,
        "ruler",
        "",
        `text| ${formattedType}.`,
        "ruler",
        "",
        "fill | 1",
        "",
        "ruler",
        `property | ${box} |`,
      ];

      return {
        count: "1",
        title: `${formattedType} ${box}`,
        contents,
        tags: [],
        color: getColorFromType(type as Type),
        icon: row.icon,
        icon_back: "",
        title_size: "25",
        card_font_size: "14",
      } as Card;
    });
  });

/**
 * Processes the third sheet of the workbook and returns an array of formatted cards.
 */
export const getThirdPage = (workbook: XLSX.WorkBook): Card[] => {
  const sheet = workbook.Sheets[workbook.SheetNames[2]];
  const data = XLSX.utils.sheet_to_json<ThirdPage>(sheet);
  const groupedRows = groupThirdPageRowsByType(data);
  const cards = formatThirdPageCards(groupedRows);
  console.log("🚀 ~ Third Page Cards:", cards.length);
  return cards;
};