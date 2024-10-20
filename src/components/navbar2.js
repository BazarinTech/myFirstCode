import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar2(props) {
  return (
    <nav className={`main-nav ${(props.display) ? "grid-center" : "display-none"}`}>
    <div className='w3-bar w3-card w3-bottom nav w3-card w3-round-xxlarge w3-black'>
        <div className='w3-bar-item'>

            <NavLink to='/home' className='nav-link'> 
                <span><i class="fa-solid fa-house"></i></span>
                <span>Home</span>
            </NavLink>
        </div>
        <div className='w3-bar-item'>
            <NavLink to='/order' className='nav-link'> 
                <span><i class="fa-solid fa-square-poll-vertical"></i></span>
                <span>Order</span>
            </NavLink>
        </div>
        <div className='w3-bar-item'>
            <NavLink to='/recharge' className='nav-link'> 
                <span><i class="fa-solid fa-fire"></i></span>
                <span>Recharge</span>
            </NavLink>
        </div>
        <div className='w3-bar-item'>
            <NavLink to='/team' className='nav-link'> 
                <span><i class="fa-solid fa-user-group"></i></span>
                <span>Team</span>
            </NavLink>
        </div>
        <div className='w3-bar-item'>
            <NavLink to='/profile' className='nav-link'> 
                <span><i class="fa-regular fa-face-smile"></i></span>
                <span>Mine</span>
            </NavLink>
        </div>

    </div>
</nav>
  )
}

export default Navbar2