import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Permissions, Location } from "expo";
import { Provider } from "react-redux";

import store from "./redux/store";
import Map from "./components/Map";

export default class App extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        errorMessage: null,
        location: null
      });
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  async getLocation() {
    // const status_ = await Permissions.askAsync(Permissions.LOCATION);
    // alert(status_.status)
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      alert("Permission not granted! Boo");
      this.setState({
        errorMessage: "Permission access to location is denine"
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    //alert(location.coords.latitude)
    this.setState({
      location: location
    });
  }

  render() {
    let text = "Waiting for location and permission...";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = `Latitude: ${this.state.location.coords.latitude}, Longitude : ${
        this.state.location.coords.longitude
      }`;
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {this.state.location !== null && (
            <Map
              latitude={this.state.location.coords.latitude}
              longitude={this.state.location.coords.longitude}
            />
          )}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
