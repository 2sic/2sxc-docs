// we are using separate node script to ensure executin after webpack build
// had issues with webpack plugins, because they are executed before webpack ts transpile
const fs = require('fs-extra');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../templates/2sxc/public');
const destDir = path.resolve(__dirname, '../../../docs/public');

// Copy from source to destination with forced overwrite
fs.copy(srcDir, destDir, { overwrite: true })
  .then(() => console.log('Copy completed!'))
  .catch(err => {
    console.error('An error occurred while copying the folder.', err);
    process.exit(1);
  });
