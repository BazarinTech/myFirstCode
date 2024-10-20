import React from 'react'

const Input = (props) => {
  function sendInput(event){
      props.handleInput(event.target.value)
  }
  return (
    <div style={{width: '80%'}} className='w3-row w3-margin'>
        <p className='w3-large margin-0'>{props.title}</p>
        <div style={{width: '100%'}} className='w3-row w3-round-large w3-padding input flex-row'>
            <p className='w3-large margin-0 primary'>
                <i className={props.icon}></i>
            </p>
            <input style={{border: 'none', outline: 'none', width: '100%', backgroundColor: 'transparent'}} className='w3-padding' type={props.type} value={props.value} placeholder={props.placeholder} name={props.name} onChange={sendInput}/>
        </div>
    </div>
  )
}

export default Input