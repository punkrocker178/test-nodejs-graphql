const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://test_mongo:27017/Games', {
  useNewUrlParser: true,
  user: 'root',
  pass: 'root',
  authSource: 'admin'
});
mongoose.connection.once('open', () => {
  console.log('connected to DB');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('running on 3000');
})