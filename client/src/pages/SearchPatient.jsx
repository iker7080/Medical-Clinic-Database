import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';


const SearchPatient = () => {
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [patientID, setpatientID] = useState('');
    let option = false;


    useEffect(() => {
        const employee_Data = localStorage.getItem('employee');
        console.log('Retrieved employee data:', employee_Data); // Add this line for debugging
        if (employee_Data) {
            setEmployee(JSON.parse(employee_Data));
        }
    }, []);


    

    const handleLookUpChange = (e) => {
        setpatientID(e.target.value);
        setError(''); // Clear error on input change
        setStatus('');
    };

    const handleLogout = () => {
        navigate('/Billing_Staff_View'); // Navigate to the main page
    };

    const searchpatientID = async (e) => {
        e.preventDefault();

        if(!patientID){
            setError("Please enter a valid patient ID"); // Show error if ID or password is empty
            setError('');
            return;
        }

        try{
            option = false;
            console.log(patientID);
            console.log(option);

            let res = await axios.post(`http://localhost:3000/SearchPatient`, {patientID, option}); 
            console.log(res.data);

              
            if (res.data.length  > 0) {
                localStorage.setItem('patient', JSON.stringify(res.data));
                setStatus("Success!!!");
                console.log ("patient: ", res.data);
                navigate("/billing_staff_view/SearchPatient/See_Patient_Balance");
            }else{
                option = true;
                console.log("here", option);
                res = await axios.post(`http://localhost:3000/SearchPatient`, {patientID, option});
                console.log(res.data);
                if(res.data.length  > 0){
                    console.log("Patient has no amount due");
                    setStatus("Patient has no amount due");
                    return;
                }else{
                    // If no data, set error
                    console.log("Not found. Please try again.");
                    setError("Not found. Please try again.");
                    return;
                }
            } 
        } catch(err){
            console.log(err);
            setError("Not found");
        }
        
    };

    return(
        <div>
            <h1>Enter patient ID: </h1>
        <input 
                    type="text" 
                    placeholder="patient ID" 
                    onChange={handleLookUpChange} 
                    name="patientID" 
                    className={error ? 'input-error' : ''} 
                />
            <br />{error && <div style={{ color: 'red' }}>{error}</div>}
            {status && <div style={{ color: 'black' }}>{status}</div>}
            <button onClick={searchpatientID}>Search Patient</button>
            <div>
                <button className = "logout" onClick={handleLogout}>Logout</button>
            </div>
            </div>
            
        
    )
};



export default SearchPatient;
