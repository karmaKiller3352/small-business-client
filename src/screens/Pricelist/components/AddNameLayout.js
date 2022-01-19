import PromptModal from 'components/PromptModal';
import { useDynamicHeader } from 'navigation/helpers';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import { isNilOrEmpty, noop } from 'utils/global';
import { MIN_TITLE_LENGTH } from '../helpers/constants';

const AddNameLayout = ({
  children,
  route,
  addNameHandler,
  entity,
  navigation,
  validations = noop,
}) => {
  const { t } = useTranslation();

  const details = R.pathOr({}, ['params', 'details'], route);
  const isNew = isNilOrEmpty(details);

  const [modalOpen, setModalOpen] = useState(isNew);

  const renameHandler = useCallback(() => {
    setModalOpen(true);
  }, []);

  useDynamicHeader({
    navigation,
    pressHandler: renameHandler,
    title: entity.title,
  });

  const goBack = useCallback(() => navigation.goBack(), []);

  const cancelHandler = useCallback(() => {
    setModalOpen(false);

    if (isNew) goBack();
  }, [goBack]);

  const onSubmit = useCallback(
    async title => {
      addNameHandler(title);

      setModalOpen(false);
    },
    [entity],
  );

  if (modalOpen) {
    return (
      <PromptModal
        validations={validations}
        title={t('common.enter_name')}
        defaultValue={R.propOr('', 'title', entity)}
        isVisible={modalOpen}
        minLength={MIN_TITLE_LENGTH}
        onCancel={cancelHandler}
        onSubmit={onSubmit}
      />
    );
  } else {
    return children;
  }
};

export default AddNameLayout;
