const User = require("./user");
const Address = require("./address");
const Payment = require("./payment");
const Product = require("./product");
const Review = require("./review");
const Transaction = require("./transaction");
const TransactionItem = require("./transactionItem");
const Year = require("./year");
const Type = require("./type");
const Country = require("./country");


//Relaciones: Transaction

Transaction.belongsTo(User)
Transaction.belongsTo(Payment)
Transaction.belongsTo(Address)
Transaction.hasMany(TransactionItem)

//Relaciones: transactionItem

TransactionItem.belongsTo(Product);
TransactionItem.belongsTo(Transaction);

//Relaciones: Payment

Payment.belongsTo(User);

//Relaciones: Review

Review.belongsTo(User);
Review.belongsTo(Product);

//Relaciones: Address

Address.belongsTo(User);

//Relaciones: Productos

Product.belongsTo(Type);
Product.belongsTo(Country);
Product.belongsTo(Year);

module.exports = { User, Address, Payment, Product, Review, Transaction, TransactionItem, Type, Year, Country }

