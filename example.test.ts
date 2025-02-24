import { test, describe, vi, expect, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'

vi.mock('axios')

const mockedAxios = axios as Mocked<typeof axios> 

// callback test
// mock

describe('functions', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toHaveBeenCalled() // 被调用
    expect(callback).toHaveBeenCalledWith(12) // 被xx参数调用
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 1
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2) // 被调用次数
  })

  test('mock third party module', async () => {
    // 模拟接口返回
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
    // 等于上面的写法
    mockedAxios.get.mockResolvedValue({ data: 123 })
    const result = await request()
    expect(result).toBe(123)
  })
})