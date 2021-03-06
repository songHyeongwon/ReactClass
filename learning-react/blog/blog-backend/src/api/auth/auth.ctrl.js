import Joi from '@hapi/joi';
import User from '../../models/user';

export const register = async (ctx) => {
  //회원가입
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      // 중복인 유저네임이 있다
      ctx.status = 409;
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password); //비밀번호 해시로
    await user.save(); //저장

    //응답객체에 비밀번호 제외
    ctx.body = user.serialize();

    //토큰처리
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const login = async (ctx) => {
  //로그인
  const { username, password } = ctx.request.body;
  //네임과 패스워드 필드만 체크
  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    //계정 없으면 에러
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password); //비밀번호 체크
    //잘못된 암호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    //토큰처리
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const check = async (ctx) => {
  //상태체크
  const { user } = ctx.state;
  if (!user) {
    //로그인 아님
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};
export const logout = async (ctx) => {
  //로그아웃
  ctx.cookies.set('access_token');
  ctx.status = 204; //연결해제
};
