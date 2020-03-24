import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
  })

  // instance.interceptors.request.use(config => {
  //   console.log(config)
  //   return config
  // }, err => {
  //   console.log(err)
  // })

  // instance.interceptors.response.use(res => {
  //   console.log(res)
  //   return res
  // }, err => {
  //   console.log(err)
  // })
  return instance(config)
}

/*
 获取轮播图
 */
export function getBanner () {
  return request({
    url: '/banner'
  })
}
/*
 获取热门歌单
 */
export function getSongList () {
  return request({
    url: '/top/playlist',
    params: {
      limit: 9
      // order: 'new',
      // cat: '流行'
    }
  })
}
/*
 获取歌手
 */
export function getSingerList () {
  return request({
    url: '/artist/list'
  })
}
/*
 获取歌单详情
 */
export function getListDetail (id) {
  return request({
    url: '/playlist/detail',
    params: {
      id: id
    }
  })
}
/*
 获取歌曲
*/
export function getSong (id) {
  return request({
    url: '/song/url',
    params: {
      id: id
    }
  })
}
/*
 * 获取歌词
*/
export function getLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  })
}
/*
 获取排行榜
 */
export function getTopList () {
  return request({
    url: '/toplist/detail',
    params: {
      limit: 6
    }
  })
}
/*
 获取热门搜索
 */
export function getSearchHot () {
  return request({
    url: '/search/hot'
  })
}
/*
 获取搜索结果
*/
export function getSearchResult (keywords) {
  return request({
    url: '/search',
    params: {
      keywords: keywords
    }
  })
}
