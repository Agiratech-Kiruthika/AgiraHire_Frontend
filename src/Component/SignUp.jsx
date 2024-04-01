import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBSelect } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [empID, setEmpID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  const fetchRoles = async () => {
    try {
        const response = await axios.get('https://localhost:7199/api/Auth/getroles');
        const responseData = response.data;
        if (responseData.data && Array.isArray(responseData.data)) {
            setRoles(responseData.data); // Update roles state with fetched data
        } else {
            console.error('Error fetching roles: Response data format is incorrect');
            setError("An error occurred while fetching roles.");
        }
    } catch (error) {
        console.error('Error fetching roles:', error);
        setError("An error occurred while fetching roles.");
    }
};


  const handleChangeEmpID = (e) => {
    setEmpID(e.target.value);
  };

  const handleChangeSelectedRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!empID || !email || !password || !selectedRole) {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const userResponse = await axios.post('https://localhost:7199/api/User/addUser', {
        employee_Id: empID,
        email: email,
        password: password,
        isDeleted: false
      });

      const userId = userResponse.data.userId;

      const roleResponse = await axios.post('https://localhost:7199/api/Auth/assignRole', {
        UserId: userId,
        RoleIds: [selectedRole] // Sending selectedRole as an array
      });

      alert('User signed up successfully:', roleResponse.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("An error occurred while signing up. Please try again later.");
      }
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ height: '100vh' }}>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Agira Hire <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for our Organization</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Our Internal Hiring Portal is a comprehensive web-based solution designed to simplify and optimize your organization's internal hiring process. With intuitive features and
            user-friendly interface, our portal empowers HR departments and hiring managers to efficiently manage internal job postings, applications, and candidate evaluations.
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Employee ID' id='form1' type='text' value={empID} onChange={handleChangeEmpID} />
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              {/* <MDBSelect
                id='selectRole'
                className='mb-4'
                value={selectedRole}
                onChange={handleChangeSelectedRole}
              >
                <option value="" disabled>Select role</option>
                {roles && roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </MDBSelect> */}

              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>sign up</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default SignUp;
