import React from 'react'
import './About.css'

import { Card, CardContent, Typography } from '@material-ui/core'

class About extends React.Component {
  render() {
    return (
      <div className="AboutContainer">
        <Card className="AboutCard">
          <CardContent>
            <Typography variant="h4" style={{marginBottom:5}}>
              <b><span aria-label="cloud emoji" role="img">🧐</span> How Does it Work?</b>
            </Typography>

            <Typography variant="body1" component="div">
              FuelEfficient uses a MySQL database to store Vehicles, and Express to serve data as a RESTful API. The Frontend was built using React and MaterialUI. View my full source code on <a href="https://github.com/anshulsinghh/fuelefficient" rel="noopener noreferrer" target="_blank">GitHub</a>!
              <br/>
              <br/>

              FuelEfficient sources all vehicle MPG data from the EPA's <a rel="noopener noreferrer" href="https://www.fueleconomy.gov/feg/download.shtml" target="_blank">Fuel Economy Dataset</a>.

              <ul>
                <li> 
                  <span aria-label="cloud emoji" role="img">💨</span> CO<sub>2</sub> emissions are calculated by multiplying a vehicle's MPG by <i>19.64</i> (lbs of CO<sub>2</sub> released from burning 1 gallon of gas) (<a rel="noopener noreferrer" href="http://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf" target="_blank">Source</a>).
                </li>
                
                <li>
                  <span aria-label="cloud emoji" role="img">🏡</span> The average household produces 7.5 tons of CO<sub>2</sub> a year (<a rel="noopener noreferrer" href="https://www.ccfpd.org/Portals/0/Assets/PDF/Facts_Chart.pdf" target="_blank">Source</a>). This equates to 1,250 lbs per month.
                </li>

                <li>
                  <span aria-label="cloud emoji" role="img">🛩️</span> An airliner releases 53lbs of CO<sub>2</sub> per mile (<a rel="noopener noreferrer" href="https://blueskymodel.org/air-mile" target="_blank">Source</a>). Since San Diego and Phoenix are 298.67 miles apart, this means that a flight between SD and PHX releases about 15,829.51 lbs of CO<sub>2</sub> (<a rel="noopener noreferrer" href="https://www.distance.to/Phoenix/San-Diego" target="_blank">Source</a>).
                </li>

                <li>
                  <span aria-label="cloud emoji" role="img">🌳</span> A tree absorbs approximately 1 ton of CO<sub>2</sub> by the time it reaches 40 years old. This is equivalent to 2000lbs of CO<sub>2</sub> absorbed per 40-year old tree. (<a rel="noopener noreferrer" href="https://www.co2meter.com/blogs/news/could-global-co2-levels-be-reduced-by-planting-trees" target="_blank">Source</a>)
                </li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default About