import React, { useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { createComment } from '../../../api/comments'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateComment = props => {
  const [content, setContent] = useState('')
  const [commentId, setCommentId] = useState(null)

  const handleChange = event => {
    event.persist()
    setContent(prevComment => {
      const updatedField = { [event.target.name]: event.target.value }

      const editComment = Object.assign({}, prevComment, updatedField)
      return editComment
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert, history, user, post } = props
    const postId = post._id
    console.log('this is the content before axios: ', content)
    // console.log('this is post before axios', post)

    createComment(content, user, postId)
      .then(res => setCommentId(res.data.post.comments._id))
      .then(res => msgAlert({
        heading: 'Created comment successfully',
        message: 'Thanks for the help!',
        variant: 'success'
      }))
      // .then(console.log('it worked!'))
      .then(event.target.reset())

      .then(() => history.push(`/posts/${postId}`))
      .catch(error => msgAlert({
        heading: 'Failed to create comment',
        message: `Failed because: ${error.message}`,
        variant: 'danger'
      }))
      // .catch(console.error)
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
            name="content"
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
