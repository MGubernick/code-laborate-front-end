import apiUrl from '../apiConfig'
import axios from 'axios'

// Create
export const createPost = (post, user) => {
  // console.log('This is post at axios', post)
  // console.log('This is post at axios', user)
  return axios({
    url: apiUrl + '/posts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { post: post }
  })
}

// Index All
export const postIndexAll = user => {
  // console.log('This is post at axios', user)
  return axios({
    url: apiUrl + '/posts',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

// Index user
export const postIndexUser = user => {
  // console.log('This is post at axios', user)
  return axios({
    url: apiUrl + '/posts/user',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

// Show
export const showPost = (id, user) => {
  return axios({
    url: apiUrl + '/posts/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
