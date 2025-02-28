import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/Button';

// Les protocoles des urgences obstétricales
const monitoringScripts = [
  {
    label: 'Détresse fœtale aiguë',
    value: `
      ## Identification de la détresse fœtale :
      - **Bradycardie fœtale** (< 110 bpm).
      - **Tachycardie fœtale** (> 180 bpm).
      - **Décélérations variables ou prolongées**, perte de variabilité.
      - Modifications des **mouvements fœtaux**.

      ## Actions immédiates :
      - Placer la patiente en **position latérale gauche** pour améliorer le retour veineux et la perfusion utérine.
      - Appliquer de l’**oxygène** à la patiente (faciale ou en masque) pour améliorer l'oxygénation fœtale.
      - **Surveillance continue** du rythme cardiaque fœtal avec un CTG.
      - Hydratation intraveineuse (NaCl 0,9% ou Ringer lactate).
      - Consultation immédiate avec l’obstétricien si la situation persiste.

      ## Interventions :
      - Si la détresse persiste, **considérer une césarienne d’urgence**.
    `,
  },
  {
    label: 'Hémorragie post-partum (HPP)',
    value: `
      ## Identification de l'hémorragie post-partum :
      - Saignement > 500 ml après un accouchement vaginal ou > 1000 ml après une césarienne.
      - **Hypotension**, tachycardie, pâleur, froideur des extrémités.

      ## Actions immédiates :
      - **Massage utérin** pour stimuler la contraction de l’utérus et limiter les saignements.
      - Positionner la patiente en **position Trendelenburg** pour améliorer le retour sanguin vers le cœur.
      - Surveillance des signes vitaux et perfusion intraveineuse pour rétablir le volume sanguin.

      ## Traitement médical :
      - Administration d’**oxytocine** (10-40 UI IV) pour favoriser la contraction utérine.
      - Utilisation de **prostaglandines** ou d'autres médicaments (Misoprostol, ergométrine).
      
      ## Intervention chirurgicale :
      - En cas d’hémorragie persistante, envisager une **hystérectomie**.
    `,
  },
  {
    label: 'Rupture utérine',
    value: `
      ## Identification de la rupture utérine :
      - **Douleur abdominale aiguë**, souvent avec douleur lombaire.
      - **Choc** (hypotension, tachycardie), perte de liquide amniotique clair ou sanguin.
      - Absence de **présentation fœtale**.

      ## Actions immédiates :
      - Appel immédiat à l’équipe d’urgence pour une prise en charge rapide.
      - Surveillance des signes vitaux (**tension artérielle, fréquence cardiaque**).
      - **Oxygénothérapie** pour prévenir l’hypoxie fœtale.

      ## Intervention chirurgicale :
      - Réaliser immédiatement une **césarienne** pour sauver la mère et le fœtus.
      - En cas de rupture grave, une **hystérectomie** peut être nécessaire.
    `,
  },
  {
    label: 'Prolapsus du cordon ombilical',
    value: `
      ## Identification du prolapsus du cordon :
      - **Cordon visible** dans le vagin ou la vulve.
      - Décélérations fœtales causées par la compression du cordon.

      ## Actions immédiates :
      - Placer la mère en **position Trendelenburg** ou latérale gauche pour soulager la pression sur le cordon.
      - **Réduire délicatement** le prolapsus si possible et replacer le cordon dans l’utérus.

      ## Intervention chirurgicale :
      - Si la situation persiste, procéder à une **césarienne d’urgence** pour éviter toute hypoxie prolongée.
    `,
  },
  {
    label: 'Pré-éclampsie et éclampsie',
    value: `
      ## Identification de la pré-éclampsie et de l’éclampsie :
      - Pré-éclampsie : **Hypertension** > 160/110 mmHg, œdème, protéinurie.
      - **Éclampsie** : Convulsions généralisées.

      ## Actions immédiates :
      - Surveillance stricte de la **pression artérielle** et des signes de convulsions.
      - Administration d'**antihypertenseurs** (labétalol, hydralazine).
      - Administration de **sulfate de magnésium** (4 g IV en bolus, suivi de 1-2 g/h en perfusion continue).

      ## Accouchement :
      - Si la patiente est à terme, l’accouchement doit être provoqué par **induction ou césarienne**.
    `,
  },
  {
    label: 'Embolie amniotique',
    value: `
      ## Identification de l’embolie amniotique :
      - **Difficultés respiratoires aiguës**, cyanose, hypotension, tachycardie, convulsions.

      ## Actions immédiates :
      - Appel immédiat à l’équipe de **réanimation**.
      - Appliquer de l'**oxygène à 100%** via un masque ou ventilateur.
      - Positionner la patiente en **décubitus latéral gauche** pour réduire la pression sur la veine cave.

      ## Traitement médical :
      - **Réanimation** avec perfusions de cristalloïdes et vasopresseurs pour maintenir la pression artérielle.
      
      ## Intervention chirurgicale :
      - Si l’état de la patiente le permet, procéder à une **césarienne d’urgence**.
    `,
  },
  {
    label: 'Décollement prématuré du placenta normal (DPPNI)',
    value: `
      ## Identification du décollement prématuré :
      - **Douleur abdominale sévère**, souvent associée à des saignements vaginaux.
      - Uterus dur et douloureux à la palpation.

      ## Actions immédiates :
      - Placer la patiente en **position Trendelenburg**.
      - Surveillance de la **pression artérielle** et du rythme cardiaque.
      - Surveillance continue de la **fréquence cardiaque fœtale**.

      ## Traitement médical :
      - Si décollement léger et accouchement imminent, procéder à une **induction ou une césarienne**.
      - En cas de décollement important, procéder immédiatement à une **césarienne** pour sauver la vie de la mère et du fœtus.
    `,
  },
  {
    label: 'Accouchement prématuré',
    value: `
      ## Identification :
      - Contractions prématurées avant 37 semaines.
      - Rupture prématurée des membranes (RPM).

      ## Actions immédiates :
      - Administration de **corticostéroïdes** (Betaméthasone) pour maturation pulmonaire fœtale.
      - Surveillance des signes vitaux de la mère et du fœtus.
      - **Tocolyse** pour ralentir les contractions si applicable.

      ## Préparation néonatale :
      - Préparer l’unité **néonatale** pour une prise en charge immédiate du prématuré.
    `,
  },
  {
    label: 'Placenta praevia',
    value: `
      ## Identification :
      - **Saignement vaginal indolore** à partir du deuxième trimestre.
      - Présence de placenta recouvrant partiellement ou totalement le col utérin.

      ## Actions immédiates :
      - Surveillance des **pertes sanguines** et surveillance clinique de la mère et du fœtus.
      - Éviter toute manipulation vaginale (touchers vaginaux, examens internes) jusqu'à la césarienne.

      ## Traitement :
      - Si le saignement persiste, **césarienne d’urgence** est nécessaire.
    `,
  },
  {
    label: 'Hyperstimulation utérine (syndrome de stimulation excessive)',
    value: `
      ## Identification :
      - Contractions excessivement fréquentes ou fortes.
      - Détresse fœtale en raison d'une hyperstimulation.

      ## Actions immédiates :
      - Arrêter l'administration d'**ocytocine** ou de **prostaglandines**.
      - Surveiller le **rythme cardiaque fœtal** et la fréquence des contractions.
      
      ## Traitement :
      - Administrer des **tocolytiques** pour réduire l’intensité des contractions.
    `,
  },
  {
    label: 'Choc obstétrical',
    value: `
      ## Identification :
      - **Hypotension sévère**, tachycardie, signes de choc.
      - Perte de sang importante ou septicémie.

      ## Actions immédiates :
      - Réanimation volémique avec perfusions de cristalloïdes et colloïdes.
      - Surveillance continue des signes vitaux et des paramètres hémodynamiques.
      
      ## Traitement :
      - **Transfusion sanguine** si nécessaire et utilisation de vasopresseurs pour maintenir la pression artérielle.
    `,
  },
  {
    label: 'Hématome rétroplacentaire',
    value: `
      ## Identification :
      - **Saignement vaginal** associé à une douleur abdominale intense.
      - Uterus dur et contracté.

      ## Actions immédiates :
      - Surveillance des **signes vitaux** et de la fréquence cardiaque fœtale.
      - Cesser toute activité physique et observer attentivement la patiente.

      ## Intervention :
      - Réaliser une **césarienne d’urgence** si l’hématome est important et la condition fœtale en détresse.
    `,
  },
  {
    label: 'Déchirure du périnée ou du col utérin',
    value: `
      ## Identification :
      - **Saignements excessifs** après l’accouchement, souvent dûs à des déchirures graves.
      - **Douleur intense** dans la région périnéale ou cervicale.

      ## Actions immédiates :
      - Réaliser une réparation sous anesthésie **locale ou générale** en fonction de la gravité de la déchirure.
      
      ## Traitement :
      - Vérification de la **continuité du col utérin** et du périnée, avec sutures si nécessaire.
    `,
  },
  {
    label: 'Méconium dans le liquide amniotique',
    value: `
      ## Identification :
      - Présence de **méconium** dans le liquide amniotique.
      - Respiration difficile ou détresse respiratoire après la naissance.

      ## Actions immédiates :
      - **Aspiration** des voies respiratoires du nouveau-né si nécessaire.
      - Surveillance de la **fréquence cardiaque fœtale** et réanimation néonatale si détresse respiratoire.

      ## Traitement :
      - Réanimation néonatale si la détresse persiste après la naissance.
    `,
  },
  {
    label: 'Toxicité des anesthésiques (péridurale ou générale)',
    value: `
      ## Identification :
      - **Hypotension sévère**, bradycardie, ou troubles respiratoires après administration d'anesthésie.

      ## Actions immédiates :
      - Surveillance continue des **signes vitaux** et traitement pour stabiliser la pression artérielle.
      - Administrer de l'**oxygène** pour gérer l’hypoxie.

      ## Traitement :
      - Perfusion intraveineuse et **vasopresseurs** pour maintenir la pression artérielle et prévenir l’hypoxie.
    `,
  },
];

const ProtocolePage = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('');

  const handleProtocolChange = (value: string) => {
    setSelectedProtocol(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protocoles des Urgences Obstétricales</Text>

      {/* Menu déroulant */}
      <Picker
        selectedValue={selectedProtocol}
        onValueChange={handleProtocolChange}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez un protocole" value="" />
        {monitoringScripts.map((script) => (
          <Picker.Item key={script.label} label={script.label} value={script.value} />
        ))}
      </Picker>

      {/* Affichage du protocole sélectionné */}
      {selectedProtocol ? (
        <ScrollView style={styles.protocolTextContainer}>
          <Text style={styles.protocolText}>{selectedProtocol}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.placeholder}>Veuillez sélectionner un protocole pour voir les détails.</Text>
      )}

      <Button theme="primary" label="Retour" onPress={() => {/* Ajoutez ici la fonction pour revenir à la page principale */}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3', // Bleu
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  protocolTextContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  protocolText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  placeholder: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
});


export default ProtocolePage;
