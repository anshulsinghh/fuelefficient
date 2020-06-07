import React from 'react'

import { Stepper, Step, StepLabel, Button, Card } from '@material-ui/core'

import ItemSelector from './ItemSelector'
import './SelectorStyles.css'

// Import the API routes from the api folder
import { fetchYears, fetchMakes, fetchModels, fetchVariations, fetchFuelData } from '../../api'

// Declare constatns for each of the selectors
const YEAR_ID = 1, MAKE_ID = 2, MODEL_ID = 3, VARIATION_ID = 4

class Selector extends React.Component {
  state = {
    // Stores the enable/disabled statuses for all the selectors
    year_selector_disabled: true,
    make_selector_disabled: true,
    model_selector_disabled: true,
    variation_selector_disabled: true,
    go_button_disabled: true,

    // Stores the orientation status for the selectors, and if the width is enabled
    orientation: "horizontal",
    enable_width: true
  }

  constructor(props) {
    super(props)

    // Create references for each of the selectors
    this.year_selector = React.createRef()
    this.make_selector = React.createRef()
    this.model_selector = React.createRef()
    this.variation_selector = React.createRef()
  }

  async componentDidMount() {
    // Fetch the available car years, and disable the year selector afterwards
    const fetchedYears = await fetchYears()
    this.setState({ years: fetchedYears })
    this.setState({ year_selector_disabled: false })

    // Update the dimensions of the selector
    this.updateDimensions()

    // Add the resizing listener, which makes the selector responsive
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  /**
   * Sets the orientation of the selector depending on the size of the window
   */
  updateDimensions() {
    // Set the orientation to vertical if the window's width is smaller than 1000px
    if (window.innerWidth < 1000) {
      this.setState({ orientation: "vertical", enable_width: false })
    } else { // Set to horizontal otherwise
      this.setState({ orientation: "horizontal", enable_width: true })
    }
  }

  /**
   * This method is called whenever a selector makes a new selection. It is
   * passed the selector's id (which is the type of selector), and the new selection.
   * It then sets the appropriate new states, and enables the next selector.
   * It also disables the next appropriate selectors depending on state.
   * 
   * @param id: the type of selector that changed its selection
   * @param selection: the new selection that was chosen
   */
  async newSelection(id, selection) {
    // Executes the selectionChagned callback method, since we changed the selection.
    this.props.selectionChanged()

    // Set the current step to the new selection ID
    this.setState({ current_step: id })

    // Clear the current selector's item, and disable the next selector in line
    if (id <= YEAR_ID) { this.make_selector.current.clearSelectedItem(); this.setState({ make_selector_disabled: true }) }
    if (id <= MAKE_ID) { this.model_selector.current.clearSelectedItem(); this.setState({ model_selector_disabled: true }) }
    if (id <= MODEL_ID) { this.variation_selector.current.clearSelectedItem(); this.setState({ variation_selector_disabled: true }) }
    if (id <= VARIATION_ID) { this.setState({ go_button_disabled: true }) }

    switch (id) {
      // Executes if the selector was the Year selector
      case YEAR_ID:
        // Fetch the makes available from the API and set the state for the makes
        const fetchedMakes = await fetchMakes(selection)
        this.setState({ makes: fetchedMakes })

        // Set the selected year to the new selection
        this.setState({ selected_year: selection })

        // Enable the make selector
        this.setState({ make_selector_disabled: false })
        break

      // Executes if the selector was the Make selector
      case MAKE_ID:
        // Fetch the models available from the API and set the state for the models
        const fetchedModels = await fetchModels(this.state.selected_year, selection)
        this.setState({ models: fetchedModels })

        // Set the selected make to the new selection
        this.setState({ selected_make: selection })

        // Enable the model selector
        this.setState({ model_selector_disabled: false })
        break

      // Executes if the selector was the Model selector
      case MODEL_ID:
        // Fetch the variations available from the API and set the state for the variations
        const fetchedVariations = await fetchVariations(this.state.selected_year, this.state.selected_make, selection)
        this.setState({ variations: fetchedVariations })

        // Set the selected model to the new model
        this.setState({ selected_model: selection })

        // Enable the variation selector
        this.setState({ variation_selector_disabled: false })
        break

      // Exeuctes if the sector was the Variation selector
      case VARIATION_ID:
        // Set the selected variation, and enable the go button
        this.setState({ selected_variation: selection })
        this.setState({ go_button_disabled: false })
        break

      default:
    }
  }

  /**
   * This method executes when the Go! button is clicked in the selector. This means
   * that the user has finalized a selection of a year/make/model/variation of a car,
   * and wants to see the MPG data for that car.
   */
  async buttonClicked() {
    // Fetch the fuel data for the car that the user selected
    const fetchedFuelData = await fetchFuelData(this.state.selected_year, this.state.selected_make, this.state.selected_model, this.state.selected_variation)

    // Call the buttonPushed callback with the car's fuel data
    this.props.buttonPushed(fetchedFuelData)
  }

  /**
   * Enables or disables the selectors depending on the provided setting
   * 
   * @param setting: the desired state for the selectors (either true or false) 
   */
  disableSelectors(setting) {
    this.setState({
      year_selector_disabled: setting,
      make_selector_disabled: setting,
      model_selector_disabled: setting,
      variation_selector_disabled: setting,
      go_button_disabled: setting
    })
  }

  render() {
    // Changes the card style depending on if the width setting is enabled
    let style;
    if (this.state.enable_width) {
      style = { width: 1200, marginLeft: 15, marginRight: 15 }
    } else {
      style = { marginLeft: 15, marginRight: 15 }
    }

    return (
      <div className="SelectorContainer">
        <Card style={style}>
          {/* The overall car selector stepper */}
          <Stepper activeStep={this.state.current_step} orientation={this.state.orientation}>
            {/* The year selector and step */}
            <Step key={"Select the car's year"}>
              <StepLabel>{"Select the car's year"}</StepLabel>

              <ItemSelector ref={this.year_selector}
                disabled={this.state.year_selector_disabled}
                data={this.state.years}
                styleguide={{ minWidth: 170, marginBottom: 10 }}
                label={"Years"}
                callback={(newYear) => this.newSelection(YEAR_ID, newYear)} />
            </Step>

            {/* The make selector and step */}
            <Step key={"Select the car's make"}>
              <StepLabel>{"Select the car's make"}</StepLabel>

              <ItemSelector label={"Makes"}
                ref={this.make_selector}
                disabled={this.state.make_selector_disabled}
                data={this.state.makes}
                styleguide={{ minWidth: 180, marginBottom: 10 }}
                callback={(newMake) => this.newSelection(MAKE_ID, newMake)} />
            </Step>

            {/* The model selector and step */}
            <Step key={"Select the car's model"}>
              <StepLabel>{"Select the car's model"}</StepLabel>

              <ItemSelector label={"Models"}
                ref={this.model_selector}
                disabled={this.state.model_selector_disabled}
                data={this.state.models}
                styleguide={{ minWidth: 180, marginBottom: 10 }}
                callback={(newModel) => this.newSelection(MODEL_ID, newModel)} />
            </Step>

            {/* The variation selector and step */}
            <Step key={"Select the model variation"}>
              <StepLabel>{"Select the model variation"}</StepLabel>

              <ItemSelector label={"Variations"} ref={this.variation_selector}
                disabled={this.state.variation_selector_disabled}
                data={this.state.variations}
                styleguide={{ minWidth: 200, marginBottom: 10 }}
                callback={(newVariation) => this.newSelection(VARIATION_ID, newVariation)} />
            </Step>

            {/* The Go! button */}
            <>
              <Button onClick={() => this.buttonClicked()}
                style={{ maxWidth: 200, marginLeft: 5, textTransform: "none" }}
                variant="contained"
                color="primary"
                size="large"
                disabled={this.state.go_button_disabled}>
                Go!
              </Button>
            </>
          </Stepper>
        </Card>
      </div>
    )
  }
}

export default Selector