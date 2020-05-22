const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptQuestions() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Please enter your name",
      name: "name",
    },
    {
      type: "input",
      message: "Please enter your GitHub username",
      name: "userName",
    },
    {
      type: "input",
      message: "Please enter your project title",
      name: "projectTitle",
    },
    {
      type: "input",
      message: "Please enter your project repo name on GitHub",
      name: "projectRepo",
    },
    {
      type: "input",
      message: "Please enter your project description",
      name: "projectDescription",
    },
    {
      type: "input",
      message: "Please enter your project installation requirements",
      name: "ProjectInstall",
    },
    {
      type: "input",
      message: "Please enter your project can be used",
      name: "ProjectUse",
    },
    {
      type: "input",
      message: "Please enter contributing info for your project",
      name: "ProjectContributing",
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
    },
  ]);
}

async function generateReadMe() {
  try {
    const userInput = await promptQuestions();
    const queryUrl = `https://api.github.com/users/${userInput.userName}`;
    const { data } = await axios.get(queryUrl);
    const badgeURL = `https://opensource.org/licenses/MIT`;
    console.log(data);

    const title = userInput.projectTitle;
    const description = userInput.projectDescription;
    const tableContents = userInput.ProjectContents;
    const installation = userInput.ProjectInstall;
    const usage = userInput.ProjectUse;
    const tests = userInput.ProjectTest;
    const contribution = userInput.ProjectContributing;
    const name = userInput.name;
    const github = userInput.userName;
    const avatar = data.avatar_url;
    const contact = userInput.ProjectContact;

    const readMeText = `# ${title}
    \n\n## Description 
    \n${description}
    \n\n## Table of Contents
    \n*[Description](#description)
    \n*[Installation](#installation)
    \n*[Usage](#usage)
    \n*[Tests](#tests)
    \n*[Contribution](#contribution)
    \n*[License](#badgeURL)
    \n*[Author](#name)
    \n*[Contact](#contact)
    \n\n## Installation
    \n${installation}
    \n\n## Usage
    \n${usage}
    \n\n## Tests
    \n${tests}
    \n\n## Contribution
    \n${contribution}
    \n\n## License\n![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
    \n\n${badgeURL}
    \n\n## Author
    \n\n Name: ${name}
    \n\n GitHub: ${github}
    \n\n ![Alt Text](${avatar})
    \n\n## Contact\n${contact}`;

    writeFileAsync("MyReadMe.md", readMeText);
    
  } catch (error) {
    console.log(error);
  }
}
generateReadMe();
