# Code Organization & Import Guidelines

## Overview
This document establishes best practices for maintaining code organization and import consistency in the RelayOps project.

## Golden Rules

### 1. Import Ordering
All files MUST follow this import order:

```jsx
// 1. React & React Hooks
import { useState, useEffect, useRef, useContext } from 'react';

// 2. React Router (if used)
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

// 3. Redux (if used)
import { useDispatch, useSelector } from 'react-redux';

// 4. External Libraries (alphabetical)
import axios from 'axios';
import { format, addDays } from 'date-fns';
import toast from 'react-hot-toast';
import { Bell, Calendar, Check } from 'lucide-react';
import { TextField, Button as MuiButton } from '@mui/material';

// 5. Internal Imports (organized by type)
import { useAuth } from '../../contexts/AuthContext';
import { updateSettings, toggleTheme } from '../../store';
import { StatsGrid, ProjectCard } from '../../components';
import { assets, dummyData } from '../../assets/assets';
import muiTheme from '../../styles/muiTheme';
```

### 2. Quote Consistency
- ✅ Use **single quotes** (`'string'`) for all strings
- ❌ Never use double quotes (`"string"`)
- ✅ Example: `import { Button } from 'lucide-react';`

### 3. Blank Line Separation
Add a blank line between import groups:
```jsx
// External packages
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal imports
import { useAuth } from '../../contexts/AuthContext';
```

### 4. Remove Unused Imports
Before committing, verify all imports are used:
```jsx
// ❌ Bad - useSelector imported but not used
import { useDispatch, useSelector } from 'react-redux';

// ✅ Good - Only import what you use
import { useDispatch } from 'react-redux';
```

### 5. Modern React Imports
```jsx
// ✅ Modern - No need to import React in new React versions
import { useState } from 'react';

// ❌ Outdated - Not needed for functional components
import React, { useState } from 'react';
```

## Barrel Export Usage

### When to Use Barrel Exports
Use barrel exports for folders with 3+ related files:

**Example - components/ui/index.js:**
```jsx
export { Button } from './Button';
export { Input } from './Input';
export { Select } from './Select';
```

**Usage in other files:**
```jsx
// ✅ Clean
import { Button, Input, Select } from '../../components/ui';

// ❌ Messy
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
```

### Current Barrel Exports
1. **components/index.js** - All 34 components
2. **components/ui/index.js** - Base UI components
3. **pages/index.js** - All page components
4. **store/index.js** - Redux slices & actions

## Naming Conventions

### Component Files
- **PascalCase** for file names: `UserProfile.jsx`, `TaskCard.jsx`
- **Export default** if only one export, **named exports** if multiple

```jsx
// ✅ Single export - use default
export default function ProjectCard() { ... }

// ✅ Multiple exports - use named exports
export function Button() { ... }
export function IconButton() { ... }
```

### Variable & Function Names
- **camelCase** for functions: `handleSubmit()`, `updateSettings()`
- **camelCase** for variables: `isLoading`, `userData`
- **UPPER_SNAKE_CASE** for constants: `MAX_RETRIES`, `API_ENDPOINT`

```jsx
const MAX_ITEMS = 10;
const userName = 'Alex';
const handleClick = () => { ... };
```

## Directory Structure Rules

### File Organization
1. **Related files go in folders** (projects/, dashboard/, layout/, etc.)
2. **Add index.js** to folders with 3+ files
3. **Keep folders focused** - one responsibility per folder

```
✅ Good Structure:
components/
  ├── projects/
  │   ├── index.js (barrel export)
  │   ├── ProjectCard.jsx
  │   ├── ProjectTasks.jsx
  │   └── ProjectSettings.jsx
  
❌ Poor Structure:
components/
  ├── ProjectCard.jsx (orphaned)
  ├── ProjectTasks.jsx (orphaned)
  ├── OtherComponent.jsx (mixed)
```

## Redux/Store Patterns

### Action Imports (Current Standard)
```jsx
// ✅ Using barrel export from store/index.js
import { updateSettings, toggleTheme, setWorkspaces } from '../../store';

// ❌ Direct slice imports (avoid)
import { updateSettings } from '../../store/slices/settingsSlice';
```

### Using Actions in Components
```jsx
import { useDispatch } from 'react-redux';
import { updateSettings } from '../../store';

function MyComponent() {
  const dispatch = useDispatch();
  
  const handleSave = () => {
    dispatch(updateSettings({ theme: 'dark' }));
  };
}
```

