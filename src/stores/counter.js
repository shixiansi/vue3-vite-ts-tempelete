/**
 * @Author: 时先思
 * @Date: 2024-02-21 23:31:21
 * @LastEditTime: 2024-02-21 23:31:27
 * @LastEditors: 时先思
 * @Description: 
 * @FilePath: \vue3-vite-ts-tempelete\src\stores\counter.js
 * @版权声明
 **/
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
