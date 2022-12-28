import React, { useState } from 'react'
import { classNames } from '../../utils'

import './MyMemories.css'

export const MyMemories: React.FC = (props) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleSubmitMemories = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const data = Object.fromEntries(form)
    console.log('handleSubmitMemories  👻  data', data)
  }

  const handleClickButton = () => {
    setIsClicked(!isClicked)
  }

  return (
    <main className="relative h-screen bg-pine-tree font-sans text-main">
      <div className="bg-white/80 text-center backdrop-blur-sm">
        <h1 className="px-4 text-2xl">DNSE Memories</h1>
        <p className="px-4 text-base">Kỷ niệm trong tôi</p>
      </div>
      <form onSubmit={handleSubmitMemories}>
        <div className="px-4 py-2 rounded-b-lg">
          <label htmlFor="editor" className="sr-only">
            Câu hỏi 1
          </label>
          <textarea
            rows={8}
            name="quest1"
            className="font-sans block w-full px-4 rounded-2 text-base text-gray-200 bg-white border-0 focus:ring-0"
            placeholder="Sự kiện kể ra là bạn đau tim 😱🫀"
            required
          ></textarea>
        </div>
        <div className="px-4 py-2 rounded-b-lg">
          <label htmlFor="editor" className="sr-only">
            Câu hỏi 2
          </label>
          <textarea
            rows={8}
            name="quest2"
            className="font-sans block w-full px-4 rounded-2 text-base text-gray-200 bg-white border-0 focus:ring-0"
            placeholder="Điều gì làm bạn nhớ tới là cười *** 😂"
            required
          ></textarea>
        </div>
        <div className="px-4 py-2 rounded-b-lg">
          <label htmlFor="editor" className="sr-only">
            Câu hỏi 3
          </label>
          <textarea
            rows={8}
            name="quest3"
            className="font-sans block w-full px-4 rounded-2 text-base text-gray-200 bg-white border-0 focus:ring-0"
            placeholder="Nếu được ting ting +1 triệu về câu chuyện bạn thấy thú vị nhất khi làm ở DNSE, bạn sẽ kể gì? 😎 💸"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={classNames('button-heart', isClicked ? 'clicked' : '')}
          onClick={handleClickButton}
        >
          Gửi yêu thương
        </button>
      </form>
    </main>
  )
}
