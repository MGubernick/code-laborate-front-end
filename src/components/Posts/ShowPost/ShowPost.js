import React, { Component } from 'react'

// import { Link, withRouter } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router-dom'

import { showPost, postDelete } from '../../../api/posts'
import { commentDestroy, updateComment } from '../../../api/comments'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

import CreateComment from './../../Comments/CreateComment/CreateComment'
// import ShowComments from './../../Comments/ShowComments/ShowComments'

class PostShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      exists: true,
      deleted: false,
      updateCommentClicked: false,
      showUpdateCommentModal: false,
      updatePostButtonClicked: false,
      commentId: null,
      content: null,
      commentsList: []
    }
  }

  deleteComment = (id, event) => {
    this.setState((state) => {
      return { commentsList: state.commentsList.filter(cmnt => cmnt._id !== id) }
    })
  }

  addNewComment = (comment) => {
    const { match, user } = this.props
    showPost(match.params.id, user)
      .then(res => this.setState({ post: res.data.post, commentsList: res.data.post.comments }))
  }

  async commentDelete (commentId, event) {
    const { user, msgAlert } = this.props
    const { post } = this.state
    const postId = post._id

    try {
      await commentDestroy(commentId, postId, user)
      await this.deleteComment(commentId, event)
      this.setState({ deleted: true })
    } catch (error) {
      msgAlert({
        heading: 'Comment Delete Failed',
        message: `Couldn't Delete Because: ${error.message}`,
        variant: 'danger'
      })
    }
  }

  handleUpdateClicked = (commentId, event) => {
    this.setState({ updateCommentClicked: true })
    this.setState({ commentId: commentId })
    this.setState({ showUpdateCommentModal: true })
  }

  handleClose = (event) => {
    this.setState({ showUpdateCommentModal: false })
    this.setState({ updateCommentClicked: false })
  }

  updatePostClicked = (event) => {
    this.setState({ updatePostButtonClicked: true })
  }

  async handleUpdate (commentIdForAxios, event) {
    event.preventDefault()
    event.target.reset()

    const { msgAlert, user, match } = this.props
    const { post, content } = this.state
    const postId = post._id

    try {
      await updateComment(content, user, postId, commentIdForAxios)
      const res = await showPost(match.params.id, user)
      await this.setState({ post: res.data.post, commentsList: res.data.post.comments })
      this.setState({ updateCommentClicked: false })
      this.setState({ showUpdateCommentModal: false })
      this.setState({ updatePostButtonClicked: false })
      msgAlert({
        heading: 'Updated comment successfully',
        message: 'Your comment has been updated',
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to update comment',
        message: `Failed to update with error: ${error.message}`,
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    event.persist()
    this.setState((state) => {
      return {
        content: { ...state.content, [event.target.name]: event.target.value }
      }
    })
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
    const { post, commentsList, commentId, updateCommentClicked, showUpdateCommentModal, updatePostButtonClicked } = this.state
    const { msgAlert, user } = this.props

    if (!post) {
      return 'Loading...'
    }

    if (updatePostButtonClicked) {
      return (
        <Redirect to={`/update-post/${post._id}`}/>
      )
    }

    // if user ID doesn't match owner ID of post -> show post without buttons
    // else show buttons
    const userId = user._id
    const ownerId = post.owner._id

    let showDisplay

    if (!updateCommentClicked && !showUpdateCommentModal && userId !== ownerId) {
      const commentsJsx = commentsList.map(comment => (
        comment.owner === user._id
          ? <Card key={comment._id} style={{ width: '100%', marginTop: '10px' }}>
            <Card.Body>
              <Card.Text>{comment.content}</Card.Text>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={(event) => this.handleUpdateClicked(comment._id, event)}
                >
                  Update
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  variant='outline-danger'
                  type='button'
                  onClick={(event) => {
                    this.commentDelete(comment._id, event.target)
                  }}>
                  Delete Comment
                </Button>
              </div>
            </Card.Body>
          </Card>

          : null
      ))

      showDisplay = (
        <div>
          <h3>{post.title}</h3>
          <h5>Author: {post.author}</h5>
          <h6>{post.content}</h6>
          <Button onClick={this.updatePostClicked} variant="primary">Update</Button>
          <Button style={{ marginLeft: '10px' }} onClick={this.onPostDelete} variant="outline-danger">Delete</Button>
          <h5>Comments:</h5>
          <div className="showCommentContainer">
            <ul>
              {commentsJsx}
              <CreateComment
                user={user}
                post={post}
                msgAlert={msgAlert}
                addNewComment={this.addNewComment}
              />
            </ul>
          </div>
        </div>
      )
    } else if (!updateCommentClicked && !showUpdateCommentModal && commentsList !== null) {
      const commentsJsx = commentsList.map(comment => (
        comment.owner === user._id
          ? <Card key={comment._id} style={{ width: '100%', marginTop: '10px' }}>
            <Card.Body>
              <Card.Text>{comment.content}</Card.Text>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={(event) => this.handleUpdateClicked(comment._id, event)}
                >
                  Update
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  variant='outline-danger'
                  type='button'
                  onClick={(event) => {
                    this.commentDelete(comment._id, event.target)
                  }}>
                  Delete Comment
                </Button>
              </div>
            </Card.Body>
          </Card>

          : null
      ))

      showDisplay = (
        <div>
          <h3>{post.title}</h3>
          <h5>Author: {post.author}</h5>
          <h6>{post.content}</h6>
          <Button onClick={this.updatePostClicked} variant="primary">Update</Button>
          <Button style={{ marginLeft: '10px' }} onClick={this.onPostDelete} variant="outline-danger">Delete</Button>
          <h5>Comments:</h5>
          <div className="showCommentContainer">
            <ul>
              {commentsJsx}
              <CreateComment
                user={user}
                post={post}
                msgAlert={msgAlert}
                addNewComment={this.addNewComment}
              />
            </ul>
          </div>
        </div>
      )
    }

    if (showUpdateCommentModal) {
      return (
        <div>
          <Modal
            show={showUpdateCommentModal}
            onHide={this.handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Your Comment!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(event) => {
                this.handleUpdate(commentId, event)
              }}>
                <Form.Group controlId="formBasicContent">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="content"
                    placeholder="Update comment here"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
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
