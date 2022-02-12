ALTER TABLE employee
  ADD FOREIGN KEY (manager_id)
  REFERENCES employee(id);
