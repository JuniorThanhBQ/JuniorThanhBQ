import { useEffect, useRef } from 'react'

export function FluidShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_dark_mode;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = -1.0 + 2.0 * uv;
        p.x *= u_resolution.x / u_resolution.y;

        for(float i = 1.0; i < 4.0; i++) {
          p.x += 0.3 / i * sin(i * 3.0 * p.y + u_time * 0.4 + u_mouse.x * 0.8);
          p.y += 0.3 / i * cos(i * 3.0 * p.x + u_time * 0.3 + u_mouse.y * 0.8);
        }

        float intensity = 0.5 + 0.5 * sin(p.x + p.y + u_time * 0.5);

        vec3 color1 = mix(vec3(0.97, 0.98, 0.99), vec3(0.007, 0.023, 0.09), u_dark_mode);
        vec3 color2 = mix(vec3(0.82, 0.89, 0.96), vec3(0.12, 0.23, 0.54), u_dark_mode);
        vec3 color3 = mix(vec3(0.40, 0.68, 0.96), vec3(0.05, 0.65, 0.91), u_dark_mode);

        vec3 color = mix(color1, color2, intensity);
        float mix3_strength = mix(0.40, 0.25, u_dark_mode);
        color = mix(color, color3, mix3_strength * cos(p.x - p.y + u_time * 0.4));

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return
    }

    const positionAttributeLocation = gl.getAttribLocation(program, 'position')
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse')
    const darkModeUniformLocation = gl.getUniformLocation(program, 'u_dark_mode')

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ])
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    let animationFrameId = 0
    let startTime = Date.now()

    let targetMouse = { x: 0, y: 0 }
    let currentMouse = { x: 0, y: 0 }

    let targetDarkMode = document.documentElement.classList.contains('dark') ? 1.0 : 0.0
    let currentDarkMode = targetDarkMode

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height
      targetMouse = { x, y }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      targetDarkMode = isDark ? 1.0 : 0.0
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000.0

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08

      currentDarkMode += (targetDarkMode - currentDarkMode) * 0.08

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)

      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(timeUniformLocation, elapsed)
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseUniformLocation, currentMouse.x, currentMouse.y)
      gl.uniform1f(darkModeUniformLocation, currentDarkMode)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()

      if (gl) {
        gl.deleteBuffer(positionBuffer)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        gl.deleteProgram(program)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
