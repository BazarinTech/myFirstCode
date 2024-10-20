import React, { useEffect, useState } from 'react'
import Button from '../components/button'
import Input from '../components/inputs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SelectInput from '../components/selectInput'
import ButtonLoad from '../components/buttonLoad'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Top2 from '../components/top2'

const Register = (props) => {
  const [response, setResponse] = useState({type: '', message: ''})
  const [data, setData] = useState({
    email: '',
    name: '',
    pass: '',
    country: '',
    con_pass: '',
    upline: '',
    phone: ''
  })
  const [country, setCountry] = useState([
    {
      name: 'Tanzania',
      value: 255,
    },
    {
      name: 'Kenya',
      value: 254,
    },
    {
      name: 'Cameroon',
      value: 237,
    },
    {
      name: 'India',
      value: 91,
    },
   
  ])

  const notifySuccess = () => {
    toast.success("Registration Successful Redirecting...", {
        position: "top-right",
    });
};

const notifyPassError = () => {
    toast.error("Password Mismatch!!", {
        position: "top-right",
    });
};
const notifyFieldsError = () => {
  toast.error("Make sure you don't have empty fields!", {
      position: "top-right",
  });
};
const notifyPassLenError = () => {
  toast.error("Password must be greater than 8 characters!", {
      position: "top-right",
  });
};
const notifyExistError = () => {
  toast.error("User already exists!", {
      position: "top-right",
  });
};
const notifyNetError = () => {
  toast.error("Network Error!!", {
      position: "top-right",
  });
};

  const [isloading, setLoad] = useState(false)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const upline = queryParams.get('upline');
  const navigate = useNavigate()
  useEffect(() => {
    if (upline) {
      setData({...data, upline: upline})
    }else{
      setData({...data, upline: 1})
    }
  }, [])
  
  function handleEmail(val){
      setData({...data, email: val})
  }
  function handlePass(val){
    setData({...data, pass: val})
}
  function handleName(val){
    setData({...data, name: val})
}
function handleCountry(val){
  setData({...data, country: val})
}
function handleCon(val){
  setData({...data, con_pass: val})
}
function handleUpline(val){
  setData({...data})
}
function handlePhone(val){
  setData({...data, phone: val})
}
const register = async (e) => {
 setLoad(true)
 if (data.email !== '' && data.name !== '' && data.phone !== '' && data.country !== '' && data.con_pass !== '' && data.pass !== '' && data.upline !== '') {
  try {
    const response = await fetch('https://callify.club/icoinn_backend/mains/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result); // Handle the response from PHP
    setLoad(false)
    if (result.status === "Success") {
      setResponse({...response, message: result.message, type: true})
      notifySuccess()
      setTimeout(() => {
        navigate('/'); // Redirect to login page after 5 seconds
      }, 5000);
    }else{
      setResponse({...response, message: result.message, type: false})
      if (result.message == "Password mismatch!") {
        notifyPassError()
      }else if (result.message == "Password less than 8 characters!") {
        notifyPassLenError()
      }else if (result.message == "User Already Exists!") {
        notifyExistError()
      }
    }
    
  } catch (error) {
    console.error('ErrorB:', error);
    notifyNetError()
    setLoad(false)
  }
 }else{
  setLoad(false)
  setResponse({...response, message: 'Ensure all input fields are filled!!', type: false})
  notifyFieldsError()
 }
 
};
    function sendToMain(status) {
        props.handleNav(status)
      }
      sendToMain(false)
  return (
    <div style={{height: 'fit-content'}} className='main'>
      <Top2 name='Register' />
      <div className='w3-container padding-0'>
        <div className='w3-panel'>
          <p className='w3-xlarge margin-0'>
            Welcome to <span className='logo'>call<span className='primary'>ify</span></span>
          </p>
        </div>
        <div className='w3-panel grid-center'>
          {/* <p className='w3-medium'>Email: {data.email}</p>
          <p className='w3-medium'>Name: {data.name}</p>
          <p className='w3-medium'>Password: {data.pass}</p>
          <p className='w3-medium'>Con: {data.con_pass}</p>
          <p className='w3-medium'>Upline: {upline}</p>
          <p className='w3-medium'>Country: {data.country}</p>
          <p className='w3-medium'>Phone: {data.phone}</p> */}
          {!response.type && <p className='w3-tag w3-round-large w3-red w3-w3-text-white'>{response.message}</p>}
          {response.type && <p className='w3-tag w3-round-large w3-green w3-w3-text-white'>{response.message}</p>}
          <Input title='Email' icon='fa-regular fa-envelope' type='email'  placeholder='Enter Your email' name='email' handleInput={handleEmail} value={data.email}/>
          <Input title='Phone' icon='fa-solid fa-mobile-screen-button' type='tel'  placeholder='Enter Your Phone' name='phone' handleInput={handlePhone} value={data.phone}/>
          <Input title='Name' icon='fa-regular fa-user' type='text'  placeholder='Enter Full name' name='name' handleInput={handleName} value={data.name}/>
          <SelectInput title='Country' icon='fa-regular fa-user' name='country' handleInput={handleCountry} value={data.country} options={country}/>
          <Input title='Invited By:' icon='fa-solid fa-user-nurse' type='text' value={data.upline}  placeholder='Enter Full name' name='name' handleInput={handleUpline}/>
          <Input title='Password' icon='fa-solid fa-lock' type='password'  placeholder='Enter Your Password' name='pwrd'  handleInput={handlePass} value={data.pass}/>
          <Input title='Confirm Password' icon='fa-solid fa-lock-open' type='password'  placeholder='Re your password' name='con-pwrd'  handleInput={handleCon} value={data.con_pass}/>
          {!isloading && <Button name='Register' handleBtn={register}/>}
          {isloading && <ButtonLoad name='Processing...'/>}
          
        </div>
        <div className='w3-panel grid-center'>
          <p className='w3-large'>Already have account? <Link to='/' className='a w3-text-blue'>Login</Link></p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Register