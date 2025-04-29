"use client"

import { AreaChart } from '@/components/ui/chart'

interface OverviewProps {
  data: {
    name: string
    Notebooks: number
    Statues: number
    Candles: number
  }[]
}

export function Overview({ data }: OverviewProps) {
  return (
    <AreaChart 
      data={data}
      index="name"
      categories={["Notebooks", "Statues", "Candles"]}
      colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]}
      className="h-72"
    />
  )
}