import { Platform } from 'react-native'
let storage: {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
}

if (Platform.OS === 'web') {
  storage = {
    getItem: async (key) => localStorage.getItem(key),
    setItem: async (key, value) => {
      localStorage.setItem(key, value);
    },
    removeItem: async (key) => localStorage.removeItem(key),
  }
} else {
  const createNativeStorage = async () => {
    const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage')
    return {
      getItem: AsyncStorage.getItem,
      setItem: AsyncStorage.setItem,
      removeItem: AsyncStorage.removeItem,
    }
  }

  let nativeStorage: typeof storage | null = null
  storage = {
    getItem: async (key) => {
      if (!nativeStorage) nativeStorage = await createNativeStorage()
      return nativeStorage.getItem(key)
    },
    setItem: async (key, value) => {
      if (!nativeStorage) nativeStorage = await createNativeStorage()
      return nativeStorage.setItem(key, value)
    },
    removeItem: async (key) => {
      if (!nativeStorage) nativeStorage = await createNativeStorage()
      return nativeStorage.removeItem(key)
    },
  }
}

export default storage