const transactionTypeDef = `#graphql
  type Transaction {
    _id: ID!
    userId:ID!
    description: String!
    paymentType:String!
    category:String!
    amount: Float!
    location: String!
    date:String!
  }

  type Query {
    transactions: [Transaction]  # Rename to 'transactions' to reflect it returns a list
    transaction(transactionId: ID!): Transaction
    # TODO => ADD USER/TRANSACTION RELATION
}

  type Mutation {
    createTransaction(input: CreateTransactionInput!):Transaction!
    updateTransaction(input: UptransactionInput!):Transaction!
    deleteTransaction(transactionId:ID!):Transaction!

  }
 input CreateTransactionInput {
    description: String!
    paymentType:String!
    category:String!
    amount:Float!
    date:String!
    location:String
 }
 input UptransactionInput {
    transactionId: ID!
    description: String!
    paymentType:String
    category:String
    amount: Float
    location:String
    date:String

 }


`;
export default transactionTypeDef;
