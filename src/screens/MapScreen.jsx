import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

export const MapScreen = () => {
  const {
    params: { latitude, longitude, title },
  } = useRoute();

  return (
    <MapView
      style={styles.mapStyle}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.006,
      }}
      mapType="standard"
    >
      <Marker title={title} coordinate={{ latitude, longitude }} description="Hello" />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {},
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
