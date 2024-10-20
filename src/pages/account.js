import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/inputs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Account = (props) => {
  const [country, setCountry] = useState('')
  const [post, setPost] = useState({
    name: '',
    password: '',
    email: ''
  })

  const navigate = useNavigate()
  const notifySuccess = () => {
    toast.success("Request Made Successful!", {
        position: "top-right",
    });
  };

  const notifyError = () => {
      toast.error("Not Enough Funds to make this request!!", {
          position: "top-right",
      });
  };
  const notifyFieldsError = () => {
    toast.error("Fields cannot be empty!!", {
        position: "top-right",
    });
  };
  const notifyMinError = () => {
    toast.error("Minimum Withdraw not met!!", {
        position: "top-right",
    });
  };
  const notifyNetError = () => {
    toast.error("Network Error!!", {
        position: "top-right",
    });
};

  const [user, setUser] = useState({email: ''})
  const [userDet, setDet] = useState('')
  const [userWal, setWal] = useState('')
  const [currency, setCur] = useState('')
  useEffect(() => {
    if (localStorage.getItem('email_u')) {
      setUser({...user, email: JSON.parse(localStorage.getItem('email_u'))})
    }else{
      navigate('/')
    }
    
  } , [navigate])
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('https://callify.club/icoinn_backend/mains/main.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
          const result = await response.json()
          setDet(result.user_details)
          setWal(result.user_wallet)
          setCur(result.currency)
          setCountry(result.country_name)
          setPost({...post, email: result.user_details.email, name: result.user_details.email,password: result.user_details.password})
        
      } catch (error) {
        console.error('Error:', error)
      }
    
    }
  fetchData()
  }, [user])
  function sendToMain(status) {
    props.handleNav(status)
  }
  sendToMain(false)
  function handleName(val){
    setPost({...post, name: val})
  }function handleEmail(val){
    setPost({...post, email: val})
  }
  function handlePass(val){
    setPost({...post, password: val})
  }
  return (
    <div className='main'>
      <div className='w3-container top1'>
        <div className='w3-panel flex-row'>
          <Link to='/profile' className='w3-xlarge a margin-0'>
          <i class="fa-solid fa-rotate-left"></i>
          </Link>
          <p className='w3-xlarge w3-padding'>
            Edit Account
          </p>
        </div>
      </div>
      <div className='container'>
        <div className='w3-panel grid-center'>
          <Input placeholder='Enter Name' value={userDet && userDet.name} type='text' title='Name' icon='fa-regular fa-user' name='name' handleInput={handleName}/>
          <Input placeholder='Enter Email' value={userDet && userDet.email}  type='email' title='Email' icon='fa-regular fa-envelope' name='email' handleInput={handleEmail}/>
          <Input placeholder='Enter Old Password'  type='password' title='Change Password' icon='fa-solid fa-lock' name='old-pass' handleInput={handlePass}/>
          <Input placeholder='Enter New Password'  type='password' title='' icon='fa-solid fa-lock' name='new-pass' handleInput={handlePass}/>
          <Input placeholder='Enter Confirm Password' type='password' title='' icon='fa-solid fa-lock' name='con-pass' handleInput={handlePass}/>
          <button style={{width: '60%'}} className='w3-btn w3-margin secondary w3-round-xlarge w3-text-white bold'>Update</button>
        </div>

      </div>
      <ToastContainer/>
    </div>
  )
}

export default Account