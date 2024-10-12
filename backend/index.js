import express from 'express';
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abcd1234",
    database: "medical_clinic_database"
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("Hello this is mr.backend! 乁( ⁰͡ Ĺ̯ ⁰͡ ) ㄏ");
});

// Login route
app.post("/login", (req, res) => {
    const { ID, password } = req.body;
    const q1 = "SELECT * FROM employee WHERE employee_ID = ?";
    const q2 = "SELECT * FROM patient WHERE Medical_ID = ?";
    const q3 = "SELECT * FROM employee_password WHERE employee_ID = ?";
    const q4 = "SELECT * FROM patient_password WHERE medical_ID = ?";

    if (!ID || !password) {
        return res.status(400).json({ message: "ID and password are required." });
    }

    const firstLetter = ID.charAt(0); // Get the first letter
    if (firstLetter === 'E') {
        db.query(q1, [ID], (err, data) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            if (data.length > 0) {
                db.query(q3, [ID], (err, passData) => {
                    if (err) {
                        console.error(err);
                        return res.json(err);
                    }
                    if (passData.length > 0) {
                        if (passData[0].password === password) {
                            return res.json(data[0]); // Return employee data
                        } else {
                            return res.json("Password incorrect");
                        }
                    } else {
                        return res.json("Password record not found");
                    }
                });
            } else {
                return res.json("Employee not found");
            }
        });
    } else if (firstLetter === 'M') {
        db.query(q2, [ID], (err, data) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            if (data.length > 0) {
                db.query(q4, [ID], (err, passData) => {
                    if (err) {
                        console.error(err);
                        return res.json(err);
                    }
                    if (passData.length > 0) {
                        if (passData[0].password === password) {
                            return res.json(data[0]); // Return patient data
                        } else {
                            return res.json("Password incorrect" );
                        }
                    } else {
                        return res.json("Password not found" );
                    }
                });
            } else {
                return res.json("Patient not found" );
            }
        });
    } else {
        return res.json("ID must start with 'E' or 'M'");
    }
});

// Get doctors
app.get("/doctors", (req, res) => {
    const q = "SELECT * FROM doctors";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// Create doctor
app.post("/doctors", (req, res) => {
    console.log(req.body);
    
    const q1 = "INSERT INTO employee (employee_ID, first_name, last_name, role) VALUES (?, ?, ?, 'Doctor')";
    const employeeValues = [
        req.body.employee_ID,
        req.body.first_name,
        req.body.last_name
    ];

    const q2 = "INSERT INTO doctors (employee_ID, specialty, first_name, last_name, phone_number, work_address, created, last_edited) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const doctorValues = [
        req.body.employee_ID,
        req.body.specialty,
        req.body.first_name,
        req.body.last_name,
        req.body.phone_number,
        req.body.work_address,
        req.body.created,
        req.body.created
    ];

    db.query(q1, employeeValues, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error inserting into employee table", details: err });
        }

        db.query(q2, doctorValues, (err) => {
            if (err) {
                return res.status(500).json({ error: "Error inserting into doctors table", details: err });
            }
            return res.json("A doctor has been created successfully!");
        });
    });
});

// Update doctor
app.put("/doctors/:employee_ID", (req, res) => {
    const employee_id = req.params.employee_ID;
    const q1 = "UPDATE doctors SET specialty = ?, first_name = ?, last_name = ?, phone_number = ?, work_address = ? WHERE employee_ID = ?";
    const q2 = "UPDATE employee SET first_name = ?, last_name = ? WHERE employee_ID = ?";
    
    const values = [
        req.body.specialty,
        req.body.first_name,
        req.body.last_name,
        req.body.phone_number,
        req.body.work_address,
        employee_id
    ];

    db.query(q1, values, (err) => {
        if (err) return res.status(500).json(err);

        const employeeValues = [
            req.body.first_name,
            req.body.last_name,
            employee_id
        ];

        db.query(q2, employeeValues, (err) => {
            if (err) return res.status(500).json(err);
            return res.json("Doctor and employee have been updated!");
        });
    });
});

// Delete doctor
app.delete("/doctors/:employee_ID", (req, res) => {
    const employee_id = req.params.employee_ID;
    const q1 = "DELETE FROM doctors WHERE employee_ID = ?";
    const q2 = "DELETE FROM employee WHERE employee_ID = ?";

    db.query(q1, [employee_id], (err) => {
        if (err) return res.status(500).json(err);

        db.query(q2, [employee_id], (err) => {
            if (err) return res.status(500).json(err);
            return res.json("Doctor and employee have been deleted!");
        });
    });
});

app.listen(3000, () => console.log('Server running on port 3000! (Connected to backend!)'));
