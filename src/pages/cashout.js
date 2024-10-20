import React, { useEffect, useState } from 'react'
import Top from '../components/top'
import Input from '../components/inputs'
import Button from '../components/button'
import ButtonLoad from '../components/buttonLoad'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Cashout = (props) => {
  const [res, setRes] = useState({
    data : {},
    message: '',
    type: ''
  })

  const navigate = useNavigate()
  const notifySuccess = () => {
    toast.success("Request Made Successful!", {
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
  
  const [country, setCountry] = useState('')
  const [details, setDetails] = useState([])
  const [user, setUser] = useState({email: ''})
  const [userDet, setDet] = useState('')
  const [userWal, setWal] = useState('')
  const [currency, setCur] = useState('')
  const [isloading, setLoad] = useState(false)
  const[withs, setWiths] = useState({
    email: '',
    amount: 0,
    account: '',
    balance: '',
    country: ''
  })
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
         setWiths({...withs, balance: result.user_wallet.balance, country: result.user_details.country, email: result.user_details.email})

        
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
  function handleAmount(val){
    setWiths({...withs, amount: val})
  }
  function handleAcc(val){
    setWiths({...withs, account: val})
  }
  function withdraw(){
    setLoad(true)
    const fetchData = async() => {
      if (withs.email && withs.account && withs.balance && withs.amount) {
        try {
          const response = await fetch('https://callify.club/icoinn_backend/mains/withdraw.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(withs)
          })
            const result = await response.json()
            if (result.status === "Success") {
              setRes({...res, message: result.message, type: true})
              localStorage.setItem('email', JSON.stringify(result.email))
              notifySuccess()
            }else{
              setRes({...res, message: result.message, type: false})
              notifyError(result.message)
            }
            setLoad(false)
          
        } catch (error) {
          console.error('Error:', error)
          setLoad(false)
          notifyNetError()
        }
      }else{
        setRes({...res, type: false, message: 'Ensure all field are filled!!'})
      setLoad(false)
      notifyFieldsError()
      }
 
    
    }
  fetchData()
  }
  return (
    <div className='main'>
      <Top name='Cashout' />
      <div className='w3-container'>
        <div className='w3-panel grid-center w3-round-large w3-border w3-border-grey'>
          <p className='w3-large'>
            Make instant withdrawals (5% fee charged)
          </p>
          {!res.type && <p className='w3-tag w3-round-large w3-red w3-w3-text-white'>{res.message}</p>}
          {res.type && <p className='w3-tag w3-round-large w3-green w3-w3-text-white'>{res.message}</p>}
          <Input placeholder={`Enter amount(${currency && currency.currency})`} title='Amount' icon='fa-regular fa-credit-card' name='amount' value={withs.amount} handleInput={handleAmount}/>
          <Input placeholder={`Enter Phone`} title='Phone' icon='fa-solid fa-mobile-screen' name='phone' value={withs.account} handleInput={handleAcc}/>
          {!isloading && <Button name='Withdraw' handleBtn={withdraw}/>}
          {isloading && <ButtonLoad name='Requesting...'/>}
        </div>
      </div>
      <ToastContainer/>
    </div>
    
  )
}

export default Cashout