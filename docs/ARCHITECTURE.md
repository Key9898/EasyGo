# Project Architecture - After Refactoring

## 📁 New Folder Structure

```
src/
├── 📂 types/                          # ✨ NEW - Centralized Types
│   └── index.ts                       # All TypeScript interfaces
│
├── 📂 data/                           # ✨ NEW - Centralized Data
│   └── constants.ts                   # All static data & constants
│
├── 📂 components/
│   └── 📂 Layouts/
│       ├── MainHeroBanner.tsx         # ♻️ REFACTORED
│       ├── Breadcrumb.tsx             # ♻️ REFACTORED
│       └── BookForm.tsx               # ♻️ REFACTORED
│
└── 📂 pages/
    └── 📂 Fleet/
        ├── Fleet.tsx                  # ♻️ REFACTORED
        ├── FleetHeader.tsx            # ♻️ REFACTORED
        └── FleetPagination.tsx        # ♻️ REFACTORED
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     src/types/index.ts                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  • MainHeroBannerProps    • Vehicle                   │  │
│  │  • FleetHeaderProps       • SearchParams              │  │
│  │  • BreadcrumbProps        • SortOption                │  │
│  │  • PaginationProps        • BreadcrumbPage            │  │
│  │  • BookFormProps          • ... and 15+ more          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ import type { ... }
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ MainHero     │    │ FleetHeader  │    │ Fleet.tsx    │
│ Banner.tsx   │    │ .tsx         │    │              │
└──────────────┘    └──────────────┘    └──────────────┘


┌─────────────────────────────────────────────────────────────┐
│                   src/data/constants.ts                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  • locations: string[]                                │  │
│  │  • carTypes: string[]                                 │  │
│  │  • sortOptions: SortOption[]                          │  │
│  │  • staticVehicles: Vehicle[]                          │  │
│  │  • backgroundImageMap: Record<string, string>         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ import { ... }
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ MainHero     │    │ FleetHeader  │    │ Fleet.tsx    │
│ Banner.tsx   │    │ .tsx         │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

## 📊 Before vs After Comparison

### Before Refactoring ❌

```typescript
// MainHeroBanner.tsx
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { MdLocationOn, MdCalendarToday } from 'react-icons/md'
import { FaCar } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface MainHeroBannerProps {
    onPrimaryAction?: () => void
    onNavigate?: (page: string, params?: Record<string, string>) => void
    title?: string
    description?: string
    buttonText?: string
    backgroundImgAlt?: string
    backgroundImgClass?: string
    variant?: string
    preTitleSlot?: ReactNode
    scrollTargetId?: string
    initialValues?: {
        location?: string
        pickupDate?: string
        returnDate?: string
        carType?: string
    }
}

const locations = [
    'Siam', 'Sukhumvit', 'Silom', 'Sathorn',
    'Ratchada', 'Chatuchak', 'Thonglor', 'Ekkamai',
    'Asok', 'Phrom Phong', 'Ari', 'Lat Phrao',
]

const carTypes = [
    'All Types', 'Sedan', 'SUV', 'Van',
    'Hatchback', 'Pickup', 'Luxury',
]

// ... 300+ more lines of component code
```

**Problems:**
- ❌ Mixed concerns (types + data + UI logic)
- ❌ Hard to reuse types and data
- ❌ Difficult to maintain
- ❌ Large file size

### After Refactoring ✅

```typescript
// MainHeroBanner.tsx
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { MdLocationOn, MdCalendarToday } from 'react-icons/md'
import { FaCar } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MainHeroBannerProps } from '../../types'
import { locations, carTypes, backgroundImageMap } from '../../data/constants'

// ... component code (clean and focused on UI logic)
```

**Benefits:**
- ✅ Separated concerns
- ✅ Reusable types and data
- ✅ Easy to maintain
- ✅ Smaller, focused files

## 🎯 Import Patterns

### Importing Types (Type-only imports)
```typescript
import type { Vehicle, FleetProps, SearchParams } from '../../types'
```

### Importing Data (Value imports)
```typescript
import { locations, carTypes, staticVehicles } from '../../data/constants'
```

### Importing Both
```typescript
import type { MainHeroBannerProps } from '../../types'
import { locations, carTypes, backgroundImageMap } from '../../data/constants'
```

## 📈 Code Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **MainHeroBanner.tsx** | 345 lines | ~300 lines | -45 lines |
| **FleetHeader.tsx** | 96 lines | ~90 lines | -6 lines |
| **Fleet.tsx** | 403 lines | ~350 lines | -53 lines |
| **Total LOC in components** | ~850 lines | ~740 lines | **-110 lines** |
| **Reusable type files** | 0 | 2 | **+2 files** |
| **Type definitions** | Scattered | Centralized | **100% organized** |

## 🚀 Future Scalability

With this new structure, you can easily:

1. **Add new types**: Just add to `src/types/index.ts`
2. **Add new constants**: Just add to `src/data/constants.ts`
3. **Share types**: Import anywhere in the project
4. **Maintain consistency**: Single source of truth
5. **Scale the project**: Clean architecture supports growth

## ✨ Best Practices Applied

✅ **Separation of Concerns**: Types, Data, and UI are separated
✅ **DRY Principle**: No repeated type definitions
✅ **Single Responsibility**: Each file has one clear purpose
✅ **Type Safety**: Strong typing throughout the application
✅ **Maintainability**: Easy to find and update definitions
✅ **Scalability**: Structure supports project growth

---

**Architecture designed for**: Maintainability, Scalability, and Developer Experience
