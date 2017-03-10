import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

class QuantitySelector extends Component {
  constructor(props) {
    super(props)

    this.state = { quantity: 1 }
  }

  componentWillMount() {
    if (this.props.input.value || this.props.value) {
      this.setState({
        quantity: this.props.input.value || this.props.value
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onChange !== undefined) {
      this.props.onChange(nextState.quantity)
    }

    if (this.props.input.onChange !== undefined) {
      this.props.input.onChange(nextState.quantity)
    }
  }

  _onIncreaseQuantity = () => {
    if (this.props.maxQuantity !== undefined && this.state.quantity >= this.props.maxQuantity) {
      return
    }

    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  _onDecreaseQuantity = () => {
    if (this.props.minQuantity !== undefined && this.state.quantity <= this.props.minQuantity) {
      return
    }

    this.setState({
      quantity: this.state.quantity - 1
    })
  }

  _onStartDecreaseQuantity = () => {
    this.decreaseLoop = setInterval(this._onDecreaseQuantity, 100)
  }

  _onStopDecreaseQuantity = () => {
    clearInterval(this.decreaseLoop)
  }

  _onStartIncreaseQuantity = () => {
    this.increaseLoop = setInterval(this._onIncreaseQuantity, 100)
  }

  _onStopIncreaseQuantity = () => {
    clearInterval(this.increaseLoop)
  }

  render() {
    return (
      <View style={ styles.container }>
        <Icon.Button
          size={ 30 }
          backgroundColor='transparent'
          color={ this.props.baseColor }
          underlayColor='transparent'
          style={ styles.actionButton }
          iconStyle={ styles.icon }
          onPressIn={ this._onStartDecreaseQuantity }
          onPressOut={ this._onStopDecreaseQuantity }
          name='remove-circle-outline' />
        <TextInput
          underlineColorAndroid={ this.props.baseColor }
          keyboardType='numeric'
          onChangeText={ this._onUpdateQuantity }
          style={[ styles.quantityInput, { color: this.props.baseColor }]}
          editable={ false }
          value={ this.state.quantity.toString() } />
        <Icon.Button
          size={ 30 }
          color={ this.props.baseColor }
          backgroundColor='transparent'
          underlayColor='transparent'
          style={ styles.actionButton }
          iconStyle={ styles.icon }
          onPressIn={ this._onStartIncreaseQuantity }
          onPressOut={ this._onStopIncreaseQuantity }
          name='add-circle-outline' />
      </View>
    )
  }
}

QuantitySelector.defaultProps = {
  minQuantity: 0,
  baseColor: '#b2b2b2'
}

QuantitySelector.propTypes = {
  minQuantity: React.PropTypes.number,
  maxQuantity: React.PropTypes.number,
  baseColor: React.PropTypes.string
}

export default QuantitySelector
