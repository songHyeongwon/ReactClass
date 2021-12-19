const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); //api라우터를 적용

app.use(bodyParser());

//라우터 설정
// router.get('/', (ctx) => {
//   ctx.body = '홈';
// });
// //? 는 name 파람이 들어올수도 안들어올수도 있음
// router.get('/about/:name?', (ctx) => {
//   const { name } = ctx.params; //파람을 배열로 받음
//   //name의 존재유무에 따라 처리
//   ctx.body = name ? `${name}의 소개` : '소개';
// });

// router.get('/posts', (ctx) => {
//   const { id } = ctx.query; //쿼리를 배열로 받음
//   ctx.body = id ? `포스트${id}` : '포스트 아이디가 없습니다.';
// });

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//next(); //다음미들웨어를 실행한다. 주석주면 거기서 멈춤 ㅋㅋ
// app.use(async (ctx, next) => {
//   console.log(ctx.url);
//   console.log(1);

//   if (ctx.query.auth !== '1') {
//     ctx.status = 401; //respone 반환코드 설정
//     return;
//   }
//   //   next().then(() => {
//   //     console.log('end');
//   //   });
//   await next();
//   console.log('end');
// });

// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });

// app.use((ctx) => {
//   ctx.body = 'hello world';
// });

app.listen(4000, () => {
  console.log('Listenint to pors 4000');
});
//heurm server is listening to port 4000
