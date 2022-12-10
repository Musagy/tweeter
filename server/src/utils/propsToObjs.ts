
/**
 * Función que convierte las propiedades del request a objetos 
 */
export function propsToObjs<T>(
  req: any,
  props: string[],
  toInt: boolean = true
  // inObjs: boolean = true
): (
  | {
      [x: string]: T
    }
  | undefined
)[] {
  return props.map(prop => {
    const value = req[prop]
    if (toInt) return {[prop]: +value || undefined }
    
    return {[prop]: value || undefined }
  })
}
