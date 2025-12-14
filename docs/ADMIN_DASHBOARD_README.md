# EasyGo Admin Dashboard

## 📁 File Structure

```
src/
├── components/
│   └── AdminDashboard/
│       ├── AdminRoute.tsx       # Security wrapper - checks admin email
│       ├── AdminLayout.tsx      # Main shell with sidebar navigation
│       ├── Overview.tsx         # Dashboard home with stats cards
│       ├── FleetManager.tsx     # Car CRUD operations
│       ├── BookingManager.tsx   # Booking status management
│       ├── InquiryList.tsx      # User leads from "Notify Me" forms
│       └── index.ts             # Export file for clean imports
└── pages/
    └── AdminDashboard/
        └── AdminDashboard.tsx   # Main admin page

```

## 🔐 Access Control

**Admin Email:** `key.w.aung.dev@gmail.com`

Only users logged in with this email can access the admin dashboard.

## 🚀 How to Access

Navigate to the admin dashboard by calling:
```typescript
onNavigate('admin')
```

Or manually set the URL parameter to trigger admin view.

## 📊 Features

### 1. **Overview Dashboard**
- Total Cars count
- Active Bookings count
- Revenue calculation (THB)
- New Inquiries count
- Quick action buttons
- Recent activity feed

### 2. **Fleet Manager**
- View all cars in a table
- Add new car with modal form
- Edit existing car details
- Delete cars with confirmation
- Fields: Name, Category, Price, Features, Image URL, Description
- Real-time Firestore sync

### 3. **Booking Manager**
- View all bookings with customer details
- Filter by status: All, Pending, Confirmed, Completed, Cancelled
- Update booking status via dropdown
- Display: Customer info, Car details, Dates, Price
- Summary statistics

### 4. **Inquiry List**
- View customer inquiries from "Notify Me" forms
- Filter by status: All, New, Contacted, Resolved
- Update inquiry status
- Quick "Reply via Email" button
- Display: Name, Email, Phone, Message, Car Interest
- Summary statistics

## 🗄️ Firestore Collections

The admin dashboard expects these Firestore collections:

### `cars`
```typescript
{
  name: string
  category: string
  price: number
  features: string[]
  imageUrl: string
  description: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### `bookings`
```typescript
{
  customerName: string
  customerEmail: string
  carName: string
  pickupLocation: string
  pickupDate: string
  returnDate: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
  createdAt: Timestamp
}
```

### `inquiries`
```typescript
{
  name: string
  email: string
  phone?: string
  message: string
  carInterest?: string
  status: 'new' | 'contacted' | 'resolved'
  createdAt: Timestamp
}
```

## 🎨 UI Components

- **Responsive Design**: Mobile-first with Tailwind CSS
- **Sidebar Navigation**: Collapsible on mobile
- **Tables**: Clean, sortable data display
- **Modals**: For add/edit operations
- **Status Badges**: Color-coded status indicators
- **Icons**: Lucide React icons throughout

## 🔔 Notifications

Uses the existing `Notify` component via custom events:
```typescript
window.dispatchEvent(new CustomEvent('app:notify', {
  detail: { 
    type: 'success' | 'error', 
    title: 'Title', 
    message: 'Message' 
  }
}))
```

## 🛠️ Customization

### Change Admin Email
Edit `AdminRoute.tsx`:
```typescript
<AdminRoute allowedEmails={['key.w.aung.dev@gmail.com', 'another@admin.com']}>
```

### Add New View
1. Create component in `src/components/AdminDashboard/`
2. Add to `AdminLayout` menu items
3. Import and render in `AdminDashboard.tsx`

## 📝 Notes

- All components are **modular** and **separated** into individual files
- Firestore operations use **async/await** with error handling
- **Loading states** implemented for all data fetching
- **Form validation** included in add/edit modals
- **Responsive** across all screen sizes
