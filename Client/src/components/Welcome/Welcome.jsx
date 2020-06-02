import React from 'react'
import './Welcome.css'

import { Card, CardContent, Typography } from '@material-ui/core'

const Welcome = () => {
  return (
    // Centers the WelcomeCard in the webpage
    <div className="center-container">
      {/* The Card container for the Welcome message*/}
      <Card className="WelcomeCard">
        <CardContent>
          {/* The Welcome message with waving emoji */}
          <Typography variant="h4">
            <b><span aria-label="cloud emoji" role="img">👋</span> Welcome!</b>
          </Typography>

          {/* The main message of the Welcome Card */}
          <Typography variant="body1" component="div">
            FuelEfficient is a place to see and understand your vehicle's emissions.
            <br/><br/>
            Input your car's information in the tool below to get started!
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Welcome