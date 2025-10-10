# Contributing to FHEVM SDK

Thank you for your interest in contributing to the FHEVM SDK! This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

- **Bug Reports**: Found a bug? Open an issue with detailed reproduction steps
- **Feature Requests**: Have an idea? Share it in the issues
- **Code Contributions**: Submit pull requests for bug fixes or new features
- **Documentation**: Improve docs, add examples, fix typos
- **Testing**: Write tests, report edge cases
- **Community**: Help others in discussions and issues

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/fhevm-react-template.git
cd fhevm-react-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build SDK

```bash
npm run build:sdk
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code style and conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### TypeScript

```typescript
// ✅ Good: Clear types and documentation
/**
 * Encrypt a value for contract input
 * @param value - Value to encrypt
 * @param type - Encryption type
 * @returns Encrypted input data
 */
export async function encryptInput(
  value: number | bigint | boolean | string,
  type?: 'uint32' | 'uint64' | 'bool' | 'address'
): Promise<EncryptedInput> {
  // Implementation
}

// ❌ Bad: No types or documentation
export async function encrypt(value, type) {
  // Implementation
}
```

### React Hooks

```typescript
// ✅ Good: Follow React hooks conventions
export function useEncryptedInput(
  type: EncryptionType = 'uint32',
  options: UseEncryptedInputOptions = {}
): UseEncryptedInputResult {
  const [encrypted, setEncrypted] = useState<EncryptedInput | null>(null);
  // ...
}

// ❌ Bad: Inconsistent naming
export function encryptInput() {
  // Not a hook
}
```

### Error Handling

```typescript
// ✅ Good: Descriptive error messages
if (!client) {
  throw new Error('FHEVM client not initialized. Call initializeFhevm() first.');
}

// ❌ Bad: Generic errors
if (!client) {
  throw new Error('Error');
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test:all

# Run SDK tests
npm run test:sdk

# Run with coverage
npm run test:sdk -- --coverage
```

### Writing Tests

```typescript
describe('encryptInput', () => {
  it('should encrypt uint32 values', async () => {
    const encrypted = await encryptInput(100, 'uint32');
    expect(encrypted).toHaveProperty('data');
    expect(encrypted).toHaveProperty('inputProof');
  });

  it('should throw error for invalid type', async () => {
    await expect(encryptInput(100, 'invalid' as any)).rejects.toThrow();
  });
});
```

## 📚 Documentation

### SDK Documentation

- Add JSDoc comments for all public APIs
- Include usage examples in comments
- Update README.md when adding features

### Example Documentation

- Add README.md to new examples
- Include setup instructions
- Provide code snippets
- Add troubleshooting section

## 🔄 Pull Request Process

### Before Submitting

1. **Test Your Changes**: Ensure all tests pass
2. **Update Documentation**: Add/update relevant docs
3. **Check Code Style**: Run linter and formatter
4. **Write Clear Commits**: Use conventional commit messages

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat: add batch encryption support"

# Bug fixes
git commit -m "fix: resolve decryption timeout issue"

# Documentation
git commit -m "docs: update SDK API reference"

# Refactoring
git commit -m "refactor: simplify encryption logic"

# Tests
git commit -m "test: add tests for useDecryption hook"
```

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please specify)

## Testing
Describe how you tested the changes

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Code follows style guidelines
- [ ] Commits follow conventional commits
```

### Review Process

1. Submit PR with clear description
2. Wait for maintainer review
3. Address review comments
4. Once approved, PR will be merged

## 🏗️ Project Structure

```
packages/fhevm-sdk/
├── src/
│   ├── client.ts      # Core client implementation
│   ├── init.ts        # Initialization logic
│   ├── encryption.ts  # Encryption utilities
│   ├── react.tsx      # React hooks
│   ├── types.ts       # TypeScript types
│   └── utils.ts       # Helper functions
└── README.md

examples/
├── nextjs-app/        # Next.js demo
└── sports-group-buying/  # Complete dApp
```

## 🎯 Areas for Contribution

### High Priority

- [ ] Add Vue.js example
- [ ] Improve error messages
- [ ] Add more unit tests
- [ ] Performance optimizations
- [ ] Better TypeScript types

### Medium Priority

- [ ] Add Node.js example
- [ ] Caching mechanisms
- [ ] Batch operations
- [ ] More utility hooks
- [ ] Integration tests

### Nice to Have

- [ ] Additional examples
- [ ] Video tutorials
- [ ] Blog posts
- [ ] Community templates
- [ ] Benchmark suite

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Try latest version
3. Create minimal reproduction

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Initialize SDK with...
2. Call function...
3. Error occurs...

**Expected behavior**
What you expected to happen

**Environment**
- SDK version: 1.0.0
- Framework: Next.js 14
- Node version: 20.0.0
- OS: Windows/Mac/Linux

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution you'd like**
Clear description of the proposed feature

**Describe alternatives you've considered**
Other approaches you've thought about

**Additional context**
Mockups, examples, or references
```

## 📞 Getting Help

- **Documentation**: Check [README.md](./README.md) and package docs
- **Examples**: See [examples/](./examples/) directory
- **Issues**: Search existing issues
- **Discord**: Join [Zama Discord](https://discord.gg/zama)

## 🎉 Recognition

Contributors will be:
- Listed in the contributors section
- Mentioned in release notes
- Credited in documentation

Thank you for contributing to FHEVM SDK! 🙏
