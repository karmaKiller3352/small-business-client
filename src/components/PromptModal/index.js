import React, { memo, useState, useCallback } from 'react';
import Prompt from 'react-native-prompt-crossplatform';
import { useTheme } from 'context/themeContext';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import { noop, isPresent } from 'utils/global';
import debounce from 'debounce';
import { useMount } from 'react-use';

const PromptModal = ({
  isVisible,
  defaultValue,
  onCancel,
  onSubmit,
  minLength = 3,
  submitButtonText,
  cancelButtonText,
  inputPlaceholder,
  validations = noop,
  title,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [inputText, setInputText] = useState(defaultValue);
  const [error, setError] = useState('');

  useMount(() => validateString(inputText));

  const validateString = useCallback(str => {
    // TO DO: add here fetching names of existing pricelists
    if (R.length(str) < minLength) {
      return setError(t('errors.too_short', { count: minLength }));
    }

    validations(str, setError, t);

    return setError('');
  }, []);

  const changeHandler = debounce(text => {
    setInputText(text);
    validateString(text);
  }, 500);

  const submitHandler = () => {
    if (isPresent(error)) return;

    onSubmit(inputText);
  };

  return (
    <Prompt
      promptAnimation="slide"
      headingStyle={{ paddingTop: 15, color: theme.color.forth }}
      primaryColor={theme.color.primary}
      inputStyle={{ color: theme.color.primary }}
      promptBoxStyle={{ backgroundColor: theme.background.primary }}
      submitButtonText={!error && (submitButtonText || t('common.save'))}
      errorText={error}
      cancelButtonText={cancelButtonText || t('common.cancel')}
      title={title}
      defaultValue={inputText}
      inputPlaceholder={inputPlaceholder || t('common.enter_text')}
      isVisible={isVisible}
      onChangeText={changeHandler}
      onCancel={onCancel}
      onSubmit={submitHandler}
    />
  );
};

export default memo(PromptModal);
