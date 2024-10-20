import React from 'react'

const Button = (props) => {
  function sendBtn(e){
    props.handleBtn(e)
  }
  return (
    <button style={{width: '60%'}} className='w3-btn w3-margin secondary w3-round-xlarge w3-text-white bold' onClick={sendBtn}>{props.name}</button>
  )
}

export default Button