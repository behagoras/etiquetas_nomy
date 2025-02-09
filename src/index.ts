import * as fs from 'fs';
import * as path from 'path';
import { getFirstPage } from './firstPage';
import { outputFolder, workbook } from './getArgs';
import { getSecondPage } from './secondPage';
import { getThirdPage } from './thirdPage';

const firstPage = getFirstPage(workbook);
const secondPage = getSecondPage(workbook)
const thirdPage = getThirdPage(workbook);

// Final results
const manageableStructures = {
  firstPage,
  secondPage,
  thirdPage
};

fs.writeFileSync(
  path.join(outputFolder, '1.json'),
  JSON.stringify(manageableStructures.firstPage, null, 2)
);

fs.writeFileSync(
  path.join(outputFolder, '2.json'),
  JSON.stringify(manageableStructures.secondPage, null, 2)
);

fs.writeFileSync(
  path.join(outputFolder, '3.json'),
  JSON.stringify(manageableStructures.thirdPage, null, 2)
);

console.log(`JSON files saved to ${outputFolder}`);