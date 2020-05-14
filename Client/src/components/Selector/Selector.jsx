import React from 'react'

import { Stepper, Step, StepLabel, Button } from '@material-ui/core'

import ItemSelector from './ItemSelector'

import { fetchYears, fetchMakes, fetchModels, fetchVariations, fetchFuelData } from '../../api'

const YEAR_ID = 1, MAKE_ID = 2, MODEL_ID = 3, VARIATION_ID = 4

class Selector extends React.Component {
  state = {
    years: {},
    makes: {},
    models: {},
    variations: {},

    selected_year: '',
    selected_make: '',
    selected_model: '',
    selected_variation: '',

    year_selector_disabled: true,
    make_selector_disabled: true,
    model_selector_disabled: true,
    variation_selector_disabled: true,
    go_button_disabled: true,

    current_step: 0,

    orientation: "horizontal",
  }
  
  constructor(props) {
    super(props)

    this.year_selector = React.createRef()
    this.make_selector = React.createRef()
    this.model_selector = React.createRef()
    this.variation_selector = React.createRef()
  }

  async componentDidMount() {
    const fetchedYears = await fetchYears()
    this.setState({years: fetchedYears})
    this.setState({year_selector_disabled: false})

    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  updateDimensions() {
    if(window.innerWidth < 900) {
      this.setState({ orientation : "vertical"})
    } else {
      this.setState({ orientation : "horizontal"})
    }
  }

  async newSelection(id, selection) {
    this.setState({current_step: id})

    if (id <= YEAR_ID) { this.make_selector.current.clearSelectedItem(); this.setState({make_selector_disabled: true}) }
    if (id <= MAKE_ID) { this.model_selector.current.clearSelectedItem(); this.setState({model_selector_disabled: true}) }
    if (id <= MODEL_ID) { this.variation_selector.current.clearSelectedItem(); this.setState({variation_selector_disabled: true}) }
    if (id <= VARIATION_ID) { this.setState({go_button_disabled: true}) }

    switch(id) {
      case YEAR_ID:
        const fetchedMakes = await fetchMakes(selection)
        this.setState({makes: fetchedMakes})
        this.setState({selected_year: selection})
        this.setState({make_selector_disabled: false})
        break

      case MAKE_ID:
        const fetchedModels = await fetchModels(this.state.selected_year, selection)
        this.setState({models: fetchedModels})
        this.setState({selected_make: selection})
        this.setState({model_selector_disabled: false})   
        break

      case MODEL_ID:
        const fetchedVariations = await fetchVariations(this.state.selected_year, this.state.selected_make, selection)
        this.setState({variations: fetchedVariations})
        this.setState({selected_model: selection})
        this.setState({variation_selector_disabled: false})   
        break

      case VARIATION_ID:
        this.setState({selected_variation: selection})
        this.setState({go_button_disabled: false})
        break
        
      default:
    }

    this.props.callback(id === VARIATION_ID)
  }

  async buttonClicked() {
    this.disableSelectors(true)
    
    const fetchedFuelData = await fetchFuelData(this.state.selected_year, this.state.selected_make, this.state.selected_model, this.state.selected_variation)

    this.props.callback(fetchedFuelData)
  }

  disableSelectors(setting) {
    this.setState({year_selector_disabled: setting, 
                   make_selector_disabled: setting, 
                   model_selector_disabled: setting, 
                   variation_selector_disabled: setting, 
                   go_button_disabled: setting})
  }

  render() {
    return (
      <Stepper activeStep={this.state.current_step} orientation={this.state.orientation}>

        <Step key={"Select the car's year"}>
          <StepLabel>{"Select the car's year"}</StepLabel>

          <ItemSelector ref={this.year_selector}
                              disabled={this.state.year_selector_disabled} 
                              data={this.state.years} 
                              styleguide={{minWidth: 170, marginBottom: 10}} 
                              label={"Years"}
                              callback={(newYear) => this.newSelection(YEAR_ID, newYear)}>
          </ItemSelector>
        </Step>

        <Step key={"Select the car's make"}>
          <StepLabel>{"Select the car's make"}</StepLabel>

          <ItemSelector label={"Makes"}
                        ref={this.make_selector}
                        disabled={this.state.make_selector_disabled} 
                        data={this.state.makes} 
                        styleguide={{minWidth: 180, marginBottom: 10}} 
                        callback={(newMake) => this.newSelection(MAKE_ID ,newMake)}>
          </ItemSelector>
        </Step>

        <Step key={"Select the car's model"}>
          <StepLabel>{"Select the car's model"}</StepLabel>
          
          <ItemSelector label={"Models"}
                        ref={this.model_selector}
                        disabled={this.state.model_selector_disabled} 
                        data={this.state.models} 
                        styleguide={{minWidth: 180, marginBottom: 10}} 
                        callback={(newModel) => this.newSelection(MODEL_ID, newModel)}>
          </ItemSelector>
        </Step>
        
        <Step key={"Select the model variation"}>
          <StepLabel>{"Select the model variation"}</StepLabel>
          
          <ItemSelector label={"Variations"} ref={this.variation_selector}
                        disabled={this.state.variation_selector_disabled} 
                        data={this.state.variations} 
                        styleguide={{minWidth: 200, marginBottom: 10}} 
                        callback={(newVariation) => this.newSelection(VARIATION_ID, newVariation)}>
          </ItemSelector>
        </Step>

        <>
          <Button onClick={ () => this.buttonClicked() } 
                  style={{maxWidth: 200, marginLeft: 5, textTransform: "none"}} 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  disabled={this.state.go_button_disabled}>
            Go!
          </Button>
        </>

      </Stepper>
    )
  }
}

export default Selector