import Transaction from "../models/transaction.model.js";

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
    // TODO => ADD categoryStatistcs query
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
};
export default transactionResolver;
