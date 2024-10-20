import React, { useEffect, useState } from 'react'
import Top from '../components/top'
import Input from '../components/inputs'
import Button from '../components/button'
import ButtonLoad from '../components/buttonLoad'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import Top2 from '../components/top2'

const Recharge = (props) => {
  const [res, setRes] = useState({
    data : {},
    message: '',
    type: ''
  })
  const [isFetching, setIsFetching] = useState(false)
  const [country, setCountry] = useState('')
  const [details, setDetails] = useState([])
  const [user, setUser] = useState({email: ''})
  const [userDet, setDet] = useState('')
  const [userWal, setWal] = useState('')
  const [currency, setCur] = useState('')
  const [isloading, setLoad] = useState(false)
  const [bankType, setBankType] = useState(false)
  const[deps, setDeps] = useState({
    email: '',
    amount: 0,
    account: '',
    transaction_id: ''
  })
  
  const navigate = useNavigate()
  const notifySuccess = () => {
    toast.success("Deposit Request Successfully!", {
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

  const [Instruction, setInstruction] = useState('')
  const [postBank, setPostBank] = useState({})
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
          setPostBank({country:result.user_details.country})
         setDeps({...deps, email: user.email})
        
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
  function handleAmount(val){
    setDeps({...deps, amount: val})
  }
  function handleAcc(val){
    setDeps({...deps, account: val})
  }
  function handleTran(val){
    setDeps({...deps, transaction_id: val})
  }
  function handleBtn() {
    setLoad(true)
    const fetchData = async() => {
      if (deps.email != '' && deps.account != '' && deps.transaction_id != '') {
        try {
          const response = await fetch('https://callify.club/icoinn_backend/mains/deposit.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deps)
          })
            const result = await response.json()
            if (result.status === "Success") {
              setRes({...res, message: result.message, type: true})
              localStorage.setItem('email', JSON.stringify(result.email))
              notifySuccess()
            }else{
              setRes({...res, message: result.message, type: false})
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
  useEffect(() => {
    setIsFetching(true)
    const fetchInstr = async() => {
      try {
        const response = await fetch('https://callify.club/icoinn_backend/mains/bank_instructions.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBank)
        })
          const result = await response.json()
          setInstruction(result.instructions)
          if (result.type == 'auto') {
            setBankType(true)
            setDeps({...deps, transaction_id: 'auto_d'})
          }else{
            setBankType(false)
          }
          
          setIsFetching(false)
        
      } catch (error) {
        console.error('Error:', error)
    
      }
    
    }
  fetchInstr()
  }, [postBank])
  return (
<div className='main'>
      <Top2 name='Deposit' />
      <div className='w3-container'>
        <div className='w3-panel w3-round-large w3-border w3-border-grey'>
          <p className='w3-large bold text-center'>Instructions</p>
          <p className='text-center'>{isFetching && <span className='spinner'></span>}</p>
        <p className='w3-large margin-0'>
        
           <span dangerouslySetInnerHTML={{ __html: Instruction }}>
                        
                  </span>
          </p>
        </div>
      </div>
      <div className='w3-container'>
        <div className='w3-panel grid-center w3-round-large w3-border w3-border-grey'>
          <p className='w3-large'>
            Fill below fields
          </p>
          {!res.type && <p className='w3-tag w3-round-large w3-red w3-w3-text-white'>{res.message}</p>}
          {res.type && <p className='w3-tag w3-round-large w3-green w3-w3-text-white'>{res.message}</p>}
          <Input placeholder={`Enter amount(${currency && currency.currency})`} title='Amount' icon='fa-regular fa-credit-card' name='amount' value={deps.amount} handleInput={handleAmount}/>
          <Input placeholder={`Enter Phone`} title='Phone' icon='fa-solid fa-mobile-screen' value={deps.account} name='phone' handleInput={handleAcc}/>
          {!bankType && <Input placeholder={`Enter Transaction Reference`} title='Transaction Reference' icon='fa-solid fa-mobile-screen' value={deps.transaction_id} name='transaction_id' handleInput={handleTran}/>}
          {!isloading && <Button name='Deposit' handleBtn={handleBtn}/>}
          {isloading && <ButtonLoad name='Processing'/>}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Recharge