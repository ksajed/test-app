// Exportation des scripts de monitoring
export const monitoringScripts = [
    // Scripts pour la situation normale
    {
      label: 'Monitoring Normal',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring de [heure] est normal, avec une fréquence cardiaque fœtale stable et des accélérations physiologiques. Aucun signe de complication n’est observé.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Contraction Normale',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLes contractions observées à [heure] sont de faible intensité et régulières, compatibles avec le travail en cours. Pas de signe de pathologie.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Activité Fœtale Normale',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nL’activité fœtale est normale, avec une fréquence cardiaque stable et aucune anomalie détectée. Tout semble en ordre pour la patiente et le fœtus.\nCordialement,\n[Nom de la sage‑femme]',
    },
  
    // Scripts pour les cas modérés
    {
      label: 'Décélérations Variables',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nÀ [heure], le monitoring présente des décélérations de type variable, compatibles avec une compression cordon. La situation est étroitement surveillée.\nMerci pour vos instructions,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Décélérations Tardives',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring de [heure] révèle des décélérations tardives régulières. Ces observations pourraient traduire une insuffisance placentaire. Merci de m’indiquer la conduite à tenir.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Tracé Non Réactif',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring de [heure] apparaît non réactif (absence d’accélérations et variabilité réduite). Une évaluation complémentaire ou une reprise du monitoring est envisagée.\nBien à vous,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Artefacts ou Problèmes Techniques',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring à [heure] présente de nombreux artefacts, rendant l’interprétation difficile. Je propose de vérifier les connexions et de reprendre l’enregistrement.\nCordialement,\n[Nom de la sage‑femme]',
    },
  
    // Scripts pour les cas graves
    {
      label: 'Bradycardie Fœtale',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring réalisé à [heure] indique une bradycardie fœtale (FCF autour de 100 bpm) prolongée avec faible variabilité. Votre avis est requis en urgence.\nBien cordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Décélérations Sévères et Faible Variabilité',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring réalisé à [heure] montre des décélérations sévères répétées, accompagnées d’une variabilité nettement réduite. La situation est préoccupante et nécessite une intervention rapide.\nMerci pour votre retour,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Complication Obstétricale – Saignement',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLa patiente présente un saignement [important/inhabituel] (quantité estimée : [détails], localisation : [précisions]). Le monitoring indique [description] et l’évolution est préoccupante.\nJe sollicite votre intervention urgente.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Demande de Consultation / Intervention Immédiate',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nCompte tenu de l’évolution de la situation (monitoring, état maternel, etc.), je sollicite votre présence immédiate pour une évaluation complète.\nMerci de me rejoindre dès que possible.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Rupture Prématurée des Membranes (RPM)',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nNous avons constaté une rupture prématurée des membranes à [heure]. Le liquide amniotique est [clair/ trouble] et [la patiente ne présente/presente] pas encore de signes d’infection.\nMerci de me préciser la prise en charge à adopter.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Présence de Méconium dans le Liquide Amniotique',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe liquide amniotique présente des traces de méconium détectées à [heure]. Le monitoring montre [description] et la patiente est [stable/à surveiller étroitement].\nMerci de vos directives.\nCordialement,\n[Nom de la sage‑femme]',
    },
  
    // Scripts pour les situations urgentes
    {
      label: 'Monitoring Sous Oxytocine / Hyperstimulation',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring réalisé à [heure], sous perfusion d’oxytocine, montre des signes d’hyperstimulation avec la survenue de décélérations. Je recommande une réévaluation du débit ou l’arrêt temporaire de l’oxytocine.\nMerci de votre avis,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Situation de Grossesse Multiple',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nLe monitoring réalisé à [heure] chez cette patiente enceinte de jumeaux montre un tracé normal pour le premier fœtus, tandis que le second présente quelques irrégularités mineures.\nMerci de m’indiquer la conduite à tenir.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Préparation à la Césarienne',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nAu vu de l’évolution (monitoring anormal, état maternel/fœtal préoccupant, etc.), il semble nécessaire de préparer une césarienne.\nMerci de me confirmer et de m’indiquer les démarches à suivre.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Induction du Travail / Surveillance de l’Induction',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nL’induction du travail a débuté à [heure] par [méthode utilisée]. Le monitoring montre [description] et l’évolution cervicale est [détaillée].\nMerci de me confirmer la conduite à tenir pour la suite de l’induction.\nCordialement,\n[Nom de la sage‑femme]',
    },
    {
      label: 'Retour d’Intervention Médicale',
      value:
        'Bonjour Dr [Nom],\nPatiente : [Nom de la patiente]\nSuite à [l’intervention/le geste] réalisé(e) à [heure], l’état post-intervention est le suivant : [description détaillée].\nJe reste en observation et vous tiendrai informé(e) de toute évolution.\nCordialement,\n[Nom de la sage‑femme]',
    },
  ];
  