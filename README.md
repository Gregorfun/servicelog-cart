# 📋 ServiceLog - Offline Service Journal

**ServiceLog** is a comprehensive, offline-first service documentation application designed for technicians and service professionals. Track service jobs, manage attachments, upload technical documents, and perform powerful searches—all without cloud dependencies.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🔧 Job Management
- **Create, edit, and delete service jobs** with detailed information:
  - Customer details and location
  - Machine model and serial numbers
  - Error codes and symptoms
  - Fix descriptions and resolution notes
  - Status tracking (Open, In Progress, Completed, Cancelled)
- **Job templates** for common service scenarios to speed up data entry
- **Save custom templates** from existing jobs for future use
- **Real-time status badges** with color-coded indicators

### 📎 Attachments
- **Upload photos and PDFs** directly to jobs
- **Base64 encoding** for true offline storage
- **Preview and download** attachments at any time
- **Organize** multiple attachments per job

### 📄 Document Management
- **Import PDF technical manuals** and documentation
- **Automatic text extraction** from PDFs for searchability
- **Document viewer** with content preview
- **Manage document library** independently from jobs

### 🔍 Advanced Search
- **Global search** across jobs and documents
- **Search by error codes** with quick filters
- **Search by machine models** for pattern recognition
- **Custom queries** with highlighted results
- **Snippet preview** showing matching content in context

### 🎯 Filtering & Sorting
- **Filter jobs by status** (multiple selections)
- **Date range filtering** (from/to dates)
- **Sort by date, customer, title, or status**
- **Ascending/descending order**
- **Live result counters** showing filtered vs. total

### 📤 Export & Import
- **Export jobs to JSON or CSV** with full data
- **Export documents** with metadata
- **Export all data** in one comprehensive backup
- **Import previously exported data** to restore or migrate
- **Automatic data normalization** during import
- **Preview import data** before committing
- **Additive imports** - new data is added to existing

### 🌍 Multi-Language Support
- **5 Languages**: English, German (Deutsch), French (Français), Spanish (Español), Italian (Italiano)
- **Language selector** in the header
- **Translated exports** in selected language
- **Persistent language preference**

### 💾 Offline-First Architecture
- **100% offline functionality** - no internet required
- **Local browser storage** using Spark KV persistence
- **No external dependencies** or cloud services
- **Data stays on your device** for privacy and security

### 🎨 Modern UI/UX
- **Dark theme** optimized for long work sessions
- **Responsive design** for desktop, tablet, and mobile
- **Smooth animations** with Framer Motion
- **Toast notifications** for user feedback
- **Keyboard shortcuts** and accessible navigation
- **Loading states** and error handling

## 🚀 Getting Started

This is a **GitHub Spark** application - no installation required! Simply:

1. **Open the Spark** in your browser
2. **Start creating jobs** immediately
3. **All data is stored locally** in your browser

### Quick Start with Sample Data

Load sample data to explore all features:
1. Click the **"Database" icon** (📊) in the header
2. Sample data includes:
   - 6 pre-configured service jobs
   - 15+ attachments (photos and reports)
   - 5 technical manuals
3. Explore filtering, sorting, search, and export features

## 📖 User Guide

### Creating a Job

1. Navigate to the **Jobs** tab
2. Fill in the job form:
   - **Title**: Brief description
   - **Customer**: Client name
   - **Location**: Service location
   - **Machine Model**: Equipment type
   - **Serial Number**: Equipment ID
   - **Error Code**: Fault code if applicable
   - **Symptoms**: Problem description
   - **Fix**: Solution details
   - **Status**: Current job status
3. Click **"Create Job"**

### Using Job Templates

**Built-in Templates:**
- Hydraulic System Failure
- Electrical Fault
- Mechanical Wear
- Pneumatic Leak
- Control System Error
- Preventive Maintenance

**Create Custom Templates:**
1. Select an existing job
2. Click **"Save as Template"**
3. Enter a template name
4. Template is saved for future use

### Adding Attachments

1. Select a job from the list
2. In the job detail panel, click **"Add Attachment"**
3. Choose a photo or PDF file
4. File is uploaded and stored locally
5. Click attachment name to view/download

### Importing Documents

1. Click **"PDF Import"** in the header
2. Enter a document title
3. Select a PDF file
4. Text is automatically extracted and indexed
5. Document is searchable immediately

### Using Search

**Global Search:**
- Type in the header search box
- Press Enter or click **Search**
- Results show jobs and documents with snippets

**Advanced Search:**
- Click the **Funnel icon** in the header
- Browse error codes and machine models
- Click tags to search
- Enter custom queries

### Filtering Jobs

1. Use the **"Filter Jobs"** panel
2. Select one or more statuses
3. Set date range (optional)
4. Results update automatically
5. Counter shows filtered/total jobs

