const showDepartments = () => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err,result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(result)
        })
}

const showRoles = () => {
    const sql = 'SELECT * FROM roles JOIN department ON roles.department_id = department.id';
    db.query(sql, (err,result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(result)
    })
}    

const showEmployees = () => {
    const sql = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id JOIN employee ON employee.manager_id = employee.id';
    db.query(sql, (err,result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(result)
    })
}    

const addDepartment = (newDepartment) => {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = newDepartment;

    db.query(sql,params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(result)
    })
    showDepartments();
}

const addRole = (newRole) => {
    const sql = `INSERT INTO department (title,salary,department_id)
    VALUES (?,?,?)`;
    const params = newRole;

    db.query(sql,params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(result)
    })
    showRoles();
}

const addEmployee = (newEmployee) => {
    const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id)
    VALUES (?,?,?,?)`;
    const params = newEmployee;

    db.query(sql,params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(result)
    })
    showEmployees();
}

const updateManager = (newInfo) => {
    const sql = ' UPDATE employee SET manager_id = ? WHERE id = ?';
    const params = newInfo;

    db.query(sql,params,(err, result) => {
        console.log(result);
        if (err) {
            console.log(err.message);
        } else if (!result.affectedRows) {
            console.log("Employee not found")
        } else {
            console.table(result)
        }
    });
    showEmployees();
}

const showByManager = (managerId) => {
    const sql = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id JOIN employee ON employee.manager_id = employee.id WHERE manager_id = ?';
    const params = managerId
    db.query(sql,params,(err, result) => {
        console.log(result);
        if (err) {
            console.log(err.message);
            return
        }
       console.table(result)
    });
}

const showByDepartment = (departmentName) => {
    const sql = 'SELECT * FROM employee JOIN roles ON employee.role_id = roles.id JOIN employee ON employee.manager_id = employee.id WHERE department_name = ?';
    const params = departmentName
    db.query(sql,params,(err, result) => {
        console.log(result);
        if (err) {
            console.log(err.message);
            return
        }
       console.table(result)
    });
}

const deleteDepartment = (departmentId) => {
    const sql = 'DELETE FROM department WHERE id = ?';
    const params = departmentId

    db.query(sql,params, (err,result)=>{    
            if (err) {
                console.log(err.message);
            } else if (!result.affectedRows) {
                console.log('Department not found')
            } else {
                console.table(result)
            }
    })
    showDepartments();
}

const deleteRoles = (roleId) => {
    const sql = 'DELETE FROM roles WHERE id = ?';
    const params = roleId

    db.query(sql,params, (err,result)=>{    
            if (err) {
                console.log(err.message);
            } else if (!result.affectedRows) {
                console.log('Role not found')
            } else {
                console.table(result)
            }
    })
    showDepartments();
}

const deleteEmployee = (employeeId) => {
    const sql = 'DELETE FROM employee WHERE id = ?';
    const params = employeeId

    db.query(sql,params, (err,result)=>{    
            if (err) {
                console.log(err.message);
            } else if (!result.affectedRows) {
                console.log('Employee not found')
            } else {
                console.table(result)
            }
    })
    showEmployees();
}

