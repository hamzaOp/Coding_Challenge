import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    name: String
  }
});

userSchema.methods.generateHash = password => {
  bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

userSchema.methods.validPassword = password => {
  bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
