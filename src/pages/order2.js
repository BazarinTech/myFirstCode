import React, { useEffect, useState } from 'react'
import Top2 from '../components/top2'
import remote from '../images/icons/history.png'
import Item2 from '../components/item2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import None from '../components/none';

const Order2 = (props) => {
    const [res, setRes] = useState({
        data : {},
        message: '',
        type: ''
      })
      const [isFetching, setIsFetching] = useState(false)
      const navigate = useNavigate()
      const notifySuccess = (msg) => {
        toast.success(msg, {
            position: "top-right",
        });
      };
    
      const notifyError = (msg) => {
          toast.error(msg, {
              position: "top-right",
          });
      };
    
      const [packages, setPackage] = useState([])
      const [details, setDetails] = useState([])
      const [user, setUser] = useState({email: ''})
      const [userDet, setDet] = useState('')
      const [userWal, setWal] = useState('')
      const [currency, setCur] = useState({ currency: '', rate: 1 })
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
              setIsFetching(false)
            
          } catch (error) {
            console.error('Error:', error)
          }
        
        }
      fetchData()
      }, [user])
    useEffect(() => {
      const fetchProds = async () => {
        try {
          const response = await fetch('https://callify.club/icoinn_backend/mains/packages.php', 
            { method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userDet)
            }
          )
          const result = await response.json()
          setPackage(result.details)
          setDetails(result.data)
        } catch (error) {
          console.error("Error:", error)
        }
        
      }
      fetchProds()
    }, [userDet])
      function sendToMain(status) {
        props.handleNav(status)
      }
      sendToMain(true)
      const earn = async() => {
        setLoad(true)
        try {
          const response = await fetch('https://callify.club/icoinn_backend/mains/earn.php', 
            { method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userDet)
            }
          )
          const result = await response.json()
          if (result.status === "Success") {
            setRes({...res, message: result.message, type: true, data: result.data})
            notifySuccess(result.message)
          }else{
            setRes({...res, message: result.message, type: false})
            notifyError(result.message)
          }
          setLoad(false)
        } catch (error) {
          console.error("Error:", error)
          setLoad(false)
    
        }
      }
      function formatNumber(number) {
        return number.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }
  return (
    <div className='main'>
        <Top2 name="Orders"/>
        <div className='w3-container'>
            <div className='w3-panel w3-round-xlarge secondary'>
                <div className='w3-left w3-padding'>
                    <div className='w3-row flex-row'>
                        <div className='w3-half grid-center'>
                            <p className='w3-xxlarge margin-0 w3-text-white'><i class="fa-solid fa-wallet"></i></p>
                        </div>
                        <div className='w3-half'>
                            <p className='w3-large w3-text-white margin-0'>
                                Total Income
                            </p>
                        </div>
                    </div>
                    <div className='w3-row'>
                        <p className='w3-xlarge bold margin-0 w3-text-white'>
                        {currency && currency.currency && userWal && (
                        <div>
                            <span className='w3-large w3-text-white'>
                            {isFetching && <span className='spinner'></span>}
                            {currency.currency} {formatNumber(userWal.totals * currency.rate)}
                            </span>
                        </div>
                        )}
                        </p>
                    </div>
                    <div className='w3-row padding-sm'>
                        {!isloading && <button className='w3-btn w3-round-large w3-card w3-green' onClick={earn}>Collect Income</button>}
                        {isloading && <button className='w3-btn w3-green w3-border w3-border-white w3-text-white w3-round-large' disabled>Processing...</button>}
                    </div>
                </div>
                <div className='w3-right w3-padding'>
                    <img src={remote} width={90}/>
                </div>
            </div>
        </div>
        <div className='w3-container'>
            <div className='w3-panel'>
                <p className='w3-xlarge primary margin-0 bold'>Earning Products</p>
            </div>
            <div className='w3-row'>
                {isFetching && <span className='spinner'></span>}
                {packages && packages.map(row => {
                let total = 0
                let name = ''
                let remaining = 0
                let id = 0
                let daily = 0 
                let amount = 0
                let image = ''
                    for (let i = 0; i < details.length; i++) {
                    if (details[i] && details[i].ID === row.prodID) {
                        total = details[i].totals
                        name = details[i].name
                        remaining =  details[i].days - row.days 
                        id = details[i].ID
                        amount = details[i].cost
                        daily = details[i].daily
                        image = details[i].image
                    }
                    
                    }
                return(
                    <Item2 key={row.ID} name={name} cost={amount} daily={daily} days={remaining}  status={row.status} currency={currency && currency.currency} rate={currency && currency.rate} image={image}/>
                )})}

            </div>
            {packages.length == 0 ? <None name='You do not have any item to display'/> : ''}
        </div>
        <ToastContainer />
    </div>
  )
}

export default Order2