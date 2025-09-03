# Clean Architecture & DDD Refactoring

This project has been refactored to follow Clean Architecture and Domain-Driven Design (DDD) principles.

## Architecture Overview

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
│       └── SDKFilterService.ts # SDK filtering logic
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
│   │   └── FilterBar.tsx    # Filtering component
│   └── hooks/               # Custom React Hooks
│       └── useSDKs.ts       # SDK management hook
│
└── app/                      # Next.js App Router
    ├── page.tsx             # Main page using Clean Architecture
    └── ...
```

## Clean Architecture Principles Applied

### 1. **Domain Layer** (Innermost)
- **Entities**: `SDK` and `SDKVersion` represent core business concepts
- **Value Objects**: `SDKName`, `SDKTag`, `PlatformVersion`, etc. with validation
- **Repository Interfaces**: Define contracts without implementation details
- **Domain Services**: Business logic that doesn't belong to a single entity

### 2. **Application Layer**
- **Use Cases**: Orchestrate business operations (Get SDKs, Filter SDKs, etc.)
- **DTOs**: Define data contracts between layers
- **No UI or Infrastructure concerns**

### 3. **Infrastructure Layer** 
- **Repository Implementations**: Concrete data access (JSON file reading)
- **External Services**: API calls, file system, etc.

### 4. **Presentation Layer**
- **React Components**: UI representation
- **Custom Hooks**: UI state management
- **Adapts domain entities for display**

## DDD Concepts Implemented

### **Entities**
- `SDK`: Main aggregate root with business identity
- `SDKVersion`: Entity within SDK aggregate

### **Value Objects**
- `SDKName`: Encapsulates name validation
- `SDKTag`: Represents categorization tags
- `PlatformVersion`: Immutable platform requirement
- `VersionNumber`: Validates version format
- `ReleaseDate`: Ensures valid dates

### **Aggregates**
- `SDK` is the aggregate root containing `SDKVersion` entities
- Ensures business invariants and consistency

### **Repository Pattern**
- `SDKRepository` interface defines data access contract
- `JSONSDKRepository` provides concrete implementation
- Allows easy swapping of data sources

### **Domain Services**
- `SDKFilterService`: Complex business logic for filtering SDKs
- Encapsulates rules that span multiple entities

## Benefits of This Architecture

### **Testability**
- Domain logic is isolated and easily unit testable
- Use cases can be tested without UI or infrastructure
- Repositories can be mocked for testing

### **Maintainability** 
- Clear separation of concerns
- Changes to UI don't affect business logic
- Business rules are centralized in domain layer

### **Flexibility**
- Easy to swap data sources (JSON → Database → API)
- UI components can be replaced without affecting business logic
- Domain logic is framework-agnostic

### **Scalability**
- New features are added as new use cases
- Domain model can grow while maintaining structure
- Clear boundaries between layers

## Usage

The refactored code maintains the same functionality while providing:

1. **Better Error Handling**: Value objects validate inputs
2. **Type Safety**: Strong typing throughout all layers
3. **Single Responsibility**: Each class has one reason to change
4. **Dependency Inversion**: Higher layers depend on abstractions
5. **Encapsulation**: Business rules are protected within entities

## Migration Notes

- Old `types/sdk.ts` replaced by domain entities and value objects
- Direct JSON fetching moved to infrastructure layer
- Filtering logic extracted to domain service
- Components now work with domain entities instead of raw data
- Business logic is now testable and framework-independent
