import React from 'react'
import './Welcome.css'

import { Card, CardContent, Typography } from '@material-ui/core'

class Welcome extends React.Component {
  render() {
    return (
      <div className="center-container">
        <Card className="WelcomeCard">
          <CardContent>
            <Typography variant="h4">
              <b><span aria-label="cloud emoji" role="img">👋</span> Welcome!</b>
            </Typography>

            <Typography variant="body1" component="div">
              FuelEfficient is a place to see and understand your vehicle's emissions.
              <br/>
              <br/>
              Input your car's information in the tool below to get started!
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Welcome