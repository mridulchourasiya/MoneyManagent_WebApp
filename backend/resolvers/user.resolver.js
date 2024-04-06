import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, passsword, gender } = input;
        if (!username || !name || !passsword || !gender) {
          throw new Error("All fields are requried");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User is alrady exists");
        }

        // converting the password to hashde version with the halp salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passsword, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signUp: ", err);
        throw new Error(err.message || "internal server error");
      }
    },

    // login Functionality for User
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
      } catch (err) {
        console.error("Error in Login: ", err);
        throw new Error(err.message || "internal server error ");
      }
    },


    // logout functionaliyt for user and  admin 
    logout: async(_,_,context) => {
      try {
        
      } catch (err) {
        
      }
    }






  },
  Query: {
    users: (_, _, { req, res }) => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
  Mutation: {},
};
export default userResolver;
