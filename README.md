# React Native Cards List Reforged

> This is a fork of [react-native-card-list](https://github.com/dmbfm/react-native-card-list) by [Daniel Fortes](http://danielfortes.com).

A React Native component that displays a list of image cards with titles. When the user
presses a card, the card expands to full screen, displaying additional content.

# Example

```javascript
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { CardList } from 'react-native-card-list-reforged';

const cards = [
  {
    id: "0",
    title: "Starry Night",
    picture: require('./assets/starry.jpg'),
    content: <Text>Starry Night</Text>
  },
  {
    id: "1",
    title: "Wheat Field",
    picture: require('./assets/wheat.jpg'),
    content: <Text>Wheat Field with Cypresses</Text>
  },
  {
    id: "2",
    title: "Bedroom in Arles",
    picture: require('./assets/bed.jpg'),
    content: <Text>Bedroom in Arles</Text>
  }
]

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <CardList cards={cards} textStyle={[styles.textStyle, styles.textWithShadow]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontSize: 32,
  },
	textWithShadow:{
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: {width: -1, height: 1},
		textShadowRadius: 10
	}
```
