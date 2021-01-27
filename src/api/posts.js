import apiUrl from '../apiConfig'
import axios from 'axios'

// Create
export const createPost = (post, user) => {
  console.log('This is post at axios', post)
  console.log('This is post at axios', user)
  return axios({
    url: apiUrl + '/posts',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { post: post }
  })
}
