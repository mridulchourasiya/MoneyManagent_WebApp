import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        console.error("Error Getting transactions: ", err);
        throw new Error(err.message || "Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;

        // Checking if the transaction
      } catch (err) {
        console.error("Error Getting transactions: ", err);
        throw new Error(err.message || "Error getting transactions");
      }
    },

    //CATEGORY MAP FUNCTON
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unorthorized");
      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId });

      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });
      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error Creating transactions: ", err);
        throw new Error("Error Creating transactions");
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (err) {
        console.error("Error Updatng transactions: ", err);
        throw new Error("Error updating transactions");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deleteTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deleteTransaction;
      } catch (err) {
        console.error("Error Deleting transactions: ", err);
        throw new Error("Error deleting transactions");
      }
    },
  },

  // TODO => ADD TRANSACTION/USER RELATIONSHIP
 Transaction:{
  user: async (parent) => {
    const userId =  parent.userId // changes for the code

    try {
      const user = await User.findById(userId)
      return user
    } catch (err) {
      console.log("error to getting the user", err);
      throw new Error("Error gettinng the user")
    }
  }
 }

};
export default transactionResolver;
