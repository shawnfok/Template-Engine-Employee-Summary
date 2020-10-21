// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

// In addition to `Employee`'s properties and methods, `Intern` will also have:
//   * school 
//   * getSchool()
//   * getRole() // Overridden to return 'Intern'

////////// CODE STARTS HERE //////////

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {

        // calling parent class constructor
        super(name, id, email);

        // additional construction item
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }

}

module.exports = Intern;
