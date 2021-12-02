import { Box, Button, Input } from 'native-base';
import React from 'react';

import {
  ModelNamePromocode,
  useGetPromocodeLazyQuery,
} from '../../graphql/generated';
import { useIntl } from '../../hooks';
import { PromocodeInfoType } from '../../types';

type Props = {
  modelName: ModelNamePromocode;
  modelId: number;
  onGetPromocodeInfo?: (value: PromocodeInfoType) => void;
};

export const PromoCodeForm = ({
  modelName,
  modelId,
  onGetPromocodeInfo,
}: Props) => {
  const { intl } = useIntl();

  const [value, setValue] = React.useState<string>('');

  const [getPromocodeLazyQuery, { loading }] = useGetPromocodeLazyQuery({
    onCompleted: (response) => {
      setValue('');
      if (onGetPromocodeInfo) {
        onGetPromocodeInfo({
          id: response?.getPromocode?.id as number,
          discount: response?.getPromocode?.discount as number,
        });
      }
    },
  });

  const handleFormSubmit = () => {
    if (!value) return null;
    getPromocodeLazyQuery({
      variables: {
        modelName,
        modelId,
        code: value,
      },
    });
  };

  return (
    <Box position='relative' width='100%'>
      <Input
        value={value}
        onChangeText={(value) => setValue(value)}
        placeholder={intl('app.enter-promocode')}
        pr='100px'
      />
      <Box position='absolute' right='1' bottom='3px' zIndex={1}>
        <Button
          onPress={handleFormSubmit}
          isLoading={loading}
          isDisabled={!value}
          variant='solid'
          height='40px'
        >
          {intl('app.apply')}
        </Button>
      </Box>
    </Box>
  );
};
