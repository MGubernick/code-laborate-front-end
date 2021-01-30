import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

import { showPost, postDelete } from '../../../api/posts'
import { commentDestroy } from '../../../api/comments'

import CreateComment from './../../Comments/CreateComment/CreateComment'
// import ShowComments from './../../Comments/ShowComments/ShowComments'

class PostShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      exists: true,
      deleted: false,
      commentsList: []
    }
  }

  deleteComment = (id, event) => {
    console.log('This is the id', id)
    this.setState((state) => {
      return { commentsList: state.commentsList.filter(cmnt => cmnt._id !== id) }
    })
  }

  addNewComment = (comment) => {
    this.setState((state) => {
      return { commentsList: [...state.commentsList, { content: comment.content, _id: comment._id }] }
    })
  }

  commentDelete = (commentId, event) => {
    const { user, msgAlert } = this.props
    const { post } = this.state
    const postId = post._id
    commentDestroy(commentId, postId, user)
      .then(res => this.setState({ deleted: true }))
      // .then(() => history.push('/index-user'))
      .catch(error => msgAlert({
        heading: 'Comment Delete Failed',
        message: `Couldn't Delete Because: ${error.message}`,
        variant: 'danger'
      }))
  }

  onPostDelete = () => {
    const { user, match, history, msgAlert } = this.props
    postDelete(match.params.id, user)
      .then(this.setState({ exists: false }))
      .then(() => msgAlert({
        heading: 'Deleted Post Successfully',
        message: 'The post has been deleted.',
        variant: 'success'
      }))
      .then(() => history.push('/index'))
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
        this.setState({ post: res.data.post, commentsList: res.data.post.comments })
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
    const { post, commentsList } = this.state
    const { msgAlert, user } = this.props

    if (!post) {
      return 'Loading...'
    }

    // if user ID doesn't match owner ID of post -> show post without buttons
    // else show buttons
    const userId = user._id
    const ownerId = post.owner._id

    let showDisplay

    if (userId !== ownerId) {
      const commentsJsx = commentsList.map(comment => (
        <li
          key={comment._id}>
          {comment.content.content}

          <button
            variant="primary"
            type="button"
            // onClick={(event) => handleUpdateClicked(comment._id, event)}
          >
            Update
          </button>
          <button
            onClick={(event) => {
              this.commentDelete(comment._id, event)
              this.deleteComment(comment._id, event)
            }}>Delete Comment</button>
        </li>
      )
      )
      showDisplay = (
        <div>
          <h3>{post.title}</h3>
          <h5>Author: {post.author}</h5>
          <h6>{post.content}</h6>
          <h5>Comments:</h5>
          <CreateComment
            user={user}
            post={post}
            msgAlert={msgAlert}
            addNewComment={this.addNewComment}
          />
          {/* <ShowComments
            post={post}
            user={user}
            msgAlert={msgAlert}
            addNewComment={this.addNewComment}
            commentsList={commentsList}
          /> */}
          <div className="showCommentContainer">
            <ul>
              {commentsJsx}
            </ul>
          </div>
        </div>
      )
    } else if (commentsList !== null) {
      const commentsJsx = commentsList.map(comment => (
        <li
          key={comment._id}>
          {comment.content}

          <button
            variant="primary"
            type="button"
            // onClick={(event) => handleUpdateClicked(comment._id, event)}
          >
            Update
          </button>
          <button
            onClick={(event) => {
              this.commentDelete(comment._id, event)
              this.deleteComment(comment._id, event)
            }}>Delete Comment</button>
        </li>
      ))

      showDisplay = (
        <div>
          <button onClick={this.onPostDelete}>Delete</button>
          <button>
            <Link to={`/update-post/${post._id}`}>
            Update
            </Link>
          </button>
          <h3>{post.title}</h3>
          <h5>Author: {post.author}</h5>
          <h6>{post.content}</h6>
          <h5>Comments:</h5>
          <CreateComment
            user={user}
            post={post}
            msgAlert={msgAlert}
            addNewComment={this.addNewComment}
          />
          {/* <ShowComments
            post={post}
            user={user}
            msgAlert={msgAlert}
            addNewComment={this.addNewComment}
            commentsList={commentsList}
          /> */}
          <div className="showCommentContainer">
            <ul>
              {commentsJsx}
            </ul>
          </div>
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
