import React, { Suspense, useEffect, useState } from 'react'
import Item from '../components/item'
import bit2 from '../images/bit1.png'
import bit1 from '../images/bitcoin-banner.png'
import ButtonLoad from '../components/buttonLoad'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Order = (props) => {
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
      const response = await fetch('https://icoinn.club/icoinn_backend/mains/packages.php', 
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
      const response = await fetch('https://icoinn.club/icoinn_backend/mains/earn.php', 
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
      }else{
        setRes({...res, message: result.message, type: false})
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className='main'>
      <div className='w3-container top1'>
          <div className='w3-panel'>
            <p className='w3-xlarge margin-0 bold'>My Order</p>
          </div>
          <div className='w3-row flex-row'>
              <div className='w3-half w3-padding'>
                <div className='w3-panel flex-row j-space w3-round-large  secondary'>
                {currency && currency.currency && userWal && (
                  <div>
                    <p className='w3-large w3-text-white'>
                      {isFetching && <span className='spinner'></span>}
                      {currency.currency} {formatNumber(userWal.totals * currency.rate)}
                    </p>
                    <p className='w3-text-yellow '>
                      Total income
                    </p>
                  </div>
                )}
                  <div className='w3-right'>
                    <img src={bit1} width={50} alt='bit2-banner' />
                  </div>
                </div>
              </div>
              <div className='w3-half w3-padding'>
                <div className='w3-panel flex-row j-space w3-round-large secondary'>
                  <div className='w3-left'>
                    {currency && <p className='w3-large w3-text-white'>
                      {isFetching && <span className='spinner'></span>}
                    {currency.currency} {formatNumber(userWal.deposits * currency.rate)}
                    </p> }
                    
                    <p className='w3-text-yellow '>
                      Recharge
                    </p>
                  </div>
                  <div className='w3-right'>
                    <img src={bit2} width={50} alt='bit2-banner' />
                  </div>
                </div>
                
              </div>
          </div>
      </div>
      <div className='w3-container secondary'>
        <div className='w3-panel'>
          <div className='w3-left'>
            <p className='w3-text-white margin-0 w3-large'>Current Balance</p>
            {userWal && <p className='w3-text-yellow w3-large margin-0'> {isFetching && <span className='spinner'></span>} {formatNumber(userWal.balance * currency.rate)} {currency.currency}</p>}

          </div>
          <div className='w3-right'>
            {!isloading && <button className='w3-btn w3-teal bold w3-border w3-border-white w3-text-white w3-round-large' onClick={earn}>Collect</button>}
            {isloading && <button className='w3-btn w3-teal w3-border w3-border-white w3-text-white w3-round-large' disabled>Processing...</button>}

          </div>
        </div>
        <p className='w3-large w3-text-white text-center'>Don't forget to collect your profit every day</p>
      </div>
      <div className='w3-container'>
      {isFetching && <span className='spinner'></span>}
      {!res.type && <p className='w3-tag text-center w3-round-large w3-red w3-w3-text-white'>{res.message}</p>}
      {res.type && <p className='w3-tag text-center w3-round-large w3-green w3-w3-text-white'>{res.message}</p>}
        {packages && packages.map(row => {
          let total = 0
          let name = ''
          let remaining = 0
          let id = 0
          let daily = 0 
          let amount = 0
          
            for (let i = 0; i < details.length; i++) {
              if (details[i] && details[i].ID === row.prodID) {
                total = details[i].totals
                name = details[i].name
                remaining =  details[i].days - row.days 
                id = details[i].ID
                amount = details[i].cost
                daily = details[i].daily
              }
              
            }
          return(
            <Item key={row.ID} name={name} amount={amount} daily={daily} days={remaining} total={row.totals}  status={row.status} currency={currency && currency.currency} rate={currency && currency.rate}/>
        )})}
      {packages &&(packages.length < 1) ? 'You Do not have any running machine!' : ''}
      </div>
      <ToastContainer/>
    </div>
    </Suspense>
    
  )
}

export default Order