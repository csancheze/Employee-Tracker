 SELECT A.id, A.first_name , A.last_name, department.department_name, roles.title, CONCAT(B.first_name,' ', B.last_name) AS Manager, roles.salary FROM employee A JOIN roles ON A.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee B ON A.manager_id = B.id ORDER BY A.id;

 SELECT A.id, A.first_name , A.last_name, department.department_name, roles.title, CONCAT(B.first_name," ", B.last_name) AS Manager, roles.salary FROM employee A JOIN roles ON A.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee B ON A.manager_id = B.id WHERE A.manager_id = 1;

 SELECT A.id, A.first_name , A.last_name, department.department_name, roles.title, CONCAT(B.first_name," ", B.last_name) AS Manager, roles.salary FROM employee A JOIN roles ON A.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee B ON A.manager_id = B.id WHERE department_id = 2;

SELECT department_name, SUM(roles.salary) FROM employee JOIN roles on employee.role_id = roles.id JOIN department ON roles.department_id = department.id WHERE department_id = 2;