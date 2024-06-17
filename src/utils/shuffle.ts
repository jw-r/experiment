export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex
  const newArray = Array.from(array)

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex]!,
      newArray[currentIndex]!,
    ]
  }

  return newArray
}
