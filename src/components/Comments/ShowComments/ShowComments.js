<<<<<<<
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import UpdateComment from './../UpdateComment/UpdateComment'

import { Redirect } from 'react-router-dom'
>>>>>>>
// import showComments from '../../../api/comments'
import { commentDestroy } from '../../../api/comments'

const ShowComments = props => {
<<<<<<<
  const { post, user } = props
  const [deleted, setDeleted] = useState(false)
  console.log('This is props at show comments', props)
>>>>>>>
  // useEffect(() => {
  //   const { commentId, msgAlerts } = props
  //
  //   showComments(commentId)
  //     .then(res => setComments(res.data.comments))
  //     .catch(error => msgAlerts({
  //       heading: 'Could not load comments',
  //       message: `Could not load comments with error: ${error.message}`,
  //       variant: 'danger'
  //     }))
  // }, [])

  const commentDelete = (commentId, event) => {
    console.log('this is commentId', commentId)
    const { user, post, msgAlert } = props
    const postId = post._id
    // const commentId = event.target
    // console.log('This is key', event.target.key)
    console.log('This is user before destroy axios', user)
    commentDestroy(commentId, postId, user)
      .then(setDeleted(true))
      // .then(() => msgAlert({
      //   heading: 'Comment Deleted!',
      //   message: 'Comment is Gone!',
      //   variant: 'success'
      // }))
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
<<<<<<<
      <Button
        variant="primary"
        type="button"
        href="#update-comment/:id"
      >
        <UpdateComment msgAlert={this.msgAlert} user={user} />
      </Button>
      <button
        onClick={(event) => commentDelete(comment._id, event)}>Delete Comment</button>
>>>>>>>
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