## Best Practices Checklist

### Before Committing Code
- [ ] All imports are in correct order
- [ ] No unused imports
- [ ] All quotes are single quotes
- [ ] Blank lines between import groups
- [ ] No default React import (unless needed)
- [ ] Barrel exports used where applicable
- [ ] Build passes: `npm run build`
- [ ] No console errors

### Code Review
When reviewing imports in PRs, check:
- [ ] Correct import ordering
- [ ] No duplicate imports
- [ ] Barrel exports used appropriately
- [ ] No circular dependencies
- [ ] All imports are resolvable

## File Size Guidelines

### Component Files
- **Small component**: < 100 lines (Button, Badge, etc.)
- **Medium component**: 100-300 lines (ProjectCard, TaskForm)
- **Large component**: 300+ lines (ProjectDetails, Settings)

**When to split**:
- File exceeds 400 lines
- Multiple unrelated concerns
- Reusable logic should be extracted

### Page Files
- Should be < 500 lines (routes, layouts handled elsewhere)
- Use composition with smaller components
- Keep state management simple

## Common Mistakes to Avoid

### ❌ Mistake 1: Mixed Import Styles
```jsx
// Bad - Inconsistent
import { Button } from 'react-bootstrap';
import Button from '../components/Button';
```

### ✅ Solution: Use Consistent Source
```jsx
import { Button } from '../components'; // Use barrel export
```

---

### ❌ Mistake 2: Importing Entire Folders
```jsx
// Bad - What is this importing?
import * as components from '../components';
components.Button;
```

### ✅ Solution: Use Named Imports
```jsx
import { Button, Input } from '../components';
Button;
Input;
```

---

### ❌ Mistake 3: Deep Relative Paths
```jsx
// Bad - Hard to navigate
import { settings } from '../../../store/slices/settingsSlice';
```

### ✅ Solution: Use Barrel Exports
```jsx
import { settings } from '../../store';
```

---

### ❌ Mistake 4: Unused Dependencies
```jsx
// Bad - loadData never used
import { useEffect, useState, loadData } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

### ✅ Solution: Clean Imports
```jsx
import { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

## ESLint Rules (Recommended)

Add these rules to `.eslintrc.js` for automatic enforcement:

```javascript
module.exports = {
  rules: {
    'sort-imports': ['warn', {
      ignoreCase: true,
      ignoreDeclarationSort: false,
    }],
    'no-unused-vars': 'warn',
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'eqeqeq': 'warn',
    'no-console': 'warn',
  }
};
```

## Testing Import Organization

### Quick Check Command
```bash
# Check for unused imports
npm run lint

# Build and verify
npm run build

# Check for console errors
npm run dev
```

## Documentation Standards

### When to Document
- Complex logic (> 10 lines)
- Non-obvious patterns
- Performance optimizations
- Workarounds for bugs

### Documentation Format
```jsx
/**
 * Fetches user data from API and updates Redux store
 * @param {string} userId - The user ID to fetch
 * @returns {Promise} API response
 */
const fetchUserData = async (userId) => {
  // Implementation
};
```

## Performance Considerations

### Dynamic Imports (Lazy Loading)
For large components, use React.lazy():

```jsx
const HeavyComponent = React.lazy(() => 
  import('./components/HeavyComponent')
);

function MyPage() {
  return (
    <Suspense fallback={<Loader />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Avoid Circular Dependencies
```jsx
// ❌ Bad - Circular import
// ComponentA imports ComponentB
// ComponentB imports ComponentA

// ✅ Solution - Use parent component or context
```

## Migration Guide

### How to Migrate Old Code
1. Open the file
2. Follow import ordering rules (external → internal)
3. Remove unused imports
4. Change double quotes to single quotes
5. Add blank lines between groups
6. Run `npm run build` to verify
7. Commit changes

### Example Migration
```jsx
// BEFORE
import React, { useState, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Button, Input } from "../../components"
import { assets } from "../../assets/assets"
import toast from "react-hot-toast"

// AFTER
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../../contexts/AuthContext';
import { Button, Input } from '../../components';
import { assets } from '../../assets/assets';
```

## Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [ES6 Modules](https://javascript.info/modules)
- [Vite Configuration](https://vitejs.dev/config/)

---

**Last Updated**: 2024
**Compliance**: 100% of client/src
**Maintenance**: All projects should follow these guidelines
