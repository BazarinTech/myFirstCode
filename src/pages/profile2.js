import React, { useEffect, useState } from 'react'
import Top2 from '../components/top2'
import remote from '../images/icons/money_wallet.png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile2 = (props) => {
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
          setIsFetching(false)
        
      } catch (error) {
        console.error('Error:', error)
      }
    
    }
  fetchData()
  }, [user])


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
        <Top2 name='Profile' />
        <div className='w3-container'>
            <div className='w3-panel w3-round-xlarge secondary'>
                <div className='w3-left w3-padding'>
                    <div className='w3-row flex-row'>
                        <div className='w3-half grid-center'>
                            <p className='w3-xxlarge margin-0 w3-text-white'><i class="fa-solid fa-wallet"></i></p>
                        </div>
                        <div className='w3-half'>
                            <p className='w3-large w3-text-white margin-0'>
                                Wallet Balance
                            </p>
                        </div>
                    </div>
                    <div className='w3-row'>
                        <p className='w3-xlarge bold margin-0 w3-text-white'>{isFetching && <span className='spinner'></span>}
                        {currency && currency.currency} { userWal && formatNumber(userWal.balance * currency.rate)}</p>
                    </div>
                    <div className='w3-row padding-sm'>
                        <button className='w3-btn w3-round-xlarge blur w3-text-white bold'>Country {country && country} {isFetching && <span className='spinner'></span>}</button>
                    </div>
                </div>
                <div className='w3-right w3-padding'>
                    <img src={remote} width={90}/>
                </div>
            </div>
        </div>
        <div className='w3-container'>
        <div className='w3-panel'>
          <div className='w3-row flex-row'>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/team' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-yellow bold w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-share"></i>
                </Link>
                <p className='w3-text-grey'>Referral</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/transaction' className='w3-xxlarge a w3-padding margin-0 blur-green w3-text-green bold w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-file-invoice-dollar"></i>
                </Link>
                <p className='w3-text-grey'>Transactions</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/cashout' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-yellow bold w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-coins"></i>
                </Link>
                <p className='w3-text-grey'>Withdraw</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='https://wa.me/573158581061' className='w3-xxlarge a w3-padding margin-0 blur-purple w3-text-purple bold w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-headset"></i>
                </Link>
                <p className='w3-text-grey'>Support</p>
              </div>
            </div>
            
          </div>
          <div className='w3-row flex-row'>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/order' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-yellow bold w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-hand-holding-dollar"></i>
                </Link>
                <p className='w3-text-grey'>Earn</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/account' className='w3-xxlarge a w3-padding margin-0 blur-yellow w3-text-yellow bold w3-round-xlarge w3-tag'>
                <i class="fa-regular fa-user"></i>
                </Link>
                <p className='w3-text-grey'>Account</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <Link to='/group' className='w3-xxlarge a w3-padding margin-0 blur-green w3-text-green bold w3-round-xlarge w3-tag'>
                <i class="fa-brands fa-whatsapp"></i>
                </Link>
                <p className='w3-text-grey'>Group</p>
              </div>
            </div>
            <div className='w3-quarter'>
              <div className='grid-center'>
                <span onClick={() => navigate('/')} to='/login' className='w3-xxlarge a w3-padding margin-0 blur-purple w3-text-purple bold w3-round-xlarge w3-tag'>
                <i class="fa-solid fa-power-off"></i>
                </span>
                <p className='w3-text-grey'>Logout</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile2