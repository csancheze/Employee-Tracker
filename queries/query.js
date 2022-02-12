const cTable = require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the database.`)
);
  

const showDepartments = () => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err,result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return;
        }
        console.log('\n')
        console.table(result)
        })
}

const showRoles = () => {
    const sql = 'SELECT roles.id, roles.title, roles.salary, department.department_name FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id';
    db.query(sql, (err,result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return;
        }
        console.log('\n')
        console.table(result)
    })
}    

const showEmployees = () => {
    const sql = 'SELECT A.id, A.first_name , A.last_name, department.department_name, roles.title, CONCAT(B.first_name," ", B.last_name) AS Manager, roles.salary FROM employee A JOIN roles ON A.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee B ON A.manager_id = B.id ORDER BY A.id'
    db.query(sql, (err,result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return;
        }
        console.log('\n')
        console.table(result)
    })
}    

const addDepartment = (newDepartment) => {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = newDepartment;

    db.query(sql,params, (err, result) => {
        if (err) {
            console.log('\n')
            console.log("hola"+err.message);
            return;
        }
        console.log('\n')
        showDepartments();
    })
}

const addRole = (newRole) => {
    const sql = `INSERT INTO roles (title,salary,department_id)
    VALUES (?,?,?)`;
    const params = newRole;

    db.query(sql,params, (err, result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return;
        }
        console.log('\n')
        showRoles();
    })
}

const addEmployee = (newEmployee) => {
    const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES (?,?,?,?)`;
    const params = newEmployee;

    db.query(sql,params, (err, result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return;
        }
        console.log('\n')
        showEmployees();
    })
}

const updateManager = (newInfo) => {
    const sql = ' UPDATE employee SET manager_id = ? WHERE id = ?';
    const params = newInfo;

    db.query(sql,params,(err, result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
        } else if (!result.affectedRows) {
            console.log('\n')
            console.log("Employee not found")
        } else {
            console.log('\n')
            showEmployees();
        }
    });
}

const showByManager = (managerId) => {
    const sql = 'SELECT A.id, A.first_name , A.last_name, department.department_name, roles.title, CONCAT(B.first_name," ", B.last_name) AS Manager, roles.salary FROM employee A JOIN roles ON A.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee B ON A.manager_id = B.id WHERE A.manager_id = ?';
    const params = managerId
    db.query(sql,params,(err, result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return
        }
        console.log('\n')
       console.table(result)
    });
}

const showByDepartment = (departmentId) => {
    const sql = 'SELECT A.id, A.first_name , A.last_name, department.department_name, roles.title, CONCAT(B.first_name," ", B.last_name) AS Manager, roles.salary FROM employee A JOIN roles ON A.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee B ON A.manager_id = B.id WHERE department_id = ?';
    const params = departmentId
    db.query(sql,params,(err, result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return
        }
        console.log('\n')
       console.table(result)
    });
}

const deleteDepartment = (departmentId) => {
    const sql = 'DELETE FROM department WHERE id = ?';
    const params = departmentId

    db.query(sql,params, (err,result)=>{    
            if (err) {
                console.log('\n')
                console.log(err.message);
            } else if (!result.affectedRows) {
                console.log('\n')
                console.log('Department not found')
            } else {
                console.log('\n')
                showDepartments();
            }
    })
}

const deleteRoles = (roleId) => {
    const sql = 'DELETE FROM roles WHERE id = ?';
    const params = roleId

    db.query(sql,params, (err,result)=>{    
            if (err) {
                console.log('\n')
                console.log(err.message);
            } else if (!result.affectedRows) {
                console.log('\n')
                console.log('Role not found')
            } else {
                console.log('\n')
                showRoles();
            }
    })
}

const deleteEmployee = (employeeId) => {
    const sql = 'DELETE FROM employee WHERE id = ?';
    const params = employeeId

    db.query(sql,params, (err,result)=>{    
            if (err) {
                console.log('\n')
                console.log(err.message);
            } else if (!result.affectedRows) {
                console.log('\n')
                console.log('Employee not found')
            } else {
                console.log('\n')
                showEmployees();
            }
    })
}

const showBudgetByDepartment = (departmentId) => {
    const sql = 'SELECT department_name, SUM(roles.salary) AS budget FROM employee JOIN roles on employee.role_id = roles.id JOIN department ON roles.department_id = department.id WHERE department_id = ?';
    const params = departmentId
    db.query(sql,params,(err, result) => {
        if (err) {
            console.log('\n')
            console.log(err.message);
            return
        }
        console.log('\n')
       console.table(result)
    });
}

module.exports = { addDepartment,addEmployee, addRole,updateManager ,showByDepartment, showByManager, showDepartments, showEmployees, showRoles, deleteEmployee, deleteDepartment, deleteRoles, showBudgetByDepartment };