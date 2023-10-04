import React from 'react'
import myloading from './loading.gif'
const Spinner=()=> {
    return (
      <div className='text-center'>
        <img src={myloading} alt="loading" />
      </div>
    )
}

export default Spinner
