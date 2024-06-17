'use client'

import { useEffect, useState } from 'react'
import { mock } from './mock'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { shuffle } from '@/utils/shuffle'

export default function RenderTest() {
  /* 초당 섞을 횟수 */
  const [count, setCount] = useState(0)
  const [itemList, setItemList] = useState(mock)

  useEffect(() => {
    let id: ReturnType<typeof setInterval>

    if (count > 0) {
      id = setInterval(() => {
        setItemList((prev) => shuffle(prev))
      }, 1000 / count)
    }

    return () => clearInterval(id)
  }, [count])

  return (
    <div className="bg-neutral-700 p-[30px] min-h-screen">
      <div className="flex items-center gap-[10px]">
        <div className="text-white">초당 Client 보내는 데이터 횟수: </div>
        <Input
          className="w-40"
          value={count}
          type="number"
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-3 gap-[20px] *:p-2 mt-[40px]">
        {itemList.map((item) => (
          <div key={item.link} className="flex-1 flex gap-[8px] h-[200px] overflow-hidden">
            <div className="w-1/3 aspect-square relative shrink-0">
              <Image src={item.image} alt="" fill />
            </div>
            <div className="flex flex-col">
              <div className="text-white font-semibold">Created by 🚀 {item.creator}</div>
              <div className="text-emerald-400 text-sm">market cap: {item.market_cap}</div>
              <div className="text-gray-300">replies: {item.replies}</div>
              <p className="text-gray-400 line-clamp-5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
