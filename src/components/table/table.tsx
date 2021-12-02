import { FontAwesome } from '@expo/vector-icons';
import { Box, Button, Flex, IBoxProps, Icon, Text } from 'native-base';
import React from 'react';

type Props = {
  wrapperOptions?: IBoxProps;
  children: React.ReactNode;
};

type TableProps = Props & {
  sizes: Array<string>;
};

type TrProps = Props & {
  sizes?: Array<string>;
};

type TdProps = Props & {
  size?: string;
  isTh?: boolean;
  isBaseText?: boolean;
  sort?: string;
  onPress?: () => void;
};

export const Table = ({ sizes, wrapperOptions, children }: TableProps) => {
  return (
    <Box {...wrapperOptions}>
      {React.Children.map(children, (child) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.cloneElement(child as any, {
          sizes,
        }),
      )}
    </Box>
  );
};

Table.Tr = function Tr({ sizes, wrapperOptions, children }: TrProps) {
  return (
    <Flex
      flexDirection='row'
      alignItems='center'
      borderBottomWidth='1px'
      borderBottomColor='gray.600'
      py='3'
      {...wrapperOptions}
    >
      {React.Children.map(children, (child, index) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.cloneElement(child as any, {
          size: sizes && sizes[index],
        }),
      )}
    </Flex>
  );
};

Table.Td = function Td({
  size,
  isTh,
  isBaseText,
  sort,
  onPress = () => {},
  wrapperOptions,
  children,
}: TdProps) {
  const getSizeProps = () => {
    if (size === 'full') {
      return { flex: 1 };
    }
    return {
      width: size,
    };
  };

  const renderText = () => {
    if (isTh) {
      return (
        <Text
          fontSize='xs'
          color='primary.400'
          fontFamily='medium'
          textAlign={'left'}
        >
          {children}
        </Text>
      );
    }
    if (isBaseText) {
      return (
        <Text
          fontSize='xs'
          color='#ffffff'
          fontFamily='medium'
          textAlign={'left'}
        >
          {children}
        </Text>
      );
    }
    return children;
  };

  return (
    <Flex
      {...getSizeProps()}
      justifyContent={'flex-start'}
      flexDirection='row'
      alignItems='center'
      {...wrapperOptions}
    >
      {sort ? (
        <Button onPress={onPress} variant='unstyled' height='auto' p='0' m='0'>
          <Flex
            justifyContent={'flex-start'}
            flexDirection='row'
            alignItems='center'
          >
            {renderText()}
            {sort ? (
              <Icon
                as={FontAwesome}
                name='sort'
                ml='1'
                color='primary.400'
                size={'14px'}
              />
            ) : null}
          </Flex>
        </Button>
      ) : (
        renderText()
      )}
    </Flex>
  );
};
