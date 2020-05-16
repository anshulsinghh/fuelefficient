import React from 'react'

import { AppBar } from '@material-ui/core'

const Title = () => {
  return (
    <AppBar style={{'textAlign': 'center', 'marginBottom': 15}} position="static" color="inherit">
      <span style={{'fontFamily': 'Shrikhand', fontSize: 40, display: 'inline-block'}} role="img" aria-label="Falling leaves emoji">FuelEfficient 🌿</span>
    </AppBar>
  )
}

export default Title