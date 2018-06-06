import axios from './http'
import { CANCEL } from 'redux-saga'

const filterStatus = (response) => {
  return response.data
}

const filterStatusReserveCookie = (response) => {
  const cookie = response.headers['set-cookie']
  return {
    data: response.data,
    cookie,
  }
}
  
export const get = (url, params = undefined) => {
  const source = axios.CancelToken.source()
  const promise = axios.request({
    url,
    method: 'get',
    params,
    cancelToken: source.token,
  })
  promise[CANCEL] = () => source.cancel()
  return promise.then(filterStatus)
}

export const post = (url, data) => {
  return axios
    .request({
      url,
      method: 'post',
      data,
    })
    .then(filterStatus)
}

export const postReserveCookie = (url, data) => {
  return axios
    .request({
      url,
      method: 'post',
      data,
    })
    .then(filterStatusReserveCookie)
}

export const getAll = (requests) => {
  return axios
    .all(requests)
    .then(axios.spread((...dataGroup) => {
      return dataGroup
    }))
}
