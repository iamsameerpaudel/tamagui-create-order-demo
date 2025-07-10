'use client'
import { useParams } from 'solito/navigation'
import OrderCard from 'app/features/shipping/OrderCard'
export default function OrderDetailPage() {
  const { id } = useParams()
  return (
    <>
      <OrderCard orderId={id as string} />
    </>
  )
}
