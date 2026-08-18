import { describe, it, expect } from 'vitest'
import { router } from './router'

describe('Router', () => {
  it('should have valid routes defined', () => {
    expect(router.routes.length).toBeGreaterThan(0)
    expect(router.routes[0].path).toBe('/')
    expect(router.routes[0].children?.length).toBe(5)
  })
})
