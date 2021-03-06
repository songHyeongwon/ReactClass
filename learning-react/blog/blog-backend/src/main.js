require('dotenv').config();
//const Koa = require('koa');
//const Router = require('koa-router');
//const bodyParser = require('koa-bodyparser');
//const mongoose = require('mongoose');
//const api = require('./api');
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import createFakeDate from './createFakeData';
import jwtMiddleware from './lib/jwtMiddleware';

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const {PORT , MONGO_URI} = process.env;

// 몽구스 버전이 6.0이상이라면 몽구스는 항상 
// useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false, 
// 로 기억하고 실행하기 때문에 더이상 지원하지 않는다는 이야기이다.
mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true
    //, useFindAndModify: false 
  })
  .then(() => {
    console.log('Connected to MongoDB');
    //createFakeDate();
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); //api라우터를 적용

//라우터 적용전에 토큰 체크
app.use(bodyParser());
app.use(jwtMiddleware);

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

//POST가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listenint to pors %d',port);
});
//heurm server is listening to port 4000