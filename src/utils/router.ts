export const queryParse = (search = window.location.search) => {
  if (!search) return {}
  const queryString = search[0] === '?' ? search.substring(1) : search
  const query: any = {}
  queryString
    .split('&')
    .forEach(queryStr => {
      const [key, value] = queryStr.split('=')
      if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
    })
  return query
}

export const setQuery = (key: string, value: any) => {
  const query = queryParse()
  query[key] = String(value)
  const queryStr = objectConvertToQuery(query)
  window.history.replaceState({path:queryStr}, '', queryStr)
}


export const objectConvertToQuery = (payload: any) => {
  let queryStr = '?', i = Object.keys(payload).length
  if (!payload) {
      queryStr = ''
  }
  Object.keys(payload).forEach((key, index) => {
      if ( i === (index + 1)) {
          queryStr += (key + '=' + payload[key])
      } else {
          queryStr += (key + '=' + payload[key] + '&')
      }
  })
  return queryStr
}