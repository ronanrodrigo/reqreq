# Adding New SDKs - Maintainer Guide

This guide explains how to process new SDK requests and add them to the database.

## Process Overview

1. **Review the Issue**: Check the submitted issue for completeness and accuracy
2. **Validate Information**: Verify the data against official sources
3. **Update JSON**: Add the SDK to `public/sdks.json`
4. **Test Changes**: Run tests to ensure data integrity
5. **Deploy**: Merge changes to trigger deployment

## JSON Structure

When adding a new SDK to `public/sdks.json`, follow this structure:

```json
{
  "name": "SDK Name",
  "identifiers": ["sdk-slug", "alternative-name"],
  "language": "Primary Language",
  "versions": [
    {
      "version": "X.Y.Z",
      "releaseDate": "YYYY-MM-DD",
      "requirements": [
        {
          "platform": "ios",
          "version": "X.Y"
        },
        {
          "platform": "android", 
          "version": "XX"
        }
      ]
    }
  ]
}
```

## Validation Checklist

Before adding a new SDK, verify:

- [ ] **Official Sources**: All version requirements come from official documentation
- [ ] **Accuracy**: Version numbers and dates are correct
- [ ] **Completeness**: All major versions with requirement changes are included
- [ ] **Format**: JSON structure follows the existing pattern
- [ ] **Testing**: Run `npm test` to ensure data passes validation
- [ ] **Uniqueness**: SDK is not already in the database

## Platform Version Formats

### iOS Versions
- Use format: `"12.0"`, `"13.0"`, `"14.0"`
- Always include minor version (e.g., `"12.0"` not `"12"`)

### Android Versions  
- Use API level numbers: `"21"`, `"23"`, `"24"`
- Not Android version names (use `"21"` not `"5.0"`)

## Common Issues

### Missing Information
- If version history is incomplete, research official changelogs
- Check GitHub releases, documentation sites, and developer blogs
- When in doubt, ask for clarification in the issue

### Conflicting Sources
- Prioritize official documentation over third-party sources  
- Cross-reference multiple official sources when possible
- Document any uncertainties in issue comments

### Date Formats
- Always use ISO format: `YYYY-MM-DD`
- If exact date is unknown, use the first day of the release month
- Add a comment in the issue if date is approximate

## Testing

After adding a new SDK:

```bash
# Run all tests
npm test

# Run specific tests
npm run test:coverage

# Check JSON validation
npm run build
```

## Deployment

1. Create a pull request with the changes
2. Ensure all tests pass in CI
3. Get review approval
4. Merge to main branch
5. Automatic deployment will update the live site

## Example Addition

Here's an example of adding a new SDK:

```json
{
  "name": "Example SDK",
  "identifiers": ["example-sdk", "examplesdk"],
  "language": "Swift",
  "versions": [
    {
      "version": "3.0.0",
      "releaseDate": "2023-06-01", 
      "requirements": [
        {
          "platform": "ios",
          "version": "13.0"
        },
        {
          "platform": "android",
          "version": "23"
        }
      ]
    },
    {
      "version": "2.5.0",
      "releaseDate": "2023-01-15",
      "requirements": [
        {
          "platform": "ios", 
          "version": "12.0"
        },
        {
          "platform": "android",
          "version": "21"
        }
      ]
    }
  ]
}
```

## Need Help?

If you have questions about processing SDK requests:
- Check existing SDKs in `public/sdks.json` for examples
- Review the Clean Architecture documentation in the README
- Ask questions in GitHub Discussions
