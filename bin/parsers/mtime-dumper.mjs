#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';

async function getFileDates(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    const fileDates = {};

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);
      fileDates[file] = {
        modified: stats.mtime.toISOString(),
      };
    }

    return fileDates;
  } catch (error) {
    console.error('Error reading folder:', error);
    return {};
  }
}

// Usage: node script.mjs /path/to/folder
(async () => {
  const inputFolderPath = process.argv[2] || '.';
  const outputFilePath = process.argv[3] || 'a.out';
  const dates = await getFileDates(inputFolderPath);
  await fs.writeFile(outputFilePath, JSON.stringify(dates, null, 2))
})();
