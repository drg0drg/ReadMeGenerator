const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

const userInputOK = (input) => {
  if (input === "") {
    return "\nYou may have missed a field \nPlease provide all the required information" 
  }
  return true;
};

function promptQuestions() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Please enter your name",
      name: "name",
      validate: userInputOK,
    },
    {
      type: "input",
      message: "Please enter your GitHub username",
      name: "userName",
      validate: userInputOK,

    },
    {
      type: "input",
      message: "Please enter your project title",
      name: "projectTitle",
      validate: userInputOK,

    },
    {
      type: "input",
      message: "Please enter your project repo name on GitHub",
      name: "projectRepo",
      validate: userInputOK,

    },
    {
      type: "input",
      message: "Please enter your project description",
      name: "projectDescription",
      validate: userInputOK,

    },
    {
      type: "input",
      message: "Please enter your project installation requirements",
      name: "ProjectInstall",
      validate: userInputOK,

    },
    {
      type: "input",
      message: "Please enter how your project can be used",
      name: "ProjectUse",
      validate: userInputOK,

    },
    {
      type: "input",
      message: "Please enter contributing info for your project",
      name: "ProjectContributing",
      validate: userInputOK,

    },
    {
      type: "input",
      message: "Please enter what tests has your project passed",
      name: "ProjectTest",
    },
    {
      type: "input",
      message: "Please enter your contact for this project",
      name: "ProjectContact",
      validate: function (email) {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (valid) {
          console.log("  valid email");
          return true;
        } else {
          console.log("\n Please enter a valid email");
          return false;
        }
      },
    },
  ]);
}

async function generateReadMe() {
  try {
    const userInput = await promptQuestions();
    const queryUrl = `https://api.github.com/users/${userInput.userName}`;
    const { data } = await axios.get(queryUrl);
    const badgeURL = `https://opensource.org/licenses/MIT`;
    //Building the readme document content by passing in user's input
    const readMeText = `# ${userInput.projectTitle}
    \n\n## Description 
    \n${userInput.projectDescription}
    \n\n## Table of Contents
    \n[Description](#description)
    \n[Installation](#installation)
    \n[Usage](#usage)
    \n[Tests](#tests)
    \n[Contribution](#contribution)
    \n[License](#badgeURL)
    \n[Author](#name)
    \n[Contact](#contact)
    \n\n## Installation
    \n${userInput.ProjectInstall}
    \n\n## Usage
    \n${userInput.ProjectUse}
    \n\n## Tests
    \n${userInput.ProjectTest}
    \n\n## Contribution
    \n${userInput.ProjectContributing}
    \n\n## License\n![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
    \n\n${badgeURL}
    \n\n## Author
    \n\n Name: ${userInput.name}
    \n\n GitHub: ${userInput.userName}
    \n\n ![Alt Text](${data.avatar_url})
    \n\n## Contact\n${userInput.ProjectContact}`;

    writeFileAsync("MyReadMe.md", readMeText);
  } catch (error) {
    console.log(error);
  }
}
generateReadMe();
