interface FormActionsProps {
  onCancel: () => void
  submitLabel?: string
}

export default function FormActions({ onCancel, submitLabel = 'Submit' }: FormActionsProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
      >
        {submitLabel}
      </button>
    </div>
  )
}
