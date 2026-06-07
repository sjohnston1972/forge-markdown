import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './markdown.css'

const SAMPLE = `# Welcome to Markdown Studio

A clean, **live** editor for writing Markdown. Type on the left, see it render on the right.

## Features

- **Bold** and *italic* text
- [Links](https://example.com) that work
- Inline \`code\` snippets
- Ordered and unordered lists

### Task list (GFM)

- [x] Render headings
- [x] Support GitHub Flavored Markdown
- [ ] Write something amazing

### A table

| Syntax | Result |
| ------ | ------ |
| \`**x**\` | **x** |
| \`*y*\` | *y* |

> Tip: clear the editor and start fresh whenever you like.

\`\`\`js
const hello = (name) => 'Hi, ' + name
\`\`\`
`

function Stat({ label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-semibold text-slate-700">{value}</span>
      <span className="text-slate-400">{label}</span>
    </div>
  )
}

export default function App() {
  const [text, setText] = useState(SAMPLE)

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text.split('\n').length
    return { words, chars: text.length, lines }
  }, [text])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-5 py-3 bg-white border-t border-slate-200 border-b shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-black text-lg shadow">M</div>
          <div>
            <h1 className="text-lg font-bold text-teal-600 leading-tight">Markdown Studio</h1>
            <p className="text-xs text-slate-400 leading-tight">Live Markdown editor &middot; powered by react-markdown + remark-gfm</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <Stat label="words" value={stats.words} />
          <Stat label="chars" value={stats.chars} />
          <Stat label="lines" value={stats.lines} />
          <button
            onClick={() => setText('')}
            className="ml-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium transition"
          >
            Clear
          </button>
          <button
            onClick={() => setText(SAMPLE)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            Load sample
          </button>
        </div>
      </header>

      <main className="flex flex-1 min-h-0 flex-col md:flex-row">
        {/* Editor */}
        <section className="flex flex-col flex-1 min-h-0 md:border-r border-slate-200">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-medium text-slate-400">editor.md</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            placeholder="Start typing Markdown..."
            className="thin-scroll flex-1 min-h-0 w-full resize-none p-5 font-mono text-sm leading-relaxed text-slate-800 bg-white outline-none"
          />
        </section>

        {/* Preview */}
        <section className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center px-4 py-2 bg-slate-50 border-b border-slate-200">
            <span className="text-xs font-medium text-slate-400">Preview</span>
          </div>
          <div className="thin-scroll flex-1 min-h-0 overflow-y-auto bg-white">
            <article className="md max-w-3xl mx-auto px-6 py-6 text-slate-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </article>
          </div>
        </section>
      </main>

      <footer className="px-5 py-2 text-center text-xs text-slate-400 bg-white border-t border-slate-200">
        updated
      </footer>
    </div>
  )
}
