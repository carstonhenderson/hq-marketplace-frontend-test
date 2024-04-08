import { apiUrl } from "consts/paths"
import { useCallback, useEffect, useState } from "react"
import { Flatten } from "types/Flatten"

export const useFetch = <T>(
  url: string,
  ResponseConstructor: new (obj: any) => Flatten<T>
) => {
  const [response, setResponse] = useState<T>()
  const [isLoading, setIsLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)

  const formatResponse = useCallback(
    (data: any) =>
      Array.isArray(data)
        ? data.map((obj: any) => new ResponseConstructor(obj))
        : new ResponseConstructor(data),
    [ResponseConstructor]
  )

  const fn = useCallback(
    () =>
      fetch(`${apiUrl}/${url}`)
        .then(response => response.json())
        .then(formatResponse)
        .then(formatted => setResponse(formatted as T))
        .catch(() => setIsErrored(true))
        .finally(() => setIsLoading(false)),
    [url, formatResponse]
  )

  useEffect(() => {
    fn()
  }, [fn])

  return { response, isLoading, isErrored, refetch: fn }
}
