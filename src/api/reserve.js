/*
 * @Descripttion:
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-15 16:15:11
 * @LastEditors: pj
 * @LastEditTime: 2023-06-22 14:55:11
 */
import request from '@/utils/request'

const userApi = {
  getWaitNumber: '/lineUp/getWaitNumber',
  getLineUpList: 'lineUp/getLineUpList',
  getLargeScreen: '/lineUp/getLargeScreen',
  getPreBookList: '/preBook/getPreBookList'
}
/**
 * 获取餐台排号人数
 * @param {*} 空
 * @returns List
 */
export function getWaitNumber (parameter) {
  return request({
    url: userApi.getWaitNumber,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取预约列表
 * @param {*} parameter preBookDate日期，preBookType预约类型，page页码，limit每页条数
 * @returns Object
 */
export function getPreBookList (parameter) {
  return request({
    url: userApi.getPreBookList,
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
