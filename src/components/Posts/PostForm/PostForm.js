import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const PostForm = ({ post, handleSubmit, handleChange }) => {
  const [showCreateModal, setShowCreateModal] = useState(true)
  const [backToIndex, setBackToIndex] = useState(false)
  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  const handleCloseCreateModal = (event) => {
    // const { history } = props
    setShowCreateModal(false)
    setBackToIndex(true)
    // history.push('/index')
  }

  if (backToIndex) {
    return (
      <Redirect to={'/index'} />
    )
  }

  return (
    <Modal
      show={showCreateModal}
      onHide={handleCloseCreateModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header style={{ color: '#fff', backgroundColor: '#114b5f' }} closeButton>
        <Modal.Title>Create A Post!</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#f3e9d2' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder="Author"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              placeholder="Content"
              onChange={handleChange}
            />
          </Form.Group>

          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Resolved" />
          </Form.Group> */}
          <Button variant="secondary" onClick={handleCloseCreateModal}>
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
  )
}

// export default withRouter(PostForm)
export default PostForm

// <Button variant="primary" onClick={handleShow}>
//   Launch static backdrop modal
// </Button>
