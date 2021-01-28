import React from 'react'
import Button from 'react-bootstrap/Button'
import UpdateComment from './../UpdateComment/UpdateComment'
// import showComments from '../../../api/comments'

const ShowComments = props => {
  const { post, user } = props

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

  const commentsJsx = post.comments.map(comment => (
    <li
      key={comment._id}>
      {comment.content}
      <Button
        variant="primary"
        type="button"
        href="#update-comment/:id"
      >
        <UpdateComment msgAlert={this.msgAlert} user={user} />
      </Button>
    </li>
  ))

  console.log('this is commentsJsx', commentsJsx)

  return (
    <div className="showCommentContainer">
      <ul>
        {commentsJsx}
      </ul>
    </div>
  )
}

export default ShowComments
