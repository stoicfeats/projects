# Stash - Twitter Bookmark Exporter & Viewer

A beautiful Twitter bookmark manager that allows you to export your Twitter bookmarks as JSON and view them in three different formats: cards, gallery, and grid.

## Features

- 📱 **Three View Modes**: Card, Gallery, and Grid layouts
- 🖼️ **Image Support**: Display images from tweets
- 📤 **JSON Upload**: Upload your Twitter bookmarks JSON file
- 🎨 **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- ⚡ **Fast & Responsive**: Optimized for performance

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- React Router for navigation

### Backend
- Node.js with Express
- Multer for file uploads
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stash
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

3. Start the development servers:
```bash
# Option 1: Use the provided script
./start-dev.sh

# Option 2: Start manually
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Upload Bookmarks**: Click the "Upload JSON" button to upload your Twitter bookmarks JSON file
2. **View Modes**: Switch between Card, Gallery, and Grid views using the toggle
3. **Browse**: Navigate through your bookmarks with images and full content

## Sample Data

A sample JSON file is included at `backend/sample-bookmarks.json` for testing purposes.

## API Endpoints

- `GET /api/bookmarks` - Get all bookmarks
- `POST /api/upload` - Upload bookmarks JSON file

## Development

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
npm run dev
```

## Project Structure

```
stash/
├── backend/
│   ├── server.js
│   ├── sample-bookmarks.json
│   └── package.json
├── src/
│   ├── components/
│   │   ├── BookmarkCard.tsx
│   │   ├── BookmarkGallery.tsx
│   │   ├── BookmarkGrid.tsx
│   │   └── BookmarkViewer.tsx
│   ├── api/
│   │   └── bookmarks.ts
│   └── ...
├── start-dev.sh
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License