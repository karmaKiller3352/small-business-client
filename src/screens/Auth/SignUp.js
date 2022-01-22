import React from 'react';
import ControlledInput from 'components/ControlledInput';
import CustomButton from 'components/CustomButton';
import Section from 'components/Section';
import { useAppForm } from 'hooks/common';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'providers/AuthProvider';
import i18n from 'locales';
import Caption from 'components/Caption';
import CustomLink from 'components/CustomLink';
import { Linking } from 'react-native';

const defaultValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  agree: true,
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required(i18n.t('screen.auth.no_email'))
    .email(i18n.t('screen.auth.invalid_email')),
  password: yup
    .string()
    .required(i18n.t('screen.auth.no_password'))
    .min(8, i18n.t('screen.auth.short_password'))
    .matches(/[a-z]/, i18n.t('screen.auth.contains_letter'))
    .matches(/[0-9]/, i18n.t('screen.auth.contains_digits'))
    .matches(/[A-Z]/, i18n.t('screen.auth.contains_upper')),
  passwordConfirmation: yup
    .string()
    .required(i18n.t('screen.auth.no_confirm_password'))
    .oneOf([yup.ref('password')], i18n.t('screen.auth.match_password')),
});

const SignUp = () => {
  const { t } = useTranslation();
  const { signUp, isLoading } = useAuthContext();

  const { control, formState, values } = useAppForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'all',
  });

  const disabled = !formState.isValid || isLoading;

  const goToPolitics = () =>
    Linking.openURL('https://pages.flycricket.io/small-business/privacy.html');
  const goToTerms = () =>
    Linking.openURL('https://pages.flycricket.io/small-business/terms.html');

  return (
    <Section alignItems="center" justifyContent="center" height="100%">
      <Section width="90%" alignItems="center">
        <ControlledInput
          control={control}
          name="email"
          placeholder={t('common.email')}
          iconLeft={{ name: 'email' }}
        />

        <ControlledInput
          control={control}
          name="password"
          placeholder={t('common.password')}
          iconLeft={{ name: 'lock' }}
          isSecured
        />

        <ControlledInput
          control={control}
          name="passwordConfirmation"
          placeholder={t('screen.auth.password_confirm')}
          iconLeft={{ name: 'lock' }}
          isSecured
        />

        <CustomButton
          isLoading={isLoading}
          disabled={disabled}
          onPressHandler={() => signUp(values)}
          title={t('common.submit')}
        />

        <Section
          wrap
          top={10}
          alignItems="center"
          justifyContent="center"
          width="100%"
          direction="row">
          <Caption black pr={5} size={13}>
            {t('common.privacy')}
          </Caption>
          <CustomLink black onPressHandler={goToPolitics} size={13}>
            {t('common.politics')}
          </CustomLink>
          <Caption black pr={5} pl={5} size={13}>
            {t('common.and')}
          </Caption>
          <CustomLink black onPressHandler={goToTerms} size={13}>
            {t('common.terms')}
          </CustomLink>
        </Section>
      </Section>
    </Section>
  );
};

export default SignUp;
