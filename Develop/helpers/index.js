// TODO: Include packages needed for this application (inquirer, fs, etc.)
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const generateMarkdown = require('./generateREADME');

const writeFileAsync = util.promisify(fs.writeFile);


// TODO: Create an array of questions for user input
    //I get these are the questions, but how will someone use this tool for their own project. They clone it and it serves as their forever readme generator? Creating files?
const questions = [
    {
        type: "input",
        name: "projectTitle",
        message: "What is the title of your project?",
    },
    {
        type: "input",
        name: "projectDescription",
        message: "Give a short description of your project.",
    },
    {
        type: "input",
        name: "installation",
        message: "What are the steps needed to install your project?",
    },
    {
        type: "input",
        name: "usage",
        message: "How do you use this project?",
    },
    {
        type: "input",
        name: "credits",
        message: "Who contributed to this project?",
    },
    {
        type: "list",
        name: "license",
        message: 'What kind of license does your project need?',
        choices: ['MIT', 'GNU'],
        default: ["MIT"],
    },
    {
        type: "input",
        name: "badges",
        message: "Any badges you want to include?",
    },
    {
        type: "input",
        name: "contribute",
        message: "How can other developers contribute to the project?",
    },
    {
        type: "input",
        name: "test",
        message: "How to test?",
    },
];

const promptUser = () => {
  return inquirer.prompt(questions)
}


const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('README.md', generateMarkdown(answers)))
        .then(() => console.log('Successfully wrote to README.md'))
        .catch((err) => console.error(err));
}

// Function call to initialize app
init();