import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { Redirect } from 'react-router-dom'
import { commentDestroy, updateComment } from '../../../api/comments'

const ShowComments = props => {
  const { post } = props
  const [content, setContent] = useState(props.content)
  const [deleted, setDeleted] = useState(false)
  const [updateClicked, setUpdateClicked] = useState(false)
  const [commentId, setCommentId] = useState(null)
  const [commentsList] = useState(post.comments)

  // useEffect(() => {
  // }, [])

  const commentDelete = (commentId, event) => {
    const { user, post, msgAlert } = props
    const postId = post._id
    commentDestroy(commentId, postId, user)
      .then(setDeleted(true))
      // .then(() => history.push('/index-user'))
      .catch(error => msgAlert({
        heading: 'Comment Delete Failed',
        message: `Couldn't Delete Because: ${error.message}`,
        variant: 'danger'
      }))
  }

  const handleUpdateClicked = (commentId, event) => {
    setUpdateClicked(true)
    setCommentId(commentId)
  }

  const handleChange = event => {
    event.persist()
    setContent(prevContent => {
      const updatedField = { [event.target.name]: event.target.value }

      const editContent = Object.assign({}, prevContent, updatedField)
      return editContent
    })
  }

  const handleUpdate = (commentIdForAxios, event) => {
    const { msgAlert, user } = props
    const postId = post._id

    updateComment(content, user, postId, commentIdForAxios)
      .then(() => msgAlert({
        heading: 'Updated comment successfully',
        message: 'Your comment has been updated',
        variant: 'success'
      }))
      // .then(() => history.push(`/posts/${postId}`))
      .catch(error => msgAlert({
        heading: 'Failed to update comment',
        message: `Failed to update with error: ${error.message}`,
        variant: 'danger'
      }))
  }

  const commentsJsx = commentsList.map(comment => (
    <li
      key={comment._id}>
      {comment.content}

      <Button
        variant="primary"
        type="button"
        onClick={(event) => handleUpdateClicked(comment._id, event)}
      >
        Update
      </Button>
      <button
        onClick={(event) => commentDelete(comment._id, event)}>Delete Comment</button>
    </li>
  ))

  if (updateClicked) {
    return (
      <div>
        <Form onSubmit={event => handleUpdate(commentId, event)} >
          <Form.Group controlId="formBasicContent">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              placeholder="Update comment here"
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>

        <div className="showCommentContainer">
          <ul>
            {commentsJsx}
          </ul>
        </div>
      </div>
    )
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/index-user' }
    } />
  }

  if (commentId) {}

  return (
    <div className="showCommentContainer">
      <ul>
        {commentsJsx}
      </ul>
    </div>
  )
}

export default ShowComments
