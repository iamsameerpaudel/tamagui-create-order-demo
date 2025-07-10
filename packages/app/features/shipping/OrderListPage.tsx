'use client'

import { useEffect, useState } from 'react'
import { YStack, Text, Button, ScrollView, Card, Separator } from 'tamagui'
import { useRouter } from 'solito/navigation'
import { Order } from './shippingLogic'
import storage from 'app/features/logic/UniversalStorage'
import { RefreshControl } from 'react-native'

export default function OrderListPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const loadOrders = async () => {
    const stored = await storage.getItem('orders')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setOrders(parsed)
      } catch (err) {
        console.error('Failed to parse orders:', err)
      }
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await loadOrders()
    setRefreshing(false)
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <YStack space p="$4" bg={'$background'}>
        <Text fontSize="$8" fontWeight="bold">
          📦 Restaurant Orders
        </Text>
        <Separator />
        <Button onPress={() => router.push('/shipping')}>+ Create Order</Button>

        {orders.length === 0 ? (
          <Text color="$color" mt="$4">
            No orders yet😶
          </Text>
        ) : (
          <YStack mt="$4" space="$3">
            {orders.map((order) => (
              <Card key={order.id} padded>
                <YStack space>
                  <Text fontWeight="bold">{order.orderName}</Text>
                  <Text>Customer: {order.customerName}</Text>
                  <Text>
                    Shipping: {order.method} (${order.cost})
                  </Text>
                  <Text>Status: {order.status}</Text>

                  <Button
                    theme="accent"
                    onPress={() => {
                      console.log('routed order')
                      router.push(`/order/${order.id}`)
                    }}
                  >
                    Order Details
                  </Button>
                </YStack>
              </Card>
            ))}
          </YStack>
        )}
      </YStack>
    </ScrollView>
  )
}
