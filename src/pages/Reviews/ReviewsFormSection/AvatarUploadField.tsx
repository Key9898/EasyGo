import type React from 'react'

interface AvatarUploadFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AvatarUploadField({ onChange }: AvatarUploadFieldProps) {
  return (
    <div className="mt-4 sm:mt-6">
      <label htmlFor="avatar" className="block text-sm font-medium text-slate-700">Choose your photo (optional)</label>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={onChange}
        className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-200"
      />
    </div>
  )
}
