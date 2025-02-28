import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface HelpItem {
  title: string;
  content: string;
  script: string[];
}

interface HelpSection {
  section: string;
  icon: string;
  items: HelpItem[];
}

const ctgHelpData: HelpSection[] = [
  {
    section: 'Rythme Cardiaque Fœtal (RCF)',
    icon: 'heart-pulse',
    items: [
      {
        title: 'Rythme de base normal',
        content:
          'Le rythme cardiaque fœtal est mesuré à 130 bpm, se situant dans la plage normale (110–160 bpm) avec une variabilité à court terme d’environ 10 bpm, indiquant une réactivité autonome adéquate et une bonne perfusion placentaire.',
        script: [
          'Exemple de communication : "Le rythme cardiaque de votre bébé est de 130 bpm, ce qui est normal. Nous poursuivons la surveillance, mais tout est rassurant."',
        ],
      },
      {
        title: 'Tachycardie fœtale',
        content:
          'Un rythme supérieur à 160 bpm peut refléter une fièvre maternelle, une infection, une hyperthyroïdie ou un stress fœtal précoce. Une surveillance rapprochée est indispensable.',
        script: [
          'Exemple : "Nous constatons que le rythme cardiaque de votre bébé dépasse 160 bpm. Nous allons surveiller étroitement et prendre les mesures nécessaires."',
        ],
      },
      {
        title: 'Bradycardie fœtale',
        content:
          'Un rythme inférieur à 110 bpm peut être associé à une hypoxie fœtale, une compression du cordon ou des anomalies cardiaques, justifiant une investigation immédiate.',
        script: [
          'Exemple : "Le rythme cardiaque de votre bébé est en dessous de 110 bpm. Nous allons réaliser des examens complémentaires afin de déterminer la cause et intervenir si nécessaire."',
        ],
      },
      {
        title: 'Variabilité normale',
        content:
          'Une variabilité du RCF comprise entre 5 et 25 bpm indique une interaction normale entre les systèmes nerveux sympathique et parasympathique.',
        script: [
          'Exemple : "La variabilité du rythme cardiaque de votre bébé est normale, ce qui est un bon indicateur de bien-être fœtal."',
        ],
      },
      {
        title: 'Variabilité réduite ou absente',
        content:
          'Une variabilité inférieure à 5 bpm, voire absente (tracé plat), indique une dépression du système nerveux central fœtal, signe d’hypoxie sévère ou de souffrance fœtale.',
        script: [
          'Exemple : "Nous avons remarqué une réduction significative de la variabilité, ce qui nous oblige à surveiller de très près l’état de votre bébé."',
        ],
      },
      {
        title: 'Accélérations',
        content:
          'La présence d’accélérations spontanées (augmentation d’au moins 15 bpm durant 15 secondes ou plus) est un signe de réactivité fœtale satisfaisante.',
        script: [
          'Exemple : "Les accélérations spontanées observées sont un indicateur rassurant de la bonne réactivité de votre bébé."',
        ],
      },
      {
        title: 'Décélérations précoces',
        content:
          'Les décélérations précoces, en miroir des contractions utérines, suggèrent une compression de la tête fœtale sans impact majeur sur l’oxygénation.',
        script: [
          'Exemple : "Les décélérations précoces constatées sont typiques et ne posent pas de problème majeur."',
        ],
      },
      {
        title: 'Décélérations variables',
        content:
          'Des décélérations variables, irrégulières et non synchronisées aux contractions, peuvent être dues à une compression intermittente du cordon ombilical.',
        script: [
          'Exemple : "Nous avons noté des décélérations variables. Cela justifie une surveillance rapprochée et, si nécessaire, un changement de position pour améliorer la perfusion."',
        ],
      },
      {
        title: 'Décélérations tardives',
        content:
          'Des décélérations tardives apparaissant après les contractions indiquent un retard dans la récupération du RCF, ce qui peut être préoccupant et évoquer une hypoxie en développement.',
        script: [
          'Exemple : "Les décélérations tardives observées sont préoccupantes et suggèrent une hypoxie fœtale, nous allons donc prendre des mesures immédiates."',
        ],
      },
      {
        title: 'Rythme sinusoïdal',
        content:
          'Le tracé présente un rythme sinusoïdal, caractérisé par une oscillation régulière du RCF, souvent associé à une anémie fœtale ou une hypoxie sévère nécessitant une intervention urgente.',
        script: [
          'Exemple : "Le rythme sinusoïdal détecté est très alarmant et indique la nécessité d’une intervention d’urgence."',
        ],
      },
    ],
  },
  {
    section: 'Contractions Utérines',
    icon: 'baby',
    items: [
      {
        title: 'Fréquence et intensité normales',
        content:
          'Les contractions se produisent à une fréquence de 3 à 5 par 10 minutes, avec une amplitude de 30–40 mmHg, ce qui indique un travail progressif et efficace.',
        script: [
          'Exemple : "Les contractions sont régulières et de bonne intensité, ce qui est favorable pour un travail normal."',
        ],
      },
      {
        title: 'Contractions excessives',
        content:
          'Une fréquence supérieure à 5 contractions par 10 minutes ou une amplitude supérieure à 50 mmHg peut compromettre la perfusion placentaire, augmentant le risque d’hypoxie fœtale.',
        script: [
          'Exemple : "Les contractions sont trop fréquentes/intenses. Nous envisageons de réduire l\'administration d\'ocytocine pour éviter une hypoxie."',
        ],
      },
      {
        title: 'Contractions inefficaces',
        content:
          'Des contractions d’amplitude inférieure à 20 mmHg ou irrégulières peuvent signaler un travail inefficace nécessitant une stimulation ou une réévaluation du protocole.',
        script: [
          'Exemple : "Les contractions semblent faibles et irrégulières, ce qui pourrait nécessiter une stimulation pour assurer la progression du travail."',
        ],
      },
    ],
  },
  {
    section: 'Interprétation Globale du Tracé',
    icon: 'monitor-heart',
    items: [
      {
        title: 'Tracé rassurant (Catégorie I – ACOG)',
        content:
          'Le tracé CTG présente un rythme de base normal, une variabilité adéquate et des accélérations spontanées, sans décélérations tardives, ce qui est rassurant pour le bien-être fœtal.',
        script: [
          'Exemple : "Le tracé est rassurant (Catégorie I), ce qui indique que votre bébé se porte bien."',
        ],
      },
      {
        title: 'Tracé non rassurant (Catégorie II – ACOG)',
        content:
          'Le tracé présente une variabilité réduite et des décélérations variables, nécessitant une surveillance rapprochée et une possible intervention si la situation se détériore.',
        script: [
          'Exemple : "Le tracé est en Catégorie II, nous allons intensifier la surveillance pour assurer le bien-être de votre bébé."',
        ],
      },
      {
        title: 'Tracé pathologique (Catégorie III – ACOG)',
        content:
          'Le monitoring fœtal en Catégorie III présente des décélérations tardives répétées, une absence de variabilité et des signes d’acidose, indiquant une souffrance sévère nécessitant une intervention immédiate.',
        script: [
          'Exemple : "Le tracé est en Catégorie III, ce qui nécessite une intervention immédiate pour protéger votre bébé."',
        ],
      },
      {
        title: 'Observations spécifiques',
        content:
          'Le tracé montre des signes d’hypoxie, notamment une variabilité à court terme inférieure à 5 bpm et des décélérations tardives, traduisant une acidose probable.',
        script: [
          'Exemple : "Nous notons des signes d’hypoxie. Cela nécessite une surveillance étroite et peut entraîner une intervention rapide."',
        ],
      },
    ],
  },
  {
    section: 'Actions et Interventions',
    icon: 'alert-circle-outline',
    items: [
      {
        title: 'Interventions immédiates',
        content:
          'En présence d’un tracé pathologique (Catégorie III), une césarienne en urgence peut être indiquée, surtout si les décélérations tardives et l’absence de variabilité persistent.',
        script: [
          'Exemple : "Une césarienne en urgence est envisagée en raison du tracé pathologique."',
        ],
      },
      {
        title: 'Interventions correctives',
        content:
          'Il est recommandé de changer la position de la patiente (par exemple, en décubitus latéral gauche) pour améliorer la perfusion placentaire et de stopper l’administration d’ocytocine en cas d’activité excessive.',
        script: [
          'Exemple : "Nous vous demandons de changer de position pour améliorer la circulation et réduire l’activité utérine."',
        ],
      },
      {
        title: 'Interventions complémentaires',
        content:
          'En cas de doute, un prélèvement de sang fœtal (pH au scalp, avec une valeur > 7,25 rassurante) ou une amnio-infusion peuvent être réalisés pour confirmer et corriger une acidose.',
        script: [
          'Exemple : "Nous allons réaliser un prélèvement de sang fœtal pour évaluer le pH et adapter notre prise en charge si nécessaire."',
        ],
      },
    ],
  },
  {
    section: 'Compte-Rendu Technique',
    icon: 'file-document-edit-outline',
    items: [
      {
        title: 'Compte-rendu détaillé',
        content:
          'Le tracé CTG présente un rythme de base de 140 bpm, une variabilité à court terme de 10 bpm et des accélérations spontanées de 15 bpm durant 20 secondes. Des décélérations tardives intermittentes et une légère altération de la variabilité placent ce tracé en catégorie II, nécessitant une surveillance rapprochée.',
        script: [
          'Exemple : "Le compte-rendu indique un rythme de base de 140 bpm avec une variabilité adéquate, mais des décélérations tardives intermittentes nécessitent une surveillance rapprochée."',
        ],
      },
      {
        title: 'Observations quantitatives',
        content:
          'Les contractions utérines se manifestent à une fréquence de 4 par 10 minutes avec une amplitude moyenne de 35 mmHg. Le tracé montre des décélérations précoces associées aux contractions, compatibles avec un travail normal, bien que la réduction de la variabilité justifie une vigilance accrue.',
        script: [
          'Exemple : "Les données quantitatives indiquent 4 contractions par 10 minutes et une amplitude moyenne de 35 mmHg, avec des décélérations précoces notées."',
        ],
      },
    ],
  },
  {
    section: 'Communication Interprofessionnelle',
    icon: 'account-group-outline',
    items: [
      {
        title: 'Entre médecins',
        content:
          'Le tracé CTG est classé en catégorie II selon l\'ACOG, avec une variabilité réduite et des décélérations variables. Une surveillance rapprochée est recommandée, et en cas de persistance, un prélèvement de sang fœtal et une préparation pour une césarienne seront envisagés.',
        script: [
          'Exemple : "Nous avons classé le tracé en Catégorie II. Une surveillance rapprochée et une intervention éventuelle (prélèvement de sang fœtal ou césarienne) sont prévues."',
        ],
      },
      {
        title: 'Avec le personnel infirmier et anesthésiste',
        content:
          'Veuillez surveiller étroitement le tracé CTG et préparer une intervention d\'urgence en cas d\'aggravation (décélérations tardives et absence de variabilité).',
        script: [
          'Exemple : "Merci de surveiller le tracé CTG de près et de préparer une intervention d\'urgence en cas de dégradation."',
        ],
      },
    ],
  },
  {
    section: 'Communication avec la Patiente',
    icon: 'message-text-outline',
    items: [
      {
        title: 'Cas rassurant / normal',
        content:
          '« Le rythme cardiaque de votre bébé est de 130 bpm, ce qui est dans la plage normale. Le tracé est rassurant et nous continuons à le surveiller. »\n\n' +
          '« Votre bébé présente une bonne réactivité, avec des accélérations spontanées et une variabilité adéquate, témoignant d’un bon bien-être. »',
        script: [
          'Exemple : "Tout est normal. Votre bébé se porte bien et nous continuons la surveillance."',
        ],
      },
      {
        title: 'Cas légèrement anormal',
        content:
          '« Nous avons noté une légère réduction de la variabilité du rythme cardiaque de votre bébé, ce qui nécessite une surveillance rapprochée, mais il n’y a pas de danger immédiat. »\n\n' +
          '« Quelques anomalies mineures sont présentes, justifiant une observation continue pour garantir le bien-être de votre bébé. »',
        script: [
          'Exemple : "Il y a de légères anomalies, mais nous surveillons étroitement pour nous assurer du bien-être de votre bébé."',
        ],
      },
      {
        title: 'Cas nécessitant une surveillance rapprochée',
        content:
          '« Le monitoring montre des anomalies qui nécessitent une surveillance étroite. Nous suivrons attentivement le rythme cardiaque de votre bébé pour nous assurer que tout reste stable. »\n\n' +
          '« Bien que le tracé ne soit pas critique, nous intensifierons la surveillance afin de détecter toute évolution défavorable. »',
        script: [
          'Exemple : "Nous allons surveiller de très près le tracé pour nous assurer de la stabilité de votre bébé."',
        ],
      },
      {
        title: 'Cas préoccupant',
        content:
          '« Le monitoring présente des signes préoccupants, notamment des décélérations tardives répétées et une variabilité réduite, suggérant une souffrance fœtale. Une intervention rapide pourrait être nécessaire. »\n\n' +
          '« Des anomalies indiquant une possible hypoxie sont observées. Nous allons vous demander de changer de position et prendre des mesures correctives immédiates. »',
        script: [
          'Exemple : "Nous avons détecté des signes préoccupants sur le tracé. Un changement de position et des mesures correctives sont prévus."',
        ],
      },
      {
        title: 'Cas d’hypoxie ou d’acidose fœtale',
        content:
          '« Le tracé montre une variabilité très réduite et des décélérations tardives, signes d’une hypoxie sévère. Nous réaliserons un prélèvement de sang fœtal pour mesurer le pH (valeur > 7,25 rassurante) afin d’adapter la prise en charge. »\n\n' +
          '« Des signes d’acidose sont présents, nécessitant des mesures de soutien immédiates. »',
        script: [
          'Exemple : "Nous allons effectuer un prélèvement de sang fœtal pour vérifier le pH et adapter notre intervention si nécessaire."',
        ],
      },
      {
        title: 'Cas suite à des interventions',
        content:
          '« Après avoir ajusté votre position (ex. décubitus latéral gauche), le monitoring montre une amélioration progressive du rythme cardiaque de votre bébé. Nous poursuivrons la surveillance pour confirmer cette amélioration. »\n\n' +
          '« Suite aux mesures correctives, le tracé s’améliore, indiquant que votre bébé commence à mieux supporter le travail. »',
        script: [
          'Exemple : "Après avoir ajusté votre position, nous constatons une amélioration. Nous continuons la surveillance pour nous assurer que tout reste stable."',
        ],
      },
      {
        title: 'Cas d’urgence',
        content:
          '« Le monitoring présente des anomalies critiques (décélérations tardives répétées, absence de variabilité), indiquant une souffrance fœtale aiguë. Une intervention immédiate, telle qu’une césarienne, est indispensable pour protéger votre bébé. »\n\n' +
          '« Les signes observés sont très préoccupants. Nous devons agir rapidement pour assurer la sécurité de votre bébé, avec une intervention d’urgence si nécessaire. »',
        script: [
          'Exemple : "La situation est critique et nécessite une intervention immédiate pour la sécurité de votre bébé."',
        ],
      },
    ],
  },
];

