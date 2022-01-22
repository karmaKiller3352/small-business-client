import React from 'react';
import ControlledInput from 'components/ControlledInput';
import CustomButton from 'components/CustomButton';
import Section from 'components/Section';
import CustomLink from 'components/CustomLink';
import { useAppForm } from 'hooks/common';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'providers/AuthProvider';
import { AUTH_STACK_ROUTES } from 'navigation/helpers';
import i18n from 'locales';

const defaultValues = { email: '', password: '' };

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
});

const SignIn = ({ navigation }) => {
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuthContext();

  const { control, formState, values } = useAppForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'all',
  });

  const disabled = !formState.isValid || isLoading;

  const goToSignUp = () => navigation.push(AUTH_STACK_ROUTES.SIGN_UP);
  const goToRestore = () =>
    /* navigation.push(AUTH_STACK_ROUTES.PASSWORD_RESTORE)*/ null;

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
        <CustomButton
          isLoading={isLoading}
          disabled={disabled}
          onPressHandler={() => signIn(values)}
          title={t('common.submit')}
        />

        <Section
          top={20}
          direction="row"
          justifyContent="space-between"
          width="95%">
          <CustomLink black onPressHandler={goToSignUp} title size={18}>
            {t('screen.auth.signup')}
          </CustomLink>
          <CustomLink black onPressHandler={goToRestore} title size={18}>
            {t('screen.auth.restore_password')}
          </CustomLink>
        </Section>
      </Section>
    </Section>
  );
};

export default SignIn;
