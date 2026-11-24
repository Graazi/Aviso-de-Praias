import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';

export default function GuideScreen() {
  const abrirBoletimOficial = async () => {
    const url = 'http://www.cprh.pe.gov.br';
    const suportado = await Linking.canOpenURL(url);

    if (suportado) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erro', 'Não foi possível abrir o link do boletim da CPRH-PE.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.headerIcon}>🌊</Text>
        <Text style={styles.headerTitle}>Guia de Balneabilidade</Text>
        <Text style={styles.headerSubtitle}>
          Entenda como funciona o monitoramento ambiental das praias do litoral de Pernambuco.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Classificação de Balneabilidade</Text>

        <View style={styles.statusItem}>
          <Text style={styles.statusBadge}>🟢 Própria</Text>
          <Text style={styles.statusDesc}>
            A água apresenta condições ótimas ou satisfatórias para banho e contato primário. A contaminação bacteriológica está dentro dos limites de segurança.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statusItem}>
          <Text style={styles.statusBadgeWarning}>🟡 Atenção</Text>
          <Text style={styles.statusDesc}>
            Área sob observação. Recomenda-se evitar o banho nas 24 horas seguintes a chuvas intensas ou próximo a desembocaduras de rios e galerias pluviais.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statusItem}>
          <Text style={styles.statusBadgeDanger}>🔴 Imprópria</Text>
          <Text style={styles.statusDesc}>
            Trecho não recomendado para banho. Apresenta elevado risco de contaminação por efluentes ou esgotos não tratados.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚠️ Riscos de Banhar-se em Praias Impróprias</Text>
        <Text style={styles.paragraph}>
          A exposição a águas poluídas pode causar diversas infecções e problemas de saúde:
        </Text>
        <Text style={styles.bulletItem}>• Gastroenterites: Náuseas, vômitos e diarreias decorrentes de bactérias intestinais.</Text>
        <Text style={styles.bulletItem}>• Infecções de Pele e Micoses: Dermatites, erupções e contaminações fúngicas.</Text>
        <Text style={styles.bulletItem}>• Doenças Oculares e Otites: Conjuntivite e infecções de ouvido.</Text>
        <Text style={styles.bulletItem}>• Hepatite A e Leptospirose: Especialmente em áreas alagadas ou próximas a saídas de esgoto após fortes chuvas.</Text>
      </View>

      <View style={[styles.card, styles.cprhCard]}>
        <Text style={styles.cprhTitle}>🏛️ Fonte Oficial dos Dados</Text>
        <Text style={styles.cprhText}>
          Os boletins de balneabilidade são analisados e divulgados semanalmente pela Agência Estadual de Meio Ambiente de Pernambuco (CPRH-PE).
        </Text>

        <TouchableOpacity style={styles.cprhButton} onPress={abrirBoletimOficial} activeOpacity={0.8}>
          <Text style={styles.cprhButtonText}>🔗 Acesse o Boletim Oficial CPRH-PE</Text>
        </TouchableOpacity>
      </View>
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
  headerCard: {
    backgroundColor: '#0284C7',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0F2FE',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  statusItem: {
    marginVertical: 4,
  },
  statusBadge: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statusBadgeWarning: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F57F17',
    marginBottom: 4,
  },
  statusBadgeDanger: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 4,
  },
  statusDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 10,
  },
  bulletItem: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 6,
  },
  cprhCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
  },
  cprhTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 6,
  },
  cprhText: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 18,
    marginBottom: 14,
  },
  cprhButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cprhButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
