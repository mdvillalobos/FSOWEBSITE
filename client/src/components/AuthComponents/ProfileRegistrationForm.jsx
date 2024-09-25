import React, { useState, useEffect} from 'react'
import useRegisterProfile from '../../hooks/AuthHooks/useRegisterProfile';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';

const ProfileRegistrationForm = () => {
  const { registerProfile } = useRegisterProfile();
  const [data, setData] = useState({
    lastName: '', 
    firstName: '',
    middleName: '',
    department: '', 
    position: '', 
    track: '', 
    rank: ''
  });

  const RegisterUserInfo = async (e) => {
    e.preventDefault();
    await registerProfile(data.lastName, data.firstName, data.middleName, data.department, data.position, data.track, data.rank);
  }

  return (
    <div>
      <Box component="form" autoComplete='off' noValidate onSubmit={RegisterUserInfo}> 
        <div className="flex flex-col mt-16 max-sm:mt-10">
          <div>
            <h1 className='text-[#35408E] font-Poppins font-semibold text-2xl'>Personal Information</h1>
            <div className="profile-registration-container">
              <TextField
                required
                label="Last Name" 
                value={data.lastName}
                onChange={(e) => setData({...data, lastName: e.target.value})}
                variant="outlined"
                style={{ margin: '1.3rem 0 0'}}
                sx={{width: {sm:'100%', md: '30%', xl: '30%'}}}>
              </TextField>

              <TextField
                required
                label="First Name" 
                value={data.firstName}
                onChange={(e) => setData({...data, firstName: e.target.value})}
                variant="outlined"
                style={{ margin: '1.3rem 0 0'}}
                sx={{width: {sm:'100%', md: '30%', xl: '30%'}}}>
              </TextField>

              <TextField
                label="Middle Name"
                value={data.middleName}
                onChange={(e) => setData({...data, middleName: e.target.value})}
                variant="outlined"
                style={{ margin: '1.3rem 0 0'}}
                sx={{width: {sm:'100%', md: '30%', xl: '30%'}}}>
              </TextField>
            </div>

            <div className="profile-registration-container">
              <FormControl sx={{width: {sm: '100%', md: '30%', xl:'30%'}}} style={{ margin: '1.3rem 0 0'}}>
                <InputLabel id="department">Department</InputLabel>
                <Select
                  labelId='department'
                  label="Department"
                  value={data.department}
                  onChange={(e) => setData({...data, department: e.target.value})}
                >
                  <MenuItem value="College of Allied Health">College of Allied Health</MenuItem>
                  <MenuItem value="College of Architecture">College of Architecture</MenuItem>
                  <MenuItem value="College of Business and Accountancy">College of Business and Accountancy</MenuItem>
                  <MenuItem value="College of Computing and Information Technologies">College of Computing and Information Technologies</MenuItem>
                  <MenuItem value="College of Education, Arts and Science">College of Education, Arts and Science</MenuItem>
                  <MenuItem value="College of Engineering">College of Engineering</MenuItem>
                  <MenuItem value="College of Tourism and Hospitality Management">College of Tourism and Hospitality Management</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="profile-registration-container">
              <FormControl  sx={{width: {sm: '100%', md: '30%', xl:'30%'}}} style={{ margin: '1.3rem 0 0'}}>
                <InputLabel id="position">Employee Position</InputLabel>
                <Select
                  inputProps={{style: {fontSize: 14, fontFamily: 'Poppins', fontWeight:"500" }}}
                  labelId='position'
                  label="Track"
                  value={data.position}
                  onChange={(e) => setData({...data, position: e.target.value})}
                >
                  <MenuItem value="faculty">Faculty Member</MenuItem>
                  <MenuItem value="director">Director</MenuItem>
                  <MenuItem value="fso">Faculty Service Office</MenuItem>
                </Select>
              </FormControl>

              <FormControl  sx={{width: {sm: '100%', md: '30%', xl:'30%'}}} style={{ margin: '1.3rem 0 0'}}>
                <InputLabel id="track">Track</InputLabel>
                <Select
                  labelId='track'
                  label="Track"
                  value={data.track}
                  onChange={(e) => setData({...data, track: e.target.value})}
                >
                  <MenuItem value="Academic Track">Academic Track</MenuItem>
                  <MenuItem value="Industry Practitioner Track">Industry Practitioner Track</MenuItem>
                </Select>
              </FormControl>

              <FormControl  sx={{width: {sm: '100%', md: '30%', xl:'30%'}}} style={{ margin: '1.3rem 0 0'}}>
                <InputLabel id="Rank">Curren Rank</InputLabel>
                <Select
                  labelId='Rank'
                  label="Current Rank"
                  value={data.rank}
                  onChange={(e) => setData({...data, rank: e.target.value})}
                >
                  <MenuItem value="Instructor 1">Instructor 1</MenuItem>
                  <MenuItem value="Instructor 2">Instructor 2</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex justify-end mt-4 max-sm:justify-normal">
              <input type="submit" value="Skip" className='font-medium text-sm mt-4 cursor-pointer text-black  bg-[#d5d5d5] py-2 px-10 mr-6 duration-300 hover:bg-[#7c7c7c] rounded-sm'/> 
              <input type="submit" value="Submit" className='font-medium text-sm mt-4 cursor-pointer text-white bg-[#35408e] py-2 px-10 mr-6 duration-300 hover:bg-[#7881ca] rounded-sm'/>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default ProfileRegistrationForm
