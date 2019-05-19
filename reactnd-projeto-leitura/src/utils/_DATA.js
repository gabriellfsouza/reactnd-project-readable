
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


// GET /categories
//   USAGE:
//     Get all of the categories available for the app. List is found in categories.js.
//     Feel free to extend this list as you desire.
export const getCategories = () =>
fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

// GET /:category/posts
//   USAGE:
//     Get all of the posts for a particular category
export const getCategoryPost = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
//    .then(data => data.post)

// GET /posts
//   USAGE:
//     Get all of the posts. Useful for the main page when no category is selected.
export const getPosts = () =>
fetch(`${api}/posts`, { headers })
  .then(res => res.json())
//  .then(data => data.categories)

// POST /posts
//   USAGE:
//     Add a new post

//   PARAMS:
//     id - UUID should be fine, but any unique id will work
//     timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//     title - String
//     body - String
//     author - String
//     category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
export const newPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
//    .then(data => data.books)

// GET /posts/:id
//   USAGE:
//     Get the details of a single post
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
//    .then(data => data.post)

// POST /posts/:id
//   USAGE:
//     Used for voting on a post
//   PARAMS:
//     option - String: Either "upVote" or "downVote"
export const postVote = ({id, upVote = true}) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers:{
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:(upVote) ? 'upVote' : 'downVote'})
  }).then(res => res.json())

// PUT /posts/:id
//   USAGE:
//     Edit the details of an existing post
//   PARAMS:
//     title - String
//     body - String
export const updatePost = (id, {title,body}) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title,body })
  }).then(res => res.json())

// DELETE /posts/:id
//   USAGE:
//     Sets the deleted flag for a post to 'true'.
//     Sets the parentDeleted flag for all child comments to 'true'.
export const removePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {...headers}
  }).then(res => res.json())

// GET /posts/:id/comments
//   USAGE:
//     Get all the comments for a single post
export const getPostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
//    .then(data => data.post)


// POST /comments
//   USAGE:
//     Add a comment to a post

//   PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
//     author: String
//     parentId: Should match a post id in the database.
export const newComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

// GET /comments/:id
//   USAGE:
//     Get the details for a single comment
export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())


// POST /comments/:id
//   USAGE:
//     Used for voting on a comment.
//   PARAMS:
//     option - String: Either "upVote" or "downVote"
export const commentVote = ({id, upVote = true}) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:(upVote) ? 'upVote' : 'downVote'})
  }).then(res => res.json())


// PUT /comments/:id
//   USAGE:
//     Edit the details of an existing comment

//   PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String
export const updateComment = (id, {timestamp,body}) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp,body })
  }).then(res => res.json())

// DELETE /comments/:id
//   USAGE:
//     Sets a comment's deleted flag to 'true'
export const removeComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {...headers}
  }).then(res => res.json())



/*
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books)
*/