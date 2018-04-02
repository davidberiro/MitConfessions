import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { List, ListItem } from 'react-native-elements';
// import { View } from '@shoutem/ui';
import firebase from '../firebase';

const NUM_OF_POSTS = 15;

class FlatListPosts extends Component {
  
  constructor(props) {
  super(props);

  this.onPress = this.onPress.bind(this);
  }
  
  onPress = (item) => {
    var showComments = !item.comments.summary.can_comment;
    var newData = this.state.data;
    var index = newData.findIndex((obj) => obj.id == item.id);
    newData[index].comments.summary.can_comment = showComments;
    this.setState({data: newData})
    // console.log('pressed the item');
    // console.log(item.message);
    // console.log(item.comments.summary.can_comment);
  }
  
  state = {
    data: [],
    numOfPosts: 0,
    loading: false,
    lastLoaded: "ZZZ"
  };
  
  renderComments = (item) => {
    return (
      <View style={styles.post}>
        <ReadMore
          numberOfLines={5}>
          <Text style={styles.postText}>
            {item.message}
          </Text>
        </ReadMore>
        <Text style={{fontSize: 10}}>
          {item.likes.summary.total_count} likes
        </Text>
      </View>
    )
  }
  
  renderPost = (item) => {
    
    if (item.comments.summary.can_comment && item.comments.data != null) {
      return (
        <View style={styles.post}>
          <ReadMore
            numberOfLines={5}>
            <Text style={styles.postText}>
              {item.message}
            </Text>
          </ReadMore>
        <View style={styles.lowerDiv}>
          <Text style={styles.likeText}>
            {item.likes.summary.total_count} likes
          </Text>
          <TouchableHighlight onPress={() => this.onPress(item)}>
            <Text>
              hide comments
            </Text>
          </TouchableHighlight>
          <Text style={styles.commentStyle}>
            {item.comments.summary.total_count} comments
          </Text>
        </View>
        <FlatList
          data={Object.values(item.comments.data)}
          renderItem={({item}) => this.renderComments(item)}
          keyExtractor={(item, index) => index}
          onEndReached={() => console.log("end comments reached")}
          onEndReachedThreshold={0}
          >
            
        </FlatList>
      </View>
      )
    }
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
          <TouchableHighlight onPress={() => this.onPress(item)}>
            <Text style={styles.postText}>
              load comments
            </Text>
          </TouchableHighlight>
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
          renderItem = {({item}) => this.renderPost(item)}
          keyExtractor={(item, index) => index}
          // ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.loadMorePosts}
          onEndReachedThreshold={0}
          extraData={this.state}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeText: {
    fontSize: 12,
    paddingLeft: 7,
  },
  commentStyle: {
    fontSize: 12,
    paddingRight: 7,
  }
});

export default FlatListPosts;