### Exporting Data

1. Click **"Export"** button in header
2. Choose what to export:
   - **Jobs only** (with attachments)
   - **Documents only**
   - **All data** (complete backup)
3. Select format (JSON or CSV)
4. Click **Export** to download
5. File is saved with timestamp

### Importing Data

1. Click **"Import"** button in header
2. Click **"Choose JSON file"**
3. Select a previously exported file
4. Preview shows what will be imported
5. Click **Import** to add data
6. Imported data is added to existing data

## 🗂️ Data Structure

### Job
```typescript
{
  id: string
  createdAt: string (ISO 8601)
  updatedAt: string (ISO 8601)
  title: string
  customer: string
  location: string
  machineModel: string
  serialNo: string
  errorCode: string
  symptoms: string
  fix: string
  status: 'open' | 'in-progress' | 'completed' | 'cancelled'
}
```

### Attachment
```typescript
{
  id: string
  jobId: string
  filename: string
  mimeType: string
  data: string (base64)
  createdAt: string (ISO 8601)
}
```

### Document
```typescript
{
  id: string
  title: string
  filename: string
  content: string (extracted text)
  createdAt: string (ISO 8601)
}
```

## 🔐 Privacy & Security

- **All data is stored locally** in your browser
- **No cloud synchronization** or external transmissions
- **No user accounts** or authentication required
- **No tracking** or analytics
- **Your data stays on your device**

### Data Persistence

- Data is stored using the **Spark KV** API
- Storage is persistent across browser sessions
- Clearing browser data will erase ServiceLog data
- **Regular exports recommended** for backups

## 🛠️ Technical Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Framer Motion** for animations
- **Phosphor Icons** for UI icons

### Storage
- **Spark KV** persistence API
- Browser-based key-value storage
- Automatic serialization/deserialization

### PDF Processing
- Client-side PDF text extraction
- Full-text content indexing
- Snippet generation for search results

## 🎨 Customization

### Theme Colors

The application uses a dark theme with the following color palette:

- **Background**: Deep blue-grey (`oklch(0.15 0.01 260)`)
- **Primary**: Muted purple-blue (`oklch(0.35 0.05 250)`)
- **Accent**: Bright cyan (`oklch(0.75 0.15 210)`)
- **Status Colors**:
  - Open: Yellow-green (`oklch(0.72 0.16 70)`)
  - In Progress: Cyan (`oklch(0.75 0.15 210)`)
  - Completed: Green (`oklch(0.65 0.18 145)`)
  - Cancelled: Red (`oklch(0.55 0.22 25)`)

### Typography

- **Sans Serif**: Inter (primary UI font)
- **Monospace**: JetBrains Mono (code and technical content)

## 📱 Browser Compatibility

ServiceLog works in all modern browsers:

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**Requirements:**
- JavaScript enabled
- Local storage enabled
- Modern browser (released within last 2 years)

## 🔄 Version History

### Version 1.0.0
- Initial release
- Job management with CRUD operations
- Attachment upload and storage
- PDF document import with text extraction
- Global and advanced search
- Filtering and sorting
- Job templates (built-in and custom)
- Multi-language support (5 languages)
- Export functionality (JSON/CSV)
- Import functionality (JSON)
- Dark theme UI
- Responsive design

## 🤝 Contributing

ServiceLog is built with GitHub Spark. To contribute or customize:

1. Fork/clone the Spark
2. Make your changes
3. Test thoroughly
4. Share your improvements

## 📄 License

MIT License - Copyright GitHub, Inc.

ServiceLog template files and resources are licensed under the MIT license.

## 🆘 Support & Troubleshooting

### Common Issues

**Q: My data disappeared!**  
A: Check if browser data was cleared. ServiceLog stores data locally. Always export backups regularly.

**Q: PDF upload fails**  
A: Ensure the file is a valid PDF and not corrupted. Try a smaller file.

**Q: Search returns no results**  
A: Check spelling, try different keywords, or use advanced search with error codes.

**Q: Import shows "Invalid format"**  
A: Ensure you're importing a JSON file exported from ServiceLog.

**Q: Language doesn't change**  
A: Refresh the page. Language preference is saved automatically.

### Performance Tips

- **Export old jobs** periodically to archive data
- **Delete unused attachments** to save space
- **Limit document uploads** to essential PDFs only
- **Use filtering** instead of scrolling through all jobs

## 🚧 Roadmap

Potential future enhancements:

- PDF generation for job reports
- Parts inventory tracking
- Time tracking per job
- Customer management module
- Calendar view for scheduled jobs
- Offline map integration for locations
- QR code generation for jobs
- Signature capture for job completion

---

**Built with ❤️ using GitHub Spark**

*Last updated: 2024*
