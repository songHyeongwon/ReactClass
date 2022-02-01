import jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); //토큰 X
  try {
    const decoede = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoede._id,
      username: decoede.username,
    };
    console.log(decoede);
    return next();
  } catch (e) {
    //검증 실패
    return next();
  }
};

export default jwtMiddleware;
