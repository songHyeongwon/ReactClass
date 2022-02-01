import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); //토큰 X
  try {
    const decoede = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoede._id,
      username: decoede.username,
    };
    console.log('토큰을 출력한다.');
    console.log(decoede);

    //토큰의 남은 유효기간이 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoede.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoede._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7일
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    //검증 실패
    return next();
  }
};

export default jwtMiddleware;
