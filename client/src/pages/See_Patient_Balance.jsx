import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';


const See_Patient_Balance = () => {
    const [patient, setPatient] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        const patient_Data = localStorage.getItem('patient');
        console.log('Retrieved patient data:', patient_Data); // Add this line for debugging
        if (patient_Data) {
            setPatient(JSON.parse(patient_Data));
        }else{
            console.log("noai");
        }
    }, []);

    const setTotal = () =>{
        var sum = 0;
            for(var i =0; i < patient.length; i++){
                sum += patient[i].cost;
            }
            return sum;
    }

    

    const handleLogout = () => {
        localStorage.removeItem('patient'); // Clear employee info
        navigate('/Billing_Staff_View/SearchPatient'); // Navigate to the main page
    };

   
    if (!patient) {
        return <div>No patient information found.</div>;
    }

    const handleonClick = async (index) =>{
        localStorage.setItem('single_appointment', JSON.stringify(patient[index]));
        const ID = patient[index].appointment_ID;

        console.log("app index: ", ID);

        await axios.put(`http://localhost:3000/See_Patient_Balance`, {ID});

        try{
            console.log(patient[index].officeID);
            const offID = patient[index].officeID;
            const res = await axios.post(`http://localhost:3000/Created_invoice`, {offID});
            localStorage.setItem('office_loc', JSON.stringify(res.data));
            console.log("office retrieved: ",res.data);


        }catch(e){
            console.log(e);
            return;
        }
        navigate("/billing_staff_view/SearchPatient/See_Patient_Balance/Created_invoice");

        
    }

try{
    return (
        <div>
            <h1>Patient Information</h1>
            <p>ID: {patient[0].medical_ID}</p>
            <p>Name: {patient[0].first_name} {patient[0].last_name}</p>

            <div className='list'>
                <table>
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Date and Time</th>
                            <th>Doctor</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.map((patient, index) => (
                                <tr key ={patient.appointment_ID}>
                                <td>{patient.appointment_ID}</td>
                                <td>{patient.dateTime}</td>
                                <td>{patient.doctor}</td>
                                <td>$ {patient.cost}</td>
                                <td>
                                    <button onClick={() => handleonClick(index)}>
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

                <p>Total Due: $ {setTotal()}</p>


            <button className = "logout" onClick={handleLogout}>Done</button>

        </div>
    );

}catch{
    return(
    <div>Patient has no ammounts due
        <div>
            <button className = "logout" onClick={handleLogout}>Return</button>
        </div>
    </div>
    );

    
    

}
    
};



export default See_Patient_Balance;