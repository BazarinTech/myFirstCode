import React, { useState } from 'react'
import Input from '../components/inputs'
import Button from '../components/button'
import { Await, Link, useNavigate } from 'react-router-dom'
import ButtonLoad from '../components/buttonLoad'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Top2 from '../components/top2'

const Login = (props) => {
  const [response, setResponse] = useState({type: '', message: ''})
  const [isloading , setLoad] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const notifySuccess = () => {
    toast.success("Login Successful Redirecting...", {
        position: "top-right",
    });
  };

  const notifyError = () => {
      toast.error("Invalid credentials!!", {
          position: "top-right",
      });
  };
  const notifyNetError = () => {
    toast.error("Network Error!!", {
        position: "top-right",
    });
};
  const notifyFieldsError = () => {
    toast.error("Fields cannot be empty!!", {
        position: "top-right",
    });
  };

  const login = async () => {
    setLoad(true)
    if (data.email !== '' && data.password !== '') {
      try {
        const response = await fetch('https://callify.club/icoinn_backend/mains/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const result = await response.json()
        if (result.status === "Success") {
          setResponse({...response, message: result.message, type: true})
          localStorage.setItem('email_u', JSON.stringify(result.email))
          notifySuccess()
          setTimeout(() => {
            navigate('/home'); // Redirect to login page after 2 seconds
          }, 5000);
        }else{
          setResponse({...response, message: result.message, type: false})
          notifyError()
        }
        setLoad(false)
      } catch (error) {
        console.error("Error:", error)
        setLoad(false)
        notifyNetError()
      }
    }else{
      setResponse({...response, type: false, message: 'Ensure all field are filled!!'})
      setLoad(false)
      notifyFieldsError()
    }
   
  }
  function handleEmail(val) {
    setData({...data, email: val})
  }
  function handlePass(val) {
    setData({...data, password: val})
  }
    function sendToMain(status) {
        props.handleNav(status)
      }
      sendToMain(false)

  return (
    <div style={{height: 'fit-conten'}} className='main'>
      <Top2 name='Login' />
      <div className='w3-container padding-0'>
        <div className='w3-panel'>
          <p className='w3-xlarge margin-0'>
            Welcome Back!
          </p>
        </div>
        <div className='w3-panel grid-center'>
        {!response.type && <p className='w3-tag w3-round-large w3-red w3-w3-text-white'>{response.message}</p>}
        {response.type && <p className='w3-tag w3-round-large w3-green w3-w3-text-white'>{response.message}</p>}
          <Input title='Email' icon='fa-regular fa-envelope' type='email'  placeholder='Enter Your email' name='email' value={data.email} handleInput={handleEmail}/>
          <Input title='Password' icon='fa-solid fa-lock-open' type='password'  placeholder='Enter your password' name='password' value={data.password} handleInput={handlePass}/>
          {!isloading && <Button name='Sign In' handleBtn={login}/>}
          {isloading && <ButtonLoad name='Processing...'/>}
        </div>
        <div className='w3-panel grid-center'>
          <p className='w3-large'>Don't have account? <Link to='/register' className='a w3-text-blue'>Register</Link></p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login