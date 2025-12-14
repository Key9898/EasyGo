// Example: How to add Admin Dashboard link to Header.tsx

// Add this to the navigation array (around line 16-21):
const navigation = [
{ name: 'Fleet', slug: 'fleet' },
{ name: 'Certified', slug: 'certified' },
{ name: 'Subscription', slug: 'subscription' },
{ name: 'Guide', slug: 'guide' },
// Add this line:
{ name: 'Admin', slug: 'admin' }, // Only visible to admin users
]

// Or, for better UX, add it conditionally only for admin users:
// After the user state (around line 34):
const isAdmin = user && user.email === 'key.w.aung.dev@gmail.com'

// Then in the navigation rendering (around line 132-141 and 149-158):
{navigation.map((item) => (
<button
key={item.slug}
type="button"
onClick={() => { onNavigate?.(item.slug) }}
className="text-base font-semibold text-slate-700 hover:text-orange-600 transition-colors"

>

    {item.name}

  </button>
))}

// Add admin link separately if user is admin:
{isAdmin && (
<button
type="button"
onClick={() => { onNavigate?.('admin') }}
className="text-base font-semibold text-orange-600 hover:text-orange-700 transition-colors"

>

    🔐 Admin Dashboard

  </button>
)}

// Alternative: Add to UserPanel dropdown
// In UserPanel.tsx, add an admin link in the dropdown menu:
{isAdmin && (
<button
onClick={() => {
onNavigate?.('admin')
setIsOpen(false)
}}
className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"

>

    🔐 Admin Dashboard

  </button>
)}
