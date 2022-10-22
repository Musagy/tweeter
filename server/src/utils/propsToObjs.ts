export function propsToObjs<T>(
  req: any,
  props: string[],
  toInt: boolean = true
): (
  | {
      [x: string]: T
    }
  | undefined
)[] {
  return props.map(prop => {
    const value = req[prop]
    // if (toInt) return value ? { [prop]: +value } : undefined
    // return value ? { [prop]: value } : undefined
    if (toInt) return {[prop]: +value || undefined }
    
    return {[prop]: value || undefined }
  })
}
