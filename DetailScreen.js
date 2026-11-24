import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { praia } = route.params || {};

  if (!praia) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Nenhuma praia selecionada.</Text>
      </View>
    );
  }

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Própria':
        return {
          bg: '#E8F5E9',
          text: '#2E7D32',
          icon: '🟢',
          desc: 'Água adequada para banho e recreação de contato direto.',
        };
      case 'Atenção':
        return {
          bg: '#FFFDE7',
          text: '#F57F17',
          icon: '🟡',
          desc: 'Recomenda-se cautela. Evitar banho após chuvas intensas ou próximo a saídas de galerias.',
        };
      case 'Imprópria':
        return {
          bg: '#FFEBEE',
          text: '#C62828',
          icon: '🔴',
          desc: 'Trecho impróprio para banho. Risco à saúde devido à contaminação bacteriológica.',
        };
      default:
        return {
          bg: '#ECEFF1',
          text: '#37474F',
          icon: '⚪',
          desc: 'Sem dados suficientes.',
        };
    }
  };

  const badge = getBadgeStyle(praia.status);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.nomePraia}>{praia.nome_praia}</Text>
        <Text style={styles.municipio}>📍 {praia.municipio} - PE</Text>

        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.badgeText, { color: badge.text }]}>
            {badge.icon} {praia.status}
          </Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Diagnóstico do Boletim</Text>
        <Text style={styles.sectionDescription}>{badge.desc}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📅 Data da Última Análise:</Text>
          <Text style={styles.infoValue}>{praia.data_medicao}</Text>
        </View>
      </View>

      {praia.motivo_interdicao && praia.motivo_interdicao !== 'Nenhum' && (
        <View style={[styles.sectionCard, styles.warningCard]}>
          <Text style={styles.warningTitle}>⚠️ Motivo do Alerta / Interdição</Text>
          <Text style={styles.warningText}>{praia.motivo_interdicao}</Text>
        </View>
      )}

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Coordenadas do Ponto de Coleta</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🌐 Latitude:</Text>
          <Text style={styles.infoValue}>{praia.latitude}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🌐 Longitude:</Text>
          <Text style={styles.infoValue}>{praia.longitude}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.mapButton}
        onPress={() => navigation.navigate('Mapa', { praiaSelecionada: praia })}
        activeOpacity={0.8}
      >
        <Text style={styles.mapButtonText}>🗺️ Ver esta praia no Mapa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  nomePraia: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  municipio: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  warningCard: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 6,
  },
  warningText: {
    fontSize: 14,
    color: '#B91C1C',
    lineHeight: 20,
  },
  mapButton: {
    backgroundColor: '#0284C7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
