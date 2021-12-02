import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Circle,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useSubscriptionNotificationsContext } from '../../context/subscription-notifications-context';
import { useAuth, useShoppingCart } from '../../hooks';
import { HeaderSearch } from './header-search';

export const Header = () => {
  const navigation = useNavigation();
  const { isAuth } = useAuth();
  const { onToggle, isIndicatorVisible } =
    useSubscriptionNotificationsContext();
  const { openShoppingCart, isCartEmpty } = useShoppingCart();

  const [isSearchVisible, setIsSearchVisible] = React.useState(false);

  if (isSearchVisible) {
    return (
      <HeaderSearch
        onClose={() => setIsSearchVisible((prevState) => !prevState)}
      />
    );
  }

  return (
    <HStack px={5} pb={5} pt={3}>
      <Image
        alt={'Hypt'}
        source={require('../../assets/images/logo.png')}
        w={'82px'}
        h={'43px'}
      />
      <HStack alignItems='center' ml='auto'>
        {isAuth ? (
          <>
            <Box position='relative'>
              <IconButton
                icon={
                  <Icon
                    as={AntDesign}
                    name='shoppingcart'
                    size={5}
                    color='white'
                  />
                }
                onPress={openShoppingCart}
              />
              {!isCartEmpty ? (
                <Circle
                  bgColor='#FF4D4D'
                  width='8px'
                  height='8px'
                  borderWidth={1}
                  borderColor={'white'}
                  position='absolute'
                  right={'4px'}
                  top={'8px'}
                />
              ) : null}
            </Box>
            <Spacer mr={4} />
            <TouchableOpacity activeOpacity={0.7} onPress={onToggle}>
              <Icon
                as={MaterialCommunityIcons}
                name='bell-outline'
                size={6}
                color='white'
              />
              {isIndicatorVisible ? (
                <Circle
                  bgColor='#FF4D4D'
                  width='8px'
                  height='8px'
                  borderWidth={1}
                  borderColor={'white'}
                  position='absolute'
                  right={'3px'}
                  top={'2px'}
                />
              ) : null}
            </TouchableOpacity>
            <Spacer mr={5} />
          </>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsSearchVisible((prevState) => !prevState)}
        >
          <Icon as={Feather} name='search' size={5} color='white' mr={5} />
        </TouchableOpacity>
        <IconButton
          icon={<Icon as={Feather} name='menu' size={5} color='white' />}
          onPress={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigation.openDrawer();
          }}
        />
      </HStack>
    </HStack>
  );
};
