import ShippingPage from 'app/features/shipping/Screen'
import { Stack } from 'expo-router'

const page = () => {
  return (
    <>
    <Stack.Screen options={{ title: '' }} />
      <ShippingPage />
    </>
  )
}

export default page
