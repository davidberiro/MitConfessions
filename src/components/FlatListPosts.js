import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { List, ListItem } from 'react-native-elements';
// import { View } from '@shoutem/ui';
import firebase from '../firebase';

const NUM_OF_POSTS = 15;

class FlatListPosts extends Component {
  
  state = {
    data: [],
    numOfPosts: 0,
    loading: false,
    lastLoaded: "ZZZ"
  };
  
  renderItem = (item) => {
    return (
      <View style={styles.post}>
        {/* <View style={styles.post}> */}
          <ReadMore
            numberOfLines={5}
            onReady={this._handleTextReady}>
            <Text style={styles.postText}>
              {item.message}
            </Text>
          </ReadMore>
        {/* </View> */}
        <View style={styles.lowerDiv}>
          <Text style={styles.likeText}>
            {item.likes.summary.total_count} likes
          </Text>
          <Text style={styles.commentStyle}>
            {item.comments.summary.total_count} comments
          </Text>
        </View>
      </View>
    )
  }
  
  _handleTextReady = () => {
  // console.log('ready!');
}
  
  loadPosts = (numberOfPosts) => {
    var last = this.state.lastLoaded;
    this.setState({
      loading: true
    })
    var sortedPosts = firebase.database().ref('posts').orderByChild('id');
    sortedPosts.endAt(last).limitToLast(numberOfPosts).once('value', (snapshot) => {
      var postArray = Object.values(snapshot.val());
      if (this.state.numOfPosts != 0){
        postArray.pop();
      }
      postArray = postArray.reverse();
      this.setState({
        data: this.state.data.concat(postArray),
        numOfPosts: this.state.numOfPosts + numberOfPosts,
        loading: false,
        lastLoaded: postArray[postArray.length-1].id
      })
      console.log('logging state data');
      console.log(postArray[postArray.length-1].message);
    });
  }
  
  componentDidMount() {
    this.loadPosts(NUM_OF_POSTS);
    }

  loadMorePosts = () => {
    console.log('loading more posts');
    this.loadPosts(NUM_OF_POSTS);
  }
  
  renderSeparator = () => {
  return (
    <View style={styles.separator}/>
  );
};
  
  render() {
    return (
        <FlatList
          data = {this.state.data}
          renderItem = {({item}) => this.renderItem(item)}
          keyExtractor={(item, index) => index}
          // ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.loadMorePosts}
          onEndReachedThreshold={0}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  post: {
    // marginHorizontal: 10,
    padding: 10,
    borderRadius: 3,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  postText: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  lowerDiv: {
    marginTop: 3,
    padding: 3,
    borderRadius: 3,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  likeText: {
    fontSize: 12,
    // textAlign: 'left',
  },
  commentStyle: {
    fontSize: 12,
    // alignSelf: 'flex-end',
    // textAlign: 'right',
  }
});

export default FlatListPosts;