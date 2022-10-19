import { forwardRef, useEffect, useRef } from 'react'
import {
  Color,
  Mesh,
  MeshPhysicalMaterial,
  SphereGeometry,
  Vector3,
} from 'three'

type Props = {
  geometry: SphereGeometry
}

const ScrollSphere = forwardRef<Mesh, Props>((props, ref) => {
  const material = useRef(
    new MeshPhysicalMaterial({ metalness: 0, roughness: 1 })
  )

  const materialUniforms = useRef({
    uColor1: { value: new Color(10868839) },
    uColor2: { value: new Color(994094) },
    uColor3: { value: new Color(2119011) },
    uColor4: { value: new Color(994094) },
    uColorIndex: { value: 1 },
    uTurbulance: { value: 0 },
    uForce: { value: 0 },
    uImpact: { value: new Vector3(0, 0, 0) },
    uTime: { value: 0 },
    uLightIntensity: { value: 1 },
  })

  useEffect(() => {
    material.current.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...materialUniforms.current,
      }

      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        '\n        vec3 pos = transformed;\n        vPos = position;\n\n        float pi = radians(180.);\n        float turb = uTurbulance / pi;\n\n        v_uv.x = (position.x - bboxMin.x) / (bboxMax.x - bboxMin.x);\n        v_uv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);\n\n        vPosWorld = vec3(modelMatrix * vec4(position, 1.0)).xyz;\n\n        // impact test\n        float dist = distance((vPosWorld), (uImpact));\n\n        dist = .5 * (cos(10. * dist - uTime) + 1.0);\n\n        vDisp = 0.1 * dist * sin(uTurbulance) * uForce;\n        // vDisp = -0.1*t;\n        pos += normal * vDisp;\n\n        vPosViewModel = vec3(modelViewMatrix * vec4(position, 1.0)).xyz;\n        vNormalW = normalize(normalMatrix * normal);\n\n        vec4 mvPosition = vec4( pos, 1.0 );\n\n        #ifdef USE_INSTANCING\n\n          mvPosition = instanceMatrix * mvPosition;\n\n        #endif\n\n        mvPosition = modelViewMatrix * mvPosition;\n\n        gl_Position = projectionMatrix * mvPosition;\n        '
      )

      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        '\n        uniform vec3 bboxMin;\n        uniform vec3 bboxMax;\n        \n        // set of flat UVS\n        varying vec2 v_uv;\n\n        varying vec3 vPosViewModel;\n        varying vec3 vPosWorld;\n        varying vec3 vPos;\n        varying vec3 vNormalW;\n        varying float vDisp;\n\n        uniform float uTurbulance;\n        uniform float uTime;\n        uniform vec3 uImpact;\n        uniform float uForce;\n\n        void main() {\n        '
      )

      shader.fragmentShader =
        '\n        mat2 rotate2d(float _angle){\n          return mat2(cos(_angle),-sin(_angle),\n                      sin(_angle),cos(_angle));\n        }\n\n        vec2 rotate(vec2 _pos, float _angle) {\n          _pos -= vec2(0.5);\n          _pos *= rotate2d(_angle);\n          _pos += vec2(0.5);\n\n          return _pos;\n        }\n        '.concat(
          shader.fragmentShader,
          '\n      '
        )

      shader.fragmentShader = shader.fragmentShader.replace(
        'uniform vec3 diffuse;',
        '\n          varying vec2 v_uv;\n          uniform vec3 diffuse;\n          uniform vec3 uColor1;\n          uniform vec3 uColor2;\n          uniform vec3 uColor3;\n          uniform vec3 uColor4;\n          uniform vec3 uImpact;\n          uniform float uTurbulance;\n          uniform float uColorIndex;\n          uniform float uLightIntensity;\n          // uniform sampler2D uNumberText;\n          varying vec3 vPosViewModel;\n          varying vec3 vPosWorld;\n          varying vec3 vPos;\n          varying vec3 vNormalW;\n          varying float vDisp;\n\n          float map(float value, float min1, float max1, float min2, float max2) {\n            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n          }\n        '
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        '#if defined( USE_COLOR_ALPHA )\n  diffuseColor *= vColor;\n#elif defined( USE_COLOR )\n  diffuseColor.rgb *= vColor;\n#endif\n\nvec2 pos = v_uv;\nvec2 pos2 = pos;\npos2 = rotate(pos2, 1.);\n\nvec3 color1 = mix(uColor1, uColor3, 0.7 * pow(length(pos - vec2(1.0, 1.0)), 3.0) * (1. - 0.8*uLightIntensity));\nvec3 color3 = uColor3;\nvec3 color = mix(color1, color3, uColorIndex);\n\ndiffuseColor.rgb = color;\ndiffuseColor.rgb -= 0.08 * (1.0 - uColorIndex) * (uLightIntensity);'
      )
    }
  }, [])

  return (
    <mesh geometry={props.geometry} material={material.current} ref={ref} />
  )
})

export default ScrollSphere
