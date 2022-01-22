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

const defaultValues = { email: '', password: '' };

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const PasswordRestore = ({ navigation }) => {
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
  const goToRestore = () => navigation.push(AUTH_STACK_ROUTES.PASSWORD_RESTORE);

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
          <CustomLink onPressHandler={goToSignUp} title size={20}>
            {t('screen.auth.signup')}
          </CustomLink>
          <CustomLink onPressHandler={goToRestore} title size={20}>
            {t('screen.auth.restore_password')}
          </CustomLink>
        </Section>
      </Section>
    </Section>
  );
};

export default PasswordRestore;
