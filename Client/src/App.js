import React from 'react'

import { Title, Selector } from './components'

class App extends React.Component {
  state = {
    selected_car: false,
    car_selected: "",
    mpg_data: [],
  }

  async componentDidMount() {

  }

  enableButton(button_enabled) {
    console.log(button_enabled)
  }

  render() {
    return (
      <>
        <Title/>
        <Selector callback={(button_enabled) => this.enableButton(button_enabled)}/>
      </>
    )
  }
}

export default App