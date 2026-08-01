import { useEffect, useRef, useState } from 'react'
import { DODO_BODY_PATH, DODO_BEAK_PATH, DODO_TAIL_PATH } from './Marks.jsx'

const W = 1200
const H = 630

function drawCard(ctx, { score, total, tierTitle, categoryLabel }) {
  ctx.clearRect(0, 0, W, H)

  // background
  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, '#0a1a26')
  grad.addColorStop(1, '#0f2634')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  const glow = ctx.createRadialGradient(W * 0.82, H * 0.15, 0, W * 0.82, H * 0.15, 520)
  glow.addColorStop(0, 'rgba(31,168,163,0.25)')
  glow.addColorStop(1, 'rgba(31,168,163,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  // dodo mark
  ctx.save()
  ctx.translate(880, 90)
  ctx.scale(2.1, 2.1)
  ctx.fillStyle = '#e3a72b'
  ctx.fill(new Path2D(DODO_BODY_PATH))
  ctx.fill(new Path2D(DODO_BEAK_PATH))
  ctx.fill(new Path2D(DODO_TAIL_PATH))
  ctx.restore()

  // eyebrow
  ctx.fillStyle = '#4fd3c9'
  ctx.font = '600 26px Manrope, sans-serif'
  ctx.letterSpacing = '4px'
  ctx.fillText('ZWAZO · MAURITIUS TRIVIA', 70, 110)
  ctx.letterSpacing = '0px'

  // score
  ctx.fillStyle = '#f0c65c'
  ctx.font = '600 168px Fraunces, Georgia, serif'
  ctx.fillText(`${score}/${total}`, 66, 320)

  // tier
  ctx.fillStyle = '#f3ead3'
  ctx.font = '500 44px Fraunces, Georgia, serif'
  ctx.fillText(tierTitle, 70, 400)

  // category
  ctx.fillStyle = 'rgba(243,234,211,0.55)'
  ctx.font = '400 26px Manrope, sans-serif'
  ctx.fillText(categoryLabel, 70, 445)

  // footer
  ctx.fillStyle = 'rgba(243,234,211,0.35)'
  ctx.font = '400 20px "IBM Plex Mono", monospace'
  ctx.fillText('How well do you know Mauritius?', 70, 560)
}

export default function ShareCard({ score, total, tierTitle, categoryLabel }) {
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | copied | shared

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const render = () => drawCard(ctx, { score, total, tierTitle, categoryLabel })
    render()
    // Redraw once webfonts finish loading, in case they weren't ready yet.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(render)
    }
  }, [score, total, tierTitle, categoryLabel])

  function download() {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'zwazo-score.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  async function share() {
    const canvas = canvasRef.current
    const shareText = `I scored ${score}/${total} on ${categoryLabel} in Zwazo, the Mauritius trivia game!`

    canvas.toBlob(async (blob) => {
      if (!blob) return
      const file = new File([blob], 'zwazo-score.png', { type: 'image/png' })

      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Zwazo — Mauritius Trivia', text: shareText })
          setStatus('shared')
          return
        }
        if (navigator.share) {
          await navigator.share({ title: 'Zwazo — Mauritius Trivia', text: shareText })
          setStatus('shared')
          return
        }
      } catch {
        // user cancelled the share sheet — fall through to clipboard copy
      }

      try {
        await navigator.clipboard.writeText(shareText)
        setStatus('copied')
      } catch {
        // clipboard unavailable — the visible download button still works
      }
    })
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        role="img"
        aria-label={`Share card: scored ${score} out of ${total} on ${categoryLabel}, rank ${tierTitle}`}
        className="w-full rounded-2xl border border-shell-300/10"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={share}
          className="inline-flex items-center gap-2 bg-lagoon-500 hover:bg-lagoon-400 text-depths-950 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          Share result
        </button>
        <button
          onClick={download}
          className="inline-flex items-center gap-2 border border-shell-300/15 hover:border-shell-300/30 text-shell-100 text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          Download image
        </button>
        {status === 'copied' && (
          <span className="text-xs text-lagoon-400" role="status">
            Copied a caption to your clipboard
          </span>
        )}
        {status === 'shared' && (
          <span className="text-xs text-lagoon-400" role="status">
            Shared
          </span>
        )}
      </div>
    </div>
  )
}
