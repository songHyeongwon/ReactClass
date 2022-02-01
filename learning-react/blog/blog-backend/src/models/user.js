import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserScheam = new Schema({
  username: String,
  hashedPassword: String,
});

UserScheam.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  //this를 사용하기 위해 애로우 펑션 사용 X
  this.hashedPassword = hash;
};

UserScheam.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserScheam.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserScheam.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserScheam.methods.generateToken = function () {
  const token = jwt.sign(
    //첫번째 파라미터에는 토큰 안에 집어넣고  싶은 데이터
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,//두번째 파라미터에는 JWT 암호를 넣습니다.
    {
      expiresIn: '7d', //7일간 유효
    },
  );
  return token;
};

const User = mongoose.model('User', UserScheam);
export default User;
