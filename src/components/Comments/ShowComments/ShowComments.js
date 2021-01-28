import React from 'react'
// import showComments from '../../../api/comments'

const ShowComments = props => {
  const { post } = props

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
      key={comment.id}>
      {comment.content}
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
