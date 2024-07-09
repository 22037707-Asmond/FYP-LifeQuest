import React , {useState} from 'react'

const AddAgentsComponents = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [bio, setBio] = useState("");

  const saveAgent = (e) => {
    e.preventDefault();
    const agent = {firstName, lastName, profilePicture, yearsOfExperience, bio};
    console.log(agent);
  }
  return (
    <div>
      <br></br>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              <h2 className = "text-center"> Add Agent</h2>
              <div className='card-body'> 
                <form>
                  {/* First Name */}
                <div className="form-group mb-2">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                </div>
                {/* Last Name */}
                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                </div>
                {/* Profile Picture */}
                <div className="form-group mb-2">
                  <label className="form-label">Profile Picture:</label>
                  <input
                    type="text"
                    placeholder="Enter Profile Picture URL"
                    name="profilePicture"
                    className="form-control"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)} />
                </div>
                {/* Years of Experience */}
                <div className="form-group mb-2">
                  <label className="form-label">Years of Experience:</label>
                  <input
                    type="text"
                    placeholder="Enter Years of Experience"
                    name="yearsOfExperience"
                    className="form-control"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)} />
                </div>
                {/* Bio */}
                <div className="form-group mb-2">
                  <label className="form-label">Bio:</label>
                  <textarea
                    placeholder="Enter Bio"
                    name="bio"
                    className="form-control"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)} />
                </div>

                  <button className="btn btn-success" onClick = {(e) => saveAgent(e)}>Submit</button> 
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default AddAgentsComponents
