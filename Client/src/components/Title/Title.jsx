import React from 'react'

import { AppBar } from '@material-ui/core'

const Title = () => {
  return (
    <AppBar style={{'text-align': 'center', 'marginBottom': 15}} position="static" color="background">
      <span style={{'font-family': 'Shrikhand', fontSize: 40, display: 'inline-block'}} role="img" aria-label="Falling leaves emoji">FuelEfficient 🍃</span>
    </AppBar>
  )
}

export default Title