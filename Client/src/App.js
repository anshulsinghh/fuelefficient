import React from 'react'

// Import necessary compopnents from MaterialUI and from the ./components folder
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { Title, Selector, DataCard, InfoCard, Welcome, About } from './components'

// Used for automatically scrolling to the cards whenever the Selector's Go button is pressed
import scrollToComponent from 'react-scroll-to-component';

import './AppStyles.css' //Imports the styles for the App

// Creates the Dark Mode theme with a Green primary color and a Blue secondary color
const theme = createMuiTheme({
  palette: {
    type: "dark", //Dark Mode theme
    primary: {
      main: '#44bd32', // Green color
    },
    secondary: {
      main: '#0652DD', // Blue color
    }
  }
});

class App extends React.Component {
  state = {
    car_selected: false, // Stores whether or not the user has selected a car
    mpg_data: {}, // Stores the MPG data passed by the Selector
  }

  /**
   * buttonPushed executes whenever the user presses the Go! button on the selector. 
   * The function is given the result of querying the API for fuel data about the 
   * car the user selected. This data is then stored in the mpg_data, the car_selected
   * state attribute is set to true, and the website scrolls to the Cards (with an 
   * offset of -50px)
   * 
   * @param fueldata: The MPG data recieved from querying the API for the
   * car that the user selected
   */
  buttonPushed(fueldata) {
    /* Set the mpg_data to the fueldata recieved by the API, and set the car_selected
       attribute to true */
    this.setState({ mpg_data: fueldata, car_selected: true })

    // Scroll to the newly displayed cards
    scrollToComponent(this.cards, { offset: -50, align: 'top', duration: 500 })
  }

  render() {
    /* The data and info cards should only be displayed when a car is selected, and should be
       populated with relevant information from the mpg_data state attribute. This portion
       of code controls this. */

    let cards;
    if (this.state.car_selected) { //Check if the user has selected a car

      //Pull the mpg data for each relevant distance (100mi, 15000mi, 150000mi)
      let mpgdata100 = this.state.mpg_data["100 miles"]
      let mpgdata15000 = this.state.mpg_data["15000 miles"]
      let mpgdata150000 = this.state.mpg_data["150000 miles"]


      cards = <div className="flex-outer" ref={(div) => { this.cards = div; }} /* Creates a reference to the Cards that can be scrolled to */>
        <div className="flex-inner">
          {/* Render an InfoCard with the MPG of the car */}
          <InfoCard mpg={this.state.mpg_data["mpg"]} />

          {/* Render a DataCard with the relevent CO2 emissions of the car, the equivalent number of homes, flights, and trees that the car's CO2 equates to */}
          <DataCard title="Over 100 miles..." co2={mpgdata100["CO2 emitted"]} homes={mpgdata100["Household"]} flights={mpgdata100["Flights from SD to PHX"]} trees={mpgdata100["Tree"]} />
        </div>

        {/* Repeat the same pattern, but for the 10,000mi and 150,000mi distances */}
        <div className="flex-inner">
          <DataCard title="Over 10,000 miles..." co2={mpgdata15000["CO2 emitted"]} homes={mpgdata15000["Household"]} flights={mpgdata15000["Flights from SD to PHX"]} trees={mpgdata15000["Tree"]} />
          <DataCard title="Over 150,000 miles..." co2={mpgdata150000["CO2 emitted"]} homes={mpgdata150000["Household"]} flights={mpgdata150000["Flights from SD to PHX"]} trees={mpgdata150000["Tree"]} />
        </div>
      </div>
    }

    return (
      // Return the content of the website, all of it encolsed in the Dark Mode theme defined earlier
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Used to get Dark Mode styles in the page */}

        <Title /> {/* The website title bar with the FuelEfficient logo */}
        <Welcome /> {/* The website welcome message */}

        {/* The car selector tool. It calls the buttonPushed() method when the Go button is pressed, and sets the car_selected aspect in
            the state whenever a selection changes in the selector tool. */}
        <Selector buttonPushed={(fueldata) => this.buttonPushed(fueldata)} selectionChanged={() => this.setState({ car_selected: false })} />

        {/* Renders the cards that were produced earlier (if any) */}
        {cards}

        {/* The about section of the website */}
        <About />

      </ThemeProvider>
    )
  }
}

export default App