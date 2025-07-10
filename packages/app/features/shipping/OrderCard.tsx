import { Card, YStack, Text, XStack, Separator } from 'tamagui'
import { useEffect, useState } from 'react'
import { Order } from './shippingLogic'
import storage from '../logic/UniversalStorage'

interface OrderCardProps {
  orderId: string
}

export default function OrderCard({ orderId }: OrderCardProps) {
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const loadOrder = async () => {
      const ordersStr = await storage.getItem('orders')
      const orders: Order[] = JSON.parse(ordersStr || '[]')
      const found = orders.find((o) => o.id === orderId)
      setOrder(found || null)
    }

    loadOrder()
  }, [orderId])

  if (!order) {
    return (
      <Card padding="$4" marginVertical="$2" bordered bg={'$background02'}>
        <Text>Order not found 🫠</Text>
      </Card>
    )
  }

  return (
    <YStack fullscreen bg={'$accentBackground'} justify={'center'}  items={'center'} >
    <Card padding="$4" marginVertical="$3" width={'80%'} height={'50%'} bordered  bg={'$background08'}>
      <YStack gap="$2">
        <XStack justify="space-between" items="center">
          <Text fontSize="$7" fontWeight="bold">
            📦 {order.orderName}
          </Text>
          <Text fontSize="$3" color="$color11">
            {new Date(order.date).toLocaleDateString()}
          </Text>
        </XStack>

        <Separator />

        <Text>
          🧑‍💼 <Text fontWeight="600">Customer:</Text> {order.customerName}
        </Text>

        <Text>
          📍 <Text fontWeight="600">Address:</Text> {order.address}
        </Text>

        <Text>
          🧾 <Text fontWeight="600">Items:</Text> {order.items.join(', ')}
        </Text>

        <XStack gap="$2" flexWrap='wrap'>
          <Text>
            🚚 <Text fontWeight="600">Method:</Text> {order.method}
          </Text>
          <Text>
            💵 <Text fontWeight="600">Cost:</Text> ${order.cost}
          </Text>
        </XStack>

        <Text>
          📦 <Text fontWeight="600">Status:</Text> {order.status}
        </Text>
      </YStack>
    </Card>
    </YStack>

  )
}
