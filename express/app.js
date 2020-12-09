const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(3000, () => {
  console.log('running on 3000');
})