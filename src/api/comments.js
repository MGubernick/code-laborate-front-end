import axios from 'axios'
import apiUrl from '../apiConfig'

export const createComment = (comment, user, postId) => {
  return axios({
    url: apiUrl + '/comments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: {
        content: comment,
        postId: postId
      }
    }
  })
}
