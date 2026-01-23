# Planning Guide

ServiceLog is an offline-first service journal application that enables technicians to document service jobs, attach files, import PDF documentation, and search across all content with intelligent text extraction and indexing.

**Experience Qualities**:
1. **Professional** - The interface should feel like a serious tool for service technicians, with clear information hierarchy and efficient workflows
2. **Immediate** - All actions provide instant feedback, searches are lightning-fast, and data persists automatically without explicit save actions
3. **Robust** - The application handles file uploads, PDF parsing, and complex search operations with graceful error handling and clear status communication

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a comprehensive service management system with multiple interconnected features: job CRUD operations, file attachment handling with base64 encoding, PDF text extraction using browser APIs, full-text search across multiple data types, and sophisticated state management for offline-first functionality.

## Essential Features

### Job Management
- **Functionality**: Create, read, update, and delete service job records with structured fields (title, customer, location, machine details, error codes, symptoms, fixes, status)
- **Purpose**: Provides the core data structure for documenting service work with all relevant technical details
- **Trigger**: User clicks "New Job" button or selects existing job from list
- **Progression**: Click New Job → Fill form fields → Auto-save to KV store → Job appears in list → Click job → View/edit details → Changes persist automatically
- **Success criteria**: Jobs persist across page refreshes, all fields save correctly, job list updates in real-time

### File Attachments
- **Functionality**: Upload photos and PDFs as attachments to specific jobs, stored as base64-encoded data in KV storage
- **Purpose**: Allows technicians to attach visual documentation, invoices, or reference materials to service records
- **Trigger**: User clicks "Add Attachment" button on job detail page
- **Progression**: Click Add Attachment → Select file → File converts to base64 → Upload progress indicator → File appears in attachment list → Click filename to download/view
- **Success criteria**: Multiple file types supported (images, PDFs), files persist with jobs, files can be downloaded back to original format

### PDF Document Library
- **Functionality**: Import PDF manuals/documentation, extract text content, and store in searchable library
- **Purpose**: Creates a searchable knowledge base of technical documentation accessible during service calls
- **Trigger**: User clicks "Import PDF" in navigation
- **Progression**: Click Import PDF → Enter title → Select PDF file → Text extraction begins → Progress indicator → Success confirmation → Document searchable
- **Success criteria**: PDFs parse correctly, text extraction works for standard PDFs, documents appear in search results

### Global Search
- **Functionality**: Search across all jobs and PDF documents with text snippets highlighting matched content
- **Purpose**: Enables quick retrieval of relevant information from service history and documentation
- **Trigger**: User types query in global search field and presses Enter or clicks Search
- **Progression**: Enter search term → Press Enter → Search executes across jobs and docs → Results display with snippets → Click result → Navigate to job or show document preview
- **Success criteria**: Search matches job fields (title, error codes, symptoms, fixes) and PDF content, results show relevant snippets with highlighting, search is case-insensitive

### Status Workflow
- **Functionality**: Track job status through states (Open, In Progress, Completed, Cancelled)
- **Purpose**: Provides quick visual overview of work pipeline and job states
- **Trigger**: User selects status dropdown when creating/editing job
- **Progression**: Select status → Visual indicator updates → Status persists → Job list shows status badges
- **Success criteria**: Status changes reflect immediately, visual indicators are clear and color-coded

### Sample Data Loading
- **Functionality**: Load realistic sample service jobs with photos and PDF attachments to demonstrate the application
- **Purpose**: Allows new users to immediately explore the full functionality without manually creating data
- **Trigger**: User clicks "Samples" button in header or "Load Sample Data" card when no data exists
- **Progression**: Click Samples → Sample data generates → Toast notification confirms success → Jobs and documents appear in lists
- **Success criteria**: 6 realistic jobs added with 15+ attachments (photos and PDFs), 5 technical manual PDFs, all searchable and fully interactive

## Edge Case Handling

- **Large File Uploads**: Show progress indicator, validate file size limits (10MB max), display clear error if too large
- **PDF Parse Failures**: Catch extraction errors, still save PDF metadata, show warning that text search won't work for this document
- **Empty Search Results**: Display friendly "No results found" message with suggestions to try different terms
- **Missing Required Fields**: Inline validation prevents submission, highlight missing fields in red
- **Concurrent Edits**: Last write wins (acceptable for single-user offline app), show timestamp of last update
- **Storage Quota**: Monitor KV storage usage, warn user when approaching limits, provide data export option

## Design Direction

The design should evoke a sense of **technical precision and industrial reliability**, like a digital clipboard that a service technician would confidently use in the field. The aesthetic combines clean data tables with bold status indicators, creating an interface that prioritizes information density and quick data entry over decorative elements. Color should communicate status and priority at a glance, while typography ensures readability in various lighting conditions.

## Color Selection

Industrial tech aesthetic with strong contrast and status-driven color coding.

- **Primary Color**: Deep Slate Blue (oklch(0.35 0.05 250)) - Communicates technical professionalism and trust, used for main actions and navigation
- **Secondary Colors**: 
  - Charcoal Gray (oklch(0.25 0.01 260)) for cards and secondary surfaces
  - Steel Gray (oklch(0.45 0.02 250)) for muted backgrounds
