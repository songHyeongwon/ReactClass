import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserScheam = new Schema({
  username: String,
  hashedPassword: String,
});

UserScheam.method.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  //this를 사용하기 위해 애로우 펑션 사용 X
  this.hashedPassword = hash;
};

UserScheam.method.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserScheam.statics.findByUsername = function(username) {
    return this.findOne({username});
}

const User = mongoose.model('User', UserScheam);
export default User;
