import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../redux/actions/authActions';
import Input from './InputComponent';
import { RiUserAddLine } from "react-icons/ri";





const initialState = { firstName: '', lastName: '',phone:'',fixedAmount:'', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form));
    } else {
      dispatch(signin(form));
    }
  };


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 
  
  

  return (
   <>  
   
    <Container className='mt-16' component="main" maxWidth="sm">
      <Paper className="paper " elevation={3}>
        <div style={{ marginBottom: "10px" }}>
            <Avatar style={{ backgroundColor: "red", left: isSignup ? "40px" : "0" }} className="avatar">
           {isSignup ? <RiUserAddLine /> :  <LockIcon /> }
          </Avatar>

          <Typography component="h1" variant="h5">{isSignup ? 'Create Syndic' : 'Sign in'}</Typography>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                <Input name="phone" label="Phone" handleChange={handleChange} type="number" autoFocus half />
                <Input name="fixedAmount" label="Monthly Wage" handleChange={handleChange} type="number" half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
         
       


          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>

          </Grid>
        </form>
      
      </Paper>
    </Container>
    </>
  );
};

export default SignUp;


