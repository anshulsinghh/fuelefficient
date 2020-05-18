import React from 'react'

import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { Title, Selector, DataCard, InfoCard, Welcome, About } from './components'
import scrollToComponent from 'react-scroll-to-component';

import './AppStyles.css'

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
    scrollToComponent(this.cards, { offset: -50, align: 'top', duration: 500})
  }

  render() {
    let cards;
    if (this.state.car_selected) {
      let mpgdata100 = this.state.mpg_data["100 miles"]
      let mpgdata15000 = this.state.mpg_data["15000 miles"]
      let mpgdata150000 = this.state.mpg_data["150000 miles"]

      cards = <div className="flex-outer" ref={(div) => { this.cards = div; }}>
                <div className="flex-inner">
                  <InfoCard mpg={this.state.mpg_data["mpg"]}/>
                  <DataCard title="Over 100 miles..." co2={mpgdata100["CO2 emitted"]} homes={mpgdata100["Household"]} flights={mpgdata100["Flights from SD to PHX"]} trees={mpgdata100["Tree"]}/>
                </div>

                <div className="flex-inner">
                  <DataCard title="Over 10,000 miles..." co2={mpgdata15000["CO2 emitted"]} homes={mpgdata15000["Household"]} flights={mpgdata15000["Flights from SD to PHX"]} trees={mpgdata15000["Tree"]}/>
                  <DataCard title="Over 150,000 miles..." co2={mpgdata150000["CO2 emitted"]} homes={mpgdata150000["Household"]} flights={mpgdata150000["Flights from SD to PHX"]} trees={mpgdata150000["Tree"]}/>
                </div>
              </div>
    }
    
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Title/>
        <Welcome/>
        <Selector buttonPushed={(fueldata) => this.buttonPushed(fueldata)} selectionChanged={() => this.setState({car_selected: false})}/>
        {cards}
        <About/>
      </ThemeProvider>
    )
  }
}

export default App