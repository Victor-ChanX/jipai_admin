/*
 * @Descripttion:
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-15 16:15:11
 * @LastEditors: pj
 * @LastEditTime: 2023-06-20 15:52:08
 */
import request from '@/utils/request'

const userApi = {
  getWaitNumber: '/lineUp/getWaitNumber',
  getLineUpList: 'lineUp/getLineUpList',
  getLargeScreen: '/lineUp/getLargeScreen'
}

export function getWaitNumber (parameter) {
  return request({
    url: userApi.getWaitNumber,
    method: 'post',
    data: parameter
  })
}

export function getLineUpList (parameter) {
  return request({
    url: userApi.getLineUpList,
    method: 'post',
    data: parameter
  })
}

export function getLargeScreen (parameter) {
  return request({
    url: userApi.getLargeScreen,
    method: 'post',
    data: parameter
  })
}
