import React, { useEffect, useState } from 'react'
import Top from '../components/top'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import None from '../components/none';

const Group = (props) => {
  const [country, setCountry] = useState('')
  const [groups, setGroups] = useState([])
  const [user, setUser] = useState({email: ''})
  const [userDet, setDet] = useState('')
  const [userWal, setWal] = useState('')
  const [currency, setCur] = useState('')
  const [post, setPost] = useState({
    country: ''
  })

  const navigate = useNavigate()
  const notifySuccess = () => {
    toast.success("Package Bought Successfully!", {
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
          setPost({...post, country: result.user_details.country})
        
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
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('https://callify.club/icoinn_backend/mains/groups.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post)
        })
          const result = await response.json()
          setGroups(result)
        
      } catch (error) {
        console.error('Error:', error)
      }
    
    }
  fetchData()
  }, [post])
  return (
    <div className='main'>
      <Top name='Groups'/>
      <div className='w3-container'>
        {groups.map((row) => (
          <div key={row.ID}  className='w3-panel flex-row w3-card w3-round w3-white'>
            <div className='w3-left flex-row j-space'>
              <p className='w3-tag w3-xlarge blur-green w3-round-large bold'>
              <i class="fa-brands fa-whatsapp"></i>
              </p>
              <p className='w3-large w3-padding'>
                Join our {row.platform} group
              </p>
            </div>
            <div className='w3-right w3-padding'>
              <Link to={row.link} className='w3-btn secondary w3-round-large a w3-padding'>Join</Link>
            </div>
          </div>
        ))}
        {groups && (groups.length < 1) ? <None name='No group to join found'/> : ''}
      </div>
    </div>
  )
}

export default Group