import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

function makeStorage() {
  const store = new Map()
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null
    },
    setItem(key, value) {
      store.set(key, String(value))
    },
    removeItem(key) {
      store.delete(key)
    },
    clear() {
      store.clear()
    },
    key(index) {
      return [...store.keys()][index] ?? null
    },
    get length() {
      return store.size
    },
  }
}

if (typeof globalThis !== 'undefined' && !globalThis.localStorage) {
  const storage = makeStorage()
  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })
}

if (typeof globalThis !== 'undefined' && !globalThis.sessionStorage) {
  const storage = makeStorage()
  Object.defineProperty(globalThis, 'sessionStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })
}

// globals: false in vite.config.js means testing-library's automatic
// afterEach-based cleanup never registers itself — do it explicitly.
afterEach(() => {
  cleanup()
})
