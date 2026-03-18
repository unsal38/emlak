const mongoose = require("mongoose")
const Mulk = require('../schema/mulk.js');
const User = require('../schema/user.js');
const jwt = require("./token_gerenate.js");
const Blog = require('../schema/blog-single.js');

const add_mulk = function add_mulk(data) {
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

const delete_mulk = function delete_mulk(_id) {


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

const update_mulk = function update_mulk(_id, data) {


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

const add_user = async function add_user(data) {
  const email_check = await User.findOne({ email: data.email })
  const createUser = async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      const _id = user._id
      const authentication = await jwt.new_reflesh_token(data)
      await User.findByIdAndUpdate(_id, { "authentication": authentication })
    } catch (err) {
      console.error('Error creating user:', err.message);
    }
  }
  if (email_check === null) {
    createUser(data)
  } else {
    return false
  }


}

function find_user(value) {
  const myPromise = new Promise(async (resolve) => {
    try {
      return await User.findOne({ email: value }).then((v) => {
        if (v === null) {
          resolve(null)
          console.log(`mülk ${value} not find`)
        }
        if (v !== null) {
          resolve(v)
        }
      })
    } catch (err) {
      console.error('Error find user:', err.message);
    }
  })
  return myPromise
}

const delete_user = function delete_user(_id) {
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

const update_user = function update_user(_id, data) {
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


const add_advisor = async function add_user(data) {
  const email_check = await User.findOne({ email: data.email })
  const createAdvisor = async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      const _id = user._id
      const authentication = await jwt.new_reflesh_token(data)
      await User.findByIdAndUpdate(_id, { "authentication": authentication })
    } catch (err) {
      console.error('Error creating user:', err.message);
    }
  }
  if (email_check === null) {
    createAdvisor(data)
  } else {
    return false
  }


}


/////////////////////////////////////////

const add_blog_single = function add_blog_single(data) {
  
  const createBlog = async (blogData) => {
    try {
      const blog = new Blog(blogData);
      await blog.save();
      console.log('User created:', blog);
    } catch (err) {
      console.error('Error creating blog:', err);
    }
  };

  createBlog(data);
}
const delete_blog_single = function delete_mulk(_id) {

  const delete_blog_single = async (_id) => {
    try {
      await Mulk.findByIdAndDelete({ _id });
      console.log(`mülk ${_id} deleted`);
    } catch (err) {
      console.error('Error deleting mulk:', err.message);
    }
  };

  delete_blog_single(_id);

}


module.exports = {
  add_blog_single,
  delete_blog_single,
  add_mulk,
  delete_mulk,
  update_mulk,
  add_user,
  delete_user,
  update_user,
  find_user,
  add_advisor
}