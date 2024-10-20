import React from 'react'

const Top2 = (props) => {
  return (
        <div className='w3-container'>
            <div className='w3-left'>
                <p className='logo margin-0 w3-xxlarge'>{props.name}</p>
            </div>
            <div className='w3-right flex-row primary'>
                <p className='padding-sm w3-large margin-0'><i class="fa-regular fa-circle-user"></i></p>
                <p className='padding-sm w3-large margin-0'><i class="fa-regular fa-bell"></i></p>
                <p className='padding-sm w3-large margin-0'><i class="fa-brands fa-medapps"></i></p>
            </div>
        </div>
  )
}

export default Top2