import * as XLSX from 'xlsx';
import * as fs from 'fs';

// Check if the input file is provided as a command-line argument
if (process.argv.length < 3) {
  console.error('Usage: node script.js <input-file.xlsx> [output-folder]');
  process.exit(1); // Exit with an error code
}

// Get the input file path from the command-line argument
export const inputFile = process.argv[2];

// Validate the input file
if (!fs.existsSync(inputFile) || !fs.lstatSync(inputFile).isFile()) {
  console.error('The input file does not exist or is not a valid file.');
  process.exit(1);
}

// Get the output folder path (default to './output' if not provided)
export const outputFolder = process.argv[3] || './output';

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}


let _workbook: XLSX.WorkBook;
try {
  _workbook = XLSX.readFile(inputFile);
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error reading the Excel file: ${error.message}`);
  } else {
    console.error('Error reading the Excel file');
  }
  process.exit(1);
}

export const workbook = _workbook;