import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import praiasData from './praias.json';

export default function HomeScreen({ navigation }) {
  const [municipioSelecionado, setMunicipioSelecionado] = useState('Todos');

  const municipios = ['Todos', ...new Set(praiasData.map(item => item.municipio))];

  const praiasFiltradas = municipioSelecionado === 'Todos'
    ? praiasData
    : praiasData.filter(item => item.municipio === municipioSelecionado);

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Própria':
        return { bg: '#E8F5E9', text: '#2E7D32', icon: '🟢' };
      case 'Atenção':
        return { bg: '#FFFDE7', text: '#F57F17', icon: '🟡' };
      case 'Imprópria':
        return { bg: '#FFEBEE', text: '#C62828', icon: '🔴' };
      default:
        return { bg: '#ECEFF1', text: '#37474F', icon: '⚪' };
    }
  };

  const renderCard = ({ item }) => {
    const badge = getBadgeStyle(item.status);

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Detalhes', { praia: item })}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.nomePraia}>{item.nome_praia}</Text>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>
              {badge.icon} {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.municipio}>📍 {item.municipio}</Text>
        <Text style={styles.dataMedicao}>📅 Medição: {item.data_medicao}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtroWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtroScroll}>
          {municipios.map((muni, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filtroBotao,
                municipioSelecionado === muni && styles.filtroBotaoAtivo
              ]}
              onPress={() => setMunicipioSelecionado(muni)}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  municipioSelecionado === muni && styles.filtroTextoAtivo
                ]}
              >
                {muni}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={praiasFiltradas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  filtroWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filtroScroll: {
    paddingHorizontal: 12,
  },
  filtroBotao: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    marginRight: 8,
  },
  filtroBotaoAtivo: {
    backgroundColor: '#0284C7',
  },
  filtroTexto: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 14,
  },
  filtroTextoAtivo: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nomePraia: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  municipio: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  dataMedicao: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
