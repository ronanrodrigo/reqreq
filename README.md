# SDK Version Requirements

A Next.js website that displays SDK and framework version requirements for iOS and Android platforms. This project provides developers with an easy way to check minimum OS version requirements for various mobile development SDKs.

## Features

- 🔍 **Search functionality** - Find SDKs by name
- 📱 **Platform support** - View iOS and Android version requirements
- 🏷️ **Filtering** - Filter by SDK type and programming language
- 📊 **Version history** - See multiple versions of each SDK
- ⚡ **Static site** - Fast loading with static site generation
- 🚀 **GitHub Pages ready** - Automated deployment to GitHub Pages

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Static Export** - Pre-built static files for optimal performance

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd reqreq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create a production build with static export:

```bash
npm run build
```

This will generate static files in the `out` directory.

## Data Structure

The SDK data is stored in `/public/sdks.json` with the following structure:

```json
[
  {
    "name": "React Native",
    "type": "framework",
    "language": "JavaScript",
    "versions": [
      {
        "version": "0.64.0",
        "releaseDate": "2021-09-15",
        "platformVersions": [
          {
            "platform": "iOS",
            "version": "10.0"
          },
          {
            "platform": "Android",
            "version": "5.0"
          }
        ]
      }
    ]
  }
]
```

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions:

1. Push your code to the `main` or `master` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://username.github.io/repository-name`

### Manual Deployment

For manual deployment to other platforms:

1. Build the project: `npm run build`
2. Deploy the contents of the `out` directory to your hosting provider

## Project Structure

```
├── .github/
│   └── workflows/
│       └── nextjs.yml          # GitHub Pages deployment
├── public/
│   └── sdks.json              # SDK data
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/
│   │   ├── FilterBar.tsx      # Search and filter component
│   │   └── SDKCard.tsx        # SDK display component
│   └── types/
│       └── sdk.ts             # TypeScript interfaces
├── next.config.ts             # Next.js configuration
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Adding New SDKs

To add new SDKs to the database:

1. Edit `/public/sdks.json`
2. Add your SDK following the existing data structure
3. Include all relevant versions with their platform requirements
4. Test locally with `npm run dev`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
