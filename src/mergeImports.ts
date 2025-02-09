import * as fs from 'fs';
import * as path from 'path';
import { Card } from './createFiles/types';

const json1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../output/1.json'), 'utf-8'));
const json2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../output/2.json'), 'utf-8'));
const json3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../output/3.json'), 'utf-8'));

export const outputFolder = process.argv[2] || './output';

const mergedArray: Card[] = [...json1, ...json2, ...json3]
  .sort((a: Card, b: Card) => {
    const isASymbol = /^[^a-zA-Z0-9]/.test(a.title); // Check if `a.title` starts with a non-alphanumeric character
    const isBSymbol = /^[^a-zA-Z0-9]/.test(b.title); // Check if `b.title` starts with a non-alphanumeric character

    if (isASymbol && !isBSymbol) return 1; // Move `a` down
    if (!isASymbol && isBSymbol) return -1; // Move `b` down

    return a.title.localeCompare(b.title); // Normal sorting for remaining titles
  });

// Save the merged array to a JSON file
fs.writeFileSync(path.join(outputFolder, 'merged.json'), JSON.stringify(mergedArray, null, 2));
