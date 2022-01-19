import * as R from 'ramda';
import { currencify } from 'utils/global';
import { isFieldValueUniq } from 'hooks/datastore';
import { Pricelist, Products } from 'models';
import { PRICELIST_DETAILS } from './constants';
import moment from 'moment';

const mockProducts = [
  {
    sellPrice: 250,
    purchasePrice: 180,
  },
  {
    sellPrice: 325,
    purchasePrice: 287,
  },
  {
    sellPrice: 567,
    purchasePrice: 455,
  },
  {
    sellPrice: 245,
    purchasePrice: 208,
  },
  {
    sellPrice: 1232,
    purchasePrice: 985,
  },
];

export const calculateValueByField = (field, products = []) =>
  R.reduce(
    (acc, item) => R.pipe(R.propOr(0, field), Number, R.add(acc))(item),
    0,
    products,
  );

export const totalPurchasePrice = products =>
  calculateValueByField(PRICELIST_DETAILS.PURCHASE_PRICE, products);

export const totalSellPrice = products =>
  calculateValueByField(PRICELIST_DETAILS.SELL_PRICE, products);

export const getPriceDetails = ({ t, details, currency }) => {
  const formatPrice = currencify(currency);
  const products = R.propOr([], 'products', details);

  return {
    [PRICELIST_DETAILS.PRODUCT_COUNT]: {
      localeName: t('screen.pricelist.fields.product_count'),
      value: R.pathOr(0, ['products', 'length'], details),
      type: 'count',
    },
    [PRICELIST_DETAILS.ORDERS_COUNT]: {
      localeName: t('screen.pricelist.fields.order_count'),
      value: R.propOr(0, PRICELIST_DETAILS.ORDERS_COUNT, details),
      type: 'price',
    },

    [PRICELIST_DETAILS.PURCHASE_PRICE]: {
      value: R.pipe(totalPurchasePrice, formatPrice)(products),
      localeName: t('screen.pricelist.fields.purchase_price'),
      type: 'price',
    },
    [PRICELIST_DETAILS.SELL_PRICE]: {
      value: R.pipe(totalSellPrice, formatPrice)(products),
      localeName: t('screen.pricelist.fields.sell_price'),
      type: 'count',
    },
  };
};

export const checkPricelistName = async (str, setError, t) => {
  const isExist = await isFieldValueUniq('title', str, Pricelist);

  if (isExist) {
    return setError(t('errors.pricelist_dublicate'));
  }

  setError();
};

export const checkProductName = async (str, setError, t) => {
  const isExist = await isFieldValueUniq('title', str, Products);

  if (isExist) {
    return setError(t('errors.product_dublicate'));
  }

  setError();
};
