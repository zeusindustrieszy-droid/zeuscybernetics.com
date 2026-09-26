import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * The theatre: a reachable-surface graph rendered as a rotating point sphere
 * with proximity links. Gold on black, pointer-parallaxed, no textures.
 */
export default function Net() {
  const host = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = window.innerWidth < 700 ? 78 : 150
    const GOLD = 0xc4a35a

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // Fibonacci sphere — even spread, no clumping at the poles.
    const R = 3.1
    const pts: THREE.Vector3[] = []
    const ga = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const th = ga * i
      pts.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(R))
    }

    const pos = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => p.toArray(pos, i * 3))

    const dot = new THREE.CanvasTexture(spot())
    const nodes = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)),
      new THREE.PointsMaterial({ size: 0.19, map: dot, color: GOLD, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending }),
    )
    group.add(nodes)

    // Link surfaces that are near each other on the sphere.
    const link: number[] = []
    const max = 1.42
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < max) link.push(i * 3, j * 3)
      }
    }
    const lines = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)),
      new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.16 }),
    )
    lines.geometry.setIndex(link)
    group.add(lines)

    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R * 1.24, 1)),
      new THREE.LineBasicMaterial({ color: 0x8a6f35, transparent: true, opacity: 0.12 }),
    )
    group.add(shell)

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(R * 1.5, R * 1.52, 96),
      new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.14, side: THREE.DoubleSide }),
    )
    halo.rotation.x = Math.PI / 2.35
    group.add(halo)

    const target = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const clock = new THREE.Clock()
    const tick = () => {
      const t = clock.getElapsedTime()
      if (!reduced) {
        group.rotation.y += 0.0016
        group.rotation.x += (target.y * 0.22 - group.rotation.x) * 0.045
        group.rotation.z += (target.x * 0.16 - group.rotation.z) * 0.045
        halo.rotation.z = t * 0.05
      }
      camera.position.x += (target.x * 0.5 - camera.position.x) * 0.05
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      group.traverse(o => {
        const m = o as THREE.Points | THREE.LineSegments | THREE.Mesh
        m.geometry?.dispose()
        const mat = m.material as THREE.Material & { map?: THREE.Texture }
        mat?.dispose()
        mat?.map?.dispose()
      })
      dot.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="hero-canvas" ref={host} aria-hidden="true"/>
}

/** Soft round sprite so the nodes read as lit points, not squares. */
function spot() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,240,205,1)')
  grad.addColorStop(0.35, 'rgba(196,163,90,0.75)')
  grad.addColorStop(1, 'rgba(196,163,90,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return c
}
