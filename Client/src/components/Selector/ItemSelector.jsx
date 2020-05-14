import React from 'react'

import {
  InputLabel,
  FormControl,
  NativeSelect
} from '@material-ui/core'

class ItemSelector extends React.Component {
  state = {
    selectedItem: ""
  }

  async handleChange(event) {
    console.log("Chagned")
    await this.setState({selectedItem: event.target.value})
    this.props.callback(this.state.selectedItem)
  }

  clearSelectedItem() {
    this.setState({selectedItem: ""})
  }

  render() {
    var items = <div>Loading...</div>
    if (this.props.data != null) {
      items = Object.entries(this.props.data).reverse().map(data => <option key = {data[0]} value={data[1]}>{data[1]}</option>)
    }

    return (
      <FormControl style={this.props.styleguide} disabled={this.props.disabled}>
        <InputLabel>{this.props.label}</InputLabel>
        <NativeSelect
          value={this.state.selectedItem}
          onChange={(event) => this.handleChange(event)}
        >
          <option disabled={true}/>
          {items}
        </NativeSelect>
      </FormControl>
    )
  }
}

export default ItemSelector