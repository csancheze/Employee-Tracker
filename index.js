const cTable = require('console.table');
const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const Employee = require("./lib/Employee")
const Department = require("./lib/Department")
const Role = require("./lib/Role")
const { addDepartment,addEmployee, addRole,updateManager ,showByDepartment, showByManager, showDepartments, showEmployees, showRoles, deleteEmployee, deleteDepartment, deleteRoles } = require('./queries/query.js')

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
    console.log('\x1b[32m%s\x1b[0m','Welcome to the employee tracker!')
    inquirer
    .prompt([
        {
            name: "menu",
            type: "list",
            message: "What do you want to do?",

            choices: ["View","Add","Delete", "Update Manager", "Exit"]
        }
            
    ])
    .then((answer) =>{
        if (answer.menu == "View") {
            view(); 
        } else if (answer.menu == "Add") {
            add();
        } else if (answer.menu == "Delete") {
            deleteInfo();
        } else if (answer.menu == "Update Manager") {
            inquirerUpManager();            
        }else {
            return
        }
    })
}

const view = () => {

    inquirer
    .prompt([
        {
            name: "menu",
            type: "list",
            message: "What do you want to view?",

            choices: ["Departments","Roles","Employees", "Return"]
        }
            
    ])
    .then((answer) =>{
        if (answer.menu == "Departments") {
            showDepartments();
            view();
        } else if (answer.menu == "Roles") {
            showRoles();
            view();
        } else if (answer.menu == "Employees") {
            employees();
            view();
       }else {
            startApp();
        }
    })

}

const employees = () => {
    showEmployees();
    inquirer
    .prompt([
        {
            name: "menu",
            type: "list",
            message: "Do you want to filter them?",

            choices: ["Employees by Manager","Employees by Department", "Return"]
        }
            
    ])
    .then((answer) =>{
        if (answer.menu == "Employees by Manager") {
            inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "Enter the manager id",
                    validate(answer) { 
                        valid = /^[0-9]+$/.test(answer)
                        if(!valid) {
                        return "Please, write a number!"
                    }
                    return true
                    }
                }
                    
            ])
            .then((answer) =>{
                showByManager([answer.id]);
            })
            employees();
        } else if (answer.menu == "Employees by Department") {
            showDepartments();
            inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "Enter the department id",
                    validate(answer) { 
                        valid = /^[0-9]+$/.test(answer)
                        if(!valid) {
                        return "Please, write a number!"
                    }
                    return true
                    }
                }       
            ])
            .then((answer) =>{
                showByDepartment([answer.id]);
            })
            employees();
        }else {
            view();
            }
        })

}

const add = () => {
    inquirer
    .prompt([
        {
            name: "menu",
            type: "list",
            message: "What do you want to add?",

            choices: ["Department","Role","Employee","Return"]
        }
            
    ])
    .then((answer) =>{
        if (answer.menu == "Department") {
            inquirer
            .prompt([
                {
                    name: "departmentName",
                    type: "input",
                    message: "Enter the department name",
                    validate(answer) { if(!answer) {
                        return "Please, write a name!"
                    }
                    return true
                    }
                }        
            ])
            .then((answer) =>{
                addDepartment([answer.departmentName]);
            })
            add();
        } else if (answer.menu == "Role") {
            inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter the role title",
                    validate(answer) { if(!answer) {
                        return "Please, write a name!"
                    }
                    return true
                    }
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Enter the salary",
                    validate(answer) { if(!answer) {
                        return "Please, write a salary!"
                    }
                    return true
                    }
                },
                {
                    name: "departmentId",
                    type: "input",
                    message: "Enter the department id",
                    validate(answer) { 
                        valid = /^[0-9]+$/.test(answer)
                        if(!valid) {
                        return "Please, write a number!"
                    }
                    return true
                    }
                }          
            ])
            .then((answer) =>{
                addRole([answer.title,answer.salary,answer.departmentId]);
            })
            add();
        } else if (answer.menu == "Employee") {
            inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Enter the first name.",
                    validate(answer) { if(!answer) {
                        return "Please, write a name!"
                    }
                    return true
                    }
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Enter the last name.",
                    validate(answer) { if(!answer) {
                        return "Please, write a salary!"
                    }
                    return true
                    }
                },
                {
                    name: "roleId",
                    type: "input",
                    message: "Enter the role id.",
                    validate(answer) { 
                        valid = /^[0-9]+$/.test(answer)
                        if(!valid) {
                        return "Please, write a number!"
                    }
                    return true
                    }
                },
                {
                    name: "managerId",
                    type: "input",
                    message: "Enter the manager id.",
                    validate(answer) { 
                        valid = /^[0-9]+$/.test(answer)
                        if(!valid) {
                        return "Please, write a number!"
                    }
                    return true
                    }
                }           
            ])
            .then((answer) =>{
                addEmployee([answer.firstName,answer.lastName,answer.roleId,answer.managerId]);
            })
            add();     
        }else {
            startApp();
        }
    })
}

const 

startApp();