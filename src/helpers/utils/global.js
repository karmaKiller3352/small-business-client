import moment from 'moment';
import * as R from 'ramda';
import { DATE_FORMATS } from 'constants/common';

export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);

export const currencify =
  (currency = 'ru') =>
  value => {
    if (isNilOrEmpty(currency)) return value;

    switch (currency) {
      case 'ru':
        return `${value}₽`;
      case 'en':
        return `$${value}`;
    }
  };

export const trimLongSting = (str, length = 25) => {
  if (R.length(str) > length) {
    return `${R.slice(0, length, str)}...`;
  }

  return str;
};

export const noop = () => {};

export const getCurrentDay = () =>
  moment(Date.now()).format(DATE_FORMATS.AWS_DATE);
