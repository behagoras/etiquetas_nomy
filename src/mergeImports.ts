import * as fs from 'fs';
import * as path from 'path';
import { Card } from './createFiles/types';

const json1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../output/1.json'), 'utf-8'));
const json2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../output/2.json'), 'utf-8'));
const json3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../output/3.json'), 'utf-8'));

export const outputFolder = process.argv[2] || './output';

const mergedArray: Card[] = [...json1, ...json2, ...json3]
  .sort((a: Card, b: Card) => a.title.localeCompare(b.title));

// Save the merged array to a JSON file
fs.writeFileSync(path.join(outputFolder, 'merged.json'), JSON.stringify(mergedArray, null, 2));

console.log(mergedArray);