# Project 3: Code-laborate (Front-End)
This Repository is for the front end of the Code-Laborate application! Code-Laborate is a message board for software engineers to collaborate and post questions about difficult programming issues that are encountered. Other users are then able to leave comments on posts with helpful solutions.

## Other Important Links & Resources Used:
- [code-laborate-API Repo](https://github.com/super-props/code-laborate-API)
- [Deployed API](https://murmuring-shelf-77263.herokuapp.com/)
- [Deployed App](https://super-props.github.io/code-laborate-front-end/#/)
**Website Resources**
- [w3schools](w3schools.com)
- [developer.mozilla](developer.mozilla.org)
- [stackOverflow](stackOverflow.com)
- [React Docs](reactjs.org)
- [React Bootstrap](https://react-bootstrap.github.io/)
-
## Planning and Story: Development Process and Problem-Solving Strategy:

### Planning:
- We started by choosing a prompt and decided to go with a message board. Next, we mapped out our process by drawing an ERD to show the relationship between our resources (the user, the posts, and the comments). Afterwards, we drew up a wireframe to plan out how we wanted the UI to appear to the user. We wrote user stories to layout the functionality we wanted to create for the user experience.

### CRUD Posts & Comments:
- As a team, we started with our create post action together, then show one post since we would need this functionality before other CRUD actions. At this point, we split up into 2 groups and utilized peer programming to complete the other actions. With our comment resource, since it is a sub-document, we completed the 3 comment actions together since they were more complex than post.

### Problem-Solving:
- We were having issues with the asynchronous flow of the code when creating/updating/deleting comments. The ShowPost page (where comments live) was re-rendering before we recieved the API response. We ended up having to use the async/await syntax to make our code pattern synchronous allowing the re-render function to use the response from the API.

## User Stories:
- As a user, I want to create an account
- As a user, I want to log in to my account and be able to change my password
- As a user, I want to post a question/problem to the board
- As a user, I want to view all of the posts by the community
- As a user, I want to view all of my posts that I've posted
- As a user, I want to 'resolve' (delete) my own posts after they have been answered (if I want too)
- As a user, I want to comment on posts to help the other user out

## Technologies Used:
- HTML/CSS
- Bootstrap
- Javascript
- React
- Axios
- Github Pages

## Unsolved Problems:
- Resolve checkbox for posts that have been resolved
- 'Like' button so users can 'like' their favorite comment on the post

## Wireframes
![Wireframes](https://i.imgur.com/nLmdsu8.png "Wireframes")
