import React from 'react'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import IndividualSelector from './IndividualSelector'
// import Stepper from './Stepper'

import { fetchYears, fetchMakes, fetchModels, fetchVariations} from '../../api'


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
    variation_selector_disabled: true,

    current_step: 0,

    orientation: "horizontal"
  }

  constructor(props) {
    super(props)

    this.year_selector = React.createRef();
    this.make_selector = React.createRef();
    this.model_selector = React.createRef();
    this.variation_selector = React.createRef();
  }

  async componentDidMount() {
    const fetchedYears = await fetchYears()
    this.setState({years: fetchedYears})
    this.setState({year_selector_disabled: false})

    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  updateDimensions() {
    if(window.innerWidth < 1000) {
      this.setState({ orientation : "vertical"})
    } else {
      this.setState({ orientation : "horizontal"})
    }
  }

  setStep(newStep) {
    this.setState({current_step: newStep})
  }

  async yearSelected(newYear) {
    this.make_selector.current.clearSelectedItem()
    this.model_selector.current.clearSelectedItem()
    this.variation_selector.current.clearSelectedItem()

    this.setState({make_selector_disabled: true, model_selector_disabled:true, variation_selector_disabled:true})

    const fetchedMakes = await fetchMakes(newYear)
    this.setState({makes: fetchedMakes})

    this.setState({make_selector_disabled: false})

    this.setState({selected_year: newYear})

    this.setStep(1)
  }

  async makeSelected(newMake) {
    this.model_selector.current.clearSelectedItem()
    this.variation_selector.current.clearSelectedItem()

    this.setState({model_selector_disabled: true, variation_selector_disabled:true})

    const fetchedModels = await fetchModels(this.state.selected_year, newMake)
    this.setState({models: fetchedModels})

    this.setState({model_selector_disabled: false})

    this.setState({selected_make: newMake})

    this.setStep(2)
  }

  async modelSelected(newModel) {
    this.variation_selector.current.clearSelectedItem()

    this.setState({variation_selector_disabled:true})

    const fetchedVariations = await fetchVariations(this.state.selected_year, this.state.selected_make, newModel)
    this.setState({variations: fetchedVariations})

    this.setState({variation_selector_disabled: false})

    this.setState({selected_model: newModel})

    this.setStep(3)
  }

  variationSelected(newVariation) {
    this.setState({selected_variation: newVariation})

    this.setStep(4)
  }

  handleResize() {
    console.log("WOOO")
  }

  render() {
    // let width = window.innerWidth
    // let orientation = "horizontal"

    // if (width < 700) {
    //   orientation = "vertical"
    // }

    return (
      <>
          <div style={{width: '75%'}}>
            <Stepper activeStep={this.state.current_step} orientation={this.state.orientation}>

              <Step key={"Select the car's year"}>
                <StepLabel>{"Select the car's year"}</StepLabel>

                <IndividualSelector ref={this.year_selector}
                                    disabled={this.state.year_selector_disabled} 
                                    data={this.state.years} 
                                    styleguide={{minWidth: 170, "marginBottom": 10}} 
                                    label={"Years"}
                                    callback={(newYear) => this.yearSelected(newYear)}>
                 </IndividualSelector>
              </Step>

              <Step key={"Select the car's make"}>
                <StepLabel>{"Select the car's make"}</StepLabel>

                <IndividualSelector ref={this.make_selector}
                                    disabled={this.state.make_selector_disabled} 
                                    data={this.state.makes} 
                                    styleguide={{minWidth: 180, "marginBottom": 10}} 
                                    label={"Makes"}
                                    callback={(newMake) => this.makeSelected(newMake)}>
                </IndividualSelector>
              </Step>

              <Step key={"Select the car's model"}>
                <StepLabel>{"Select the car's model"}</StepLabel>
                
                <IndividualSelector ref={this.model_selector}
                                    disabled={this.state.model_selector_disabled} 
                                    data={this.state.models} 
                                    styleguide={{minWidth: 180, "marginBottom": 10}} 
                                    label={"Models"}
                                    callback={(newModel) => this.modelSelected(newModel)}>
                </IndividualSelector>
              </Step>

              <Step key={"Select the model variation"}>
                <StepLabel>{"Select the model variation"}</StepLabel>
                
                
                <IndividualSelector ref={this.variation_selector}
                              disabled={this.state.variation_selector_disabled} 
                              data={this.state.variations} 
                              styleguide={{minWidth: 200, "marginBottom": 10}} 
                              label={"Variations"}
                              callback={(newVariation) => this.variationSelected(newVariation)}>
                </IndividualSelector>
              </Step>
            </Stepper>
            
          </div>
      </>
    )
  }
}

export default Selector