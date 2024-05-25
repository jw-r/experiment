'use client'

import FixedBottomButton from '@/components/fixed-bottom-button'
import { useEffect, useState } from 'react'

export default function KeypadIssue() {
  const [isFocus, setIsFocus] = useState({ value: false })
  const [keypadHeight, setKeypadHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!window.visualViewport) return

    const handleResize = () => {
      const windowInnerHeight = window.innerHeight
      const visualViewportHeight = window.visualViewport!.height

      const diff = windowInnerHeight - visualViewportHeight
      if (isFocus.value === false) {
        setKeypadHeight(0)
      }
      if (diff > 0) {
        setKeypadHeight(diff)
      }
    }

    window.visualViewport.addEventListener('resize', handleResize)
    return () => window.visualViewport!.removeEventListener('resize', handleResize)
  }, [isFocus])

  return (
    <div>
      <div className="w-full p-10 bg-blue-200">
        <input
          onFocus={() => {
            setIsFocus({
              value: true,
            })
          }}
          onBlur={() => {
            setIsFocus({
              value: false,
            })
          }}
        />
      </div>
      <FixedBottomButton keypadHeight={keypadHeight}>클릭</FixedBottomButton>
    </div>
  )
}

/**
 * Fixed 된 요소가 모바일 환경에서 가상 keypad에 가려지는 문제
 * button의 위치는 bottom으로 지정하면 keypad에 의해 스크롤이 발생해서 아래에 위치함
 * 즉, 현재 사용자의 viewport를 알아야함
 *
 * keypad를 open한다고해서 resize 이벤트가 발생하지 않는다
 *
 * 아이디어 1.
 *  최초 진입시 윈도우 높이 - 키패드 올라오고나서 윈도우 높이 = 키패드 높이
 */

/**
onFocus={() => {
    const windowInnerHeight = window.innerHeight
    const visualViewportHeight = window.visualViewport!.height
    
    키패드가 등장해도 이때의 visualViewportHeight에는 변화가 없음 (blur이벤트 발생 시 확인 가능) 클릭이 발생했을 시점에는 키패드가 등장하지 않으니까. state와 useEffect로 관리하면 되지 않을까? 다음 렌더링 때 적용될테니까 똑같네? useLayoutEffect를 사용해도 동일함
    console.log(windowInnerHeight)
    console.log(visualViewportHeight)

    forceUpdate({})
}}

아래처럼 800 ms정도 후에 visualViewportHeight를 읽으니까 키패드에 의해 줄어든 것을 확인할 수 있었다 ㄷㄷ
useEffect(() => {
const timerId = setTimeout(() => {
    const windowInnerHeight = window.innerHeight
    const visualViewportHeight = window.visualViewport!.height

    console.log(windowInnerHeight)
    console.log(visualViewportHeight)
}, 800)

return () => clearTimeout(timerId)
}, [isFocus])
 */

/**
 * window.visualViewport.addEventListener를 통해 구현할 수 있네?
 */
