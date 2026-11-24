import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import praiasData from './praias.json';

export default function MapScreen({ route, navigation }) {
  const mapRef = useRef(null);
  const { praiaSelecionada } = route.params || {};

  const REGIAO_INICIAL_PE = {
    latitude: -8.3000,
    longitude: -34.9500,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8,
  };

  useEffect(() => {
    if (praiaSelecionada && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: praiaSelecionada.latitude,
        longitude: praiaSelecionada.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  }, [praiaSelecionada]);

  const getPinColor = (status) => {
    switch (status) {
      case 'Própria':
        return '#2E7D32';
      case 'Atenção':
        return '#F57F17';
      case 'Imprópria':
        return '#C62828';
      default:
        return '#78909C';
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={REGIAO_INICIAL_PE}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {praiasData.map((praia, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: praia.latitude,
              longitude: praia.longitude,
            }}
            pinColor={getPinColor(praia.status)}
          >
            <Callout 
              onPress={() => navigation.navigate('Detalhes', { praia })}
              style={styles.callout}
            >
              <View>
                <Text style={styles.calloutTitle}>{praia.nome_praia}</Text>
                <Text style={styles.calloutMunicipio}>📍 {praia.municipio}</Text>
                <Text style={[styles.calloutStatus, { color: getPinColor(praia.status) }]}>
                  Status: {praia.status}
                </Text>
                <Text style={styles.calloutAction}>Toque para ver detalhes ➔</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.legendaContainer}>
        <View style={styles.legendaItem}>
          <View style={[styles.dot, { backgroundColor: '#2E7D32' }]} />
          <Text style={styles.legendaTexto}>Própria</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.dot, { backgroundColor: '#F57F17' }]} />
          <Text style={styles.legendaTexto}>Atenção</Text>
        </View>
        <View style={styles.legendaItem}>
          <View style={[styles.dot, { backgroundColor: '#C62828' }]} />
          <Text style={styles.legendaTexto}>Imprópria</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  callout: {
    width: 200,
    padding: 4,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
  },
  calloutMunicipio: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  calloutStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutAction: {
    fontSize: 11,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
  },
  legendaContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendaTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
});
