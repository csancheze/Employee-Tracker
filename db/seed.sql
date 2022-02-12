INSERT INTO department (department_name)
VALUES ("Accounting"),
       ("Human Resources"),
       ("Research and Development"),
       ("Sales"),
       ("Operations");

INSERT INTO roles (title, salary, department_id)
VALUES ("CEO",100,5),
       ("Researcher",70,3),
       ("Accountant",60,1),
       ("General Manager",80,5),
       ("Engineer",60,3),
       ("Assistant",30.20,2),
       ("Psychologist",60.50,2),
       ("Salesman",30.5,4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,"Ricardo","Ramirez",1,null),
       (2,"Laura", "Lopez",2,1),
       (3,"Amir", "America",3,4),
       (4,"Juan","Jimenez",4,1),
       (5,"Lucia","Linares",5,2),
       (6,"Roman","Ruiz",6,4),
       (7,"Catherine","Cruz",7,4),
       (8,"Elina","Escobar",8,4);