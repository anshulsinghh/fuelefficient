import React from 'react'
import './Welcome.css'

import { Card, CardContent, Typography } from '@material-ui/core'

class Welcome extends React.Component {
  render() {
    return (
      <div className="container">
        <Card className="ContentCard">
          <CardContent>
            <Typography variant="h4" style={{marginBottom:5}}>
              <b><span aria-label="cloud emoji" role="img">👋</span> Welcome!</b>
            </Typography>

            <Typography variant="body1" component="div">
              FuelEfficient is a place to see and understand your vehicle's emissions.
              <br/>
              <br/>
              Use the tool below to get started!
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Welcome