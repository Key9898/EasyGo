# Quick Reference Guide - Using Centralized Types & Data

## 📚 Table of Contents
1. [Importing Types](#importing-types)
2. [Importing Data](#importing-data)
3. [Available Types](#available-types)
4. [Available Constants](#available-constants)
5. [Common Patterns](#common-patterns)

---

## 🔷 Importing Types

### Basic Import
```typescript
import type { Vehicle } from '../../types'
```

### Multiple Types
```typescript
import type { Vehicle, FleetProps, SearchParams } from '../../types'
```

### From Different Locations
```typescript
// From components/Layouts/
import type { MainHeroBannerProps } from '../../types'

// From pages/Fleet/
import type { FleetProps } from '../../types'
```

---

## 📦 Importing Data

### Basic Import
```typescript
import { locations } from '../../data/constants'
```

### Multiple Constants
```typescript
import { locations, carTypes, sortOptions } from '../../data/constants'
```

### All Constants
```typescript
import { 
    locations, 
    carTypes, 
    sortOptions, 
    staticVehicles, 
    backgroundImageMap 
} from '../../data/constants'
```

---

## 📋 Available Types

### Component Props Types
```typescript
MainHeroBannerProps      // Props for MainHeroBanner component
FleetHeaderProps         // Props for FleetHeader component
FleetProps              // Props for Fleet page
PaginationProps         // Props for pagination component
BreadcrumbProps         // Props for breadcrumb component
BookFormProps           // Props for booking form
UserPanelProps          // Props for user panel
HeaderProps             // Props for header component
```

### Data Model Types
```typescript
Vehicle                 // Vehicle/Car object structure
Car                     // Car entity from Firestore
Booking                 // Booking entity
Inquiry                 // Customer inquiry entity
Notification            // Notification entity
```

### Utility Types
```typescript
SearchParams            // Search parameters (location, dates, carType)
SearchData              // Search form data
SortOption              // Sort dropdown option
BreadcrumbPage          // Breadcrumb page item
ContactItem             // Contact information item
```

---

## 📊 Available Constants

### Location Data
```typescript
import { locations } from '../../data/constants'

// Array of Bangkok districts
locations = [
    'Siam', 'Sukhumvit', 'Silom', 'Sathorn',
    'Ratchada', 'Chatuchak', 'Thonglor', 'Ekkamai',
    'Asok', 'Phrom Phong', 'Ari', 'Lat Phrao'
]
```

### Car Types
```typescript
import { carTypes } from '../../data/constants'

// Array of vehicle categories
carTypes = [
    'All Types', 'Sedan', 'SUV', 'Van',
    'Hatchback', 'Pickup', 'Luxury'
]
```

### Sort Options
```typescript
import { sortOptions } from '../../data/constants'

// Array of sort options for dropdowns
sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
]
```

### Static Vehicles
```typescript
import { staticVehicles } from '../../data/constants'

// Array of 6 pre-defined vehicles
staticVehicles: Vehicle[] = [
    { id: 1, name: 'Toyota Camry 2024', category: 'Sedan', ... },
    { id: 2, name: 'Honda CR-V 2024', category: 'SUV', ... },
    // ... 4 more vehicles
]
```

### Background Images
```typescript
import { backgroundImageMap } from '../../data/constants'

// Map of page variants to background images
backgroundImageMap = {
    fleet: "bg-[url('...')]",
    certified: "bg-[url('...')]",
    subscription: "bg-[url('...')]",
    guide: "bg-[url('...')]",
    home: "bg-[url('...')]"
}
```

---

## 💡 Common Patterns

### Pattern 1: Component with Props Type
```typescript
import type { FleetHeaderProps } from '../../types'

export default function FleetHeader({ 
    totalVehicles, 
    sortBy, 
    onSortChange 
}: FleetHeaderProps) {
    // Component logic
}
```

### Pattern 2: Using Data in Component
```typescript
import { locations, carTypes } from '../../data/constants'

export default function SearchForm() {
    return (
        <select>
            {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
            ))}
        </select>
    )
}
```

### Pattern 3: Combining Types and Data
```typescript
import type { MainHeroBannerProps } from '../../types'
import { locations, carTypes, backgroundImageMap } from '../../data/constants'

export default function MainHeroBanner(props: MainHeroBannerProps) {
    // Use both types and data
    const bgClass = backgroundImageMap[props.variant || 'home']
    
    return (
        <div>
            {locations.map(loc => <option key={loc}>{loc}</option>)}
        </div>
    )
}
```

### Pattern 4: Type-safe State
```typescript
import type { SearchParams, Vehicle } from '../../types'
import { staticVehicles } from '../../data/constants'

export default function Fleet() {
    const [searchParams, setSearchParams] = useState<SearchParams>({})
    const [vehicles, setVehicles] = useState<Vehicle[]>(staticVehicles)
    
    // Type-safe operations
}
```

### Pattern 5: Filtering with Constants
```typescript
import type { Vehicle } from '../../types'
import { carTypes } from '../../data/constants'

function filterVehicles(vehicles: Vehicle[], type: string) {
    if (type === carTypes[0]) return vehicles // 'All Types'
    return vehicles.filter(v => v.category === type)
}
```

---

## 🎨 Real-World Examples

### Example 1: Search Widget
```typescript
import type { SearchData } from '../../types'
import { locations, carTypes } from '../../data/constants'

export default function SearchWidget() {
    const [data, setData] = useState<SearchData>({
        location: '',
        pickupDate: '',
        returnDate: '',
        carType: carTypes[0] // 'All Types'
    })
    
    return (
        <form>
            <select value={data.location}>
                {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                ))}
            </select>
            
            <select value={data.carType}>
                {carTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </form>
    )
}
```

### Example 2: Sort Dropdown
```typescript
import type { SortOption } from '../../types'
import { sortOptions } from '../../data/constants'

export default function SortDropdown() {
    const [selected, setSelected] = useState(sortOptions[0].value)
    
    return (
        <select value={selected} onChange={e => setSelected(e.target.value)}>
            {sortOptions.map((opt: SortOption) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    )
}
```

### Example 3: Vehicle List
```typescript
import type { Vehicle } from '../../types'
import { staticVehicles } from '../../data/constants'

export default function VehicleList() {
    const [vehicles] = useState<Vehicle[]>(staticVehicles)
    
    return (
        <div>
            {vehicles.map((vehicle: Vehicle) => (
                <div key={vehicle.id}>
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.category}</p>
                    <p>{vehicle.price}</p>
                </div>
            ))}
        </div>
    )
}
```

---

## ⚡ Quick Tips

1. **Always use type-only imports for types**
   ```typescript
   import type { Vehicle } from '../../types'  // ✅ Good
   import { Vehicle } from '../../types'       // ❌ Avoid
   ```

2. **Import only what you need**
   ```typescript
   import { locations } from '../../data/constants'  // ✅ Good
   import * as constants from '../../data/constants' // ❌ Avoid
   ```

3. **Use TypeScript's type inference**
   ```typescript
   const vehicles = staticVehicles  // Type is inferred as Vehicle[]
   ```

4. **Destructure for cleaner code**
   ```typescript
   import { locations, carTypes } from '../../data/constants'
   // Instead of importing separately
   ```

---

## 🔍 Finding What You Need

| I need... | Import from... | Example |
|-----------|---------------|---------|
| Component props type | `../../types` | `import type { FleetProps } from '../../types'` |
| Data model type | `../../types` | `import type { Vehicle } from '../../types'` |
| Location list | `../../data/constants` | `import { locations } from '../../data/constants'` |
| Car categories | `../../data/constants` | `import { carTypes } from '../../data/constants'` |
| Sort options | `../../data/constants` | `import { sortOptions } from '../../data/constants'` |
| Vehicle data | `../../data/constants` | `import { staticVehicles } from '../../data/constants'` |

---

**Happy Coding! 🚀**
