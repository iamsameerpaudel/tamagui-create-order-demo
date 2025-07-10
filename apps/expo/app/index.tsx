import { Stack } from 'expo-router'
import OrderListPage from 'app/features/shipping/OrderListPage'
import { View } from '@my/ui'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
        
      />
      <View pt={'$5'}>
      <OrderListPage/>
      </View>
    </>
  )
}
