import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

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
        // console.log('This is res', res)
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
    // console.log('this is posts: ', this.state.posts)
    const { posts } = this.state
    if (!posts) {
      return 'Loading...'
    }

    const postsJsx = posts.map(post => (
      <Card key={post._id} className='content-bg' style={{ border: '1px solid #cbcbcb', margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{post.author}</Card.Subtitle>
          <Card.Text>{post.content}</Card.Text>
          <Card.Link href={`#posts/${post._id}`}>See Full Post</Card.Link>
        </Card.Body>
      </Card>
    ))

    return (
      <div>
        <h2>Welcome</h2>
        <ul>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {postsJsx.reverse()}
          </div>
        </ul>
      </div>
    )
  }
}

export default PostIndexAll
