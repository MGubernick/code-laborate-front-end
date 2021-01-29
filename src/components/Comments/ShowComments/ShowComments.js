import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

import { Redirect, Link } from 'react-router-dom'
import { commentDestroy } from '../../../api/comments'

const ShowComments = props => {
  const { post } = props
  const [deleted, setDeleted] = useState(false)
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

  const commentsJsx = post.comments.map(comment => (
    <li
      key={comment._id}>
      {comment.content}

      <Button
        variant="primary"
        type="button"
      >
        <Link to={`/update-comment/${comment._id}`}>
        Update
        </Link>
      </Button>
      <button
        onClick={(event) => commentDelete(comment._id, event)}>Delete Comment</button>
    </li>
  ))

  if (deleted) {
    return <Redirect to={
      { pathname: '/index-user' }
    } />
  }

  return (
    <div className="showCommentContainer">
      <ul>
        {commentsJsx}
      </ul>
    </div>
  )
}

export default ShowComments
