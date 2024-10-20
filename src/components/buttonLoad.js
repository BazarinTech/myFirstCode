import React from 'react'

function ButtonLoad(props) {
    return (
        <button style={{width: '60%'}} className='w3-btn w3-margin secondary w3-round-xlarge w3-text-white bold' disabled>
            <span className='spinner'></span>
            <span className='padding-sm'>
            {props.name}
            </span>
            
        </button>
      )
}

export default ButtonLoad