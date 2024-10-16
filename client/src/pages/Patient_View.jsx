import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';


const Patient_View = () => {
    const [patient, setPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const patient_Data = localStorage.getItem('patient');
        console.log('Retrieved patient data:', patient_Data); // Add this line for debugging
        if (patient_Data) {
            setPatient(JSON.parse(patient_Data));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('patient'); // Clear patient info
        navigate('/'); // Navigate to the main page
    };


    if (!patient) {
        return <div>No patient information found.</div>;
    }

    return (
        <div className = "form">
            <h1>Patient Information</h1>
            <p>ID: {patient.medical_ID}</p>
            <p>Name: {patient.first_name} {patient.last_name}</p>
            <p>Role: Patient </p>
            <button className = "logout" onClick={handleLogout}>Logout</button> 
        </div>
    );
};


export default Patient_View;