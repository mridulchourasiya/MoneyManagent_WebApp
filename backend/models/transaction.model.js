const transactionSchema = new mongoose.Schema({
  userId: {
    type: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "expanse", "investment"],
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
