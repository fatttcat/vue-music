import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../view/home/Home')
const Singer = () => import('../view/singer/Singer')
const Rank = () => import('../view/rank/Rank')
const Search = () => import('../view/search/Search')
const History = () => import('../view/history/History')
const TopList = () => import('../view/toplist/TopList')
const Disc = () => import('../view/disc/Disc')
const SingerList = () => import('../view/singerlist/SingerList')

export default new Router({
  routes: [
    {
      path: '',
      redirect: 'home',
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/home/:id',
      component: Disc
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/singerlist',
      component: SingerList
    },
    {
      path: '/rank',
      component: Rank
      // children: [
      //   {
      //     path: ':id',
      //     component: TopList
      //   }
      // ]
    },
    {
      path: '/rank/:id',
      component: TopList
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/history',
      component: History
    }

  ]
})
