import React, { useEffect, useState } from 'react'
import remote from '../images/icons/remote_work.png'
import annonce from '../images/icons/announce.png'
import Package2 from '../components/package2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Home2 = (props) => {
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
    
      const notifyError = (msg) => {
          toast.error(msg, {
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
          const response = await fetch('https://callify.club/icoinn_backend/mains/products.php', 
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
          const response = await fetch('https://callify.club/icoinn_backend/mains/purchaseProd.php', 
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
            notifyError(result.message)
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
        <div className='w3-container'>
            <div className='w3-left'>
                <p className='logo margin-0 w3-xxlarge'>Call<span className='primary'>ify</span></p>
            </div>
            <div className='w3-right flex-row primary'>
                <p className='padding-sm w3-large margin-0'><i class="fa-regular fa-circle-user"></i></p>
                <p className='padding-sm w3-large margin-0'><i class="fa-regular fa-bell"></i></p>
                <p className='padding-sm w3-large margin-0'><i class="fa-brands fa-medapps"></i></p>
            </div>
        </div>
        <div className='w3-container'>
            <div className='w3-panel w3-round-xlarge secondary'>
                <div className='w3-left w3-padding'>
                    <p className='w3-text-white bold w3-xlarge margin-0'>Make money <br/> at your <br/> Comfort</p>
                </div>
                <div className='w3-right w3-padding'>
                    <img src={remote} width={90}/>
                </div>
            </div>
        </div>
        <div className='w3-container'>
            <div className='w3-row flex-row'>
                <div className='w3-quarter grid-center'>
                    <NavLink to='/recharge' className='w3-panel w3-white w3-card w3-round-xlarge w3-padding'>
                        <p className='w3-xlarge margin-0 primary'><i class="fa-solid fa-arrow-up-from-bracket"></i></p>
                    </NavLink>
                    <p className='w3-large margin-0'>Topup</p>
                </div>
                <div className='w3-quarter grid-center'>
                    <NavLink to='/cashout' className='w3-panel w3-white w3-card w3-round-xlarge w3-padding'>
                        <p className='w3-xlarge margin-0 primary'><i class="fa-solid fa-arrow-up-from-bracket"></i></p>
                    </NavLink>
                    <p className='w3-large margin-0'>Cashout</p>
                </div>
                <div className='w3-quarter grid-center'>
                    <NavLink to='/transaction' className='w3-panel w3-white w3-card w3-round-xlarge w3-padding'>
                        <p className='w3-xlarge margin-0 primary'><i class="fa-solid fa-clock-rotate-left"></i></p>
                    </NavLink>
                    <p className='w3-large margin-0'>History</p>
                </div>
                <div className='w3-quarter grid-center'>
                    <NavLink to='/profile' className='w3-panel w3-white w3-card w3-round-xlarge w3-padding'>
                        <p className='w3-xlarge margin-0 primary'><i class="fa-regular fa-circle-user"></i></p>
                    </NavLink>
                    <p className='w3-large margin-0'>Profile</p>
                </div>
            </div>
        </div>
        <div className='w3-container'>
            <div className='w3-panel flex-row w3-round-xxlarge announce'>
                <div className='w3-left w3-padding'>
                        <img src={annonce} width={100}/>
                </div>
                <div className='w3-padding'>
                    <p className='w3-large bold margin-0'>Get 3 levels commission</p>
                    <p className='w3-medium margin-0 primary'>Earn a commission each and every time your downlines recharges their account in three levels.</p>
                </div>
            </div>
        </div>
        <div className='w3-container'>
            <div className='w3-panel'>
                <p className='w3-xlarge primary bold margin-0'>Products</p>
            </div>
            <div className='w3-row'>
                {isFetching && <div className='w3-panel grid-center'><p className='w3-large'><span className='spinner'></span>Fetching...</p></div>}
            {packages.map(row => (
            <Package2 key={row.ID} name={row.name} cost={formatNumber(row.cost)} daily={formatNumber(row.daily)} days={row.days} currency={currency && currency.currency} rate={currency && currency.rate} handlePurchase={purchase} ID={row.ID} email={userDet && userDet.email} image={row.image}/>
            ))}
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Home2