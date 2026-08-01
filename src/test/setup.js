import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// globals: false in vite.config.js means testing-library's automatic
// afterEach-based cleanup never registers itself — do it explicitly.
afterEach(() => {
  cleanup()
})
