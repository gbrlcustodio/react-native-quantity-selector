import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

export default class QuantitySelector extends PureComponent {
  static defaultProps = {
    minQuantity: 0,
    baseColor: '#b2b2b2'
  }

  static propTypes = {
    minQuantity: PropTypes.number,
    maxQuantity: PropTypes.number,
    baseColor: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = { quantity: props.input.value || props.value || props.minQuantity }
    
    if (props.input.onChange) {
      props.input.onChange(this.state.quantity)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onChange) {
      this.props.onChange(nextState.quantity)
    }

    if (this.props.input && this.props.input.onChange) {
      this.props.input.onChange(nextState.quantity)
    }
  }

  _onIncreaseQuantity = () => {
    if (this.props.maxQuantity === undefined || this.state.quantity < this.props.maxQuantity) {
      this.setState({ quantity: this.state.quantity + 1 })
    }

    this.increaseTimer = setTimeout(this._onIncreaseQuantity, 200)
  }

  _onDecreaseQuantity = () => {
    if (this.props.minQuantity === undefined || this.state.quantity > this.props.minQuantity) {
      this.setState({ quantity: this.state.quantity - 1 })
    }

    this.decreaseTimer = setTimeout(this._onDecreaseQuantity, 200)
  }

  _onStopDecreaseQuantity = () => {
    clearInterval(this.decreaseTimer)
  }

  _onStopIncreaseQuantity = () => {
    clearInterval(this.increaseTimer)
  }

  render() {
    return (
      <View style={[ styles.container, this.props.style ]}>
        <Icon.Button
          size={ 30 }
          backgroundColor='transparent'
          color={ this.props.baseColor }
          underlayColor='transparent'
          style={ styles.actionButton }
          iconStyle={ styles.icon }
          onPressIn={ this._onDecreaseQuantity }
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
          onPressIn={ this._onIncreaseQuantity }
          onPressOut={ this._onStopIncreaseQuantity }
          name='add-circle-outline' />
      </View>
    )
  }
}
