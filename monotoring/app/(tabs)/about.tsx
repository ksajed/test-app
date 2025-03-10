import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>À propos de l'application</Text>
      
      <Text style={styles.text}>
        <Text style={styles.bold}>Nom de l'application :</Text> Monitoring Fœtal
      </Text>
      
      <Text style={styles.text}>
        Monitoring Fœtal est une application innovante conçue pour soutenir les professionnels de santé, notamment les sages-femmes, dans la surveillance et l'interprétation des tracés de monitoring fœtal durant la grossesse. L'application offre une interface simple et intuitive, permettant de suivre les données en temps réel et de fournir des retours clairs et appropriés à l'équipe médicale. L'application permet d'intégrer des **images de tracés de monitoring fœtal**, et de les analyser en profondeur.
      </Text>
      
      <Text style={styles.subtitle}>Fonctionnalités clés :</Text>
      <Text style={styles.text}>
        • <Text style={styles.bold}>Sélection d'image :</Text> L'utilisateur peut importer une **photo de monitoring fœtal** depuis la galerie ou prendre une photo à l'aide de la caméra pour l'intégrer dans l'application. Ces images sont directement utilisées pour l'analyse des données et des tracés.{"\n"}
        • <Text style={styles.bold}>Gestion des commentaires :</Text> Des scripts préconfigurés permettent une rédaction rapide de commentaires cliniques concernant l'état de la patiente et du fœtus. L'utilisateur peut également personnaliser ces commentaires.{"\n"}
        • <Text style={styles.bold}>Partage des résultats :</Text> L'application permet de partager les images de **tracés de monitoring fœtal** ainsi que les commentaires via les options de partage disponibles sur le dispositif.{"\n"}
        • <Text style={styles.bold}>Réinitialisation des données :</Text> Un bouton de réinitialisation permet de restaurer les paramètres par défaut, ce qui est utile lorsque l'utilisateur souhaite recommencer l'annotation ou l'enregistrement des données.
      </Text>
      
      <Text style={styles.subtitle}>Objectif :</Text>
      <Text style={styles.text}>
        L'objectif de cette application est de faciliter la gestion des tracés de **monitoring fœtal**, en fournissant un moyen efficace de documenter, analyser et partager les observations faites lors des examens fœtaux. Elle favorise une communication fluide entre les sages-femmes et les médecins, assurant une prise en charge optimale des patientes.
      </Text>

      <Text style={styles.subtitle}>Protocoles d'Urgences Obstétricales :</Text>
      <Text style={styles.text}>
        Dans un souci de sécurité et de rigueur, l'application inclut une section dédiée aux **protocoles d'urgences obstétricales**. Cette fonctionnalité permet aux utilisateurs de suivre les bonnes pratiques en cas de situations critiques pendant la grossesse, telles que les tachycardies fœtales, les bradycardies, les anomalies de la variabilité du RCF et d'autres urgences fœtales ou obstétricales.
      </Text>

      <Text style={styles.subtitle}>À propos de Khalid Sajed</Text>
      <Text style={styles.text}>
        Khalid Sajed est le développeur principal de l'application. Avec une expertise en développement d'applications mobiles et en ingénierie logicielle, il a conçu Monitoring Fœtal pour répondre aux besoins spécifiques des professionnels de santé dans le suivi des grossesses. Vous pouvez le contacter à l'adresse suivante : 
        <Text style={styles.bold}>khalidsajed1975@gmail.com</Text>.
      </Text>

      <Text style={styles.subtitle}>À propos de Bouchra Fellah</Text>
      <Text style={styles.text}>
        Bouchra Fellah est une sage-femme expérimentée, forte de plus de 20 ans de pratique dans le domaine obstétrical. Sa contribution essentielle à l'élaboration du contenu médical de l'application a permis de garantir que les recommandations et les protocoles soient à la fois rigoureux et adaptés aux réalités cliniques. Vous pouvez la contacter à l'adresse suivante : 
        <Text style={styles.bold}>bouchrafellah@gmail.com</Text>.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#00E5FF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: '#00E5FF',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});
