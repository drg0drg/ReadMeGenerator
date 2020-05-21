const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");


const writeFileAsync = util.promisify(fs.writeFile);

function generateReadMe (){
  const userInput = inquirer.prompt([{
    message: "Please enter your name",
    name: "name"
  },
  {
    message: "Please enter your GitHub username",
    name: "GitHubUserName"
  },
  {
    message: "Please enter your project title",
    name: "ProjectTitle"
  },
  {
    message: "Please enter your project repo name on GitHub",
    name: "ProjectRepo"
  },
  {
    message: "Please enter your project description",
    name: "ProjectDescription"
  },
  {
    message: "Please enter your project table of contents",
    name: "ProjectContents"
  },
  {
    message: "Please enter your project installation requirements",
    name: "ProjectInstall"
  },
  {
    message: "Please enter your project can be used",
    name: "ProjectUse"
  },
  {
    message: "Please enter contributing info for your project",
    name: "ProjectContributing"
  },
  {
    message: "Please enter what tests has your project passed",
    name: "ProjectTest"
  },
  {
    message: "Please enter your contact for this project",
    name: "ProjectContact"
  },
])

const readMeText = `${userInput.ProjectTitle} Description:${userInput.ProjectDescription}`;
const myReadMe = writeFileAsync("readme.md", readMeText);

}

generateReadMe ();
