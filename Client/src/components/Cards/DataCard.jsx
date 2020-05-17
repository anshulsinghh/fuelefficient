import React from 'react'

import {
  Card, CardContent, Typography
} from '@material-ui/core'


class DataCard extends React.Component {
  render() {
    return (
      <Card style={{marginBottom: 15, maxWidth:375, marginLeft:15, marginRight:15}}>
        <CardContent>
          <Typography variant="h5" style={{marginBottom:5}}>
            <b>{this.props.title}</b>
          </Typography>

          <Typography variant="body1" component="div">
            The selected car releases:
          </Typography>
          
          <Typography style={{marginBottom:5}} variant="body1" component="div">
            <span aria-label="cloud emoji" role="img">💨 </span>
            <span><b>{this.props.co2} lbs </b>of CO<sub>2</sub></span>
          </Typography>

          <Typography variant="body1" component="div">
            This is equivalent to:

            <br/>

            <span aria-label="home emoji" role="img">🏘️ </span>
            <b>{this.props.homes} </b>Homes' monthly emissions

            <br/>

            <span aria-label="plane emoji" role="img">✈️ </span>
            <b>{this.props.flights} </b>Flights from San Diego to Phoenix

            <br/>

            <span aria-label="home emoji" role="img">🌲 </span>
            <b>{this.props.trees} </b>40 year-old trees

          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default DataCard