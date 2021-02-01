import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { updateComment } from '../../../api/comments'

const UpdateComment = props => {
  const [content, setContent] = useState(props.content)
  const [updated, setUpdated] = useState(false)

  const handleChange = event => {
    event.persist()
    setContent(prevContent => {
      const updatedField = { [event.target.name]: event.target.value }

      const editContent = Object.assign({}, prevContent, updatedField)
      return editContent
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert, history, user, match } = props
    const postId = event.target.postId
    const commentId = match.params._id

    updateComment(content, user, postId, commentId)
      .then(setUpdated)
      .then(() => msgAlert({
        heading: 'Updated comment successfully',
        message: 'Your comment has been updated',
        variant: 'success'
      }))
      .then(() => history.push(`/posts/${postId}`))
      .catch(error => msgAlert({
        heading: 'Failed to update comment',
        message: `Failed to update with error: ${error.message}`,
        variant: 'danger'
      }))
  }

  if (updated) {
    return <Redirect to={`/posts/${props.post._id}`} />
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} >
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
    </div>
  )
}

export default withRouter(UpdateComment)
