import React from 'react'
import { AppBar } from '@material-ui/core'

import './Title.css'

const Title = () => {
  return (
      <AppBar className="Bar" position="static" color="inherit">
        <span className="InnerSpan" role="img" aria-label="Falling leaves emoji">FuelEfficient 🌿</span>
      </AppBar>
  )
}

export default Title