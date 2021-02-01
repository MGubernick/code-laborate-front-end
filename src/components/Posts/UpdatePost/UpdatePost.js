import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
// import ReactDOM from 'react-dom'
// import PostForm from '../PostForm/PostForm'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import ToggleButton from 'react-bootstrap/ToggleButton'

import { updatePost, showPost } from '../../../api/posts'

class UpdatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: {
        title: '',
        author: '',
        content: '',
        resolved: false,
        comments: []
      },
      createId: null,
      updated: false,
      showUpdateModal: true
    }
  }

  handleClose = (event) => {
    const { history } = this.props
    this.setState({ showUpdateModal: false })
    // return (
    //   <Redirect to={`/posts/${this.props.match.params.id}`} />
    // )
    history.push(`/posts/${this.props.match.params.id}`)
  }

  // handleShow = (event) => {
  //   this.setState({ showUpdateModal: true })
  // }

  handleChange = event => {
    event.persist()

    this.setState((state) => {
      return {
        post: { ...state.post, [event.target.name]: event.target.value }
      }
    })
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    const id = match.params.id
    showPost(id, user)
      .then(res => this.setState({ post: res.data.post }))
      .then(() => {
        msgAlert({
          heading: 'Show Success',
          message: 'You can now edit you Post!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Show Failed',
          message: `Couldn't Show Because: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { post } = this.state

    const id = match.params.id

    updatePost(id, post, user)
      .then(res => {
        this.setState({ updated: true })
        return res
      })
      .then(res => msgAlert({
        heading: 'Updated Post Successfully',
        message: 'Update Successful',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Failed to Post',
        message: `Failed to Post with error: ${error.message}`,
        variant: 'danger'
      }))
  }

  render () {
    const { updated } = this.state

    if (updated) {
      return <Redirect to={`/posts/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <Modal show={this.state.showUpdateModal} backdrop="static" keyboard={false} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Post!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  placeholder="Author"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  placeholder="Content"
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
}

export default withRouter(UpdatePost)
//
// <PostForm
//   post={post}
//   handleChange={this.handleChange}
//   handleSubmit={this.handleSubmit}
// />
