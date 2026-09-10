'use client'

import { getPath, setPath, type PathKey } from '@/lib/path-utils'

export type Updater = (updater: (prev: any) => any) => void

interface FieldProps {
  content: any
  onChange: Updater
  path: PathKey[]
  label: string
}

export function TextField({ content, onChange, path, label }: FieldProps) {
  const value = getPath(content, path) ?? ''
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange((prev) => setPath(prev, path, e.target.value))}
        className="admin-input"
      />
    </label>
  )
}

export function TextAreaField({ content, onChange, path, label, rows = 3 }: FieldProps & { rows?: number }) {
  const value = getPath(content, path) ?? ''
  return (
    <label className="admin-field">
      <span>{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange((prev) => setPath(prev, path, e.target.value))}
        className="admin-input resize-y"
      />
    </label>
  )
}

export function NumberField({ content, onChange, path, label }: FieldProps) {
  const value = getPath(content, path) ?? 0
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange((prev) => setPath(prev, path, e.target.value === '' ? '' : Number(e.target.value)))}
        className="admin-input"
      />
    </label>
  )
}

export function SelectField({
  content, onChange, path, label, options,
}: FieldProps & { options: { value: string; label: string }[] }) {
  const value = getPath(content, path) ?? options[0]?.value
  return (
    <label className="admin-field">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange((prev) => setPath(prev, path, e.target.value))}
        className="admin-input"
      >
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </label>
  )
}

/** Editable list of plain strings (tags, metrics, platform names…), one per line. */
export function StringListField({ content, onChange, path, label }: FieldProps) {
  const items: string[] = getPath(content, path) ?? []
  return (
    <label className="admin-field">
      <span>{label} <em>(one per line)</em></span>
      <textarea
        rows={Math.min(Math.max(items.length, 2), 8)}
        defaultValue={items.join('\n')}
        onBlur={(e) => {
          const next = e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
          onChange((prev) => setPath(prev, path, next))
        }}
        className="admin-input resize-y"
      />
    </label>
  )
}

/** Editable list of numbers (chart bar heights…), comma-separated. */
export function NumberListField({ content, onChange, path, label }: FieldProps) {
  const items: number[] = getPath(content, path) ?? []
  return (
    <label className="admin-field">
      <span>{label} <em>(comma-separated)</em></span>
      <input
        defaultValue={items.join(', ')}
        onBlur={(e) => {
          const next = e.target.value.split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n))
          onChange((prev) => setPath(prev, path, next))
        }}
        className="admin-input"
      />
    </label>
  )
}

export const TONE_OPTIONS = [
  { value: 'primary', label: 'Primary (blue)' },
  { value: 'secondary', label: 'Secondary (gold)' },
  { value: 'accent', label: 'Accent (brown)' },
  { value: 'foreground', label: 'Foreground (white)' },
  { value: 'muted', label: 'Muted (gray)' },
]

export const ICON_OPTIONS = [
  { value: 'search', label: 'Search' },
  { value: 'megaphone', label: 'Megaphone' },
  { value: 'target', label: 'Target' },
  { value: 'barChart3', label: 'Bar chart' },
  { value: 'layers', label: 'Layers' },
  { value: 'repeat', label: 'Repeat' },
]
