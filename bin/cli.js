#!/usr/bin/env node
const { execSync } = require('child_process');

// Passed project name
const repoName = process.argv[2];

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
const gitCheckoutCommand = `git clone --depth 1 https://github.com/RecklessTechnology/create-reckless-tech-app ${repoName}`;
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exitCode = -1;

// Install create-react-app
console.log(`Starting with create-react-app...`);
const installCRACommand = `cd ${repoName}/ && npx create-react-app ${repoName}`;
const installCRA = runCommand(installCRACommand);
if (!installCRA) process.exitCode = -1;

// Remove files from create-react-app
console.log(`Removing CRA files...`);
const removeCRAFilesCommand = `cd ./${repoName}/${repoName}/ && rm -r src/ && rm -r public/`;
const removeCRAFiles = runCommand(removeCRAFilesCommand);
if (!removeCRAFiles) process.exitCode = -1;

// // Replace with files from create-reckless-tech-app
console.log(`Adding CRTA files...`);
const moveCRTAFilesCommand = `cd ./${repoName}/ && mv ./src ./../../${repoName}/ && mv ./public ./../../${repoName}/ && ./Dockerfile ./../../${repoName}/ && && ./package.json ./../../${repoName}/rt_package.json`;
const moveCRTAFiles = runCommand(moveCRTAFilesCommand);
if (!moveCRTAFiles) process.exitCode = -1;

// // Add docker files
// console.log(`Adding Docker files...`);
// const moveDockerFilesCommand = `cd ./${repoName}/assets/Docker && mv ./Dockerfile ./../../${repoName}/`;
// const moveDockerFiles = runCommand(moveDockerFilesCommand);
// if (!moveDockerFiles) process.exitCode = -1;

// // Remove CRTA files
// console.log(`Removing CRTA files...`);
// const removeCRTAFilesCommand = `cd ./${repoName}/ && mv ./package.json ./${repoName}/src/rt_package.json && rm README.md && rm .gitignore`;
// const removeCRTAFiles = runCommand(removeCRTAFilesCommand);
// if (!removeCRTAFiles) process.exitCode = -1;

// // Move CRTA files to root
// console.log(`Move CRTA files to root...`);
// const moveCRAFilesCommand = `cd ./${repoName}/${repoName}/ && mv ./* ./../ && mv ./.gitignore ./../.gitignore`;
// const moveCRAFiles = runCommand(moveCRAFilesCommand);
// if (!moveCRAFiles) process.exitCode = -1;

// // Install dependencies
// console.log(`Installing dependencies for ${repoName}...`);
// const installDepsCommand = `cd ./${repoName}/ && npm install && npm install redux-devtools-extension @material-ui/core @material-ui/icons @material-ui/styles @react-spring/three react-redux @react-three/fiber react-use-gesture redux redux-thunk three --save`;
// const installDeps = runCommand(installDepsCommand);
// if (!installDeps) process.exitCode = -1;

// // Clean up CRTA files
// console.log(`Cleaning up remaining template files...`);
// const cleanUpCommand = `cd ./${repoName}/ && rm -r ./assets && rm -r ./${repoName} && rm -r ./bin && rm -rf ./.git`;
// const cleanUp = runCommand(cleanUpCommand);
// if (!cleanUp) process.exitCode = -1;

// // Install complete
// console.log(`Installation ready. Use the following command to start.`);
// console.log(`cd ${repoName} && npm start`);

// // const packageJson = {
// //   name: appName,
// //   version: '0.1.0',
// //   private: true,
// // };
// // fs.writeFileSync(
// //   path.join(root, 'package.json'),
// //   JSON.stringify(packageJson, null, 2) + os.EOL
// // );