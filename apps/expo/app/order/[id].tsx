import { useParams } from 'solito/navigation'
import OrderCard from 'app/features/shipping/OrderCard'
import { Stack } from 'expo-router'
export default function OrderDetailPage() {
  const { id } = useParams()
  console.log(id)

  return (
    <>
      <Stack.Screen  options={{ title: 'Order', animation:'fade_from_bottom',animationDuration:600, animationTypeForReplace:'push' }} />
      <OrderCard orderId={id as string} />
    </>
  )
}
