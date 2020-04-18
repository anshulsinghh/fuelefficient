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

  render() {
    return (
      <>
        <Title/>
        <Selector/>
      </>
    )
  }
}

export default App