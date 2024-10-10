import Http from '@/utils/http'

/* 首页详情 */
export const getHomeDetail = (params) => Http.get('/tbMeeting/select', params)
