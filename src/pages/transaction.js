import React, { useEffect, useState } from 'react'
import Top from '../components/top'
import TransactionElem from '../components/transactionElement'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import None from '../components/none';

const Transactions = (props) => { 
  const [country, setCountry] = useState('')
  const [trans, setTrans] = useState([])
  const [user, setUser] = useState({email: ''})
  const [userDet, setDet] = useState('')
  const [userWal, setWal] = useState('')
  const [currency, setCur] = useState('')
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
  sendToMain(false)
  useEffect(() => {
    
    const fetchData = async() => {
      try {
        const response = await fetch('https://callify.club/icoinn_backend/mains/transactions.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
          const result = await response.json()
          setTrans(result)
        
      } catch (error) {
        console.error('Error:', error)
      }
    
    }
  fetchData()
  }, [userDet])
  
  return (
    <div className='main'>
      <Top name='Transactions' />
      <div className='w3-container'>
      {isFetching && <p className='text-center w3-xlarge'><span className='spinner'></span></p> }
        {trans.map((row) => (
          <TransactionElem key={row.ID} name={row.type} status={row.status} date={row.time} currency={currency && currency.currency} amount={row.amount} rate={currency && currency.rate}/>
        ))}
        {trans && (trans.length < 1) ? <None name='No transaction Record to be found'/> : ''}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Transactions