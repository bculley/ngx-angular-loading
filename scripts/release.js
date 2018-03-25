
const rimraf = require('rimraf')
const fs = require('fs-extra');
const packagejson = require('../package.json');

delete packagejson.scripts;
delete packagejson.devDependencies;

packagejson.main = patchPath(packagejson.main);
packagejson.module = patchPath(packagejson.module);
packagejson.typings = patchPath(packagejson.typings);

try {
  fs.writeJsonSync('dist/package.json', packagejson, {spaces: '   '});
  console.log('package.json was written');
} catch (e) {
  console.error(`Failed to write package.json file due to: ${e}`);
}

try {
  fs.copy('README.md', 'dist/README.md');
  fs.copy('LICENSE', 'dist/LICENSE');
  fs.copy('src/styles', 'dist/styles');
  console.log('Copied additional files');
} catch (e) {
  console.error(`Failed to copy additional files due to: ${e}`);
}

try {
  rimraf('dist/tests',() => { console.log('deleted tests folder..'); });
} catch (e) {
  console.error(`Failed to delete test folder from final package due to: ${e}`);
}

function patchPath(path) {
  return path.replace('dist/', '');
}