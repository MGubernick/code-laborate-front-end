import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

import { postIndexUser } from './../../../api/posts'

class PostIndexUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props

    // const ownerId = res.data.post.owner._id
    postIndexUser(user)
      .then(res => {
        // console.log('This is res', res)
        this.setState({ posts: res.data.post })
      })
      .then(() => msgAlert({
        heading: 'Index User Posts Successfully',
        message: 'Click one to see details',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Index User Posts Failed',
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
    const postsJsx = posts.map(post => (
      <Card key={post._id} style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{post.owner.email}</Card.Subtitle>
          <Card.Text>{post.content}</Card.Text>
          <Card.Link href={`#posts/${post._id}`}>See Full Post</Card.Link>
        </Card.Body>
      </Card>
    ))

    return (
      <div>
        <h3>Welcome</h3>
        <ul>
          {postsJsx.reverse()}
        </ul>
      </div>
    )
  }
}

export default PostIndexUser
