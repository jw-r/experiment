import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export default function DoubleSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center fixed bottom-0 max-w-[760px] w-full p-[20px] justify-between bg-gray-400 rounded-t-[12px] cursor-pointer">
          <div>
            <div className="flex items-end gap-[8px]">
              <div className="text-xl font-bold">판교의 집</div>
              <div className="text-sm">서울시 광진구 자양동</div>
            </div>
            <div>5.0 ⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
            <div># 방음 좋은</div>
          </div>
          <div className="size-[80px] bg-gray-200" />
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-[12px] min-h-[600px] p-0">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center fixed bottom-0 w-full px-[20px] justify-between bg-gray-400 rounded-t-[12px] cursor-pointer min-h-[600px]">
              <div>
                <div className="flex items-end gap-[8px]">
                  <div className="text-xl font-bold">판교의 집</div>
                  <div className="text-sm">서울시 광진구 자양동</div>
                </div>
                <div>5.0 ⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
                <div># 방음 좋은</div>
              </div>
              <div className="size-[80px] bg-gray-200" />
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="min-h-screen">
            ok
          </SheetContent>
        </Sheet>
      </SheetContent>
    </Sheet>
  )
}
