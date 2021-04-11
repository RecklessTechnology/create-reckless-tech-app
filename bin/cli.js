#!/usr/bin/env node
const { execSync } = require('child_process');

const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1 https://github.com/RecklessTechnology/create-reckless-tech-app ${repoName}`;
const installCRACommand = `cd ${repoName}/ && npx create-react-app ${repoName}`;
const removeFilesCommand = `cd ./${repoName}/${repoName}/src/ && rm App.css && rm App.js && rm Index.css && rm Index.js && rm logo.svg`;
const copyReactFilesCommand = `cd ./${repoName}/assets/React && cp -r ./* ./../${repoName}/src/`;
const copyGithubFilesCommand = `cd ./${repoName}/assets/Github && cp -r ./.github/ ./../`;
const copyDockerFilesCommand = `cd ./${repoName}/assets/Docker && cp -r ./Dockerfile ./../${repoName}/  && cp -r ./docker-compose.yml ./../`;
const installDepsCommand = `cd ./${repoName}/${repoName}/ && npm install && npm install @material-ui/core @material-ui/icons @material-ui/styles @react-spring/three react-redux react-three-fiber react-use-gesture redux redux-thunk three`;

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
const removeFiles = runCommand(removeFilesCommand);
if (!removeFiles) process.exitCode = -1;

// Replace with files from create-reckless-tech-app
console.log(`Adding CRTA files...`);
const copyReactFiles = runCommand(copyReactFilesCommand);
if (!copyReactFiles) process.exitCode = -1;

// Add docker files
console.log(`Adding Docker files...`);
const copyDockerFiles = runCommand(copyDockerFilesCommand);
if (!copyDockerFiles) process.exitCode = -1;

// Add github files
console.log(`Adding Github Action files...`);
const copyGithubFiles = runCommand(copyGithubFilesCommand);
if (!copyGithubFiles) process.exitCode = -1;

// Install dependencies
console.log(`Installing dependencies for ${repoName}...`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exitCode = -1;

// Install complete
console.log(`Installation ready. Use the following command to start.`);
console.log(`cd ${repoName} && npm start`);