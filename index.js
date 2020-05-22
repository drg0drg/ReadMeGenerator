const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

async function generateReadMe() {
  try {
    //-----------------------------------------
    //------------Questions Section------------
    //-----------------------------------------
    const userInput = await inquirer.prompt([
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
        message: "Please enter your project table of contents",
        name: "ProjectContents",
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
    // console.log(userInput);
    //--------------------------------------------
    //--------------API Section-------------------
    //--------------------------------------------
    // Creating the link for the API call
    const queryUrl = `https://api.github.com/users/${userInput.userName}`;
    const { data } = await axios.get(queryUrl);
    console.log(data);
    //--------------------------------------
    //--------Bagde Section-----------------
    //--------------------------------------
    //Adding the badge. The link should have github username "/" name of the repo added at the end
    const badgeURL = `https://img.shields.io/github/license/${userInput.userName}/${userInput.projectRepo}`
    //------------------------------------------------
    //-----------ReadMe Contents Section--------------
    //------------------------------------------------
    const readMeText = `## ${userInput.projectTitle}\n\n# Description \n${userInput.projectDescription}\n\n# Table of Contents\n${userInput.ProjectContents}\n\n# License\n${badgeURL}\n\n# Tests\n${userInput.ProjectTest}\n\n# Contribution\n${userInput.ProjectContributing}\n\n# Installation\n${userInput.ProjectInstall}\n\n# Usage\n${userInput.ProjectUse}\n\n# Author\nName: ${userInput.name}\nGitHub: ${userInput.userName}\n${data.avatar_url}\n\n# Contact\n${userInput.ProjectContact}`;
    writeFileAsync("MYreadme.md", readMeText);

  } catch (error) {
    console.log(error);
  }
}

generateReadMe();
