const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const util = require("util");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//write file
const writeFileAsync = util.promisify(fs.writeFile);

// Write code to use inquirer to gather information about the development team members, // and to create objects for each team member (using the correct classes as blueprints!)

// referenced activities from week 09 Async 

//empty array for team

const team = [];

//prompt that asks user which team members they would like to add
async function startPrompt() {
  try {
    const choice = await inquirer.prompt([
      {
        type: "list",
        name: "teamChoice",
        message: "Who is on your team?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ]);
    
    //conditional for options
    if (choice.teamChoice === "Manager") {
      await promptManager();
    } else if (choice.teamChoice === "Engineer") {
      await promptEngineer();
    } else {
      await promptIntern();
    }
    await promptNewEmp();
  } catch (err) {
    console.log(err);
  }
}

//manager prompt
async function promptManager() {
  try {
    const mngr = await inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your Manager's Name?",
        default: "Big Boss",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
        default: "1",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your managers email?",
        default: "bigboss@mgs.com",
      },
      {
        type: "input",
        name: "managerNumber",
        message: "What is your manager's office Number?",
        default: "123",
      },
    ]);
    //new instance
    const newManager = new Manager(
      mngr.managerName,
      mngr.managerId,
      mngr.managerEmail,
      mngr.managerNumber
    );
    team.push(newManager);
  } catch (err) {
    console.log(err);
  }
}

//Intern prompt
async function promptIntern() {
  try {
    const intrn = await inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        default: "John Dough",
      },
      {
        type: "input",
        name: "internId",
        message: "What if your intern's id?",
        default: "3",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
        default: "meow@cat.com",
      },
      {
        type: "input",
        name: "internSchool",
        message: "Where did your intern's school?",
        default: "School of Hard Knocks",
      },
    ]);

    //new instance
    const newIntern = new Intern(
      intrn.internName,
      intrn.internId,
      intrn.internEmail,
      intrn.internSchool
    );
    team.push(newIntern);
  } catch (err) {
    console.log(err);
  }
}

//Engineer Prompt
async function promptEngineer() {
  try {
    const engine = await inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your Engineer's name?",
        default: "Bob The Builder",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
        default: "2",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
        default: "Bob@builder.com",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's github name?",
        default: "bobbuilder",
      },
    ]);

    //new instance
    const newEngineer = new Engineer(
      engine.engineerName,
      engine.engineerId,
      engine.engineerEmail,
      engine.engineerGithub
    );
    team.push(newEngineer);

  } catch (err) {
    console.log(err);
  }
}

//Function to add further team members
async function promptNewEmp() {
  try {
    const { addEmp } = await inquirer.prompt([
      {
        type: "confirm",
        name: "addEmp",
        message: "Add more members of team?",
      },
    ]);

    //conditional to give option to add member, or render team
    if (addEmp === true) {
      startPrompt();
    } else {
      const html = await render(team);
      await writeFileAsync(outputPath, html);
    }
    console.log("Great Success");
  } catch (err) {
    console.log(err);
  }
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
startPrompt();


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
