// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// In addition to `Employee`'s properties and methods, `Engineer` will also have:
//   * github  // GitHub username
//   * getGithub()
//   * getRole() // Overridden to return 'Engineer'

////////// CODE STARTS HERE //////////

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {

        // calling parent class constructor
        super(name, id, email);

        // additional construction item
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }

}

module.exports = Engineer;
