import React from 'react'

export const MyMemories: React.FC = (props) => {
  return (
    <main className="relative h-screen bg-pine-tree font-sans">
      <h1>3 kỷ niệm ấn tượng sâu sắc trong lòng</h1>
      <div className="px-4 py-2 rounded-b-lg">
        <label htmlFor="editor" className="sr-only">
          Publish post
        </label>
        <textarea
          rows={8}
          className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
          placeholder="Điều gì khiến bạn nhớ nhất"
          required
        ></textarea>
      </div>
      <div className="px-4 py-2 rounded-b-lg">
        <label htmlFor="editor" className="sr-only">
          Publish post
        </label>
        <textarea
          rows={8}
          className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
          placeholder="Điều gì khiến bạn nhớ nhất"
          required
        ></textarea>
      </div>
      <div className="px-4 py-2 rounded-b-lg">
        <label htmlFor="editor" className="sr-only">
          Publish post
        </label>
        <textarea
          rows={8}
          className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
          placeholder="Điều gì khiến bạn nhớ nhất"
          required
        ></textarea>
      </div>
    </main>
  )
}