export default function Help() {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSectionId(expandedSectionId === section ? null : section);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monitoring Fœtal : Interprétations & Recommandations</Text>
      {ctgHelpData.map((sectionData) => (
        <View key={sectionData.section} style={styles.sectionContainer}>
          <TouchableOpacity onPress={() => toggleSection(sectionData.section)} style={styles.sectionHeader}>
            <Icon name={sectionData.icon} size={24} color="#00E5FF" style={styles.icon} />
            <Text style={styles.subtitle}>{sectionData.section}</Text>
            <Icon
              name={expandedSectionId === sectionData.section ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#00E5FF"
            />
          </TouchableOpacity>
          {expandedSectionId === sectionData.section &&
            sectionData.items.map((item) => (
              <View key={item.title} style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemContent}>{item.content}</Text>
                {item.script.map((s, index) => (
                  <Text key={index} style={styles.scriptText}>{s}</Text>
                ))}
              </View>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#00E5FF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: '#00E5FF',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  sectionContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  itemContainer: {
    backgroundColor: '#25292e',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemContent: {
    fontSize: 14,
    color: '#B0BEC5',
    marginTop: 4,
    lineHeight: 20,
  },
  scriptText: {
    fontSize: 12,
    color: '#B0BEC5',
    fontStyle: 'italic',
    marginTop: 4,
    textAlign: 'left',
  },
});