- **Accent Color**: Electric Cyan (oklch(0.75 0.15 210)) - High-tech highlight for active states, CTAs, and focus indicators
- **Status Colors**:
  - Open: Amber (oklch(0.72 0.16 70))
  - In Progress: Cyan (oklch(0.75 0.15 210))
  - Completed: Green (oklch(0.65 0.18 145))
  - Cancelled: Red (oklch(0.55 0.22 25))
- **Foreground/Background Pairings**:
  - Background Dark (oklch(0.15 0.01 260)): Light text (oklch(0.95 0.01 260)) - Ratio 13.2:1 ✓
  - Primary (oklch(0.35 0.05 250)): White text (oklch(1 0 0)) - Ratio 8.1:1 ✓
  - Accent Cyan (oklch(0.75 0.15 210)): Dark text (oklch(0.15 0.01 260)) - Ratio 11.8:1 ✓
  - Card (oklch(0.25 0.01 260)): Light text (oklch(0.95 0.01 260)) - Ratio 10.5:1 ✓

## Font Selection

The typeface should feel **technical yet approachable**, like documentation that engineers trust - monospaced where data precision matters, sans-serif where readability and hierarchy are key.

**Primary Font**: JetBrains Mono for data fields, codes, and technical content
**Secondary Font**: Inter for headings, labels, and body text

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold / 32px / -0.02em letter spacing / line-height 1.2
  - H2 (Section Headers): Inter Semibold / 24px / -0.01em / line-height 1.3
  - H3 (Job Titles): Inter Medium / 20px / normal / line-height 1.4
  - Body (Labels, descriptions): Inter Regular / 16px / normal / line-height 1.5
  - Data Fields (IDs, codes, values): JetBrains Mono Regular / 14px / normal / line-height 1.6
  - Small (Timestamps, metadata): Inter Regular / 14px / normal / line-height 1.5 / muted color

## Animations

Animations should reinforce the feeling of **precise mechanical operation** - like a well-engineered tool clicking into place. Use subtle, purposeful motion that communicates state changes and provides feedback without slowing down the workflow.

Key animations: Status badge color transitions (200ms), search result fade-in stagger (50ms delay per item), file upload progress bar smooth fill, form field focus glow pulse (300ms), modal slide-up entry (250ms with slight bounce), tab switching horizontal slide (200ms).

## Component Selection

- **Components**:
  - **Cards**: Job entries, document previews, search results - use `Card` with custom dark background and border styling
  - **Forms**: Job creation/editing - use `Input`, `Textarea`, `Select` for status dropdown, `Label` for field labels
  - **Buttons**: `Button` component with variants (default for primary actions, outline for secondary, destructive for delete)
  - **Dialogs**: `Dialog` for confirmation modals (delete job), `Sheet` for slide-in job details on mobile
  - **Badges**: `Badge` for status indicators with custom variant colors
  - **Progress**: `Progress` bar for file upload status
  - **Tabs**: `Tabs` for switching between Jobs and Documents views
  - **Search**: `Input` with search icon from Phosphor
  - **Tables**: Custom table layout using flex/grid for job lists (not shadcn Table, too heavy)

- **Customizations**:
  - Custom `StatusBadge` component with animated color transitions for job states
  - Custom `FileUploadZone` with drag-drop and progress feedback
  - Custom `SearchResultItem` with snippet highlighting using `<mark>` tags
  - Custom `JobForm` with auto-save functionality and validation feedback

- **States**:
  - Buttons: Solid bg on default, subtle border glow on hover, scale down slightly on active, opacity 50% when disabled
  - Inputs: Border color change on focus with cyan glow, red border for validation errors, gray bg when disabled
  - Cards: Subtle elevation shadow, border glow on hover (for clickable items), pressed state with slight scale
  - Upload zone: Dashed border becomes solid cyan on drag-over, green pulse on success, red shake on error

- **Icon Selection**:
  - `Briefcase` for jobs section
  - `FilePdf` for PDF documents
  - `MagnifyingGlass` for search
  - `Plus` for create actions
  - `Upload` for file uploads
  - `Pencil` for edit mode
  - `Trash` for delete actions
  - `Check` for completed status
  - `Clock` for in-progress
  - `X` for cancelled
  - `Paperclip` for attachments
  - `Download` for file downloads

- **Spacing**:
  - Page padding: `p-6` on desktop, `p-4` on mobile
  - Card padding: `p-6`
  - Form field spacing: `gap-4` between fields, `gap-2` between label and input
  - Button spacing: `gap-2` for icon + text
  - Section spacing: `gap-8` between major sections
  - List item spacing: `gap-3` in job lists

- **Mobile**:
  - Stack job list vertically on mobile (hide secondary metadata columns)
  - Sheet component slides in from bottom for job details instead of inline panel
  - Reduce padding to `p-4` globally
  - Search bar becomes full-width stacked above action buttons
  - Form fields stack vertically with full width
  - File upload zone reduces height but maintains visibility
