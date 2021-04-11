#!/usr/bin/env node
const { execSync } = require('child_process');

const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1 https://github.com/RecklessTechnology/create-reckless-tech-app ${repoName}`;
const installCRACommand = `cd ${repoName}/ && npx create-react-app ${repoName}`;
const removeReactFilesCommand = `cd ./${repoName}/${repoName}/src/ && rm App.css && rm App.js && rm Index.css && rm Index.js && rm logo.svg`;
const copyReactFilesCommand = `cd ./${repoName}/assets/React && cp -r ./* ./../../${repoName}/src/`;
const copyDockerFilesCommand = `cd ./${repoName}/assets/Docker && cp -r ./Dockerfile ./../../${repoName}/`;
const removeCRTAFilesCommand = `cd ./${repoName}/ && rm package.json && rm README.md && rm .gitignore`;
const copyCRAFilesCommand = `cd ./${repoName}/${repoName}/ && cp -r ./* ./../`;
const installDepsCommand = `cd ./${repoName}/ && npm install && npm install @material-ui/core @material-ui/icons @material-ui/styles @react-spring/three react-redux @react-three/fiber react-use-gesture redux redux-thunk three --save`;
const cleanUpCommand = `cd ./${repoName}/ && rm -r ./assets`;

// Executes a command in bash
const runCommand = command => {
  try { // try to execute command
    execSync(`${command}`, {stdio: 'inherit'});
  } catch (e) { // command failed
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true; // command succeeded
}

// Checkout repo
console.log(`Cloning as ${repoName}...`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exitCode = -1;

// Install create-react-app
console.log(`Starting with create-react-app...`);
const installCRA = runCommand(installCRACommand);
if (!installCRA) process.exitCode = -1;

// Remove files from create-react-app
console.log(`Removing CRA files...`);
const removeReactFiles = runCommand(removeReactFilesCommand);
if (!removeReactFiles) process.exitCode = -1;

// Replace with files from create-reckless-tech-app
console.log(`Adding CRTA files...`);
const copyReactFiles = runCommand(copyReactFilesCommand);
if (!copyReactFiles) process.exitCode = -1;

// Add docker files
console.log(`Adding Docker files...`);
const copyDockerFiles = runCommand(copyDockerFilesCommand);
if (!copyDockerFiles) process.exitCode = -1;

// Remove CRTA files
console.log(`Removing CRTA files...`);
const removeCRTAFiles = runCommand(removeCRTAFilesCommand);
if (!removeCRTAFiles) process.exitCode = -1;

// Copy CRTA files to root
console.log(`Copying CRTA files to root...`);
const copyCRAFiles = runCommand(copyCRAFilesCommand);
if (!copyCRAFiles) process.exitCode = -1;

// Install dependencies
console.log(`Installing dependencies for ${repoName}...`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exitCode = -1;

// Clean up CRTA files
console.log(`Cleaning up remaining template files...`);
const cleanUp = runCommand(cleanUpCommand);
if (!cleanUp) process.exitCode = -1;

// Install complete
console.log(`Installation ready. Use the following command to start.`);
console.log(`cd ${repoName} && npm start`);

// const packageJson = {
//   name: appName,
//   version: '0.1.0',
//   private: true,
// };
// fs.writeFileSync(
//   path.join(root, 'package.json'),
//   JSON.stringify(packageJson, null, 2) + os.EOL
// );