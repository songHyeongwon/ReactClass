const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    console.log("로그인 후에 작성해주세요");
    return;
  }
  return next();
};
export default checkLoggedIn;