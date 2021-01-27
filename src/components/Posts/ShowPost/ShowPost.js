import React, { Component } from 'react'

import { Link, withRouter, Redirect } from 'react-router-dom'

import { showPost, postDelete } from '../../../api/posts'

class PostShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      exists: true
    }
  }

  onPostDelete = () => {
    const { user, match, msgAlert } = this.props
    postDelete(match.params.id, user)
      .then(this.setState({ exists: false }))
      .then(() => msgAlert({
        heading: 'Deleted Post Successfully',
        message: 'The post has been deleted.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting Post Failed',
          message: `Failed to delete post with error: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    showPost(match.params.id, user)
      .then(res => {
        console.log('this is res: ', res)
        this.setState({ post: res.data.post })
        return res
      })
      .then(res => msgAlert({
        heading: 'Showing Post Successfully',
        message: `Now showing ${res.data.post.title}`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Post Failed',
          message: `Failed to show post with error: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    const { post, exists } = this.state
    const { user } = this.props
    console.log('this is user', user)
    console.log('this is post', post)

    if (!exists) {
      return <Redirect to={'/index'} />
    }

    if (!post) {
      return 'Loading...'
    }

    // if user ID doesn't match owner ID of post -> show post without buttons
    // else show buttons
    const userId = user._id
    const ownerId = post.owner._id

    let showDisplay

    if (userId !== ownerId) {
      showDisplay = (
        <div>
          <h3>{post.title}</h3>
          <h4>author: {post.author}</h4>
          <p>{post.content}</p>
          <h5>Comments:</h5>
          <ul>
            <li>This will be a comment.</li>
          </ul>
        </div>
      )
    } else {
      showDisplay = (
        <div>
          <button onClick={this.onPostDelete}>Delete</button>
          <button>
            <Link to={`/update-post/${post._id}`}>
            Update
            </Link>
          </button>
          <h3>{post.title}</h3>
          <h4>author: {post.author}</h4>
          <p>{post.content}</p>
          <h5>Comments:</h5>
          <ul>
            <li>This will be a comment.</li>
          </ul>
        </div>
      )
    }

    return (
      <div>
        {showDisplay}
      </div>
    )
  }
}

export default withRouter(PostShow)
