import React from 'react'
import './CardStyles.css'

import { Card, CardContent, Typography } from '@material-ui/core'

function DataCard(props) {
  return (
    <Card className="ContentCard">
      <CardContent>
        {/* The title for the ContentCard */}
        <Typography variant="h5" className="spacer">
          <b>{props.title}</b>
        </Typography>

        <Typography variant="body1" component="div">
          The selected car releases:
        </Typography>

        {/* The lbs of CO2 the car releases */}        
        <Typography className="spacer" variant="body1" component="div">
          <span aria-label="cloud emoji" role="img">💨 </span>
          <span><b>{props.co2} lbs</b> of CO<sub>2</sub></span>
        </Typography>

        <Typography variant="body1" component="div">
          This is equivalent to: <br/>

          {/* The equivalent home's worth of emissions */}
          <span aria-label="home emoji" role="img">🏘️ </span>
          <b>{props.homes}</b> Homes' monthly emissions<br/>
          
          {/* The equivalent flights from SD to PHX */}
          <span aria-label="plane emoji" role="img">✈️ </span>
          <b>{props.flights}</b> Flights from San Diego to Phoenix<br/>

          {/* The equivalent number of 40-year old trees */}
          <span aria-label="home emoji" role="img">🌲 </span>
          <b>{props.trees}</b> 40 year-old trees

        </Typography>
      </CardContent>
    </Card>
  )
}

export default DataCard