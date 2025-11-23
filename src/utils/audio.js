export const playSound = (type = 'nav', enabled = true) => {
  if (!enabled) return

  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  const ctx = new AudioContext()

  const makeTone = (freq, duration, startFreq = null) => {
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'triangle'

    osc2.detune.value = 8

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    const f0 = startFreq ?? freq

    osc1.frequency.setValueAtTime(f0, now)
    osc2.frequency.setValueAtTime(f0 * 1.01, now)

    osc1.frequency.exponentialRampToValueAtTime(freq, now + duration * 0.5)
    osc2.frequency.exponentialRampToValueAtTime(
      freq * 1.01,
      now + duration * 0.5
    )

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + duration)
    osc2.stop(now + duration)
  }

  if (type === 'nav') {
    makeTone(1800, 0.12, 1200)
  }

  if (type === 'select') {
    makeTone(900, 0.18, 600)
  }

  if (type === 'alert') {
    makeTone(300, 0.35, 500)
    setTimeout(() => makeTone(260, 0.35, 400), 120)
  }

  if (type === 'mem-150') {
    // Higher pitch, shorter duration (memory access sound)
    makeTone(2200, 0.1, 1500)
  }

  if (type === 'sys-opt') {
    // Medium pitch, medium duration (system operation sound)
    makeTone(1400, 0.15, 1000)
  }

  if (type === 'data-7') {
    // Lower pitch, longer duration (data access sound)
    makeTone(800, 0.2, 600)
  }
}
