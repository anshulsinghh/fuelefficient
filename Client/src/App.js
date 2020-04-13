import React from 'react'

import { Title, Selector } from './components'
import { fetchYears} from './api'

class App extends React.Component {
  state = {
    years: {},
    makes: {},
    models: {},
    variations: {},
    efficiency: {}
  }

  async componentDidMount() {
    const fetchedYears = await fetchYears()
    this.setState({years: fetchedYears})
  }

  render() {
    const { years } = this.state;

    return (
      <div>
        <h1>Hello World</h1>
        <Title/>
        <Selector data={years}/>
      </div>
    )
  }
}

export default App