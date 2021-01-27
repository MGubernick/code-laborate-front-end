import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postIndexAll } from './../../../api/posts'

class PostIndexAll extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props

    postIndexAll(user)
      .then(res => {
        console.log('This is res', res)
        this.setState({ posts: res.data.post })
      })
      .then(() => msgAlert({
        heading: 'Index All Posts Successfully',
        message: 'Click one to see details',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Index All Posts Failed',
          message: `could not load posts: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    const { posts } = this.state
    if (!posts) {
      return 'Loading...'
    }

    const reversedPosts = posts.reverse()

    const postsJsx = reversedPosts.map(post => (
      <Link to={`/posts/${post._id}`} key={post._id}>
        <li>
          {post.title}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>Welcome</h3>
        <ul>
          {postsJsx}
        </ul>
      </div>
    )
  }
}

export default PostIndexAll
