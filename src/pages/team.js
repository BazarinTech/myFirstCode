import React, { useEffect, useRef, useState } from 'react'
import TeamPanel from '../components/tpanel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import Top2 from '../components/top2';

const Team = (props) => {
  const [res, setRes] = useState({
    data : {},
    message: '',
    type: ''
  })
  const [isFetching, setIsFetching] = useState(false)
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
  const notifyNetError = () => {
    toast.error("Network Error!!", {
        position: "top-right",
    });
};

  const [team, setTeam] = useState({
    first_level: {
      active:'',
      downline:'',
    },
    second_level: {
      active:'',
      downline:'',
    },
    third_level: {
      active:'',
      downline:'',
    }
  })
  const [user, setUser] = useState({email: ''})
  const [userDet, setDet] = useState('')
  const [userWal, setWal] = useState('')
  const [currency, setCur] = useState('')
  const [isloading, setLoad] = useState(false)
  const [teamPost, setTeamPost] = useState({
    ID: '',
    email: ''
  })
  useEffect(() => {
    if (localStorage.getItem('email_u')) {
      setUser({...user, email: JSON.parse(localStorage.getItem('email_u'))})
    }else{
      navigate('/')
    }
    
  } , [navigate])
  useEffect(() => {
    setIsFetching(true)
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
          setIsFetching(false)
          setDet(result.user_details)
          setWal(result.user_wallet)
          setCur(result.currency)
          setTeamPost({...teamPost, email: result.user_details.email, ID: result.user_details.ID})
        
      } catch (error) {
        console.error('Error:', error)
      }
    
    }
  fetchData()
  }, [user])
useEffect(() => {
  setIsFetching(true)
  const fetchProds = async () => {
    try {
      const response = await fetch('https://callify.club/icoinn_backend/mains/team.php', 
        { method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(teamPost)
        }
      )
      const result = await response.json()
      setTeam(result.data)
      setIsFetching(false)
      
    } catch (error) {
      console.error("Error:", error)
      setIsFetching(false)
    }
    
  }
  fetchProds()
}, [teamPost])
  function sendToMain(status) {
    props.handleNav(status)
  }
  sendToMain(true)
  const textRef = useRef(null);
  const copyText = () => {
    // Check if the ref is available
    if (textRef.current) {
      // Use the Clipboard API to write text to the clipboard
      navigator.clipboard.writeText(textRef.current.textContent)
        .then(() => {
          // Success callback
          alert('Text copied to clipboard!');
        })
        .catch((err) => {
          // Error callback
          console.error('Failed to copy text: ', err);
        });
    }
  };
  const codeRef = useRef(null);
  const copyCode = () => {
    // Check if the ref is available
    if (textRef.current) {
      // Use the Clipboard API to write text to the clipboard
      navigator.clipboard.writeText(codeRef.current.textContent)
        .then(() => {
          // Success callback
          alert('Text copied to clipboard!');
        })
        .catch((err) => {
          // Error callback
          console.error('Failed to copy text: ', err);
        });
    }
  };
  return (
    <div className='main'>
      <Top2 name='Downlines'/>
      <div className='w3-container'>
        <div className='w3-panel w3-round secondary'>
          <div className='w3-row'>
            <div className='w3-left padding-sm'>
              <p  className='w3-large margin-0 w3-text-white'>
                invitation Code
              </p>
              <p ref={codeRef} className='w3-large margin-0 w3-text-white'>
              {isFetching && <span className='spinner'></span>}
              {userDet && userDet.ID}
              </p>
            </div>
            <div className='w3-right padding-sm'>
              <button onClick={copyCode} className='w3-btn w3-round-xlarge w3-white'>Copy</button>
            </div>
          </div>
          <div style={{marginTop: '20px'}} className='w3-row'>
            <div style={{maxWidth: '50%'}} className='w3-left padding-sm'>
              <p className='w3-large margin-0 w3-text-white'>
                invitation Link
              </p>
              <p ref={textRef}  className='w3-large margin-0 w3-text-white'>
                https://www.funds.callify.club/register?upline={userDet && userDet.ID}{isFetching && <span className='spinner'></span>}
              </p>
            </div>
            <div className='w3-right padding-sm'>
              <button onClick={copyText} className='w3-btn w3-round-xlarge w3-white'>Copy</button>
            </div>
          </div>
        </div>
      </div>
      <div className='w3-container'>
        <div className='w3-panel w3-round secondary'>
          <div className='w3-row flex-row'>
            <p className='w3-tag  margin-0 w3-large w3-circle w3-white'>
              <span className='primary'>
                <i class="fa-regular fa-gem"></i>
              </span>
            </p>
            <p className='w3-large margin-0 w3-padding w3-text-white bold'>
              Your Rebate has arrived sir!
            </p>
          </div>
        </div>
      </div>
      <div className='w3-container'>
        <div className='w3-panel'>
          <p className='w3-large margin-0'>Your team details</p>
        </div>
        <TeamPanel 
        level='1' 
        status={true} 
        active={team?.first_level?.active || 0} 
        com={team?.first_level?.total_com || 0} 
        members={team?.first_level?.total || 0} 
        currency={currency?.currency || ''} 
        rate={currency?.rate || 1}
      />
      <TeamPanel 
        level='2' 
        status={false} 
        active={team?.second_level?.active || 0} 
        com={team?.second_level?.total_com || 0} 
        members={team?.second_level?.total || 0} 
        currency={currency?.currency || ''} 
        rate={currency?.rate || 1}
      />
      <TeamPanel 
        level='3' 
        status={false} 
        active={team?.third_level?.active || 0} 
        com={team?.third_level?.total_com || 0} 
        members={team?.third_level?.total || 0} 
        currency={currency?.currency || ''} 
        rate={currency?.rate || 1}
      />
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Team