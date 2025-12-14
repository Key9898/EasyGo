# 🎉 Admin Dashboard - Quick Start Guide

## ✅ Setup Complete!

Admin email has been set to: **`key.w.aung.dev@gmail.com`**

---

## 🚀 How to Access Admin Dashboard

### Step 1: Sign In

1. Go to your EasyGo website
2. Click on **"Account"** in the header
3. Click **"Log in"**
4. Sign in with: `key.w.aung.dev@gmail.com`

### Step 2: Navigate to Admin Dashboard

Currently, you need to manually trigger navigation. Here are your options:

#### **Option A: Add Navigation Link to Header**

Add this code to `src/components/Layouts/Header.tsx`:

```tsx
// After line 34 (where user state is defined), add:
const isAdmin = user && user.email === "key.w.aung.dev@gmail.com";

// Then in the desktop navigation section (around line 158), add:
{
  isAdmin && (
    <button
      type="button"
      onClick={() => {
        onNavigate?.("admin");
      }}
      className="text-base font-semibold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2"
    >
      🔐 Admin
    </button>
  );
}
```

#### **Option B: Add to UserPanel Dropdown**

Edit `src/components/Auth/UserPanel.tsx` and add this inside the dropdown menu:

```tsx
<button
  onClick={() => {
    onNavigate?.("admin");
    setIsOpen(false);
  }}
  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors flex items-center gap-2"
>
  🔐 Admin Dashboard
</button>
```

#### **Option C: Temporary Access (For Testing)**

Open browser console (F12) and run:

```javascript
// Assuming you have access to the navigation function
window.location.hash = "admin";
```

Or modify `App.tsx` temporarily to default to admin:

```tsx
const [currentPage, setCurrentPage] = useState("admin"); // Change from 'home' to 'admin'
```

---

## 📊 Admin Dashboard Features

Once you access the dashboard, you'll see:

### 1. **Overview** (Default View)

- Total Cars count
- Active Bookings
- Revenue (THB)
- New Inquiries
- Quick actions
- Recent activity

### 2. **Fleet Manager**

- View all cars
- ➕ Add new car
- ✏️ Edit car details
- 🗑️ Delete cars
- Table with images and details

### 3. **Booking Manager**

- View all bookings
- Filter by status
- Update booking status
- Customer details
- Summary statistics

### 4. **Inquiry List**

- View customer inquiries
- Filter by status
- Update inquiry status
- Reply via email button
- Contact information

---

## 🗄️ Required Firestore Collections

Before using the dashboard, create these collections in Firebase:

### 1. Create `cars` collection

```
Firebase Console → Firestore Database → Start collection
Collection ID: cars
```

**Add a sample document:**

```json
{
  "name": "Toyota Camry 2024",
  "category": "Sedan",
  "price": 1500,
  "features": ["Automatic", "5 Seats", "GPS", "Bluetooth"],
  "imageUrl": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb",
  "description": "Luxury sedan perfect for business trips",
  "createdAt": [Firebase Timestamp],
  "updatedAt": [Firebase Timestamp]
}
```

### 2. Create `bookings` collection

```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "carName": "Toyota Camry 2024",
  "pickupLocation": "Bangkok",
  "pickupDate": "2025-12-10",
  "returnDate": "2025-12-15",
  "status": "confirmed",
  "totalPrice": 7500,
  "createdAt": [Firebase Timestamp]
}
```

### 3. Create `inquiries` collection

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+66 123 456 789",
  "message": "I'm interested in renting a car for a week",
  "carInterest": "SUV",
  "status": "new",
  "createdAt": [Firebase Timestamp]
}
```

---

## 🎯 Testing Checklist

- [ ] Sign in with `key.w.aung.dev@gmail.com`
- [ ] Access admin dashboard
- [ ] View Overview stats
- [ ] Add a new car in Fleet Manager
- [ ] Edit a car
- [ ] Delete a car
- [ ] View bookings
- [ ] Change booking status
- [ ] View inquiries
- [ ] Update inquiry status
- [ ] Test mobile responsive design

---

## 🔧 Troubleshooting

### "Access Denied" Error

- Make sure you're signed in with `key.w.aung.dev@gmail.com`
- Check Firebase Authentication to confirm the account exists

### Empty Dashboard

- Create sample data in Firestore collections
- Check Firebase rules allow read/write access

### Navigation Not Working

- Add navigation link using Option A or B above
- Check browser console for errors

---

## 📝 Next Steps

1. ✅ **Add Navigation Link** - Choose Option A or B above
2. ✅ **Create Firestore Collections** - Add sample data
3. ✅ **Test All Features** - Use the testing checklist
4. ✅ **Customize** - Adjust colors, add more features
5. ✅ **Deploy** - Push to production

---

**ပြီးပါပြီ! သင့် Admin Dashboard အသုံးပြုဖို့ အဆင်သင့်ဖြစ်ပါပြီ! 🎉**

Email: `key.w.aung.dev@gmail.com` နဲ့ sign in လုပ်ပြီး admin dashboard ကို access လုပ်နိုင်ပါပြီ။
