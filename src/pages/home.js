import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Package from '../components/package'
import banner from '../images/bitcoin-banner.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = (props) => {
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

  const [packages, SetPackage] = useState([])
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
    console.log(user)
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
        
      } catch (error) {
        console.error('Error:', error)
      }
    
    }
  fetchData()
  }, [user])
  useEffect(() => {
    // if (props.user.email !== '') {
    //   window.location.replace('/login')
    // }
}, [localStorage.getItem('email_u')])
useEffect(() => {
  setIsFetching(true)
  const fetchProds = async () => {
    try {
      const response = await fetch('https://icoinn.club/icoinn_backend/mains/products.php', 
        { method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDet)
        }
      )
      const result = await response.json()
      SetPackage(result.data)
      setIsFetching(false)
    } catch (error) {
      console.error("Error:", error)
    }
    
  }
  fetchProds()
}, [userDet])
  function sendToMain(status) {
    props.handleNav(status)
  }
  const process = async(data) => {
    let status = true
    try {
      const response = await fetch('https://icoinn.club/icoinn_backend/mains/purchaseProd.php', 
        { method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }
      )
      const result = await response.json()
      if (result.status === "Success") {
        setRes({...res, message: result.message, type: true, data: result.data})
        localStorage.setItem('email', JSON.stringify(result.email))
        notifySuccess()
      }else{
        setRes({...res, message: result.message, type: false})
        notifyError()
      }
      status = false
    } catch (error) {
      console.error('Error:', error)
      notifyNetError()
    }
    return status
  }
  const purchase = (data) => {
    process(data)
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
          <div className='w3-panel w3-left'>
            <p className='w3-xlarge logo margin-0'> <span className='w3-xlarge'>i</span>COINN</p>
          </div>
          <div className='w3-panel w3-text-grey w3-right flex-row j-space'>
              <p className='w3-large w3-margin'><i class="fa-solid fa-bell"></i></p>
              <p className='w3-large w3-margin'><i class="fa-solid fa-comment-dots"></i></p>
          </div>
      </div>
      <div className='w3-container'>
        <div style={{height: 'fit-content'}} className='w3-panel w3-padding w3-round-large w3-card secondary'>
            <div className='w3-left'>
                <p style={{fontWeight: 'bold'}} className='w3-xlarge font w3-text-white margin-0'>
                  Purchase and <br/>
                  EasyMining<br/>
                  Mining package<br/>
                </p>
                <p className='w3-large w3-text-yellow bold margin-0'>Get high returns</p>
            </div>
            <div className='w3-right'>
              <img src={banner} alt='Bitcoin-banner' width={100}/>
            </div>
        </div>
      </div>
      <div className='w3-container'>
        <div className='w3-panel w3-row w3-border flex-row w3-border-grey w3-round'>
            <div className='w3-col l3 m3 s3'>
              <p className='w3-text-large'><i class="fa-solid fa-volume-high"></i></p>
            </div>
            <div className='w3-rest '>
              <p className='w3-text-large text-center'>FROM: World Coin Labaratories</p>
            </div>
        </div>
        <p className='w3-large'>
        {/* {packages.name} */}
        </p>
        
      </div>
      <div className='w3-container'>
        <div className='w3-panel'>
          <div className='w3-row'>
            <div className='w3-col l3 s3 m3'>
              <Link to='/profile' className='flex-column j-center link'>
                <span className=''><i class="fa-solid fa-door-open"></i></span>
                <span className='w3-text-grey'>Account</span>
              </Link>
            </div>
            <div className='w3-col l3 s3 m3'>
              <Link to='/team' className='flex-column j-center link'>
                <span className=''><i class="fa-solid fa-hand-lizard"></i></span>
                <span className='w3-text-grey'>Referral</span>
              </Link>
            </div>
            <div className='w3-col l3 s3 m3'>
              <Link to='/' className='flex-column j-center link'>
                <span className=''><i class="fa-brands fa-adn"></i></span>
                <span className='w3-text-grey'>App</span>
              </Link>
            </div>
            <div className='w3-col l3 s3 m3'>
              <Link to='/order' className='flex-column j-center link'>
                <span className=''><i class="fa-solid fa-money-check-dollar"></i></span>
                <span className='w3-text-grey'>Earn</span>
              </Link>
            </div>
            
          </div>
          <div className='w3-row'>
            <div className='w3-col l3 s3 m3'>
              <Link to='/' className='flex-column j-center link'>
                <span className=''><i class="fa-brands fa-servicestack"></i></span>
                <span className='w3-text-grey'>Service</span>
              </Link>
            </div>
            <div className='w3-col l3 s3 m3'>
              <Link to='/' className='flex-column j-center link'>
                <span className=''><i class="fa-solid fa-shield"></i></span>
                <span className='w3-text-grey'>Security</span>
              </Link>
            </div>
            <div className='w3-col l3 s3 m3'>
              <Link to='/' className='flex-column j-center link'>
                <span className=''><i class="fa-solid fa-unlock-keyhole"></i></span>
                <span className='w3-text-grey'>Password</span>
              </Link>
            </div>
            <div className='w3-col l3 s3 m3'>
              <Link to='/' className='flex-column j-center link'>
                <span className=''><i class="fa-solid fa-arrow-right-to-bracket"></i></span>
                <span className='w3-text-grey'>Loguot</span>
              </Link>
            </div> 
          </div>
        </div>
      </div>
      <div className='w3-container'>
          <p className='w3-large bold text-center'>Purchase an <span className='primary'>EasyMining Package</span></p>
          <p className='w3-text-grey text-center'>Wait for the mining round to end and you will be high rewarded</p>
      </div>
      <div className='w3-container'>
        {isFetching && <div className='w3-panel grid-center'><p className='w3-large'><span className='spinner'></span>Fetching...</p></div>}
      {!res.type && <p className='w3-tag w3-round-large w3-red w3-w3-text-white'>{res.message}</p>}
      {res.type && <p className='w3-tag w3-round-large w3-green w3-w3-text-white'>{res.message}</p>}
        {packages.map(row => (
          <Package key={row.ID} name={row.name} amount={formatNumber(row.cost)} daily={formatNumber(row.daily)} days={row.days} currency={currency && currency.currency} rate={currency && currency.rate} handlePurchase={purchase} ID={row.ID} email={userDet && userDet.email}/>
        ))}
          
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home