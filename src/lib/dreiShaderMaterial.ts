import { ShaderMaterial, UniformsUtils } from "three"
import { nanoid } from "nanoid"

function shaderMaterial(
  uniforms: any,
  vertexShader: string,
  fragmentShader: string,
  onInit: any
) {
  const material = class material extends ShaderMaterial {
    constructor() {
      const entries = Object.entries(uniforms) // Create unforms and shaders

      super({
        uniforms: entries.reduce((acc, [name, value]) => {
          const uniform = UniformsUtils.clone({
            [name]: {
              value,
            },
          })
          return { ...acc, ...uniform }
        }, {}),
        vertexShader,
        fragmentShader,
      }) // Create getter/setters
      //@ts-ignore
      this.key = ""
      entries.forEach(([name]) =>
        Object.defineProperty(this, name, {
          get: () => this.uniforms[name].value,
          set: (v) => (this.uniforms[name].value = v),
        })
      )
      if (onInit) onInit(this)
    }
  }
  //@ts-ignore
  material.key = nanoid()
  return material
}

export default shaderMaterial
