import React from 'react'

import { Title, Selector } from './components'
import { ThemeProvider } from "@material-ui/styles"

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
    selected_car: false,
    car_selected: "",
    mpg_data: [],
  }

  enableButton(fueldata) {
    console.log(fueldata)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Title/>
        <Selector callback={(button_enabled) => this.enableButton(button_enabled)}/>
      </ThemeProvider>
    )
  }
}

export default App