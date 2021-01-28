import axios from 'axios'
import apiUrl from '../apiConfig'

export const createComment = (content, user, postId) => {
  console.log('this is content in axios', content)
  return axios({
    url: apiUrl + '/comments',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      comment: {
        content: content.content,
        postId: postId
      }
    }
  })
}
