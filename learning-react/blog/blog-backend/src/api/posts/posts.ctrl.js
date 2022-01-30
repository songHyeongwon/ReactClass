import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //잘못된 ID
    return;
  }
  return next(); //다음 일 해라 함수로 반환할것
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    //객체가  다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), //required() 필수값
    body: Joi.string().required(), //required() 필수값
    tags: Joi.array().items(Joi.string()).required(), //배열이고 안에 아이템은 스트링이고 + 필수값
  });
  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400; //잘못된 요청
    ctx.body = result.error
    return;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; //찾는 내용 없음
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
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
  if(result.error) {
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
