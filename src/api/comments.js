import axios from 'axios'
import apiUrl from '../apiConfig'

export const createComment = (comment, user) => {
  console.log('log at axios', comment, '\n user', user)
  return axios({
    url: apiUrl + '/comments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { comment: comment }
  })
}
