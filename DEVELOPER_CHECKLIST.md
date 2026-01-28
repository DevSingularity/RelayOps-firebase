# Developer Checklist - Code Organization Standards

This checklist should be used for all new code development to maintain the standards established during the cleanup.

---

## Pre-Development Checklist

### Project Setup
- [ ] Latest code pulled from repository
- [ ] Dependencies installed: `npm install`
- [ ] Build verified: `npm run build` (succeeds)
- [ ] Dev server starts: `npm run dev`
- [ ] No console errors on startup

### Understanding Standards
- [ ] Read CODE_ORGANIZATION_GUIDE.md
- [ ] Understand import ordering rules
- [ ] Know barrel export locations
- [ ] Familiar with naming conventions

---

## During Development

### Import Writing
- [ ] All imports use **single quotes** only
- [ ] Imports organized: external → internal
- [ ] Blank line between import groups
- [ ] Related imports grouped together
- [ ] Absolute paths used for non-local imports (if configured)

### Code Quality
- [ ] Only import what you use
- [ ] Remove unused imports regularly
- [ ] No commented-out imports
- [ ] No default React import (unless needed)
- [ ] No circular dependencies

### File Organization
- [ ] New files in appropriate folder
- [ ] Related files in same directory
- [ ] index.js created if 3+ files in folder
- [ ] Proper exports in barrel files

---

## Testing Before Commit

### Syntax & Linting
- [ ] No syntax errors: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] No import-related warnings

### Functionality
- [ ] Feature works as expected
- [ ] No console errors in browser
- [ ] No console warnings
- [ ] All imports resolve correctly
- [ ] No 404 errors for imports

### Import Verification
- [ ] All imports are valid paths
- [ ] All imported items exist
- [ ] No typos in import paths
- [ ] Barrel exports properly configured
- [ ] Circular dependencies checked

---

## Code Review Checklist

### Reviewer: Import Organization
- [ ] Imports in correct order
- [ ] Single quotes used throughout
- [ ] Blank lines between groups
- [ ] No unused imports
- [ ] No unnecessary React imports

### Reviewer: Standards Compliance
- [ ] Files in appropriate directories
- [ ] Naming conventions followed
- [ ] Barrel exports used properly
- [ ] No direct imports from folders with index.js
- [ ] Documentation added if needed

### Reviewer: Quality Assurance
- [ ] Build still succeeds
- [ ] No new console errors
- [ ] No new console warnings
- [ ] Code is maintainable
- [ ] Code is consistent with rest of codebase

---

## Example: Creating New Component

### Step 1: Plan Structure
```
components/
  ├── projects/
  │   ├── index.js
  │   ├── ProjectStatus.jsx  (NEW)
  │   └── ProjectCard.jsx
```

### Step 2: Write Component
```jsx
// ✅ CORRECT
import { useSelector } from 'react-redux';
import { CheckCircle, Clock } from 'lucide-react';

import { Component } from '../components';

export default function ProjectStatus() {
  const workspace = useSelector(state => state.workspace);
  // ...
}
```

### Step 3: Update Barrel Export
```jsx
// components/projects/index.js
export { ProjectStatus } from './ProjectStatus';
export { ProjectCard } from './ProjectCard';
```

### Step 4: Use in Other Files
```jsx
// ✅ CORRECT - Using barrel export
import { ProjectStatus, ProjectCard } from '../../components';

// ❌ INCORRECT - Direct import
import ProjectStatus from '../../components/projects/ProjectStatus';
```

### Step 5: Verify
```bash
npm run build  # Check for errors
npm run lint   # Check for warnings
```

---

## Example: Fixing Import Issues

### Issue 1: Double Quotes
```jsx
// ❌ BEFORE
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

// ✅ AFTER
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
```

### Issue 2: Wrong Import Order
```jsx
// ❌ BEFORE
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useDispatch } from 'react-redux';

// ✅ AFTER
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bell } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
```

