import React from 'react'

export const MyMemories: React.FC = (props) => {
  return (
    <main className="relative grid grid-cols-[100%] grid-rows-[100vh] bg-pine-tree">
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
