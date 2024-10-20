import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import bit from '../images/bitcoin-banner.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Profile = (props) => {
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

  const [country, setCountry] = useState('')
  const [details, setDetails] = useState([])
  const [user, setUser] = useState({email: ''})
  const [userDet, setDet] = useState('')
  const [userWal, setWal] = useState('')
  const [currency, setCur] = useState('')
  const [isloading, setLoad] = useState(false)
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
        const response = await fetch('https://icoinn.club/icoinn_backend/mains/main.php', {
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
          setIsFetching(false)
        
      } catch (error) {
        console.error('Error:', error)
      }
    
    }
  fetchData()
  }, [user])
// useEffect(() => {
//   const fetchProds = async () => {
//     try {
//       const response = await fetch('http://localhost/icoinn_backend/mains/packages.php', 
//         { method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userDet)
//         }
//       )
//       const result = await response.json()
      
//     } catch (error) {
//       console.error("Error:", error)
//     }
    
//   }
//   fetchProds()
// }, [userDet])

  function sendToMain(status) {
    props.handleNav(status)
  }
  sendToMain(true)
  function formatNumber(number) {
    return number.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}
  return (
    <div className='main'>
      <div className='w3-container top1'>
        <div className='w3-panel'>
          <div className='w3-row w3-left'>
            <p className='w3-xxlarge margin-0'>
              Mine
            </p>
          </div>
          <div className='w3-row flex-row j-space w3-right'>
            <p className='w3-xlarge margin-0'><i class="fa-regular fa-comment-dots"></i></p>
            <p className='w3-xlarge margin-0'></p>
          </div>
        </div>
      </div>
      {/* <div className='w3-container'>
        <div className='w3-panel'>
          <div className='w3-left'>
            <p className='w3-large bold margin-0'>
              Account:- 01235554
            </p>
            <p className='w3-text-grey bold'>
              ID:22255205
            </p>
          </div>
          <div className='w3-right'>
            <img src='' alt=''/>
          </div>
        </div>
      </div> */}
      <div className='w3-container w3-text-white'>
        <div className='w3-panel w3-round-xlarge secondary'>
          <div className='w3-row flex-row w3-padding'>
  
            <div className='w3-row w3-left w3-padding'>
              <p className='w3-large bold margin-0'>
                Account:- {userDet && userDet.email} {isFetching && <span className='spinner'></span>}
              </p>
              <p className='w3-text-yellow bold'>
                ID:222{userDet && userDet.ID} {isFetching && <span className='spinner'></span>}
              </p>
            </div>
            <div className='w3-row w3-right'>
              <img src={bit} width={100} alt='Bit_banee'/>
            </div>
            
          </div>
            <div className='w3-row'>
              <div className='w3-left'>
                <div className='flex-row'>
                  <p className='w3-xlarge padding-sm bold margin-0'>
                    <i class="fa-solid fa-wallet"></i>
                  </p>
                  <p className='w3-small bold margin-0'>
                    {country && country} {isFetching && <span className='spinner'></span>}<br/>
                    Balance
                  </p>
                </div>
              </div>
              <div className='w3-right w3-padding'>
                <p className='w3-xlarge margin-0'>
                {isFetching && <span className='spinner'></span>}
                  {currency && currency.currency} { userWal && formatNumber(userWal.balance * currency.rate)}
                </p>
              </div>
            </div>
        </div>
      </div>
      <div className='w3-container'>
        <div className='w3-panel'>
          <div className='w3-row flex-row'>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/team' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-share"></i>
                </Link>
                <p className='w3-text-grey'>Referral</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/transaction' className='w3-xxlarge a w3-padding margin-0 blur-green w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-file-invoice-dollar"></i>
                </Link>
                <p className='w3-text-grey'>Transactions</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/cashout' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-coins"></i>
                </Link>
                <p className='w3-text-grey'>Withdraw</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/home' className='w3-xxlarge a w3-padding margin-0 blur-purple w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-headset"></i>
                </Link>
                <p className='w3-text-grey'>Support</p>
              </div>
            </div>
            
          </div>
          <div className='w3-row flex-row'>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/order' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-hand-holding-dollar"></i>
                </Link>
                <p className='w3-text-grey'>Earn</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/account' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-regular fa-user"></i>
                </Link>
                <p className='w3-text-grey'>Account</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/group' className='w3-xxlarge a w3-padding margin-0 blur-green w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-brands fa-whatsapp"></i>
                </Link>
                <p className='w3-text-grey'>Group</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <span onClick={() => navigate('/')} to='/login' className='w3-xxlarge a w3-padding margin-0 blur-purple w3-text-black w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-power-off"></i>
                </span>
                <p className='w3-text-grey'>Logout</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Profile