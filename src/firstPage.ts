import * as XLSX from 'xlsx';
import { getColorFromType, getIconFromType } from "./icons";
import { FirstPAge, Groups, Type } from "./types";

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
 * Groups the rows by "type" and "tray", adding an icon to each row.
 */
const groupRowsByTypeAndTray = (rows: FirstPAge[]): Groups => {
  const grouped: Groups = {};

  rows.forEach((row: FirstPAge) => {
    const { type, tray } = row;

    if (!grouped[type]) {
      grouped[type] = {};
    }
    if (!grouped[type][tray]) {
      grouped[type][tray] = [];
    }

    const rowWithIcon = { ...row, icon: getIconFromType(type) };
    grouped[type][tray].push(rowWithIcon);
  });

  return grouped;
};

/**
 * Splits an array into chunks of a specified size.
 */
const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

/**
 * For each tray in the grouped object, splits the array of rows into smaller arrays (chunks).
 */
const chunkGroupedRows = (
  grouped: Groups,
  chunkSize: number
): { [type: string]: { [tray: string]: FirstPAge[][] } } => {
  const chunkedGroups: { [type: string]: { [tray: string]: FirstPAge[][] } } = {};

  Object.entries(grouped).forEach(([type, trays]) => {
    chunkedGroups[type] = {};
    Object.entries(trays).forEach(([tray, rows]) => {
      chunkedGroups[type][tray] = chunkArray(rows, chunkSize);
    });
  });

  return chunkedGroups;
};

/**
 * Given an array of rows, formats each row as a property string and then splits them into columns
 * of 11 items. Then, it “transposes” the columns so that each output line consists of one item
 * from each column (if available), joined by " | ".
 */
const formatPropertyLines = (rows: FirstPAge[]): string[] => {
  // Map each row to a property string.
  const properties = rows.map(
    row => {
      const { code_type, gheller, description, code_number, type } = row;
      const ghellerString = gheller ? ` - ${gheller}` : '';
      const code = `${code_type}-${code_number}`
      const descriptionString = description ? `${description}` : `${type}________________________`;

      if(code_number=='12')console.log("🚀 ~ descriptionString:", descriptionString)
      return `${code}${ghellerString} | ${descriptionString}`;
    }
  );
  // Split into columns of 11 items each.
  const columns = chunkArray(properties, 11);
  // Determine the maximum column length.
  const maxRows = Math.max(...columns.map(col => col.length));
  const lines: string[] = [];
  for (let i = 0; i < maxRows; i++) {
    // For each row index, grab the ith element from each column (or an empty string if missing)
    const lineParts = columns.map(col => (col[i] ? col[i] : ""));
    // Join the parts with a delimiter (you can adjust the delimiter as needed)
    const line = "property | " + lineParts.join(" | ");
    lines.push(line);
  }
  return lines;
};

/**
 * Formats the chunked groups into an array of card objects.
 * The title of the card is `${formattedType} CAJA ${formattedTray}` (with tray formatted as tray + ".0")
 * and the contents include fixed lines plus the property lines arranged in columns.
 */
const formatCards = (
  chunkedGroups: { [type: string]: { [tray: string]: FirstPAge[][] } }
): Card[] => {
  const cards: Card[] = [];

  // Iterate over each type.
  Object.entries(chunkedGroups).forEach(([type, trays]) => {
    // Keep the type as provided (converted to uppercase only).
    const formattedType = type.toUpperCase();

    // Iterate over each tray within that type.
    Object.entries(trays).forEach(([tray, chunks]) => {
      // Flatten all chunks for this tray to use all rows.
      const trayRows = chunks.flat();

      // Use the first and last row to determine the range.
      const firstCode = trayRows[0].code_number;
      const lastCode = trayRows[trayRows.length - 1].code_number;
      const code_type = trayRows[0].code_type;

      // Format property lines by distributing all rows into columns of 11.
      const propertyLines = formatPropertyLines(trayRows);

      // Build the contents array with fixed lines and the property lines.
      const contents: string[] = [
        `subtitle | Caja ${tray}`,
        "ruler",
        "",
        `text| ${formattedType}.`,
        "ruler",
        "",
        `subtitle| from ${code_type}-${firstCode} to ${code_type}-${lastCode}.`,
        "ruler",
        "",
        ...propertyLines,
        "",
        "fill | 1",
        "",
        "ruler",
        `property | Caja | ${tray}`,
      ];

      // Create the card object.
      const card: Card = {
        count: "1",
        title: `${formattedType} CAJA ${tray}`,
        contents,
        tags: [],
        color: getColorFromType(type as Type), // #6A0572
        icon: getIconFromType(type as Type),
        icon_back: "",
        title_size: "25",
        card_font_size: "14",
      };

      cards.push(card);
    });
  });

  return cards;
};

/**
 * Processes the first sheet of the workbook:
 * 1. Groups rows by type and tray, adding an icon to each row.
 * 2. Chunks each tray's rows into arrays of 11 items.
 * 3. Formats the chunked groups into an array of card objects with property lines arranged in columns.
 */
export const getFirstPage = (workbook: XLSX.WorkBook): Card[] => {
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const firstSheetData = XLSX.utils.sheet_to_json<FirstPAge>(firstSheet);

  // Step 1: Group rows by "type" and "tray".
  const groupedRows = groupRowsByTypeAndTray(firstSheetData);

  // Step 2: Chunk each tray's rows into arrays of 11 items each.
  const chunkedGroups = chunkGroupedRows(groupedRows, 11);

  // Step 3: Format the chunked groups into card objects.
  const formattedCards = formatCards(chunkedGroups);
  console.log("🚀 ~ formattedCards:", formattedCards.length);

  return formattedCards;
};