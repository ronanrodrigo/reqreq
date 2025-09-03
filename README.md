# SDK Version Requirements

![Tests](https://github.com/ronanrodrigo/reqreq/workflows/Deploy%20Next.js%20site%20to%20Pages/badge.svg) 
![Coverage](https://img.shields.io/badge/coverage-43.75%25-yellow)
![Tests Passing](https://img.shields.io/badge/tests-114%20passing-green)

A Next.js website that displays SDK and framework version requirements for iOS and Android platforms. This project provides developers with an easy way to check minimum OS version requirements for various mobile development SDKs.

**Built with Clean Architecture and Domain-Driven Design (DDD) principles for maintainability, testability, and scalability.**

## Features

- 🔍 **Search functionality** - Find SDKs by name
- 📱 **Platform support** - View iOS and Android version requirements
- 🏷️ **Filtering** - Filter by SDK type and programming language
- 📊 **Version history** - See multiple versions of each SDK
- ⚡ **Static site** - Fast loading with static site generation
- 🏛️ **Clean Architecture** - Proper separation of concerns and dependency inversion
- 🧩 **Domain-Driven Design** - Rich domain models with business logic encapsulation

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Clean Architecture** - Layered architecture with clear boundaries
- **Domain-Driven Design** - Rich domain models and value objects

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

To create a production build:

```bash
npm run build
```

## Architecture Overview

This project follows **Clean Architecture** and **Domain-Driven Design (DDD)** principles:

```
src/
├── domain/                    # Domain Layer (Business Logic)
│   ├── entities/             # Business Entities
│   │   ├── SDK.ts           # Main SDK aggregate
│   │   └── SDKVersion.ts    # SDK version entity
│   ├── value-objects/       # Value Objects
│   │   ├── Platform.ts      # Platform and PlatformVersion
│   │   ├── SDKIdentifiers.ts # SDKName, SDKTag, ProgrammingLanguage
│   │   └── Version.ts       # VersionNumber, ReleaseDate
│   ├── repositories/        # Repository Interfaces
│   │   └── SDKRepository.ts # SDK repository contract
│   └── services/            # Domain Services
│       ├── SDKFilterService.ts      # SDK filtering logic
│       └── VersionAnalysisService.ts # Version analysis logic
│
├── application/               # Application Layer (Use Cases)
│   ├── use-cases/           # Business Use Cases
│   │   ├── GetAllSDKsUseCase.ts
│   │   ├── GetFilteredSDKsUseCase.ts
│   │   └── GetFilterOptionsUseCase.ts
│   └── dtos/                # Data Transfer Objects
│       └── SDKDTO.ts        # SDK DTOs for external communication
│
├── infrastructure/           # Infrastructure Layer (External Concerns)
│   └── repositories/        # Repository Implementations
│       └── JSONSDKRepository.ts # JSON file-based repository
│
├── presentation/             # Presentation Layer (UI)
│   ├── components/          # React Components
│   │   ├── SDKCard.tsx      # SDK display component
│   │   ├── FilterBar.tsx    # Filtering component
│   │   ├── Modal.tsx        # Reusable modal component
│   │   └── SDKVersionTable.tsx # Version comparison table
│   ├── hooks/               # Custom React Hooks
│   │   ├── useSDKs.ts       # SDK management hook
│   │   └── useSDKCard.ts    # SDK card state management
│   ├── services/            # Presentation Services
│   │   ├── ModalService.ts  # Modal behavior management
│   │   └── PlatformDisplayService.ts # UI styling for platforms
│   └── factories/           # Dependency Injection
│       └── ServiceFactory.ts # Service creation factory
│
└── app/                      # Next.js App Router
    ├── page.tsx             # Main page using Clean Architecture
    ├── layout.tsx           # Root layout
    └── globals.css          # Global styles
```

## Clean Architecture Principles Applied

### 1. **Domain Layer** (Innermost - Business Logic)
- **Entities**: `SDK` and `SDKVersion` represent core business concepts with identity
- **Value Objects**: `SDKName`, `SDKTag`, `PlatformVersion`, etc. with validation and immutability
- **Repository Interfaces**: Define data access contracts without implementation details
- **Domain Services**: Complex business logic that spans multiple entities

### 2. **Application Layer** (Use Cases)
- **Use Cases**: Orchestrate business operations (Get SDKs, Filter SDKs, etc.)
- **DTOs**: Define data contracts between layers
- **Pure business orchestration** - No UI or infrastructure concerns

### 3. **Infrastructure Layer** (External Concerns)
- **Repository Implementations**: Concrete data access (JSON file reading, future API calls)
- **External Services**: File system access, third-party integrations

### 4. **Presentation Layer** (UI)
- **React Components**: Pure UI components with dependency injection
- **Custom Hooks**: UI state management and service orchestration
- **Services**: UI-specific concerns (modal behavior, styling)
- **Factories**: Dependency injection and service creation

## Domain-Driven Design (DDD) Concepts

### **Entities**
- `SDK`: Main aggregate root with business identity and lifecycle
- `SDKVersion`: Entity within SDK aggregate with version-specific logic

### **Value Objects**
- `SDKName`: Encapsulates name validation and formatting
- `SDKTag`: Represents categorization with business rules
- `PlatformVersion`: Immutable platform requirement specification
- `VersionNumber`: Validates version format (semantic versioning)
- `ReleaseDate`: Ensures valid dates with business constraints

### **Aggregates**
- `SDK` is the aggregate root containing `SDKVersion` entities
- Ensures business invariants and consistency boundaries
- Controls access to internal entities

### **Repository Pattern**
- `SDKRepository` interface defines data access contract
- `JSONSDKRepository` provides concrete implementation
- Enables easy swapping of data sources (JSON → Database → API)

### **Domain Services**
- `SDKFilterService`: Complex filtering logic spanning multiple entities
- `VersionAnalysisService`: Version comparison and analysis logic
- Encapsulates business rules that don't belong to a single entity

## Architecture Benefits

### **Testability**
- Domain logic is isolated and easily unit testable
- Use cases can be tested without UI or infrastructure dependencies
- Repositories and services can be mocked for testing
- Clear boundaries enable focused integration tests

### **Maintainability** 
- Clear separation of concerns across layers
- Changes to UI don't affect business logic
- Business rules are centralized in domain layer
- Single Responsibility Principle enforced

### **Flexibility**
- Easy to swap data sources (JSON → Database → API)
- UI components can be replaced without affecting business logic
- Domain logic is framework-agnostic
- Dependency Inversion enables different implementations

### **Scalability**
- New features are added as new use cases
- Domain model can grow while maintaining structure
- Clear boundaries between layers prevent coupling
- Service-oriented architecture supports microservices migration

## Data Structure

The SDK data is stored in `/public/sdks.json`. The application uses rich domain entities instead of raw JSON:

### Domain Entities Structure

```typescript
// SDK Entity (Aggregate Root)
class SDK {
  constructor(
    public readonly name: SDKName,
    public readonly language: ProgrammingLanguage,
    public readonly tags: SDKTag[],
    public readonly versions: SDKVersion[]
  ) {}

  // Business methods
  getRecentVersions(count = 5): SDKVersion[]
  getAvailablePlatforms(): string[]
  getAllVersionsWithRequirements(): SDKVersion[]
  hasVersionWithRequirements(): boolean
}

// Value Objects
class SDKName {
  constructor(public readonly value: string) {
    this.validate(); // Business validation
  }
}

class PlatformVersion {
  constructor(
    public readonly platform: string,
    public readonly version: string
  ) {
    this.validate(); // Ensures valid platform and version format
  }
}
```

### JSON Data Format
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

The infrastructure layer automatically maps JSON data to domain entities with proper validation and business logic.

## Development Patterns & Best Practices

### Dependency Injection
Components receive their dependencies through props, following the Dependency Inversion Principle:

```typescript
// Components depend on interfaces, not concrete implementations
interface SDKCardProps {
  sdk: SDK;
  versionAnalysisService: IVersionAnalysisService;
  modalService: IModalService;
  platformDisplayService: IPlatformDisplayService;
}

// Services are injected via ServiceFactory
const services = {
  versionAnalysisService: serviceFactory.createVersionAnalysisService(),
  modalService: serviceFactory.createModalService(),
  platformDisplayService: serviceFactory.createPlatformDisplayService()
};
```

### Component Composition
Complex UI components are built through composition:

```typescript
// Modal component accepts any content
<Modal isOpen={showModal} onClose={handleClose} title="SDK Versions">
  <SDKVersionTable sdk={sdk} {...services} />
</Modal>
```

### Custom Hooks for Business Logic
Business logic is encapsulated in custom hooks:

```typescript
// useSDKs hook orchestrates use cases
const { sdks, filteredSdks, loading, error, filterSDKs } = useSDKs();

// useSDKCard hook manages component state with services
const { showModal, toggleModal, getCurrentRequirements } = useSDKCard(
  sdk,
  versionAnalysisService,
  modalService
);
```

## Contributing

We welcome contributions to improve the SDK database! Here are the ways you can help:

### 🎯 Quick Contributions
- **[Add New SDK](../../issues/new?template=add-new-sdk.yml)** - Request a new SDK to be added
- **[Report Bug](../../issues/new?template=bug-report.yml)** - Found an issue? Let us know
- **[Suggest Feature](../../issues/new?template=feature-request.yml)** - Have an idea for improvement?

### 🛠️ Development Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Follow the Clean Architecture patterns:
   - Add business logic to the domain layer
   - Create use cases for new features
   - Use dependency injection for services
   - Keep components pure and testable
4. Write tests for domain entities and use cases
5. Make your changes and commit: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## Adding New SDKs

Have an SDK that's missing from our database? We'd love to add it!

### 🚀 Quick Start
1. **[Create a New SDK Request](../../issues/new/choose)** using our structured issue template
2. Fill out all required information including version history and official sources
3. Our team will review and validate the information
4. Once approved, the SDK will be added to the database

### 📝 What We Need
- Official SDK name and description
- Version history with iOS/Android requirements
- Links to official documentation
- Release dates for major versions

### 🔧 For Developers
To add SDKs directly to the database:

1. Edit `/public/sdks.json`
2. Follow the structure in our [Adding SDKs Guide](docs/ADDING_SDKS.md)
3. The domain layer will automatically:
   - Validate the data using value objects
   - Create rich domain entities with business methods
   - Apply business rules and constraints
4. Test locally with `npm run dev`
5. Submit a pull request

### SDK Data Validation
The application automatically validates:
- SDK names are not empty and properly formatted
- Version numbers follow semantic versioning
- Release dates are valid and not in the future
- Platform versions are properly formatted
- Required fields are present

## Testing Strategy

### Domain Layer Testing
```typescript
describe('SDK Entity', () => {
  it('should validate business rules', () => {
    const sdk = new SDK(name, language, tags, versions);
    expect(sdk.getRecentVersions()).toHaveLength(5);
  });
});
```

### Use Case Testing
```typescript
describe('GetFilteredSDKsUseCase', () => {
  it('should filter SDKs by criteria', async () => {
    const mockRepository = createMockRepository();
    const useCase = new GetFilteredSDKsUseCase(mockRepository, filterService);
    // Test business logic without UI dependencies
  });
});
```

### Component Testing with Mocks
```typescript
describe('SDKCard', () => {
  it('should render with injected services', () => {
    const mockServices = createMockServices();
    render(<SDKCard sdk={mockSDK} {...mockServices} />);
    // Test UI behavior with mocked dependencies
  });
});
```

## Migration from Legacy Code

This project was refactored from a simple component-based structure to Clean Architecture:

### Before (Legacy)
- Direct JSON fetching in components
- Business logic mixed with UI
- Difficult to test and maintain
- Tight coupling between layers

### After (Clean Architecture)
- Separated business logic in domain layer
- Use cases orchestrate business operations
- Dependency injection for testability
- Clear boundaries and loose coupling

The refactoring maintains the same functionality while providing better maintainability, testability, and scalability.

## License

This project is open source and available under the [MIT License](LICENSE).
