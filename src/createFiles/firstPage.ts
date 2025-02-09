import * as XLSX from 'xlsx';
import { getColorFromType, getIconFromType } from "./icons";
import { Card, FirstPAge, Groups, Type } from "./types";



/**
 * Groups rows by "type" and "tray", adding an icon to each row.
 */
const groupRowsByTypeAndTray = (rows: FirstPAge[]): Groups =>
  rows.reduce<Groups>((acc, row) => {
    const { type, tray } = row;
    if (!acc[type]) acc[type] = {};
    if (!acc[type][tray]) acc[type][tray] = [];
    acc[type][tray].push({ ...row, icon: getIconFromType(type) });
    return acc;
  }, {});

/**
 * Splits an array into chunks of a specified size.
 */
const splitIntoChunks = <T>(array: T[], chunkSize = 11): T[][] =>
  Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
    array.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

/**
 * Splits each tray’s rows into smaller chunks within the grouped object.
 */
const splitGroupedRows = (
  grouped: Groups,
  chunkSize = 11
): { [type: string]: { [tray: string]: FirstPAge[][] } } =>
  Object.fromEntries(
    Object.entries(grouped).map(([type, trays]) => [
      type,
      Object.fromEntries(
        Object.entries(trays).map(([tray, rows]) => [tray, splitIntoChunks(rows, chunkSize)])
      )
    ])
  );

/**
* Formats property lines by distributing rows into columns of 11 elements.
*/
const formatPropertyLines = (rows: FirstPAge[]): string[] => {
  const properties = rows.map(({ code_type, gheller, description, code_number, type }) => {
    const ghellerStr = gheller ? ` - ${gheller}` : '';
    const descriptionStr = description || `${type}________________________`;
    return `${code_type}-${code_number}${ghellerStr} | ${descriptionStr}`;
  });

  const columns = splitIntoChunks(properties, 11);
  const maxRows = Math.max(...columns.map(col => col.length));

  return Array.from({ length: maxRows }, (_, i) =>
    "property | " + columns.map(col => col[i] || "").join(" | ")
  );
};

/**
 * Formats grouped and chunked data into an array of card objects.
 */
const convertToRpgCardFormat = (
  chunkedGroups: { [type: string]: { [tray: string]: FirstPAge[][] } }
): Card[] =>
  Object.entries(chunkedGroups).flatMap(([type, trays]) => {
    const formattedType = type.toUpperCase();

    return Object.entries(trays).map(([tray, chunks]) => {
      const trayRows = chunks.flat();
      const { code_number: firstCode, code_type } = trayRows[0];
      const lastCode = trayRows[trayRows.length - 1].code_number;
      const propertyLines = formatPropertyLines(trayRows);

      const contents = [
        `subtitle | Caja ${tray}`,
        "ruler",
        "",
        `text| ${formattedType}.`,
        "ruler",
        "",
        `subtitle| desde ${code_type}-${firstCode} hasta ${code_type}-${lastCode}.`,
        "ruler",
        "",
        ...propertyLines,
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
        title_size: "16",
        card_font_size: "12",
      } as Card;
    });
  });

/**
 * Processes the first sheet of the workbook and returns formatted cards.
 */
export const getFirstPage = (workbook: XLSX.WorkBook): Card[] => {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json<FirstPAge>(sheet);
  const groupedRows = groupRowsByTypeAndTray(data);
  const chunkedGroups = splitGroupedRows(groupedRows, 11);
  const formattedCards = convertToRpgCardFormat(chunkedGroups);
  console.log("🚀 ~ formattedCards:", formattedCards.length);
  return formattedCards;
};