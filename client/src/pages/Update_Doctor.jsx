import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



// Format the date properly for MySQL DATETIME format
const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

const Update_Doctor = () => {
  const [doctor, setDoctor] = useState({
    first_name: "",
    last_name: "",
    specialty: "",
    phone_number: "",
    work_address: "",
    created: currentDate
  });

  const navigate = useNavigate();
  const location = useLocation();

  const employee_ID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setDoctor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    try {
      await axios.put("http://localhost:3000/doctors/" + employee_ID, doctor); // Send doctor data to the backend
      navigate("/"); // Navigate back to the Doctors page ("/")
    } catch (err) {
      console.log(err); // Log any errors
    }
  };

  return (
    <div className='form'>
      <h1>Update Doctor</h1>
      <input type="text" placeholder="First Name" onChange={handleChange} name="first_name" />
      <input type="text" placeholder="Last Name" onChange={handleChange} name="last_name" />
      <input type="text" placeholder="Phone Number" onChange={handleChange} name="phone_number" />
      <input type="text" placeholder="Work Address" onChange={handleChange} name="work_address" />
      <select  onChange={handleChange} name="specialty">
      <option value="" disabled selected>Select Specialty</option>
        <option value="General Practioner">General Practitioner</option>
        <option value="Oncologist">Oncologist</option>
        <option value="Radiologist">Radiologist</option>
        <option value="Pediatrician">Pediatrician</option>
        <option value="Obstetrician">Obstetrician</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Gastroenterologist">Gastroenterologist</option>
        <option value="Immunologist">Immunologist</option>
      </select>
      <button className="formButton" onClick={handleClick}>Submit</button>
    </div>
  );
};

export default Update_Doctor;
