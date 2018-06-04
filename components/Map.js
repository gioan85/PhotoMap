import React, { Component } from "react";
import { View, Image, Text , StyleSheet} from "react-native";
import { ImagePicker, Permissions, MapView } from "expo";
import Lightbox from "react-native-lightbox";
import { connect } from 'react-redux';

import { addLocation } from '../redux/action';

const styles = StyleSheet.create({
  MapImageFullSize:{
    width:300,
    height:300,
  }
});


class Map extends Component {
  constructor() {
    super();
    this.state = {
      //locations: [],
      imageSize:{
        width:100,
        height:100
      }
    };
    this.addLocation = this.addLocation.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  async addLocation(location) {
    const image = await this.getImage();
    location.image = image;
    this.props.addLocation(location);
    // this.setState({
    //   locations: this.state.locations.concat(location)
    // });
    //alert(JSON.stringify(location));
  }

  async getImage() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Permission not granted! Boo");
      return null;
    }

    const image = await ImagePicker.launchImageLibraryAsync();
    //alert(JSON.stringify(image));
    return image;
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onLongPress={event => this.addLocation(event.nativeEvent.coordinate)}
      >
        {this.props.locations.map((location, index) => (
          <MapView.Marker key={index} coordinate={location}>
            <MapView.Callout>
              <View>
                <Lightbox
                  onOpen={() =>{this.setState({
                    imageSize: {width:300, height:300}
                  })}}
                  onClose={() =>{this.setState({
                    imageSize:{width:100, height:100}
                  })}}
                  
                >
                  <Image
                    source={{ uri: location.image.uri }}
                    style = {this.state.imageSize}
                  />
                </Lightbox>
                <Text>Marker {index}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}

const mapStateToProps = (state) =>({
  locations: state.locations
})

const mapDispatchToProps = (dispatch) => ({
  addLocation : (location) => dispatch(addLocation(location)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);