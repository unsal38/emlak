import mongoose from "mongoose"
import Mulk from '../schema/mulk.js';
import User from '../schema/user.js'

export const add_mulk = function add_mulk(data) {
  const createMulk = async (mulkData) => {
    try {
      const mulk = new Mulk(mulkData);
      await mulk.save();
      console.log('User created:', mulk);
    } catch (err) {
      console.error('Error creating mulk:', err.message);
    }
  };

  createMulk(data);
}

export const delete_mulk = function delete_mulk(_id) {


  const delete_mulk = async (_id) => {
    try {
      await Mulk.findByIdAndDelete({ _id });
      console.log(`mülk ${_id} deleted`);
    } catch (err) {
      console.error('Error deleting mulk:', err.message);
    }
  };

  delete_mulk(_id);

}

export const update_mulk = function update_mulk(_id, data) {


  const update_mulk = async (_id, data) => {
    try {
      await Mulk.findByIdAndUpdate({ _id, data });
      console.log(`mülk ${_id} updated`);
    } catch (err) {
      console.error('Error deleting mulk:', err.message);
    }
  };

  update_mulk(_id, data);

}

/////////////////////////////////////////

export const add_user = async function add_user(data) {
  const email_check = await User.findOne({ email: data.email })
  const createUser = async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      console.log('User created:', user);
    } catch (err) {
      console.error('Error creating user:', err.message);
    }
  }
  if (email_check === null) {
    createUser(data)
  }else{
    return false
  }


}

export const delete_user = function delete_user(_id) {
  const delete_user = async (_id) => {
    try {
      await User.findByIdAndDelete({ _id });
      console.log(`mülk ${_id} deleted`);
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }
  };

  delete_user(_id);

}

export const update_user = function update_user(_id, data) {
  const update_user = async (_id, data) => {
    try {
      await User.findByIdAndUpdate({ _id, data });
      console.log(`user ${_id} updated`);
    } catch (err) {
      console.error('Error deleting user:', err.message);
    }
  };

  update_user(_id, data);

}





export default {
  add_mulk,
  delete_mulk,
  update_mulk,
  add_user,
  delete_user,
  update_user
}