export type Language = 'en' | 'de' | 'fr' | 'es' | 'it'

export interface Translations {
  common: {
    search: string
    create: string
    edit: string
    delete: string
    save: string
    cancel: string
    close: string
    submit: string
    loading: string
    error: string
    success: string
    confirm: string
    yes: string
    no: string
    filter: string
    sort: string
    export: string
    import: string
    upload: string
    download: string
    view: string
    back: string
    next: string
    previous: string
    clear: string
    apply: string
    reset: string
  }
  app: {
    title: string
    subtitle: string
  }
  navigation: {
    jobs: string
    documents: string
    search: string
    advancedSearch: string
    importPdf: string
    samples: string
    advanced: string
  }
  job: {
    title: string
    jobs: string
    newJob: string
    createJob: string
    editJob: string
    deleteJob: string
    jobDetails: string
    recentJobs: string
    filterJobs: string
    sortJobs: string
    noJobs: string
    jobCreated: string
    jobUpdated: string
    jobDeleted: string
    confirmDelete: string
    confirmDeleteMessage: string
    filteredResults: string
    quickStart: string
  }
  jobFields: {
    title: string
    customer: string
    location: string
    machineModel: string
    serialNo: string
    errorCode: string
    symptoms: string
    fix: string
    status: string
    createdAt: string
    updatedAt: string
  }
  status: {
    open: string
    progress: string
    completed: string
    cancelled: string
    all: string
  }
  attachments: {
    attachments: string
    addAttachment: string
    deleteAttachment: string
    noAttachments: string
    uploadProgress: string
    attachmentAdded: string
    attachmentDeleted: string
    confirmDeleteAttachment: string
  }
  documents: {
    documents: string
    document: string
    uploadDocument: string
    deleteDocument: string
    noDocuments: string
    documentUploaded: string
    documentDeleted: string
    documentViewer: string
    pdfOnly: string
    selectPdf: string
    enterTitle: string
    extractingText: string
    indexing: string
    uploadSuccess: string
    uploadError: string
  }
  search: {
    searchPlaceholder: string
    searchResults: string
    noResults: string
    noResultsMessage: string
    searching: string
    foundIn: string
    errorCodes: string
    machineModels: string
    all: string
    customQuery: string
    availableErrorCodes: string
    availableMachineModels: string
    clickToSearch: string
    typeToSearch: string
  }
  templates: {
    templates: string
    useTemplate: string
    saveAsTemplate: string
    customTemplates: string
    builtInTemplates: string
    noTemplates: string
    templateName: string
    templateCategory: string
    selectCategory: string
    templateApplied: string
    templateSaved: string
    templateDeleted: string
    confirmDeleteTemplate: string
    categories: {
      hydraulic: string
      electrical: string
      mechanical: string
      pneumatic: string
      control: string
      maintenance: string
    }
  }
  filters: {
    filterByStatus: string
    filterByDate: string
    dateFrom: string
    dateTo: string
    clearFilters: string
    showingResults: string
    of: string
    results: string
  }
  sorting: {
    sortBy: string
    date: string
    customer: string
    status: string
    title: string
    ascending: string
    descending: string
    newest: string
    oldest: string
  }
  samples: {
    loadSamples: string
    samplesLoaded: string
    samplesDescription: string
    loadSampleData: string
    getStarted: string
    exploreFeatures: string
  }
  errors: {
    required: string
    invalidEmail: string
    invalidDate: string
    fileSize: string
    fileType: string
    uploadFailed: string
    saveFailed: string
    deleteFailed: string
    loadFailed: string
    pdfParseFailed: string
    networkError: string
  }
  validation: {
    titleRequired: string
    customerRequired: string
    allFieldsRequired: string
  }
  language: {
    language: string
    english: string
    german: string
    french: string
    spanish: string
    italian: string
    changeLanguage: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      search: 'Search',
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      submit: 'Submit',
      loading: 'Loading',
      error: 'Error',
      success: 'Success',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      upload: 'Upload',
      download: 'Download',
      view: 'View',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      clear: 'Clear',
      apply: 'Apply',
      reset: 'Reset'
    },
    app: {
      title: 'ServiceLog',
      subtitle: 'Service Journal'
    },
    navigation: {
      jobs: 'Jobs',
      documents: 'Documents',
      search: 'Search',
      advancedSearch: 'Advanced Search',
      importPdf: 'Import PDF',
      samples: 'Samples',
      advanced: 'Advanced'
    },
    job: {
      title: 'Job',
      jobs: 'Jobs',
      newJob: 'New Job',
      createJob: 'Create New Job',
      editJob: 'Edit Job',
      deleteJob: 'Delete Job',
      jobDetails: 'Job Details',
      recentJobs: 'Recent Jobs',
      filterJobs: 'Filter Jobs',
      sortJobs: 'Sort Jobs',
      noJobs: 'No jobs found',
      jobCreated: 'Job created successfully',
      jobUpdated: 'Job updated successfully',
      jobDeleted: 'Job deleted successfully',
      confirmDelete: 'Delete Job?',
      confirmDeleteMessage: 'This action cannot be undone. All attachments will also be deleted.',
      filteredResults: 'filtered',
      quickStart: 'Quick Start'
    },
    jobFields: {
      title: 'Title',
      customer: 'Customer',
      location: 'Location',
      machineModel: 'Machine Model',
      serialNo: 'Serial Number',
      errorCode: 'Error Code',
      symptoms: 'Symptoms',
      fix: 'Fix / Resolution',
      status: 'Status',
      createdAt: 'Created',
      updatedAt: 'Updated'
    },
    status: {
      open: 'Open',
      progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      all: 'All Statuses'
    },
    attachments: {
      attachments: 'Attachments',
      addAttachment: 'Add Attachment',
      deleteAttachment: 'Delete Attachment',
      noAttachments: 'No attachments yet',
      uploadProgress: 'Uploading...',
      attachmentAdded: 'Attachment added',
      attachmentDeleted: 'Attachment deleted',
      confirmDeleteAttachment: 'Delete this attachment?'
    },
    documents: {
      documents: 'Documents',
      document: 'Document',
      uploadDocument: 'Upload Document',
      deleteDocument: 'Delete Document',
      noDocuments: 'No documents yet',
      documentUploaded: 'Document uploaded and indexed',
      documentDeleted: 'Document deleted',
      documentViewer: 'Document Viewer',
      pdfOnly: 'PDF files only',
      selectPdf: 'Select PDF file',
      enterTitle: 'Enter document title',
      extractingText: 'Extracting text...',
      indexing: 'Indexing document...',
      uploadSuccess: 'Upload complete',
      uploadError: 'Upload failed'
    },
    search: {
      searchPlaceholder: 'Search jobs and documents...',
      searchResults: 'Search Results',
      noResults: 'No results found',
      noResultsMessage: 'Try different search terms or check your filters',
      searching: 'Searching...',
      foundIn: 'Found in',
      errorCodes: 'Error Codes',
      machineModels: 'Machine Models',
      all: 'All',
      customQuery: 'Custom Query',
      availableErrorCodes: 'Available Error Codes',
      availableMachineModels: 'Available Machine Models',
      clickToSearch: 'Click to search',
      typeToSearch: 'Type to search'
    },
    templates: {
      templates: 'Templates',
      useTemplate: 'Use Template',
      saveAsTemplate: 'Save as Template',
      customTemplates: 'Custom Templates',
      builtInTemplates: 'Built-in Templates',
      noTemplates: 'No custom templates',
      templateName: 'Template Name',
      templateCategory: 'Category',
      selectCategory: 'Select category',
      templateApplied: 'Template applied',
      templateSaved: 'Template saved',
      templateDeleted: 'Template deleted',
      confirmDeleteTemplate: 'Delete this template?',
      categories: {
        hydraulic: 'Hydraulic',
        electrical: 'Electrical',
        mechanical: 'Mechanical',
        pneumatic: 'Pneumatic',
        control: 'Control Systems',
        maintenance: 'Maintenance'
      }
    },
    filters: {
      filterByStatus: 'Filter by Status',
      filterByDate: 'Filter by Date',
      dateFrom: 'From',
      dateTo: 'To',
      clearFilters: 'Clear Filters',
      showingResults: 'Showing',
      of: 'of',
      results: 'results'
    },
    sorting: {
      sortBy: 'Sort by',
      date: 'Date',
      customer: 'Customer',
      status: 'Status',
      title: 'Title',
      ascending: 'Ascending',
      descending: 'Descending',
      newest: 'Newest First',
      oldest: 'Oldest First'
    },
    samples: {
      loadSamples: 'Load Sample Data',
      samplesLoaded: 'Sample data loaded!',
      samplesDescription: '6 jobs with 15+ attachments and 5 technical manuals added.',
      loadSampleData: 'Load sample data to explore features',
      getStarted: 'Get Started',
      exploreFeatures: 'Explore all features with sample data'
    },
    errors: {
      required: 'This field is required',
      invalidEmail: 'Invalid email address',
      invalidDate: 'Invalid date',
      fileSize: 'File is too large',
      fileType: 'Invalid file type',
      uploadFailed: 'Upload failed',
      saveFailed: 'Save failed',
      deleteFailed: 'Delete failed',
      loadFailed: 'Load failed',
      pdfParseFailed: 'Could not extract text from PDF',
      networkError: 'Network error'
    },
    validation: {
      titleRequired: 'Title is required',
      customerRequired: 'Customer is required',
      allFieldsRequired: 'Please fill in all required fields'
    },
    language: {
      language: 'Language',
      english: 'English',
      german: 'German',
      french: 'French',
      spanish: 'Spanish',
      italian: 'Italian',
      changeLanguage: 'Change Language'
    }
  },
  de: {
    common: {
      search: 'Suchen',
      create: 'Erstellen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      save: 'Speichern',
      cancel: 'Abbrechen',
      close: 'Schließen',
      submit: 'Absenden',
      loading: 'Lädt',
      error: 'Fehler',
      success: 'Erfolg',
      confirm: 'Bestätigen',
      yes: 'Ja',
      no: 'Nein',
      filter: 'Filtern',
      sort: 'Sortieren',
      export: 'Exportieren',
      import: 'Importieren',
      upload: 'Hochladen',
      download: 'Herunterladen',
      view: 'Ansehen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      clear: 'Löschen',
      apply: 'Anwenden',
      reset: 'Zurücksetzen'
    },
    app: {
      title: 'ServiceLog',
      subtitle: 'Service Journal'
    },
    navigation: {
      jobs: 'Aufträge',
      documents: 'Dokumente',
      search: 'Suchen',
      advancedSearch: 'Erweiterte Suche',
      importPdf: 'PDF Importieren',
      samples: 'Beispiele',
      advanced: 'Erweitert'
    },
    job: {
      title: 'Auftrag',
      jobs: 'Aufträge',
      newJob: 'Neuer Auftrag',
      createJob: 'Neuen Auftrag Erstellen',
      editJob: 'Auftrag Bearbeiten',
      deleteJob: 'Auftrag Löschen',
      jobDetails: 'Auftragsdetails',
      recentJobs: 'Letzte Aufträge',
      filterJobs: 'Aufträge Filtern',
      sortJobs: 'Aufträge Sortieren',
      noJobs: 'Keine Aufträge gefunden',
      jobCreated: 'Auftrag erfolgreich erstellt',
      jobUpdated: 'Auftrag erfolgreich aktualisiert',
      jobDeleted: 'Auftrag erfolgreich gelöscht',
      confirmDelete: 'Auftrag Löschen?',
      confirmDeleteMessage: 'Diese Aktion kann nicht rückgängig gemacht werden. Alle Anhänge werden ebenfalls gelöscht.',
      filteredResults: 'gefiltert',
      quickStart: 'Schnellstart'
    },
    jobFields: {
      title: 'Titel',
      customer: 'Kunde',
      location: 'Standort',
      machineModel: 'Maschinenmodell',
      serialNo: 'Seriennummer',
      errorCode: 'Fehlercode',
      symptoms: 'Symptome',
      fix: 'Lösung / Behebung',
      status: 'Status',
      createdAt: 'Erstellt',
      updatedAt: 'Aktualisiert'
    },
    status: {
      open: 'Offen',
      progress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      cancelled: 'Abgebrochen',
      all: 'Alle Status'
    },
    attachments: {
      attachments: 'Anhänge',
      addAttachment: 'Anhang Hinzufügen',
      deleteAttachment: 'Anhang Löschen',
      noAttachments: 'Noch keine Anhänge',
      uploadProgress: 'Wird hochgeladen...',
      attachmentAdded: 'Anhang hinzugefügt',
      attachmentDeleted: 'Anhang gelöscht',
      confirmDeleteAttachment: 'Diesen Anhang löschen?'
    },
    documents: {
      documents: 'Dokumente',
      document: 'Dokument',
      uploadDocument: 'Dokument Hochladen',
      deleteDocument: 'Dokument Löschen',
      noDocuments: 'Noch keine Dokumente',
      documentUploaded: 'Dokument hochgeladen und indiziert',
      documentDeleted: 'Dokument gelöscht',
      documentViewer: 'Dokumentenbetrachter',
      pdfOnly: 'Nur PDF-Dateien',
      selectPdf: 'PDF-Datei auswählen',
      enterTitle: 'Dokumenttitel eingeben',
      extractingText: 'Text wird extrahiert...',
      indexing: 'Dokument wird indiziert...',
      uploadSuccess: 'Upload abgeschlossen',
      uploadError: 'Upload fehlgeschlagen'
    },
    search: {
      searchPlaceholder: 'Aufträge und Dokumente durchsuchen...',
      searchResults: 'Suchergebnisse',
      noResults: 'Keine Ergebnisse gefunden',
      noResultsMessage: 'Versuchen Sie andere Suchbegriffe oder überprüfen Sie Ihre Filter',
      searching: 'Suche läuft...',
      foundIn: 'Gefunden in',
      errorCodes: 'Fehlercodes',
      machineModels: 'Maschinenmodelle',
      all: 'Alle',
      customQuery: 'Eigene Abfrage',
      availableErrorCodes: 'Verfügbare Fehlercodes',
      availableMachineModels: 'Verfügbare Maschinenmodelle',
      clickToSearch: 'Klicken zum Suchen',
      typeToSearch: 'Eingeben zum Suchen'
    },
    templates: {
      templates: 'Vorlagen',
      useTemplate: 'Vorlage Verwenden',
      saveAsTemplate: 'Als Vorlage Speichern',
      customTemplates: 'Benutzerdefinierte Vorlagen',
      builtInTemplates: 'Integrierte Vorlagen',
      noTemplates: 'Keine benutzerdefinierten Vorlagen',
      templateName: 'Vorlagenname',
      templateCategory: 'Kategorie',
      selectCategory: 'Kategorie auswählen',
      templateApplied: 'Vorlage angewendet',
      templateSaved: 'Vorlage gespeichert',
      templateDeleted: 'Vorlage gelöscht',
      confirmDeleteTemplate: 'Diese Vorlage löschen?',
      categories: {
        hydraulic: 'Hydraulik',
        electrical: 'Elektrik',
        mechanical: 'Mechanik',
        pneumatic: 'Pneumatik',
        control: 'Steuerungssysteme',
        maintenance: 'Wartung'
      }
    },
    filters: {
      filterByStatus: 'Nach Status Filtern',
      filterByDate: 'Nach Datum Filtern',
      dateFrom: 'Von',
      dateTo: 'Bis',
      clearFilters: 'Filter Zurücksetzen',
      showingResults: 'Zeige',
      of: 'von',
      results: 'Ergebnissen'
    },
    sorting: {
      sortBy: 'Sortieren nach',
      date: 'Datum',
      customer: 'Kunde',
      status: 'Status',
      title: 'Titel',
      ascending: 'Aufsteigend',
      descending: 'Absteigend',
      newest: 'Neueste Zuerst',
      oldest: 'Älteste Zuerst'
    },
    samples: {
      loadSamples: 'Beispieldaten Laden',
      samplesLoaded: 'Beispieldaten geladen!',
      samplesDescription: '6 Aufträge mit 15+ Anhängen und 5 technischen Handbüchern hinzugefügt.',
      loadSampleData: 'Beispieldaten laden, um Funktionen zu erkunden',
      getStarted: 'Loslegen',
      exploreFeatures: 'Erkunden Sie alle Funktionen mit Beispieldaten'
    },
    errors: {
      required: 'Dieses Feld ist erforderlich',
      invalidEmail: 'Ungültige E-Mail-Adresse',
      invalidDate: 'Ungültiges Datum',
      fileSize: 'Datei ist zu groß',
      fileType: 'Ungültiger Dateityp',
      uploadFailed: 'Upload fehlgeschlagen',
      saveFailed: 'Speichern fehlgeschlagen',
      deleteFailed: 'Löschen fehlgeschlagen',
      loadFailed: 'Laden fehlgeschlagen',
      pdfParseFailed: 'Text konnte nicht aus PDF extrahiert werden',
      networkError: 'Netzwerkfehler'
    },
    validation: {
      titleRequired: 'Titel ist erforderlich',
      customerRequired: 'Kunde ist erforderlich',
      allFieldsRequired: 'Bitte füllen Sie alle erforderlichen Felder aus'
    },
    language: {
      language: 'Sprache',
      english: 'Englisch',
      german: 'Deutsch',
      french: 'Französisch',
      spanish: 'Spanisch',
      italian: 'Italienisch',
      changeLanguage: 'Sprache Ändern'
    }
  },
  fr: {
    common: {
      search: 'Rechercher',
      create: 'Créer',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      close: 'Fermer',
      submit: 'Soumettre',
      loading: 'Chargement',
      error: 'Erreur',
      success: 'Succès',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non',
      filter: 'Filtrer',
      sort: 'Trier',
      export: 'Exporter',
      import: 'Importer',
      upload: 'Télécharger',
      download: 'Télécharger',
      view: 'Voir',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      clear: 'Effacer',
      apply: 'Appliquer',
      reset: 'Réinitialiser'
    },
    app: {
      title: 'ServiceLog',
      subtitle: 'Journal de Service'
    },
    navigation: {
      jobs: 'Interventions',
      documents: 'Documents',
      search: 'Rechercher',
      advancedSearch: 'Recherche Avancée',
      importPdf: 'Importer PDF',
      samples: 'Exemples',
      advanced: 'Avancé'
    },
    job: {
      title: 'Intervention',
      jobs: 'Interventions',
      newJob: 'Nouvelle Intervention',
      createJob: 'Créer une Nouvelle Intervention',
      editJob: 'Modifier l\'Intervention',
      deleteJob: 'Supprimer l\'Intervention',
      jobDetails: 'Détails de l\'Intervention',
      recentJobs: 'Interventions Récentes',
      filterJobs: 'Filtrer les Interventions',
      sortJobs: 'Trier les Interventions',
      noJobs: 'Aucune intervention trouvée',
      jobCreated: 'Intervention créée avec succès',
      jobUpdated: 'Intervention mise à jour avec succès',
      jobDeleted: 'Intervention supprimée avec succès',
      confirmDelete: 'Supprimer l\'Intervention?',
      confirmDeleteMessage: 'Cette action ne peut pas être annulée. Toutes les pièces jointes seront également supprimées.',
      filteredResults: 'filtré',
      quickStart: 'Démarrage Rapide'
    },
    jobFields: {
      title: 'Titre',
      customer: 'Client',
      location: 'Localisation',
      machineModel: 'Modèle de Machine',
      serialNo: 'Numéro de Série',
      errorCode: 'Code d\'Erreur',
      symptoms: 'Symptômes',
      fix: 'Résolution',
      status: 'Statut',
      createdAt: 'Créé',
      updatedAt: 'Mis à jour'
    },
    status: {
      open: 'Ouvert',
      progress: 'En Cours',
      completed: 'Terminé',
      cancelled: 'Annulé',
      all: 'Tous les Statuts'
    },
    attachments: {
      attachments: 'Pièces Jointes',
      addAttachment: 'Ajouter une Pièce Jointe',
      deleteAttachment: 'Supprimer la Pièce Jointe',
      noAttachments: 'Aucune pièce jointe',
      uploadProgress: 'Téléchargement en cours...',
      attachmentAdded: 'Pièce jointe ajoutée',
      attachmentDeleted: 'Pièce jointe supprimée',
      confirmDeleteAttachment: 'Supprimer cette pièce jointe?'
    },
    documents: {
      documents: 'Documents',
      document: 'Document',
      uploadDocument: 'Télécharger un Document',
      deleteDocument: 'Supprimer le Document',
      noDocuments: 'Aucun document',
      documentUploaded: 'Document téléchargé et indexé',
      documentDeleted: 'Document supprimé',
      documentViewer: 'Visualiseur de Documents',
      pdfOnly: 'Fichiers PDF uniquement',
      selectPdf: 'Sélectionner un fichier PDF',
      enterTitle: 'Entrer le titre du document',
      extractingText: 'Extraction du texte...',
      indexing: 'Indexation du document...',
      uploadSuccess: 'Téléchargement terminé',
      uploadError: 'Échec du téléchargement'
    },
    search: {
      searchPlaceholder: 'Rechercher des interventions et des documents...',
      searchResults: 'Résultats de Recherche',
      noResults: 'Aucun résultat trouvé',
      noResultsMessage: 'Essayez d\'autres termes de recherche ou vérifiez vos filtres',
      searching: 'Recherche en cours...',
      foundIn: 'Trouvé dans',
      errorCodes: 'Codes d\'Erreur',
      machineModels: 'Modèles de Machines',
      all: 'Tous',
      customQuery: 'Requête Personnalisée',
      availableErrorCodes: 'Codes d\'Erreur Disponibles',
      availableMachineModels: 'Modèles de Machines Disponibles',
      clickToSearch: 'Cliquer pour rechercher',
      typeToSearch: 'Taper pour rechercher'
    },
    templates: {
      templates: 'Modèles',
      useTemplate: 'Utiliser le Modèle',
      saveAsTemplate: 'Enregistrer comme Modèle',
      customTemplates: 'Modèles Personnalisés',
      builtInTemplates: 'Modèles Intégrés',
      noTemplates: 'Aucun modèle personnalisé',
      templateName: 'Nom du Modèle',
      templateCategory: 'Catégorie',
      selectCategory: 'Sélectionner une catégorie',
      templateApplied: 'Modèle appliqué',
      templateSaved: 'Modèle enregistré',
      templateDeleted: 'Modèle supprimé',
      confirmDeleteTemplate: 'Supprimer ce modèle?',
      categories: {
        hydraulic: 'Hydraulique',
        electrical: 'Électrique',
        mechanical: 'Mécanique',
        pneumatic: 'Pneumatique',
        control: 'Systèmes de Contrôle',
        maintenance: 'Maintenance'
      }
    },
    filters: {
      filterByStatus: 'Filtrer par Statut',
      filterByDate: 'Filtrer par Date',
      dateFrom: 'De',
      dateTo: 'À',
      clearFilters: 'Réinitialiser les Filtres',
      showingResults: 'Affichage',
      of: 'sur',
      results: 'résultats'
    },
    sorting: {
      sortBy: 'Trier par',
      date: 'Date',
      customer: 'Client',
      status: 'Statut',
      title: 'Titre',
      ascending: 'Croissant',
      descending: 'Décroissant',
      newest: 'Plus Récent',
      oldest: 'Plus Ancien'
    },
    samples: {
      loadSamples: 'Charger des Données d\'Exemple',
      samplesLoaded: 'Données d\'exemple chargées!',
      samplesDescription: '6 interventions avec 15+ pièces jointes et 5 manuels techniques ajoutés.',
      loadSampleData: 'Charger des données d\'exemple pour explorer les fonctionnalités',
      getStarted: 'Commencer',
      exploreFeatures: 'Explorez toutes les fonctionnalités avec des données d\'exemple'
    },
    errors: {
      required: 'Ce champ est obligatoire',
      invalidEmail: 'Adresse e-mail invalide',
      invalidDate: 'Date invalide',
      fileSize: 'Le fichier est trop volumineux',
      fileType: 'Type de fichier invalide',
      uploadFailed: 'Échec du téléchargement',
      saveFailed: 'Échec de l\'enregistrement',
      deleteFailed: 'Échec de la suppression',
      loadFailed: 'Échec du chargement',
      pdfParseFailed: 'Impossible d\'extraire le texte du PDF',
      networkError: 'Erreur réseau'
    },
    validation: {
      titleRequired: 'Le titre est obligatoire',
      customerRequired: 'Le client est obligatoire',
      allFieldsRequired: 'Veuillez remplir tous les champs obligatoires'
    },
    language: {
      language: 'Langue',
      english: 'Anglais',
      german: 'Allemand',
      french: 'Français',
      spanish: 'Espagnol',
      italian: 'Italien',
      changeLanguage: 'Changer de Langue'
    }
  },
  es: {
    common: {
      search: 'Buscar',
      create: 'Crear',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      close: 'Cerrar',
      submit: 'Enviar',
      loading: 'Cargando',
      error: 'Error',
      success: 'Éxito',
      confirm: 'Confirmar',
      yes: 'Sí',
      no: 'No',
      filter: 'Filtrar',
      sort: 'Ordenar',
      export: 'Exportar',
      import: 'Importar',
      upload: 'Subir',
      download: 'Descargar',
      view: 'Ver',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      clear: 'Limpiar',
      apply: 'Aplicar',
      reset: 'Restablecer'
    },
    app: {
      title: 'ServiceLog',
      subtitle: 'Diario de Servicio'
    },
    navigation: {
      jobs: 'Trabajos',
      documents: 'Documentos',
      search: 'Buscar',
      advancedSearch: 'Búsqueda Avanzada',
      importPdf: 'Importar PDF',
      samples: 'Ejemplos',
      advanced: 'Avanzado'
    },
    job: {
      title: 'Trabajo',
      jobs: 'Trabajos',
      newJob: 'Nuevo Trabajo',
      createJob: 'Crear Nuevo Trabajo',
      editJob: 'Editar Trabajo',
      deleteJob: 'Eliminar Trabajo',
      jobDetails: 'Detalles del Trabajo',
      recentJobs: 'Trabajos Recientes',
      filterJobs: 'Filtrar Trabajos',
      sortJobs: 'Ordenar Trabajos',
      noJobs: 'No se encontraron trabajos',
      jobCreated: 'Trabajo creado exitosamente',
      jobUpdated: 'Trabajo actualizado exitosamente',
      jobDeleted: 'Trabajo eliminado exitosamente',
      confirmDelete: '¿Eliminar Trabajo?',
      confirmDeleteMessage: 'Esta acción no se puede deshacer. Todos los archivos adjuntos también serán eliminados.',
      filteredResults: 'filtrado',
      quickStart: 'Inicio Rápido'
    },
    jobFields: {
      title: 'Título',
      customer: 'Cliente',
      location: 'Ubicación',
      machineModel: 'Modelo de Máquina',
      serialNo: 'Número de Serie',
      errorCode: 'Código de Error',
      symptoms: 'Síntomas',
      fix: 'Resolución',
      status: 'Estado',
      createdAt: 'Creado',
      updatedAt: 'Actualizado'
    },
    status: {
      open: 'Abierto',
      progress: 'En Progreso',
      completed: 'Completado',
      cancelled: 'Cancelado',
      all: 'Todos los Estados'
    },
    attachments: {
      attachments: 'Archivos Adjuntos',
      addAttachment: 'Agregar Archivo Adjunto',
      deleteAttachment: 'Eliminar Archivo Adjunto',
      noAttachments: 'Sin archivos adjuntos',
      uploadProgress: 'Subiendo...',
      attachmentAdded: 'Archivo adjunto agregado',
      attachmentDeleted: 'Archivo adjunto eliminado',
      confirmDeleteAttachment: '¿Eliminar este archivo adjunto?'
    },
    documents: {
      documents: 'Documentos',
      document: 'Documento',
      uploadDocument: 'Subir Documento',
      deleteDocument: 'Eliminar Documento',
      noDocuments: 'Sin documentos',
      documentUploaded: 'Documento subido e indexado',
      documentDeleted: 'Documento eliminado',
      documentViewer: 'Visor de Documentos',
      pdfOnly: 'Solo archivos PDF',
      selectPdf: 'Seleccionar archivo PDF',
      enterTitle: 'Ingresar título del documento',
      extractingText: 'Extrayendo texto...',
      indexing: 'Indexando documento...',
      uploadSuccess: 'Carga completada',
      uploadError: 'Error en la carga'
    },
    search: {
      searchPlaceholder: 'Buscar trabajos y documentos...',
      searchResults: 'Resultados de Búsqueda',
      noResults: 'No se encontraron resultados',
      noResultsMessage: 'Pruebe con diferentes términos de búsqueda o revise sus filtros',
      searching: 'Buscando...',
      foundIn: 'Encontrado en',
      errorCodes: 'Códigos de Error',
      machineModels: 'Modelos de Máquinas',
      all: 'Todos',
      customQuery: 'Consulta Personalizada',
      availableErrorCodes: 'Códigos de Error Disponibles',
      availableMachineModels: 'Modelos de Máquinas Disponibles',
      clickToSearch: 'Haga clic para buscar',
      typeToSearch: 'Escriba para buscar'
    },
    templates: {
      templates: 'Plantillas',
      useTemplate: 'Usar Plantilla',
      saveAsTemplate: 'Guardar como Plantilla',
      customTemplates: 'Plantillas Personalizadas',
      builtInTemplates: 'Plantillas Integradas',
      noTemplates: 'Sin plantillas personalizadas',
      templateName: 'Nombre de la Plantilla',
      templateCategory: 'Categoría',
      selectCategory: 'Seleccionar categoría',
      templateApplied: 'Plantilla aplicada',
      templateSaved: 'Plantilla guardada',
      templateDeleted: 'Plantilla eliminada',
      confirmDeleteTemplate: '¿Eliminar esta plantilla?',
      categories: {
        hydraulic: 'Hidráulico',
        electrical: 'Eléctrico',
        mechanical: 'Mecánico',
        pneumatic: 'Neumático',
        control: 'Sistemas de Control',
        maintenance: 'Mantenimiento'
      }
    },
    filters: {
      filterByStatus: 'Filtrar por Estado',
      filterByDate: 'Filtrar por Fecha',
      dateFrom: 'Desde',
      dateTo: 'Hasta',
      clearFilters: 'Limpiar Filtros',
      showingResults: 'Mostrando',
      of: 'de',
      results: 'resultados'
    },
    sorting: {
      sortBy: 'Ordenar por',
      date: 'Fecha',
      customer: 'Cliente',
      status: 'Estado',
      title: 'Título',
      ascending: 'Ascendente',
      descending: 'Descendente',
      newest: 'Más Reciente',
      oldest: 'Más Antiguo'
    },
    samples: {
      loadSamples: 'Cargar Datos de Ejemplo',
      samplesLoaded: '¡Datos de ejemplo cargados!',
      samplesDescription: '6 trabajos con 15+ archivos adjuntos y 5 manuales técnicos agregados.',
      loadSampleData: 'Cargar datos de ejemplo para explorar las funciones',
      getStarted: 'Comenzar',
      exploreFeatures: 'Explore todas las funciones con datos de ejemplo'
    },
    errors: {
      required: 'Este campo es obligatorio',
      invalidEmail: 'Dirección de correo electrónico inválida',
      invalidDate: 'Fecha inválida',
      fileSize: 'El archivo es demasiado grande',
      fileType: 'Tipo de archivo inválido',
      uploadFailed: 'Error en la carga',
      saveFailed: 'Error al guardar',
      deleteFailed: 'Error al eliminar',
      loadFailed: 'Error al cargar',
      pdfParseFailed: 'No se pudo extraer el texto del PDF',
      networkError: 'Error de red'
    },
    validation: {
      titleRequired: 'El título es obligatorio',
      customerRequired: 'El cliente es obligatorio',
      allFieldsRequired: 'Por favor complete todos los campos obligatorios'
    },
    language: {
      language: 'Idioma',
      english: 'Inglés',
      german: 'Alemán',
      french: 'Francés',
      spanish: 'Español',
      italian: 'Italiano',
      changeLanguage: 'Cambiar Idioma'
    }
  },
  it: {
    common: {
      search: 'Cerca',
      create: 'Crea',
      edit: 'Modifica',
      delete: 'Elimina',
      save: 'Salva',
      cancel: 'Annulla',
      close: 'Chiudi',
      submit: 'Invia',
      loading: 'Caricamento',
      error: 'Errore',
      success: 'Successo',
      confirm: 'Conferma',
      yes: 'Sì',
      no: 'No',
      filter: 'Filtra',
      sort: 'Ordina',
      export: 'Esporta',
      import: 'Importa',
      upload: 'Carica',
      download: 'Scarica',
      view: 'Visualizza',
      back: 'Indietro',
      next: 'Successivo',
      previous: 'Precedente',
      clear: 'Cancella',
      apply: 'Applica',
      reset: 'Reimposta'
    },
    app: {
      title: 'ServiceLog',
      subtitle: 'Registro di Servizio'
    },
    navigation: {
      jobs: 'Lavori',
      documents: 'Documenti',
      search: 'Cerca',
      advancedSearch: 'Ricerca Avanzata',
      importPdf: 'Importa PDF',
      samples: 'Esempi',
      advanced: 'Avanzato'
    },
    job: {
      title: 'Lavoro',
      jobs: 'Lavori',
      newJob: 'Nuovo Lavoro',
      createJob: 'Crea Nuovo Lavoro',
      editJob: 'Modifica Lavoro',
      deleteJob: 'Elimina Lavoro',
      jobDetails: 'Dettagli del Lavoro',
      recentJobs: 'Lavori Recenti',
      filterJobs: 'Filtra Lavori',
      sortJobs: 'Ordina Lavori',
      noJobs: 'Nessun lavoro trovato',
      jobCreated: 'Lavoro creato con successo',
      jobUpdated: 'Lavoro aggiornato con successo',
      jobDeleted: 'Lavoro eliminato con successo',
      confirmDelete: 'Eliminare il Lavoro?',
      confirmDeleteMessage: 'Questa azione non può essere annullata. Tutti gli allegati verranno eliminati.',
      filteredResults: 'filtrato',
      quickStart: 'Avvio Rapido'
    },
    jobFields: {
      title: 'Titolo',
      customer: 'Cliente',
      location: 'Posizione',
      machineModel: 'Modello di Macchina',
      serialNo: 'Numero di Serie',
      errorCode: 'Codice Errore',
      symptoms: 'Sintomi',
      fix: 'Risoluzione',
      status: 'Stato',
      createdAt: 'Creato',
      updatedAt: 'Aggiornato'
    },
    status: {
      open: 'Aperto',
      progress: 'In Corso',
      completed: 'Completato',
      cancelled: 'Annullato',
      all: 'Tutti gli Stati'
    },
    attachments: {
      attachments: 'Allegati',
      addAttachment: 'Aggiungi Allegato',
      deleteAttachment: 'Elimina Allegato',
      noAttachments: 'Nessun allegato',
      uploadProgress: 'Caricamento in corso...',
      attachmentAdded: 'Allegato aggiunto',
      attachmentDeleted: 'Allegato eliminato',
      confirmDeleteAttachment: 'Eliminare questo allegato?'
    },
    documents: {
      documents: 'Documenti',
      document: 'Documento',
      uploadDocument: 'Carica Documento',
      deleteDocument: 'Elimina Documento',
      noDocuments: 'Nessun documento',
      documentUploaded: 'Documento caricato e indicizzato',
      documentDeleted: 'Documento eliminato',
      documentViewer: 'Visualizzatore Documenti',
      pdfOnly: 'Solo file PDF',
      selectPdf: 'Seleziona file PDF',
      enterTitle: 'Inserisci il titolo del documento',
      extractingText: 'Estrazione testo...',
      indexing: 'Indicizzazione documento...',
      uploadSuccess: 'Caricamento completato',
      uploadError: 'Caricamento fallito'
    },
    search: {
      searchPlaceholder: 'Cerca lavori e documenti...',
      searchResults: 'Risultati di Ricerca',
      noResults: 'Nessun risultato trovato',
      noResultsMessage: 'Prova con termini di ricerca diversi o controlla i filtri',
      searching: 'Ricerca in corso...',
      foundIn: 'Trovato in',
      errorCodes: 'Codici Errore',
      machineModels: 'Modelli di Macchine',
      all: 'Tutti',
      customQuery: 'Query Personalizzata',
      availableErrorCodes: 'Codici Errore Disponibili',
      availableMachineModels: 'Modelli di Macchine Disponibili',
      clickToSearch: 'Clicca per cercare',
      typeToSearch: 'Digita per cercare'
    },
    templates: {
      templates: 'Modelli',
      useTemplate: 'Usa Modello',
      saveAsTemplate: 'Salva come Modello',
      customTemplates: 'Modelli Personalizzati',
      builtInTemplates: 'Modelli Integrati',
      noTemplates: 'Nessun modello personalizzato',
      templateName: 'Nome Modello',
      templateCategory: 'Categoria',
      selectCategory: 'Seleziona categoria',
      templateApplied: 'Modello applicato',
      templateSaved: 'Modello salvato',
      templateDeleted: 'Modello eliminato',
      confirmDeleteTemplate: 'Eliminare questo modello?',
      categories: {
        hydraulic: 'Idraulico',
        electrical: 'Elettrico',
        mechanical: 'Meccanico',
        pneumatic: 'Pneumatico',
        control: 'Sistemi di Controllo',
        maintenance: 'Manutenzione'
      }
    },
    filters: {
      filterByStatus: 'Filtra per Stato',
      filterByDate: 'Filtra per Data',
      dateFrom: 'Da',
      dateTo: 'A',
      clearFilters: 'Cancella Filtri',
      showingResults: 'Mostrando',
      of: 'di',
      results: 'risultati'
    },
    sorting: {
      sortBy: 'Ordina per',
      date: 'Data',
      customer: 'Cliente',
      status: 'Stato',
      title: 'Titolo',
      ascending: 'Crescente',
      descending: 'Decrescente',
      newest: 'Più Recente',
      oldest: 'Più Vecchio'
    },
    samples: {
      loadSamples: 'Carica Dati di Esempio',
      samplesLoaded: 'Dati di esempio caricati!',
      samplesDescription: '6 lavori con 15+ allegati e 5 manuali tecnici aggiunti.',
      loadSampleData: 'Carica dati di esempio per esplorare le funzionalità',
      getStarted: 'Inizia',
      exploreFeatures: 'Esplora tutte le funzionalità con dati di esempio'
    },
    errors: {
      required: 'Questo campo è obbligatorio',
      invalidEmail: 'Indirizzo email non valido',
      invalidDate: 'Data non valida',
      fileSize: 'Il file è troppo grande',
      fileType: 'Tipo di file non valido',
      uploadFailed: 'Caricamento fallito',
      saveFailed: 'Salvataggio fallito',
      deleteFailed: 'Eliminazione fallita',
      loadFailed: 'Caricamento fallito',
      pdfParseFailed: 'Impossibile estrarre il testo dal PDF',
      networkError: 'Errore di rete'
    },
    validation: {
      titleRequired: 'Il titolo è obbligatorio',
      customerRequired: 'Il cliente è obbligatorio',
      allFieldsRequired: 'Si prega di compilare tutti i campi obbligatori'
    },
    language: {
      language: 'Lingua',
      english: 'Inglese',
      german: 'Tedesco',
      french: 'Francese',
      spanish: 'Spagnolo',
      italian: 'Italiano',
      changeLanguage: 'Cambia Lingua'
    }
  }
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}
