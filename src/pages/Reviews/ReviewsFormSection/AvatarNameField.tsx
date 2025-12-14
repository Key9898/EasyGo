import { UserCircleIcon } from '@heroicons/react/24/solid'

interface AvatarNameFieldProps {
  avatarPreview: string | null
  fullName: string
  readOnly?: boolean
  onChange?: (name: string) => void
}

export default function AvatarNameField({ avatarPreview, fullName, readOnly, onChange }: AvatarNameFieldProps) {
  return (
    <div className="flex items-center gap-4">
      {avatarPreview ? (
        <img src={avatarPreview} alt="Avatar preview" className="size-16 rounded-lg object-cover" />
      ) : (
        <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center">
          <UserCircleIcon className="size-10 text-slate-400" />
        </div>
      )}
      <div className="flex-1">
        <label htmlFor="full-name" className="block text-sm font-medium text-slate-700">Full Name</label>
        <input
          id="full-name"
          type="text"
          required
          value={fullName}
          readOnly={!!readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:border-orange-600 focus:outline-none"
          placeholder="Your Full Name"
        />
      </div>
    </div>
  )
}
