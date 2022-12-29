import React, { useState } from 'react';
import { classNames } from '../../utils';

import './MyMemories.css';

export const MyMemories: React.FC = () => {
  const [isTouched, setIsTouched] = useState(false);
  const handleSubmitMemories = e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    console.log('handleSubmitMemories  👻  data', data);
  };

  const handleInteraction = () => {
    setIsTouched(!isTouched);
  };

  return (
    <main className="relative h-screen bg-pine-tree font-sans text-main">
      <form onSubmit={handleSubmitMemories} className="flex flex-col justify-between h-full">
        <div className="py-2 bg-white/80 text-center backdrop-blur-sm">
          <h1 className="px-4 text-2xl">DNSE Memories</h1>
          <p className="px-4 text-base">Kỷ niệm trong tôi</p>
        </div>
        <div className="grow flex flex-col justify-center">
          <div className="px-4 py-2 rounded-b-lg">
            <label htmlFor="editor" className="sr-only">
              Câu hỏi 1
            </label>
            <textarea
              rows={6}
              name="quest1"
              minLength={20}
              className="font-sans block w-full px-4 rounded-2 text-base text-gray-900 bg-white border-0 focus:ring-0"
              placeholder="Sự kiện kể ra là bạn đau tim 😱🫀"
              required
            ></textarea>
          </div>
          <div className="px-4 py-2 rounded-b-lg">
            <label htmlFor="editor" className="sr-only">
              Câu hỏi 2
            </label>
            <textarea
              rows={6}
              name="quest2"
              placeholder="Điều gì làm bạn nhớ tới là cười *** 😂"
              required
              minLength={20}
              className="font-sans block w-full px-4 rounded-2 text-base text-gray-900 bg-white border-0 focus:ring-0"
            ></textarea>
          </div>
          <div className="px-4 py-2 rounded-b-lg">
            <label htmlFor="editor" className="sr-only">
              Câu hỏi 3
            </label>
            <textarea
              rows={6}
              name="quest3"
              placeholder="Nếu được ting ting +1 triệu về câu chuyện bạn thấy thú vị nhất khi làm ở DNSE, bạn sẽ kể gì? 😎 💸"
              className="font-sans block w-full px-4 rounded-2 text-base text-gray-900 bg-white border-0 focus:ring-0"
            ></textarea>
          </div>
        </div>
        <div className="relative flex-center bg-white/80 text-center backdrop-blur-sm min-h120px">
          <button
            type="submit"
            className={classNames('button-heart relative', isTouched ? 'clicked' : '')}
            onClick={handleInteraction}
            style={{
              width: 'calc(100% / 3 - 10px)',
              height: 'calc(100% - 10px)'
            }}
          >
            <span className="relative z-10 text-base font-medium">Gửi 🚀</span>
          </button>
        </div>
      </form>
    </main>
  );
};
