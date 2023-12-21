import React from 'react'
import './styles/main.css'
import Tracking from './Components/Tracking'
import Details from './Components/Details'
function Index() {
  return (
    <div className='homeContainer'>
        <Tracking />
        <Details />
    </div>
  )
}

export default Index