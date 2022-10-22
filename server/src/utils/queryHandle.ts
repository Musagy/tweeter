export const queryHandle = (
  data: any,
  dataPropName: string,
  dataReturn: "string" | "number" | "boolean"
) => {
  const dataRes =
    dataReturn === "boolean"
      ? data === "true"
        ? true
        : false
      : dataReturn === "number"
      ? +data
      : data
  const result = data ? { [dataPropName]: dataRes } : undefined
  return result
}
