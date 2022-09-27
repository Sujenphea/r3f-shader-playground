// idea:
// - each brush effect is placed on a mesh
// - each mesh slowly expands, rotate, fade over time
// - the r color value used to modify the uv
// - since its white and slowly fades, the r value starts at 1 and fades to 0

import {
  Scene,
  WebGLRenderTarget,
  OrthographicCamera,
  PerspectiveCamera,
  Mesh,
  Vector2,
  Texture,
  PlaneGeometry,
  MeshBasicMaterial,
  AdditiveBlending,
  WebGLRenderer,
  IUniform,
} from 'three'

export class RippleRenderer {
  private _scene: Scene
  private _target: WebGLRenderTarget
  private _camera: OrthographicCamera

  private _meshes: Mesh[] = [] // each mesh contains one brush = one ripple
  private _currentMeshIndex = 0 // ref to which mesh to draw ripple on

  private _maxRipples = 100 // max no. mesh = max no. ripples
  private _minSpeed = 5 // min mouse speed required to activate ripple

  private _mouse = new Vector2(0, 0)
  private _prevMouse = new Vector2(0, 0) // store previous mouse coords

  /**
   * constructor
   * @param _texture ripple brush texture
   */
  constructor(private _texture: Texture) {
    this._scene = new Scene()
    this._target = new WebGLRenderTarget(window.innerWidth, window.innerHeight)

    // camera
    const { width, height } = this._getCameraDimensions()
    const near = 0
    const far = 1000

    this._camera = new OrthographicCamera(
      -width,
      width,
      height,
      -height,
      near,
      far
    )
    this._camera.position.set(0, 0, 5)

    // mesh
    this._createMeshes()

    // events
    window.addEventListener('mousemove', this._handleMouseMove)
    window.addEventListener('resize', this._handleResize)
  }

  private _getCameraDimensions = () => {
    const frustumSize = window.innerHeight
    const aspect = window.innerWidth / window.innerHeight

    const width = (frustumSize * aspect) / 2
    const height = frustumSize / 2

    return { width, height }
  }

  private _createMeshes = () => {
    // mesh properties
    const size = 64
    const geometry = new PlaneGeometry(size, size)
    const material = new MeshBasicMaterial({
      map: this._texture,
      transparent: true,
      blending: AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    })

    // create each brush mesh
    for (let i = 0; i < this._maxRipples; i++) {
      const mesh = new Mesh(geometry, material.clone())

      mesh.rotateZ(2 * Math.PI * Math.random())
      mesh.visible = false

      this._scene.add(mesh)
      this._meshes.push(mesh)
    }
  }

  // handlers
  private _handleMouseMove = (e: MouseEvent) => {
    this._mouse.x = e.clientX - window.innerWidth / 2
    this._mouse.y = window.innerHeight / 2 - e.clientY
  }

  private _handleResize = () => {
    const { width, height } = this._getCameraDimensions()

    // update camera
    this._camera.left = -width
    this._camera.right = width
    this._camera.top = height
    this._camera.bottom = -height
    this._camera.updateProjectionMatrix()

    // update size
    this._target.setSize(window.innerWidth, window.innerHeight)
  }

  private _handleCreateNewWave = () => {
    const mesh = this._meshes[this._currentMeshIndex]
    const material = mesh.material as MeshBasicMaterial

    // update mesh
    mesh.visible = true
    mesh.position.set(this._mouse.x, this._mouse.y, 0)
    mesh.scale.x = mesh.scale.y = 0.2
    material.opacity = 0.5
  }

  // frame tick
  // - called with each frame
  private _checkMousePosition = () => {
    const distance = this._mouse.distanceTo(this._prevMouse)

    if (distance > this._minSpeed) {
      this._handleCreateNewWave()

      // increment index
      this._currentMeshIndex = (this._currentMeshIndex + 1) % this._maxRipples
    }

    // update state
    this._prevMouse.x = this._mouse.x
    this._prevMouse.y = this._mouse.y
  }

  /**
   * update texture
   * @param gl renderer
   * @param uTexture render pass texture
   */
  updateTexture = (gl: WebGLRenderer, uTexture: IUniform<any>) => {
    this._checkMousePosition()

    gl.setRenderTarget(this._target)
    gl.render(this._scene, this._camera)
    uTexture.value = this._target.texture
    gl.setRenderTarget(null)
    gl.clear()

    this._meshes.forEach((mesh) => {
      const material = mesh.material as THREE.MeshBasicMaterial

      mesh.rotation.z += 0.02
      mesh.scale.x = 0.98 * mesh.scale.x + 0.17
      mesh.scale.y = mesh.scale.x
      material.opacity *= 0.97

      if (material.opacity < 0.002) {
        mesh.visible = false
      }
    })
  }

  /**
   * destroy instances + event listeners
   */
  dispose = () => {
    window.removeEventListener('mousemove', this._handleMouseMove)
    window.removeEventListener('resize', this._handleResize)
  }
}
