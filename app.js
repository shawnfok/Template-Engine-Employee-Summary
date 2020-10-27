const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Create an empty array for all teammembers
const MyTeam = [];

// Collect manager's info first
function managerInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter manager name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter manager ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter manager email:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter manager office number:"
        }
    ]).then(responses => {
        let { name, id, email, officeNumber } = responses;
        let manager = new Manager(name, id, email, officeNumber);

        MyTeam.push(manager);

        createTeam();
    })
}

// Ask manager to pick an action
// This function will loop until manager selects "Generate my teamlist" to exit
function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Please select an option:",
            choices: [
                "Add an engineer", 
                "Add an intern", 
                "Generate my teamlist"
            ]
        }
    ]).then(responses => {
        memberType = responses.option;
        switch (memberType) {
            case "Add an engineer":
                createEngineer();
                break;

            case "Add an intern":
                createIntern();
                break;

            case "Generate my teamlist":
                writeTeam();
                break;
        }
    })
}

// For manager to add a new engineer
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter engineer's nam:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter engineer's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter engineer's email:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter engineer's github name:"
        },
    ]).then(responses => {
        let { name, id, email, github } = responses;
        let engineer = new Engineer(name, id, email, github);

        MyTeam.push(engineer);
        createTeam();
    })
}

// For manager to add a new intern
function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter intern's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter intern's ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter intern's email:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter intern's school:"
        }
    ]).then(responses => {
        let { name, id, email, school } = responses;
        let intern = new Intern(name, id, email, school);

        MyTeam.push(intern);
        createTeam();
    })
}

// For manager to save the list and exit
function writeTeam() {

    fs.writeFileSync(outputPath, render(MyTeam), "utf-8");
}

// Initialization
managerInfo();
