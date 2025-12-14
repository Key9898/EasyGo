import { Mail, Phone as PhoneIcon, Upload } from 'lucide-react'
import { useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'

interface CompanyInformationProps {
  companyName: string
  setCompanyName: (v: string) => void
  taxId: string
  setTaxId: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  businessEmail: string
  setBusinessEmail: (v: string) => void
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  onBack: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function CompanyInformation({
  companyName,
  setCompanyName,
  taxId,
  setTaxId,
  phone,
  setPhone,
  businessEmail,
  setBusinessEmail,
  files,
  setFiles,
  onBack,
  onSubmit,
}: CompanyInformationProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const picked = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...picked])
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dtFiles = Array.from(e.dataTransfer.files)
    if (dtFiles.length) setFiles((prev) => [...prev, ...dtFiles])
  }

  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company-name" className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
          <input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder="e.g. Acme Co., Ltd." className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="company-taxid" className="block text-sm font-medium text-slate-700 mb-1">Tax ID / Registration No.</label>
          <input id="company-taxid" value={taxId} onChange={(e) => setTaxId(e.target.value)} type="text" placeholder="13-digit Tax ID" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company-email" className="block text-sm font-medium text-slate-700 mb-1"><Mail className="w-4 h-4 inline mr-1" />Business Email</label>
          <input id="company-email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} type="email" placeholder="name@company.com" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="company-phone" className="block text-sm font-medium text-slate-700 mb-1"><PhoneIcon className="w-4 h-4 inline mr-1" />Phone Number</label>
          <input id="company-phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+66 XX XXX XXXX" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
      </div>

      <div className="pt-2">
        <p className="text-sm font-semibold text-slate-900">Document Upload</p>
        <p className="text-sm text-slate-600 mt-1">Required: Company Affidavit (DBD), VAT (PP20), Director ID/Passport, Map.</p>
        <div
          className="mt-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center cursor-pointer"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto w-8 h-8 text-slate-400" />
          <p className="mt-2 text-slate-700">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-500">PDF, JPG, PNG up to 10MB each</p>
          <label htmlFor="company-upload" className="sr-only">Upload Documents</label>
          <input
            id="company-upload"
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            aria-label="Upload Documents"
            title="Upload Documents"
            onChange={handleSelectFiles}
          />
        </div>
        {files.length > 0 && (
          <ul className="mt-3 text-sm text-slate-700 space-y-1">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 bg-white">
                <span>{f.name}</span>
                <span className="text-slate-500 text-xs">{(f.size / 1024).toFixed(0)} KB</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700">Back</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-orange-600 text-white">Continue</button>
      </div>
    </form>
  )
}
