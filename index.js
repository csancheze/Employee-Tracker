const cTable = require('console.table');
const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();
const { showBudgetByDepartment, addDepartment, addEmployee, addRole, updateManager ,showByDepartment, showByManager, showDepartments, showEmployees, showRoles, deleteEmployee, deleteDepartment, deleteRoles } = require('./queries/query.js')


const startApp = () => {
    inquirer
    .prompt([
        {
            name: "menu",
            type: "list",
            message: "What do you want to do?",

            choices: ["View","Add","Delete", "Update Manager", "Show budget by department", "Exit"]
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
        } else if (answer.menu == "Show budget by department") {
            showBudget();         
        }else {
            console.log('\x1b[32m%s\x1b[0m','Bye!')
            process.exit();
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
                employees();
            })
            
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
                employees();
            })
            
        } else {
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
        showDepartments();
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
                add();
            })
            
        } else if (answer.menu == "Role") {
            showRoles();
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
                add();
            })
            
        } else if (answer.menu == "Employee") {
            showEmployees();
            console.log('\x1b[32m%s\x1b[0m','Please add/update managers first!')
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
                    message: "Enter the manager id. Leave empty if manager.",             
                }           
            ])
            .then((answer) =>{
                addEmployee([answer.firstName,answer.lastName,answer.roleId,answer.managerId]);
                add(); 
            })
               
        }else {
            startApp();
        }
    })
}

const deleteInfo = () => {
    inquirer
    .prompt([
        {
            name: "menu",
            type: "list",
            message: "Do you want to delete?",

            choices: ["Employee","Role", "Department","Return"]
        }
            
    ])
    .then((answer) =>{
        if (answer.menu == "Employee") {
            showEmployees();
            inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "Enter the employee id",
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
                deleteEmployee([answer.id]);
                deleteInfo();
            })
            

        } else if (answer.menu == "Role") {
            showRoles();
          inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "Enter the role id",
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
                deleteRoles([answer.id]);
                deleteInfo();
            })
            
            
        } else if (answer.menu == "Department") {
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
                  deleteDepartment([answer.id]);
                  deleteInfo();
              })
              
              
        }else {
            startApp();
            }
        })
}

const inquirerUpManager = () => {
    showEmployees();
    inquirer
            .prompt([
                {
                    name: "employee",
                    type: "input",
                    message: "Enter the employee id that you want to update",
                    validate(answer) { 
                        valid = /^[0-9]+$/.test(answer)
                        if(!valid) {
                        return "Please, write a number!"
                    }
                    return true
                    }
                },
                {
                    name: "manager",
                    type: "input",
                    message: "Enter the new manager id.",
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
                updateManager([answer.manager,answer.employee]);
                startApp();
            })
            
}

const showBudget = () => {
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
                showBudgetByDepartment([answer.id]);
                startApp();
            })
}

console.log('\x1b[32m%s\x1b[0m','Welcome to the employee tracker!')
startApp();