'use client'

import FixedBottomButton from '@/components/fixed-bottom-button'
import VisualViewport from '@/components/visual-viewport'

export default function KeypadIssue() {
  return (
    <>
      <div className="w-full p-10 bg-blue-200">
        <input />
      </div>
      <div className="flex flex-col gap-[10px]">
        {Array.from({ length: 50 }).map((_, i) => (
          <li key={i}>item: {i + 1}</li>
        ))}
      </div>
      <FixedBottomButton>클릭</FixedBottomButton>
    </>
  )
}

// 키패드 표시에 따라 Y 스크롤이 발생하는 문제
// 웹앱에서 safe-viewport 구하기

// useDetectKeyboardOpen 라이브러리도 있네
// on-screen-keyboard-detector 이런것도 있고
// visualViewport의 지원률이 95% 이상이라 사용해도 무방해보임

// 근대 radix-ui의 form은 fixed인데, 왜 자동으로 위치가 조정되는거야? (안될 때가 가끔 있음)

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

// keypad가 사라질 때는 visualViewport의 resize 이벤트가 트리거되지 않는다 -> 라고 생각했지만 된다

/**
 * SOLUTION 1
 */
// useEffect(() => {
//   if (!window.visualViewport) return

//   const handleResize = () => {
//     const windowInnerHeight = window.innerHeight
//     const visualViewportHeight = window.visualViewport!.height
//     const diff = windowInnerHeight - visualViewportHeight
//     if (diff > 0) {
//       setKeypadHeight(diff)
//     } else {
//       setKeypadHeight(0)
//     }
//   }

//   // safari에서는 resize 이벤트 트리거까지 약 500ms 정도가 소요된다
//   window.visualViewport.addEventListener('resize', handleResize)
//   return () => window.visualViewport!.removeEventListener('resize', handleResize)
// }, [])

/**
 * SOLUTION 2
 */
// useEffect(() => {
//   function setVh() {
//     document.documentElement.style.setProperty(
//       '--vh',
//       `${window.visualViewport!.height * 0.01}px`
//     )
//   }

//   setVh()

//   window.visualViewport!.addEventListener('resize', setVh)
//   return () => window.visualViewport!.removeEventListener('resize', setVh)
// }, [])
