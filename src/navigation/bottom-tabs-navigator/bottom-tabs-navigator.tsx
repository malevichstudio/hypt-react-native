import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, useTheme } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Avatar } from '../../components';
import { ChatIcon, EventsIcon, FeedIcon } from '../../components/icons';
import { IS_ANDROID, ROUTES } from '../../constants';
import { ModelNameOrder } from '../../graphql/generated';
import { useAuth, useKeyboardStatus, useUser } from '../../hooks';
import { AddFeedPost } from '../../screens/add-feed-post/add-feed-post.screen';
import { BookingConfirmed } from '../../screens/booking-confirmed/booking-confirmed.screen';
import { BookingCustomer } from '../../screens/booking-customer/booking-customer.screen';
import { BookingPayment } from '../../screens/booking-payment/booking-payment.screen';
import { BookingPaymentWebView } from '../../screens/booking-payment-webview/booking-payment-webview.screen';
import { BookingSeating } from '../../screens/booking-seating/booking-seating.screen';
import { BookingTicket } from '../../screens/booking-ticket/booking-ticket.screen';
import { Chat } from '../../screens/chat/chat.screen';
import { Feed } from '../../screens/feed/feed.screen';
import { Home } from '../../screens/home/home.screen';
import { Influencer } from '../../screens/influencer/influencer';
import { MyPost } from '../../screens/my-post/my-post';
import { Settings } from '../../screens/settings/settings.screen';
import { ArticleNavigator } from '../articles-navigator';
import { AttractionsNavigator } from '../attractions-navigator';
import { EventsNavigator } from '../events-navigator';
import { GalleriesNavigator } from '../galleries-navigator';
import { OffersNavigator } from '../offers-navigator';
import { ProfileNavigator } from '../profile-navigator';
import { VenuesNavigator } from '../venues-navigator';
import { BottomTabBar } from './bottom-tab-bar';

export type BottomTabsStackParamList = {
  [ROUTES.home]: undefined;
  [ROUTES.feed]: undefined;
  [ROUTES.settings]: undefined;

  [ROUTES.offersNavigator]: {
    screen: string;
    params?: {
      url?: string | null;
    };
  };
  [ROUTES.attractionsNavigator]: {
    screen: string;
    params?: {
      url?: string | null;
    };
  };
  [ROUTES.eventsNavigator]: {
    screen: string;
    params?: {
      url?: string | null;
      category?: string | null;
    };
  };
  [ROUTES.venuesNavigator]: {
    screen: string;
    params?: {
      url?: string | null;
      category?: string | null;
    };
  };
  [ROUTES.articleNavigator]: {
    screen: string;
    params?: {
      url?: string | null;
      category?: string | null;
    };
  };
  [ROUTES.galleriesNavigator]: {
    screen: string;
    params?: {
      url?: string | null;
      category?: string | null;
    };
  };

  [ROUTES.influencer]: undefined;
  [ROUTES.chat]: undefined;
  [ROUTES.profileNavigator]: undefined;
  [ROUTES.addFeedPost]: undefined;
  [ROUTES.bookingSeating]: {
    url?: string;
    type: ModelNameOrder;
  };
  [ROUTES.bookingTicket]: {
    url?: string;
  };
  [ROUTES.bookingCustomer]: undefined;
  [ROUTES.myPost]: {
    id: number;
  };
  [ROUTES.bookingPayment]: undefined;
  [ROUTES.bookingConfirmed]: undefined;
  [ROUTES.bookingPaymentWebView]: {
    url: string;
  };
};

const Tab = createBottomTabNavigator<BottomTabsStackParamList>();

export const BottomTabsNavigator = () => {
  const theme = useTheme();
  const { user } = useUser();
  const { isAuth, onLogout } = useAuth();
  const isKeyboardOpen = useKeyboardStatus();

  return (
    <Tab.Navigator
      tabBar={
        !IS_ANDROID ? BottomTabBar : !isKeyboardOpen ? BottomTabBar : () => null
      }
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[400],
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={ROUTES.home}
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/images/small-logo.png')}
              alt={'logo'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.feed}
        component={Feed}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FeedIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.eventsNavigator}
        component={EventsNavigator}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ROUTES.events,
          tabBarIcon: ({ size, color }) => (
            <EventsIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.chat}
        component={Chat}
        options={{
          tabBarIcon: ({ size, color }) => (
            <ChatIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.profileNavigator}
        component={ProfileNavigator}
        options={{
          unmountOnBlur: true,
          tabBarLabel: '',
          tabBarIcon: () => {
            if (isAuth) return <Avatar uri={user?.photo} />;
            return (
              <TouchableOpacity onPress={onLogout}>
                <Avatar uri={user?.photo} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.attractionsNavigator}
        component={AttractionsNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name={ROUTES.venuesNavigator}
        component={VenuesNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={ROUTES.articleNavigator}
        component={ArticleNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={ROUTES.galleriesNavigator}
        component={GalleriesNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={ROUTES.offersNavigator}
        component={OffersNavigator}
        options={{
          unmountOnBlur: true,
        }}
      />

      <Tab.Screen name={ROUTES.settings} component={Settings} />
      <Tab.Screen name={ROUTES.influencer} component={Influencer} />
      <Tab.Screen
        name={ROUTES.addFeedPost}
        component={AddFeedPost}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name={ROUTES.myPost} component={MyPost} />
      <Tab.Screen
        name={ROUTES.bookingSeating}
        component={BookingSeating}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={ROUTES.bookingTicket}
        component={BookingTicket}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name={ROUTES.bookingCustomer} component={BookingCustomer} />
      <Tab.Screen name={ROUTES.bookingPayment} component={BookingPayment} />
      <Tab.Screen
        name={ROUTES.bookingPaymentWebView}
        component={BookingPaymentWebView}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name={ROUTES.bookingConfirmed} component={BookingConfirmed} />
    </Tab.Navigator>
  );
};
