#!/usr/bin/env node
const { execSync } = require('child_process');

const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1 https://github.com/RecklessTechnology/create-reckless-tech-app ${repoName}`;
const installCRACommand = `cd ${repoName}/ && npx create-react-app ${repoName}`;
const removeFilesCommand = `cd ./${repoName}/${repoName}/src/ && rm App.css && rm App.js && rm Index.css && rm Index.js && rm logo.svg`;
const copyFilesCommand = `cd ./${repoName}/assets/ && cp -r ./* ./../${repoName}/src/`;
const installDepsCommand = `cd ./${repoName}/${repoName}/ && npm install`;

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

// // Install dependencies
console.log(`Installing dependencies for ${repoName}...`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exitCode = -1;

// Install complete
console.log(`Installation ready. Use the following command to start.`);
console.log(`cd ${repoName} && npm start`);