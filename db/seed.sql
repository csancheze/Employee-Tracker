INSERT INTO department (department_name)
VALUES ("Accounting"),
       ("Human Resources"),
       ("Research and Development"),
       ("Sales");
       ("Operations");

INSERT INTO roles (title, salary, department)
VALUES ("CEO",100,5),
       ("Researcher",70, 3),
       ("Accountant",60, 1),
       ("General Manager",80, 5),
       ("Engineer",60,3),
       ("Assistant",30.20,2);
       ("Psychologist",60.50, 2);
       ("Salesman",30.5,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ricardo","Ramirez",1),
       ("Laura", "Lopez",2,1),
       ("Amir", "America",3,4),
       ("Juan","Jimenez",4, 1),
       ("Lucia","Linares",5,2),
       ("Roman","Ruiz",6,4),
       ("Catherine","Cruz",7,4),
       ("Elina","Escobar",8,4);
       
       