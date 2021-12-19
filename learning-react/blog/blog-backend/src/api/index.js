const Router = require('koa-router');
const posts = require('./posts');

const api = new Router();
//라우터 설정
api.use('/posts', posts.routes());

// api.get('/test', (ctx) => {
//   ctx.body = '테스트성공';
// });
module.exports = api;
