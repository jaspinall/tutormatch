import express from 'express';
import GraphHTTP from 'express-graphql';
import schema from './schema';

const PORT = 3000;

const app = express();
app.use('/graphql', GraphHTTP({
  schema: schema,
  pretty: true,
  graphiql: true
}));

app.listen(PORT, () => console.log(`listening on ${PORT}`));
