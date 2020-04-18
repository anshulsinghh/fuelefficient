import React from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class IndividualSelector extends React.Component {
  state = {
    selectedItem: ""
  }

  constructor(props) {
    super(props)

  }


  async handleChange(event) {
    await this.setState({selectedItem: event.target.value})
    this.props.callback(this.state.selectedItem)
  }

  clearSelectedItem() {
    this.setState({selectedItem: ""})
  }

  render() {
    var items = <div></div>
    if (!this.props.disabled && this.props.data != null) {
      items = Object.entries(this.props.data).reverse().map(data => <MenuItem key = {data[0]} value={data[1]}>{data[1]}</MenuItem>)
    }

    return (
      <FormControl style={this.props.styleguide} disabled={this.props.disabled}>
        <InputLabel>{this.props.label}</InputLabel>
        <Select
          value={this.state.selectedItem}
          onChange={(event) => this.handleChange(event)}
        >
          {items}
        </Select>
      </FormControl>
    )
  }
}

export default IndividualSelector