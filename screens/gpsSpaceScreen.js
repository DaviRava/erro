import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";

import axios from "axios";
import MapView, { Marker } from "react-native-maps";

export default class GpsSpaceScreen extends Component {
  constructor() {
    super();
    this.state = {
      location: {},
    };
  }
  getLocation = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((Response) => {
        this.setState({ location: Response.data });
      });
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    if (Object.keys(this.state.location).length === 0) {
      return <Text>carregando...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            source={require("../assets/bg.png")}
            style={styles.backgroundImage}
          >
            <View style={styles.titleBar}>
              <Text style={styles.titleText}>SPACE PARK</Text>
            </View>

            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}
                >
                  <Image
                    source={require("../assets/iss_icon.png")}
                    style={{ height: 50, width: 50 }}
                  />
                </Marker>
              </MapView>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Latitude: {this.state.location.latitude}
              </Text>
              <Text style={styles.infoText}>
                Longitude: {this.state.location.longitude}
              </Text>
              <Text style={styles.infoText}>
                Altitude (KM): {this.state.location.altitude}
              </Text>
              <Text style={styles.infoText}>
                Velocidade (KM/H): {this.state.location.velocity}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: "white",
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  routeText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    marginTop: 75,
    paddingLeft: 30,
  },
  knowMore: {
    paddingLeft: 30,
    color: "red",
    fontSize: 15,
  },
  bgDigit: {
    position: "absolute",
    color: "rgba(183, 183, 183, 0.5)",
    fontSize: 150,
    right: 20,
    bottom: -15,
    zIndex: -1,
  },
  iconImage: {
    position: "absolute",
    height: 200,
    width: 200,
    resizeMode: "contain",
    right: 20,
    top: -80,
  },
  mapContainer: {
    flex: 0.7,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 0.2,
    backgroundColor: "white",
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  infoText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});