### Issue 3: Unused Imports
```jsx
// ❌ BEFORE
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
  // useEffect, useRef, useNavigate never used!
}

// ✅ AFTER
import { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

### Issue 4: Missing Blank Lines
```jsx
// ❌ BEFORE
import { useState } from 'react';
import { Button } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// ✅ AFTER
import { useState } from 'react';
import { Button } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
```

---

## Common Questions

### Q: Should I use barrel exports for everything?
**A:** No. Use barrel exports when:
- Folder has 3+ related files
- Files are always imported together
- It makes imports significantly cleaner

Don't use for:
- Single file folders
- Utility functions (keep direct imports)
- Complex parent-child relationships

### Q: Can I use path aliases?
**A:** Currently not configured. Check with team about vite.config.js setup before using.

### Q: What about absolute imports?
**A:** Not currently configured. Use relative imports as shown in examples.

### Q: Where do environment variables go?
**A:** Use `.env` file for configuration, access with `import.meta.env`.

### Q: How do I handle circular imports?
**A:** Restructure to avoid:
- Move shared code to parent component
- Use context/store for state instead
- Create new utility file if both depend on it

---

## Quick Reference: Import Order

```jsx
// 1️⃣ React Hooks
import { useState, useEffect, useRef } from 'react';

// 2️⃣ React Router (if used)
import { useNavigate, Link } from 'react-router-dom';

// 3️⃣ Redux (if used)
import { useDispatch, useSelector } from 'react-redux';

// 4️⃣ External Libraries
import axios from 'axios';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Icon, Icon2 } from 'lucide-react';
import { Button } from '@mui/material';

// (BLANK LINE)

// 5️⃣ Internal: Contexts
import { useAuth } from '../../contexts/AuthContext';

// 6️⃣ Internal: Store/Redux
import { updateSetting } from '../../store';

// 7️⃣ Internal: Components
import { Button, Input } from '../../components';

// 8️⃣ Internal: Assets/Data
import { assets, dummyData } from '../../assets/assets';

// 9️⃣ Internal: Styles
import muiTheme from '../../styles/muiTheme';
```

---

## Performance Tips

### Good Practices
- ✅ Import only what you need
- ✅ Use barrel exports for cleaner imports
- ✅ Remove unused code before committing
- ✅ Use dynamic imports for large components

### Avoid These
- ❌ Importing entire modules (`import *`)
- ❌ Circular dependencies
- ❌ Deep nested folders (hard to navigate)
- ❌ Unused imports (slower builds)

---

## Tools That Help

### VSCode Extensions
- **ESLint** - Catches common issues
- **Prettier** - Formats code automatically
- **Import Cost** - Shows bundle impact
- **Thunder Client** - API testing

### Commands
```bash
npm run lint      # Check code quality
npm run build     # Verify build
npm run dev       # Start dev server
npm run preview   # Preview production build
```

---

## Troubleshooting

### Problem: Build fails with "Cannot find module"
**Solution**: 
1. Check file path is correct
2. Verify file exists
3. Check for typos
4. Clear node_modules: `rm -rf node_modules && npm install`

### Problem: Component not showing up
**Solution**:
1. Verify import path
2. Check barrel export includes it
3. Verify component is exported
4. Check console for errors

### Problem: Multiple versions of package
**Solution**:
1. Check for duplicate imports
2. Clear npm cache: `npm cache clean --force`
3. Reinstall: `npm install`

### Problem: Circular dependency warning
**Solution**:
1. Identify which files depend on each other
2. Move shared code to parent/utility
3. Use store/context instead of prop drilling

---

## Resources

### Documentation
- CODE_ORGANIZATION_GUIDE.md - Detailed standards
- PROJECT_STRUCTURE.md - Folder organization
- CLEANUP_VERIFICATION.md - What was cleaned

### External References
- [React Docs](https://react.dev)
- [ES6 Modules](https://javascript.info/modules)
- [Vite Docs](https://vitejs.dev)
- [Redux Docs](https://redux.js.org)

---

## Sign Off

By following this checklist, you're maintaining code quality and ensuring:
- ✅ Consistent code style
- ✅ Clean imports
- ✅ Better maintainability
- ✅ Easier collaboration
- ✅ Professional codebase

**Thank you for keeping our code organized!** 🚀

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: Active & Maintained
