import React from 'react'
import '../styles/home.css'
import '../styles/home.scss'

export const HomePage: React.FC = () => {
  const helloCharts = 'Xin chào mọi người đã tới chương trình Kudo 2022'.split('')
  const descriptionCharts =
    'Trong lúc chờ mọi người thì ai trả lời câu hỏi dưới đây đúng và nhiều nhất sẽ có 1 phần quà đặc biệt vào cuối giờ nhé'.split(
      '',
    )
  return (
    <main className="relative h-screen px-4 md:px-0">
      <ul className="noel-neon-light">
        {Array.from({ length: 40 }).map(() => (
          <li></li>
        ))}
      </ul>
      <div className="rounded pt-20">
        <div className="text-secondary text-xl text-center">
          {helloCharts.map((c) => (
            <span>{c}</span>
          ))}
        </div>
        <div className="text-secondary text-base text-center">
          {descriptionCharts.map((c) => (
            <span>{c}</span>
          ))}
        </div>
        <button data-testid="btn-start-random-question" className="">
          Chơi thử tí cho nó xôm nào
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-200px bg-noel"></div>
    </main>
  )
}
