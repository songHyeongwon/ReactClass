//const Router = require('koa-router');
//const postsCtrl = require('./posts.ctrl');
import Router from 'koa-router';
import * as postsCtrl from "./posts.ctrl";
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();
// const printInfo = ctx => {
//     ctx.body ={
//         method : ctx.method,
//         path: ctx.path,
//         params : ctx.params
//     }
// }

 posts.get('/', postsCtrl.list);
 posts.post('/', checkLoggedIn, postsCtrl.write);

 const post = new Router(); //api/posts/:id
 post.get('/', postsCtrl.read);
 post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
 post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

 posts.use('/:id' , postsCtrl.getPostById , post.routes());
 //posts.put('/:id', postsCtrl.replace);

// posts.get('/', printInfo);
// posts.post('/', printInfo);
// posts.get('/:id', printInfo);
// posts.delete('/:id', printInfo);
// posts.put('/:id', printInfo);
// posts.patch('/:id', printInfo);

//module.exports = posts;
export default posts;
