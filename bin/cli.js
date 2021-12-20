#!/usr/bin/env node
const { execSync } = require('child_process');

// Passed project name
const repoName = process.argv[2];

// Executes a command in bash
const runCommand = (command) => {
  try { // try to execute command
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) { // command failed
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true; // command succeeded
};

// Checkout repo
console.log(`Cloning as ${repoName}...`);
const gitCheckoutCommand = `git clone --depth 1 https://github.com/RecklessTechnology/create-reckless-tech-app ${repoName}`;
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exitCode = -1;

// Install create-react-app
console.log('Starting with create-react-app...');
const installCRACommand = `cd ${repoName}/ && npx create-react-app ${repoName}`;
const installCRA = runCommand(installCRACommand);
if (!installCRA) process.exitCode = -1;

// Remove files from create-react-app
console.log('Removing CRA files...');
const removeCRAFilesCommand = `cd ./${repoName}/${repoName}/ && rm -r src/ && rm -r public/`;
const removeCRAFiles = runCommand(removeCRAFilesCommand);
if (!removeCRAFiles) process.exitCode = -1;

// // Replace with files from create-reckless-tech-app
console.log('Adding CRTA files...');
const moveCRTAFilesCommand = `cd ./${repoName}/ && mv ./src ./../../${repoName}/ && mv ./public ./../../${repoName}/ && ./Dockerfile ./../../${repoName}/ && && ./package.json ./../../${repoName}/rt_package.json`;
const moveCRTAFiles = runCommand(moveCRTAFilesCommand);
if (!moveCRTAFiles) process.exitCode = -1;