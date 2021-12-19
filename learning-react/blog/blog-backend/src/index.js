const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  next();//다음미들웨어를 실행한다. 주석주면 거기서 멈춤 ㅋㅋ
});

app.use((ctx, next) => {
    console.log(2);
    next();
});

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('Listenint to pors 4000');
});
//heurm server is listening to port 4000
