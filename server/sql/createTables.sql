SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE TABLE IF NOT EXISTS Carriers(
    carrier_ID int NOT NULL AUTO_INCREMENT,
    phone_number varchar(12) NOT NULL,
    provider varchar(45) NOT NULL,
    PRIMARY KEY (carrier_ID)
);

CREATE TABLE IF NOT EXISTS Plans(
    plan_ID int NOT NULL AUTO_INCREMENT,
    referral_required tinyint,
    carrier_ID int NOT NULL,
    name varchar(45) NOT NULL,
    PRIMARY KEY (plan_ID),
    FOREIGN KEY (carrier_ID) REFERENCES Carriers(carrier_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Patients (
    mrn int NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    sex varchar(3) NOT NULL,
    date_of_birth DATETIME NOT NULL,
    phone_number varchar(12) NOT NULL,
    email varchar(45),
    address_1 varchar(45),
    address_2 varchar(45),
    city varchar(45),
    state varchar(2),
    postal_code varchar(5),
    insurance_policy varchar(45),
    insurance_group varchar(45),
    plan_ID int,
    PRIMARY KEY (mrn),
    FOREIGN KEY (plan_ID) REFERENCES Plans(plan_ID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Visits(
    visit_ID int NOT NULL AUTO_INCREMENT,
    mrn int NOT NULL,
    plan_ID int,
    primary_diagnosis varchar(45),
    scheduled_time DATETIME NOT NULL,
    check_in_time DATETIME,
    discharge_time DATETIME,
    visit_type varchar(45) NOT NULL,
    PRIMARY KEY (visit_ID),
    FOREIGN KEY (mrn) REFERENCES Patients(mrn)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (plan_ID) REFERENCES Plans(plan_ID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Staff(
    staff_ID int NOT NULL AUTO_INCREMENT,
    practitioner_type varchar(3) NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    phone_number varchar(12) NOT NULL,
    email varchar(45),
    address_1 varchar(45),
    address_2 varchar(45),
    city varchar(45),
    state varchar(2),
    postal_code varchar(5),
    PRIMARY KEY (staff_ID)
);

CREATE TABLE IF NOT EXISTS Staff_Interactions(
    visit_staff_ID int NOT NULL AUTO_INCREMENT,
    visit_ID int NOT NULL,
    staff_ID int NOT NULL,
    PRIMARY KEY (visit_staff_ID),
    FOREIGN KEY (visit_ID) REFERENCES Visits(visit_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (staff_ID) REFERENCES Staff(staff_ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

INSERT INTO Carriers(phone_number, provider)
VALUES ('800-888-8888', 'Empire Blue Cross Blue Shield'),
('800-111-1111', 'Aetna'),
('888-888-8888', 'Anthem Blue Cross Blue Shield');

INSERT INTO Plans(referral_required, carrier_ID, name)
VALUES (1, 4, 'HealthPlus'),
(0, 14, 'Bronze PPO'),
(1, 14, 'HMO');

INSERT INTO Patients(first_name, last_name, sex, date_of_birth, phone_number, email, address_1, address_2, city, state, postal_code, insurance_policy, insurance_group, plan_ID)
VALUES ('Alex', 'Alex', 'F', '1990-01-01', '111-222-3333', 'alex@alex.com', '1 1st Street', '', 'New York City', 'NY', '10010', '12345abc', 'xyz', 4),
('Betty', 'Betty', 'MTF', '1980-01-01', '444-555-6666', 'betty@betty.com', '2 2nd Street', 'Unit 1A', 'New York City', 'NY', '10011', '67890def', 'def', 14),
('Chris', 'Chris', 'M', '1970-01-01', '777-888-9999', 'chris@chris.com', '3 3rd Street', '', 'New York City', 'NY', '10012', '13579zzz', 'aaa', 4);

INSERT INTO Visits(mrn, plan_ID, primary_diagnosis, scheduled_time, check_in_time, discharge_time, visit_type)
VALUES (4, 4, 'exposure to covid-19', '2022-07-10 10:30:00', '2022-07-10 10:30:00', '2022-07-10 11:00:00', 'WALKIN covid test'),
(14, 14, 'laceration on finger', '2022-07-10 13:00:00', '2022-07-10 13:00:00', '2022-07-10 13:35:00', 'WALKIN cut on hand'),
(24, 4, NULL, '2022-07-12 12:00:00', NULL, NULL, 'ankle pain after fall'),
(4, 4, 'exposure to covid-19', '2022-07-24 11:00:00', NULL, NULL, 'FOLLOWUP covid');

INSERT INTO Staff(practitioner_type, first_name, last_name, phone_number, email, address_1, address_2, city, state, postal_code)
VALUES ('MD', 'John', 'Doolittle', '123-456-7890', 'john@john.com', '111 1st Ave', 'Apt 1A', 'New York City', 'NY', '10013'),
('RN', 'Florence', 'Nightingale', '234-567-8901', 'florence@florence.com', '222 2nd Ave', 'Apt 2A', 'New York City', 'NY', '10014'),
('PA', 'Bill', 'Billingson', '345-678-9012', 'billings@billingson.com', '333 3rd Ave', 'Apt 3A', 'New York City', 'NY', '10015');

INSERT INTO Staff_Interactions(visit_ID, staff_ID)
VALUES (4, 14),
(4, 24),
(14, 14),
(14, 4);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;