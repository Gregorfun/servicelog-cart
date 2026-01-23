export type Language = 'en' | 'de'

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
      changeLanguage: 'Sprache Ändern'
    }
  }
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}
