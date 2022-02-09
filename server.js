const cTable = require('console.table');
const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const Employee = require("./lib/Employee")
const Department = require("./lib/Department")
const Role = require("./lib/Role")

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the database.`)
);
  

const startApp = () => {
    console.log('\x1b[32m%s\x1b[0m','Welcome! What do you want to do?')
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Enter the manager name:",
                validate(answer) { if(!answer) {
                    return "Please, write a name!"
                }
                return true
                }
            },
            {
                name: "id",
                type: "input",
                message: "Enter the manager id:",
                validate(answer) { 
                    valid = /^[0-9]+$/.test(answer)
                    if(!valid) {
                    return "Please, write a number!"
                }
                return true
                }
            },
            {
                name: "email",
                type: "input",
                message: "Enter the manager email:",
                validate (answer) { 
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(answer)
                    if (!valid) {
                    return "Please, write a valid email!"
                }
                return true
                }
            },
            {
                name: "officeNo",
                type: "input",
                message: "Enter the manager office number:",
                validate(answer) { 
                    valid = /^[0-9]+$/.test(answer)
                    if(!valid) {
                    return "Please, write a number!"
                }
                return true
                }
            }
    
        ])
        .then((answers) => {
            const manager = new Manager(answers.name,answers.id,answers.email,answers.officeNo)
            listEmployees.push(manager)
            employeeMenu();
        })
    }