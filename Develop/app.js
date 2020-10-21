// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

////////// CODE STARTS HERE //////////

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Create an empty array for all employees
const employees = [];

// Start function to add new employee
addNewEmployee();

function addNewEmployee() {
    console.log("Please answer the following questions to add a new employee!")
    console.log(employees)
    // Sorting the employee type first, then proceed to the accroding question set
    inquirer.prompt([
        {
            type:"checkbox",
            name: "type",
            message: "Select one employee type:",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ]).then(data => {
        if (data.type === "Manager") {
            addManager();
        } else if (data.type === "Engineer") { 
            addEngineer();
        } else {
            addIntern();
        }
    });
};

// Question set for adding a MANAGER
function addManager() {
    inquirer.prompt([
    {
        type:"input",
        name: "name",
        message: "Enter new manager's name:"
    },
    {
        type:"input",
        name: "id",
        message: "Enter new manager's ID:"
    },
    {
        type:"input",
        name: "email",
        message: "Enter new manager's email:"
    },
    {
        type:"input",
        name: "officeNumber",
        message: "Enter new manager's office number:"
    },
]).then(data => {
    const employee = new Manager(data.name, data.id, data.email, data.officeNumber);
    employees.push(employee);
    writeFile();
});

};

// Question set for adding an ENGINEER
function addEngineer() {
    inquirer.prompt([
    {
        type:"input",
        name: "name",
        message: "Enter new engineer's name:"
    },
    {
        type:"input",
        name: "id",
        message: "Enter new engineer's ID:"
    },
    {
        type:"input",
        name: "email",
        message: "Enter new engineer's email:"
    },
    {
        type:"input",
        name: "github",
        message: "Enter new engineer's github username:"
    },
]).then(data => {
    const employee = new Engineer(data.name, data.id, data.email, data.github);
    employees.push(employee);
    writeFile();
});

};

// Question set for adding an INTERN
function addIntern() {
    inquirer.prompt([
    {
        type:"input",
        name: "name",
        message: "Enter new intern's name:"
    },
    {
        type:"input",
        name: "id",
        message: "Enter new intern's ID:"
    },
    {
        type:"input",
        name: "email",
        message: "Enter new intern's email:"
    },
    {
        type:"input",
        name: "school",
        message: "Enter new intern's github username:"
    },
]).then(data => {
    const employee = new Intern(data.name, data.id, data.email, data.school);
    employees.push(employee);
    writeFile();
});

};

function writeFile() {
    fs.writeFile(outputPath, render(employees), "utf-8");
};

