import React from 'react'
import './About.css'

// Import necessary components from MaterialUi
import { Card, CardContent, Typography } from '@material-ui/core'

// These are all links to sources and resources used in the About card
const gitHubLink = <a href="https://github.com/anshulsinghh/fuelefficient" rel="noopener noreferrer" target="_blank">GitHub</a>
const epaDatasetLink = <a rel="noopener noreferrer" href="https://www.fueleconomy.gov/feg/download.shtml" target="_blank">Fuel Economy Dataset</a>
const gallonSourceLink = <a rel="noopener noreferrer" href="http://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-
                          is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf" target="_blank">Source</a>
const houseSourceLink = <a rel="noopener noreferrer" href="https://www.ccfpd.org/Portals/0/Assets/PDF/Facts_Chart.pdf" target="_blank">Source</a>
const planeSourceLink = <a rel="noopener noreferrer" href="https://blueskymodel.org/air-mile" target="_blank">Source</a>
const distanceSourceLink = <a rel="noopener noreferrer" href="https://www.distance.to/Phoenix/San-Diego" target="_blank">Source</a>
const treeSourceLink = <a rel="noopener noreferrer" href="https://www.co2meter.com/blogs/news/could-global-co2-levels-be-reduced-by-planting-trees" target="_blank">Source</a>

// THese are all various emojis used in the About card
const thinkingEmoji = <span aria-label="thinking emoji" role="img">🧐</span> 
const smokeEmoji = <span aria-label="smoke emoji" role="img">💨</span>
const houseEmoji = <span aria-label="house emoji" role="img">🏡</span>
const planeEmoji = <span aria-label="plane emoji" role="img">🛩️</span>
const treeEmoji = <span aria-label="tree emoji" role="img">🌳</span>

const About = () => {
  return (
    <div className="center-container">
      <Card className="AboutCard">
        <CardContent>
          {/* This is the title text showing at the top of the card */}
          <Typography variant="h4" className="title">
            <b>{thinkingEmoji} How Does it Work?</b>
          </Typography>

          {/* This is the body of the About card, and contains information about FuelEfficient */}
          <Typography variant="body1" component="div">
            FuelEfficient uses a MySQL database to store Vehicles, and Express to serve data as a RESTful API. The Frontend was built 
            using React and MaterialUI. View my full source code on {gitHubLink}!
            
            <br/><br/>

            FuelEfficient sources all vehicle MPG data from the EPA's {epaDatasetLink}.

            <ul>
              <li> 
                {smokeEmoji} CO<sub>2</sub> emissions are calculated by multiplying a vehicle's MPG by <i>19.64</i> (lbs of CO<sub>2</sub> 
                released from burning 1 gallon of gas) ({gallonSourceLink}).
              </li>
              
              <li>
                {houseEmoji} The average household produces 7.5 tons of CO<sub>2</sub> a year ({houseSourceLink}). This equates to 
                1,250 lbs per month.
              </li>

              <li>
                {planeEmoji} An airliner releases 53lbs of CO<sub>2</sub> per mile ({planeSourceLink}). Since San Diego and Phoenix 
                are 298.67 miles apart, this means that a flight between SD and PHX releases about 15,829.51 lbs of CO<sub>2</sub> ({distanceSourceLink}).
              </li>

              <li>
                {treeEmoji} A tree absorbs approximately 1 ton of CO<sub>2</sub> by the time it reaches 40 years old. This is equivalent 
                to 2000lbs of CO<sub>2</sub> absorbed per 40-year old tree. ({treeSourceLink})
              </li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default About