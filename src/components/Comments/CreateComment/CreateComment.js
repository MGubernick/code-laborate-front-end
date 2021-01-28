import React, { useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { createComment } from '../../../api/comments'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateComment = props => {
  console.log('this is props', props)
  const [comment, setComment] = useState({ content: '', owner: '' })
  const [commentId, setCommentId] = useState(null)

  const handleChange = event => {
    event.persist()
    setComment(prevComment => {
      const updatedField = { [event.target.name]: event.target.value }

      const editComment = Object.assign({}, prevComment, updatedField)
      return editComment
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert, post } = props
    const postId = post._id

    createComment(comment, user)
      .then(res => setCommentId(res.data.comment._id))
      .then(res => msgAlert({
        heading: 'Created comment successfully',
        message: 'Thanks for the help!',
        variant: 'success'
      }))
      .then(() => history.push(`/posts/${postId}`))
      .then(event.target.reset())
      .catch(error => msgAlert({
        heading: 'Failed to create comment',
        message: `Failed because: ${error.message}`,
        variant: 'danger'
      }))
  }

  if (commentId) {
  //   return <Redirect to={`/posts/${postId}`} />
  }

  return (
    <Fragment>
      <h3>Leave a comment!</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentContent">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            type="textarea"
            rows={3}
            name="comment"
            placeholder="comment here"
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

    </Fragment>
  )
}

export default withRouter(CreateComment)
