import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import firebase from '../firebase';

class FlatListPosts extends Component {
  
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  
  renderItem = () => {
    
  }
  
  componentDidMount() {
    
  }
  
  loadMorePosts = () => {
    this.setState({
      data: [] //set new data... TODO
    })
  }
  
  render() {
    return (
      <View>
        <FlatList
          data = {this.state.data}
          renderItem = {this.renderItem}
          keyExtractor={(item, index) => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.loadMorePosts()}
        />
      </View>
    )
  }
}