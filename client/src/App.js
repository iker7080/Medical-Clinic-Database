import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Doctors from "./pages/Doctors";
import Add_Doctor from "./pages/Add_Doctor";
import Update_Doctor from "./pages/Update_Doctor";
import Login from "./pages/Login";
import Not_Found from "./pages/Not_Found"; 
import Employee_Info from "./pages/Employee_Info";
import Doctor_View from "./pages/Doctor_View";
import Nurse_View from "./pages/Nurse_View";
import Billing_Staff_View from "./pages/Billing_Staff_View";
import Office_Staff_View from "./pages/Office_Staff_View";
import Director_View from "./pages/Director_View";
import Patient_View from "./pages/Patient_View"; // Ensure this import is correct

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee_info" element={<Employee_Info />} />
          <Route path="/doctor_view" element={<Doctor_View />} />
          <Route path="/nurse_view" element={<Nurse_View />} />
          <Route path="/billing_staff_view" element={<Billing_Staff_View />} />
          <Route path="/office_staff_view" element={<Office_Staff_View />} />
          <Route path="/director_view" element={<Director_View />} />
          <Route path="/patient_view" element={<Patient_View />} /> {/* Corrected route */}
          <Route path="/doctors" element={<Doctors />} />
          <Route path="*" element={<Not_Found />} />
          <Route path="/add_doctor" element={<Add_Doctor />} />
          <Route path="/update_doctor/:employee_ID" element={<Update_Doctor />} />
        </Routes>
      </BrowserRouter>
    </div>  
  );
}

export default App;
