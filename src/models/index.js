// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Products, Pricelist } = initSchema(schema);

export {
  Products,
  Pricelist
};