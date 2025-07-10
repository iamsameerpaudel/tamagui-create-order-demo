'use client'
import {
  YStack,
  XStack,
  Input,
  Text,
  Button,
  Separator,
  Label,
  Card,
  ScrollView,
  RadioGroup,
} from 'tamagui'
import { useState, useMemo } from 'react'
import { useRouter } from 'solito/navigation'
import {
  calculateRestaurantShippingCost,
  generateUniqueId,
  Order,
  orderSchema,
} from './shippingLogic'
import storage from 'app/features/logic/UniversalStorage'

function ShippingPage() {
  const [orderName, setOrderName] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState('')
  const [weight, setWeight] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [method, setMethod] = useState<'standard' | 'express'>('standard')
  const [address, setAddress] = useState('')

  const router = useRouter()

  const cost = useMemo(() => {
    const w = parseFloat(weight) || 0
    const itemCount = items.split(',').filter(Boolean).length
    const newCost = calculateRestaurantShippingCost(w, itemCount, method)
    return newCost
  }, [weight, items, method])

  const placeOrder = async () => {
    const order: Order = {
      id: generateUniqueId(),
      orderName,
      customerName,
      items: items.split(',').map((i) => i.trim()),
      address,
      weight: parseFloat(weight),
      dimensions,
      method,
      cost,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    }
    const result = orderSchema.safeParse(order)
    if (!result.success) {
      alert(JSON.parse(result.error.message)[0].message);      
    } else {
      const validOrder = result.data
      const existing = await storage.getItem('orders')
      const parsed = existing ? JSON.parse(existing) : []
      const updated = [...parsed, validOrder]
      await storage.setItem('orders', JSON.stringify(updated))
      
      router.push('/')
    }
  }

  return (
    <ScrollView bg={'$background'}>
      <YStack space p="$4">
        <Text fontSize="$8" fontWeight="bold">
          🍽️ Create Restaurant Order
        </Text>
        <Separator />

        <Card padded>
          <YStack space>
            <Label>Order Name</Label>
            <Input placeholder="e.g. Order #42" value={orderName} onChangeText={setOrderName} />

            <Label>Customer Name</Label>
            <Input
              placeholder="e.g. Sameer Paudel"
              value={customerName}
              onChangeText={setCustomerName}
            />

            <Label>Order Items (comma-separated)</Label>
            <Input placeholder="e.g. Pizza, Momo, Fries" value={items} onChangeText={setItems} />

            <Label>Recipient Address</Label>
            <Input placeholder="Street, City, ZIP" value={address} onChangeText={setAddress} />

            <Label>Package Weight (kg)</Label>
            <Input keyboardType="numeric" value={weight} onChangeText={setWeight} />

            <Label>Dimensions (LxWxH cm)</Label>
            <Input value={dimensions} onChangeText={setDimensions} />

            <Label>Shipping Method</Label>
            <RadioGroup
              defaultValue={method}
              onValueChange={(v: 'standard' | 'express') => {
                setMethod(v)
              }}
            >
              <XStack items={'center'} gap={'$2'}>
                <RadioGroup.Item id="standard" value="standard">
                  <RadioGroup.Indicator />
                </RadioGroup.Item>
                <Label htmlFor="standard"> Standard</Label>
                <RadioGroup.Item id="express" value="express">
                  <RadioGroup.Indicator />
                </RadioGroup.Item>
                <Label htmlFor="express"> Express</Label>
              </XStack>
            </RadioGroup>
            <Text color="$green10">Estimated Cost: ${cost}</Text>

            <Button theme="accent" onPress={placeOrder}>
              🍔 Place Order
            </Button>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  )
}

export default ShippingPage
