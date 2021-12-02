import { Box, IBoxProps, KeyboardAvoidingView } from 'native-base';
import React, { LegacyRef } from 'react';
import { Platform, ScrollView } from 'react-native';

import { SCREEN_BACKGROUND } from '../../constants';
import { Header } from '../header/header';
import { SafeAreaWrapper } from '../safe-area-wrapper/safe-area-wrapper';

type Props = {
  isScrollable?: boolean;
  isKeyboardAvoiding?: boolean;
  isHeaderVisible?: boolean;
  isTransparent?: boolean;
  wrapperOptions?: IBoxProps;
  children: React.ReactNode;
};

export const Layout = React.forwardRef(
  (
    {
      isScrollable = true,
      isKeyboardAvoiding,
      isHeaderVisible = true,
      isTransparent = false,
      wrapperOptions,
      children,
    }: Props,
    ref,
  ) => {
    const content = (
      <Box flexGrow={1} pb='4' {...wrapperOptions}>
        {children}
      </Box>
    );

    return (
      <Box
        flex={1}
        backgroundColor={isTransparent ? 'transparent' : SCREEN_BACKGROUND}
      >
        <SafeAreaWrapper>
          <KeyboardAvoidingView
            enabled={isKeyboardAvoiding}
            flex={1}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {isHeaderVisible ? <Header /> : null}

            {isScrollable ? (
              <ScrollView
                ref={ref as LegacyRef<ScrollView>}
                style={{
                  zIndex: -1,
                }}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {content}
              </ScrollView>
            ) : (
              <Box zIndex={-1} flexGrow={1}>
                {content}
              </Box>
            )}
          </KeyboardAvoidingView>
        </SafeAreaWrapper>
      </Box>
    );
  },
);
