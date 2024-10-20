import React from 'react'

function SelectInput(props) {
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
              <select style={{border: 'none', outline: 'none', width: '100%', backgroundColor: 'transparent'}} className='w3-padding' type={props.type} value={props.value} placeholder={props.placeholder} name={props.name} onChange={sendInput}>
                <option disabled-selected-value >Select {props.name}</option>
                {props.options.map( option => (
                    <option value={option.value} key={option.value}>{option.name}</option>
                ))}
              </select>
          </div>
      </div>
    )
}

export default SelectInput