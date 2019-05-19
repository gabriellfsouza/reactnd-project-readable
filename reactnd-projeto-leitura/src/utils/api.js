import * as data from './_DATA';

export function getInitialData(){
    
    return Promise.all([
        data.getCategories(),
        data.getPosts()
    ]).then(([categories,posts])=>({categories,posts}))
}

export function getCommentData({id}){
    return data.getPostComments(id);
}

export function newPost(post){
    return data.newPost(post);
}

export function updatePost(id,{body,title}){
    return data.updatePost(id,{body,title});
}

export function savePostVote(info){
    return data.postVote(info)
}

export function removePost(id){
    return data.removePost(id);
}

export function newComment(comment){
    return data.newComment(comment);
}

export function updateComment(id,{body,title}){
    return data.updateComment(id,{body,title});
}

export function saveCommentVote(info){
    return data.commentVote(info)
}

export function removeComment(id){
    return data.removeComment(id);
}