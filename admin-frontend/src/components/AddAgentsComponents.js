import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import AgentsService from '../services/AgentsService';

const AddAgentsComponents = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateAgent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    formData.append('yearsOfExperience', yearsOfExperience);
    formData.append('bio', bio);
    formData.append('phoneNumber', phoneNumber);
    formData.append('salary', salary);

    try {
      if (id) {
        // Use FormData for updating agent
        await AgentsService.updateAgent(formData, id);
        alert("Agent updated successfully");
      } else {
        await AgentsService.createAgent(formData);
        alert("Agent added successfully");
      }
      navigate('/agents');
    } catch (error) {
      console.error(error);
      alert("Failed to save agent");
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  useEffect(() => {
    if (id) {
      AgentsService.getAgentById(id).then((response) => {
        const agent = response.data;
        setFirstName(agent.firstName);
        setLastName(agent.lastName);
        setProfilePicture(agent.profilePicture);
        setYearsOfExperience(agent.yearsOfExperience);
        setBio(agent.bio);
        setPhoneNumber(agent.phoneNumber);
        setSalary(agent.salary);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [id]);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Agent</h2>;
    } else {
      return <h2 className="text-center">Add Agent</h2>;
    }
  };

  return (
    <div>
      <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {title()}
            <div className='card-body'>
              <form onSubmit={saveOrUpdateAgent}>
                <div className="form-group mb-2">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Profile Picture:</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePicture"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Years of Experience:</label>
                  <input
                    type="text"
                    placeholder="Enter Years of Experience"
                    name="yearsOfExperience"
                    className="form-control"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Bio:</label>
                  <textarea
                    placeholder="Enter Bio"
                    name="bio"
                    className="form-control"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Phone Number:</label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Salary:</label>
                  <input
                    type="text"
                    placeholder="Enter Salary"
                    name="salary"
                    className="form-control"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/agents" className="btn btn-danger">Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgentsComponents;
