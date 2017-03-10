# react-native-quantity-selector
![Demo](http://i.imgur.com/0Zji5qB.png)

### Usage
```javascript
import React, { Component } from 'react';
import QuantitySelector from 'react-quantity-textinput';

export default class Form extends Component {
	render() {
		return <QuantitySelector onChange={(text) => this.setState({ quantity: text })} />
	}
}
```

### Optional
```javascript
import React, { Component } from 'react';
import QuantitySelector from 'react-quantity-textinput';

export default class Form extends Component {
	render() {
		return <QuantitySelector
			value={5}
			minQuantity={5}
			maxQuantity={100} />
	}
}
```
