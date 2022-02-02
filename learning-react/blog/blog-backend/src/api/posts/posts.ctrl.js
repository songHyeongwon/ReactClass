import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //잘못된 ID
    return;
  }
  return next(); //다음 일 해라 함수로 반환할것
};*/

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //잘못된 ID
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404; //not found
      return;
    }
    ctx.state.post = post;
    return next(); //다음 일 해라 함수로 반환할것
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    //객체가  다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), //required() 필수값
    body: Joi.string().required(), //required() 필수값
    tags: Joi.array().items(Joi.string()).required(), //배열이고 안에 아이템은 스트링이고 + 필수값
    //user: ctx.state.user,
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //잘못된 요청
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  //페이지 처리 페이지요청 없으면 기본 1
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  //console.log(`isPata = ${page}`);
  const { tag, username } = ctx.query;
  //tag, username 값이 유효하면 객체 안에 넣고 그렇지 않으면 넣지 않음
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    //sort id-1 아이디 기준으로 역정렬
    //limit(10) 10개 까지만
    //skip(n) n개를 건너뛴다. 페이징 처리 기존 앞에것은 건너뛴다
    //lean 데이터를 JSON으로 반환한다.
    const postCount = await Post.countDocuments(query).exec(); //포스트 문서갯수 가져오기
    ctx.set('Last-Page', Math.ceil(postCount / 10)); //헤더값 안에 마지막 페이지를 알려준다.
    ctx.body = posts
      //.map(post => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  /*const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; //찾는 내용 없음
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }*/
  ctx.body = ctx.state.post;
};

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; //성공했지만 반환내용은 없네요
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.params;
  //작성과 비슷 다만 필수가 아닌게 있음 타입만 검사함
  const schema = Joi.object().keys({
    title: Joi.string(), //required() 필수값
    body: Joi.string(), //required() 필수값
    tags: Joi.array().items(Joi.string()), //배열이고 안에 아이템은 스트링이고 + 필수값
  });

  //검증실패 에러일 경우
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //잘못된요청
    ctx.body = result.error;
    return;
  }
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // false 일경우에는이전것을 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
