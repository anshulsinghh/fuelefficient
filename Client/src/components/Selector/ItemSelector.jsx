import React from 'react'

import { InputLabel, FormControl, NativeSelect } from '@material-ui/core'

class ItemSelector extends React.Component {
  state = {
    selectedItem: "" // Stores the item selected by the ItemSelector
  }

  async handleChange(event) {
    // Store the new selected item in the state
    await this.setState({ selectedItem: event.target.value })

    // Call the callback with the new selected item
    this.props.callback(this.state.selectedItem)
  }

  // Clears the selected item in the item selector
  clearSelectedItem() {
    this.setState({ selectedItem: "" })
  }

  render() {
    // Load the items variable with the provided props data
    let items;
    if (this.props.data != null) {
      items = Object.entries(this.props.data).reverse().map(data => <option key={data[0]} value={data[1]}>{data[1]}</option>)
    }

    return (
      // Create a form with the style given by props, and disabled according to the props
      <FormControl style={this.props.styleguide} disabled={this.props.disabled}>
        <InputLabel>{this.props.label}</InputLabel>

        {/* The core selector with the selectedItem and appropriate callback */}
        <NativeSelect
          value={this.state.selectedItem}
          onChange={(event) => this.handleChange(event)}>
          <option disabled={true} />
          {items}
        </NativeSelect>
      </FormControl>
    )
  }
}

export default ItemSelector