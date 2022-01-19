import vest, { test, enforce } from 'vest';

export const productValidation = translate => {
  return vest.create((data = {}) => {
    console.log(data);
    test(
      'title',
      translate('errors.validations.is_required', {
        field: translate('errors.field_names.title'),
      }),
      () => {
        enforce(data.title).isNotEmpty();
      },
    );
    test(
      'title',
      translate('errors.validations.at_least', {
        field: translate('errors.field_names.title'),
        count: 5,
      }),
      () => {
        enforce(data.title).longerThanOrEquals(5);
      },
    );
    test(
      'title',
      translate('errors.validations.no_longer', {
        field: translate('errors.field_names.title'),
        count: 5,
      }),
      () => {
        enforce(data.title).shorterThanOrEquals(20);
      },
    );

    test(
      'count',
      translate('errors.validations.is_required', {
        field: translate('errors.field_names.count'),
      }),
      () => {
        enforce(data.count).isNotEmpty();
      },
    );

    test(
      'sellPrice',
      translate('errors.validations.is_required', {
        field: translate('errors.field_names.sell_price'),
      }),
      () => {
        enforce(data.sellPrice).isNotEmpty();
      },
    );

    test(
      'purchasePrice',
      translate('errors.validations.is_required', {
        field: translate('errors.field_names.purchase_price'),
      }),
      () => {
        enforce(data.purchasePrice).isNotEmpty();
      },
    );

    test(
      'purchasePrice',
      translate('errors.validations.less_than', {
        field1: translate('errors.field_names.purchase_price'),
        field2: translate('errors.field_names.sell_price'),
      }),
      () => {
        enforce(data.purchasePrice).lessThanOrEquals(data.sellPrice);
      },
    );

    test(
      'sellPrice',
      translate('errors.validations.more_than', {
        field2: translate('errors.field_names.purchase_price'),
        field1: translate('errors.field_names.sell_price'),
      }),
      () => {
        enforce(data.sellPrice).lessThanOrEquals(data.purchasePrice);
      },
    );
  });
};
