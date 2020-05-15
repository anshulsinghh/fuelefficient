import React from 'react'

import { Title, Selector, DataCard } from './components'
import { ThemeProvider } from "@material-ui/styles"
import { Grid } from '@material-ui/core'

import {
  createMuiTheme,
  CssBaseline
} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#44bd32',
    },
    secondary: {
      main: '#0652DD',
    }
  }
});

class App extends React.Component {
  state = {
    car_selected: false,
    mpg_data: {},
  }

  buttonPushed(fueldata) {
    this.setState({mpg_data: fueldata, car_selected: true})
    console.log(fueldata)
    console.log(this.state.car_selected)
  }

  selectionChanged() {
    this.setState({car_selected: false})
    console.log("New selection")
  }

  getCO2() {
    return 5
  }

  //this.state.mpg_data["100 miles"]["CO2 emitted"]
  render() {
    let cards;
    if (this.state.car_selected) {
      let mpgdata100 = this.state.mpg_data["100 miles"]
      let mpgdata15000 = this.state.mpg_data["15000 miles"]
      let mpgdata150000 = this.state.mpg_data["150000 miles"]

      cards = <Grid container direction="row" justify="center" alignItems="center">
                <DataCard title="Over 100 miles..." co2={mpgdata100["CO2 emitted"]} homes={mpgdata100["Household"]} flights={mpgdata100["Flights from SD to PHX"]} trees={mpgdata100["Tree"]}/>
                <DataCard title="Over 10,000 miles..." co2={mpgdata15000["CO2 emitted"]} homes={mpgdata15000["Household"]} flights={mpgdata15000["Flights from SD to PHX"]} trees={mpgdata15000["Tree"]}/>
                <DataCard title="Over 150,000 miles..." co2={mpgdata150000["CO2 emitted"]} homes={mpgdata150000["Household"]} flights={mpgdata150000["Flights from SD to PHX"]} trees={mpgdata150000["Tree"]}/>
              </Grid>
    }
    
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Title/>
        

        <Selector buttonPushed={(fueldata) => this.buttonPushed(fueldata)} selectionChanged={() => this.selectionChanged()}/>
        
        {cards}
      </ThemeProvider>
    )
  }
}

export default App