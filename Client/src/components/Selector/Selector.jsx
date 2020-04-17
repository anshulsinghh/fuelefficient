import React from 'react'

import IndividualSelector from './IndividualSelector'

import { fetchYears, fetchMakes} from '../../api'


class Selector extends React.Component {
  state = {
    years: {},
    makes: {},
    models: {},
    variations: {},
    efficiency: {},

    selected_year: '',
    selected_make: '',
    selected_model: '',
    selected_variation: '',

    year_selector_disabled: true,
    make_selector_disabled: true,
    model_selector_disabled: true,
    variation_selector_disabled: true
  }

  constructor(props) {
    super(props)

    this.year_selector = React.createRef();
    this.make_selector = React.createRef();
  }

  async componentDidMount() {
    const fetchedYears = await fetchYears()
    this.setState({years: fetchedYears})
    this.setState({year_selector_disabled: false})
  }


  async yearSelected(newYear) {
    this.make_selector.current.clearSelectedItem()

    this.setState({make_selector_disabled: true})
    const fetchedMakes = await fetchMakes(newYear)
    console.log(fetchedMakes)
    this.setState({makes: fetchedMakes})
    this.setState({make_selector_disabled: false})
  }

  makeSelected(newMake) {
    console.log(newMake)
  }

  render() {
    return (
      <>
        <IndividualSelector ref={this.year_selector}
                            disabled={this.state.year_selector_disabled} 
                            data={this.state.years} 
                            styleguide={{minWidth: 80}} 
                            label={"Years"}
                            callback={(newYear) => this.yearSelected(newYear)}>
        </IndividualSelector>

        <IndividualSelector ref={this.make_selector}
                            disabled={this.state.make_selector_disabled} 
                            data={this.state.makes} 
                            styleguide={{minWidth: 200}} 
                            label={"Makes"}
                            callback={this.makeSelected}>
        </IndividualSelector>
      </>
    )
  }
}

export default Selector