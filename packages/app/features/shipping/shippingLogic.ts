import z from 'zod'

export const orderSchema = z.object({
  id: z.string({ message: 'Invalid ID' }),
  orderName: z.string().min(1, 'Order name is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  items: z.array(z.string().min(1)).min(1, 'At least one item required'),
  address: z.string().min(5, 'Address is too short'),
  weight: z.number().min(0, 'Weight cannot be negative'),
  dimensions: z.string().min(1, 'Dimensions required'),
  method: z.enum(['standard', 'express']),
  cost: z.number().min(0, 'Cost cannot be negative'),
  status: z.enum(['Pending', 'Shipped', 'Delivered']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
})
export type Order = z.infer<typeof orderSchema>

export const generateUniqueId = () => 'ORD-' + Math.floor(Math.random() * 100000)

export const calculateRestaurantShippingCost = (
  weight: number,
  itemCount: number,
  method: 'standard' | 'express'
) => {
  const multiplier = method.toLocaleLowerCase() === 'express' ? 2 : 1
  const baseCost = (weight * 5 + itemCount * 3) * multiplier

  return parseFloat(baseCost.toFixed(2))
}
