import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Box, Button, Flex, Icon, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
  AuthWrapper,
  BlurBackground,
  ComeBackHeader,
  Container,
  FooterControls,
  GradientButton,
  Layout,
  Switch,
  TextField,
} from '../../components';
import { ROUTES } from '../../constants';
import { useSignInMutation } from '../../graphql/generated';
import { useAuth, useIntl } from '../../hooks';
import { AuthStackParamList } from '../../navigation/auth-navigator';
import { SocialsTypes } from '../../types';
import { loginSchema } from '../../validation/schemas/login.schema';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, ROUTES.login>;
};

type FormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = ({ navigation }: Props) => {
  const { intl } = useIntl();
  const { onSuccessAuth, onVerify, onLoginAsGuest } = useAuth();

  const [singInMutation, { loading }] = useSignInMutation({
    onCompleted: (response) => {
      if (response.signIn?.token) {
        onSuccessAuth(response.signIn.token);
        if (response.signIn.user?.status) {
          onVerify();
        }
      }
    },
  });

  const handleFormSubmit = (values: FormValuesType) => {
    singInMutation({
      variables: {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      },
    });
  };

  const handleSocialPress = (social: SocialsTypes) => {
    navigation.navigate(ROUTES.socialAuth, { name: social });
  };

  const initialValues: FormValuesType = {
    email: '',
    password: '',
    rememberMe: true,
  };

  return (
    <BlurBackground>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Layout
            isTransparent
            isHeaderVisible={false}
            isKeyboardAvoiding={true}
          >
            <Container>
              <ComeBackHeader title={intl('app.back-to-welcome')} />

              <AuthWrapper title={intl('app.to-hypt')}>
                <TextField
                  name={'email'}
                  placeholder={intl('app.email')}
                  label={intl('app.email')}
                  wrapperProps={{
                    mb: 4,
                  }}
                  inputProps={{
                    keyboardType: 'email-address',
                  }}
                />

                <TextField
                  name={'password'}
                  placeholder={intl('app.password')}
                  label={intl('app.password')}
                  wrapperProps={{
                    mb: 4,
                  }}
                  inputProps={{
                    type: 'password',
                  }}
                />

                <GradientButton
                  onPress={handleSubmit}
                  wrapperProps={{
                    mb: 5,
                  }}
                  endIcon={
                    <Icon
                      as={AntDesign}
                      name={'right'}
                      color='white'
                      size={4}
                    />
                  }
                  isLoading={loading}
                >
                  {intl('app.login')}
                </GradientButton>
                <Flex
                  direction='row'
                  align='center'
                  justify='space-between'
                  pb={2}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate(ROUTES.resetPassword)}
                  >
                    <Text>{intl('app.forgot-password')}</Text>
                  </TouchableOpacity>
                  <Box>
                    <Switch
                      value={values.rememberMe}
                      onChange={(value) => setFieldValue('rememberMe', value)}
                      label={intl('app.remember-me')}
                    />
                  </Box>
                </Flex>
              </AuthWrapper>

              <Text color='gray.400' mb={5} px={6}>
                {intl('app.sign-in-with')}
              </Text>

              <Flex
                direction='row'
                align='center'
                justify='space-between'
                mb={6}
              >
                <Button
                  w='64px'
                  colorScheme='blue'
                  onPress={() => handleSocialPress(SocialsTypes.facebook)}
                >
                  <Icon
                    as={FontAwesome}
                    name='facebook'
                    size={4}
                    color='white'
                    left={0.5}
                  />
                </Button>
                <Button
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  variant='light'
                  w='64px'
                  onPress={() => handleSocialPress(SocialsTypes.google)}
                >
                  <Icon
                    as={FontAwesome}
                    name='google'
                    size={4}
                    color='blue.600'
                  />
                </Button>
                <GradientButton
                  wrapperProps={{
                    w: '64px',
                  }}
                  onPress={() => handleSocialPress(SocialsTypes.instagram)}
                >
                  <Icon
                    as={FontAwesome}
                    name='instagram'
                    size={4}
                    color='white'
                  />
                </GradientButton>
                <Button
                  w='64px'
                  onPress={() => handleSocialPress(SocialsTypes.twitter)}
                >
                  <Icon
                    as={FontAwesome}
                    name='twitter'
                    size={4}
                    color='white'
                  />
                </Button>
              </Flex>

              {/* <Button
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              variant='light'
              _text={{ color: 'black' }}
              mb={6}
              startIcon={<Icon as={FontAwesome} name='phone' size={4} />}
            >
              {intl('app.with-phone-number')}
            </Button> */}
              <Button
                variant='unstyled'
                startIcon={<Icon as={FontAwesome5} name='user' size={4} />}
                onPress={onLoginAsGuest}
              >
                {intl('app.continue-as-guest')}
              </Button>
            </Container>
          </Layout>
        )}
      </Formik>
      <FooterControls
        rightButtonText={intl('app.sign-up')}
        leftButtonText={intl('app.dont-have-account')}
        onRightButtonClick={() => navigation.navigate(ROUTES.registration)}
      />
    </BlurBackground>
  );
};
