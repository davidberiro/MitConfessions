import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlatListPosts from './src/components/FlatListPosts';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Mit Confessions</Text>
        <FlatListPosts />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
});
