import { createUploadLink } from 'apollo-upload-client';

import { DOMAIN_URL } from '../../constants';

export const httpLink = createUploadLink({
  uri: `${DOMAIN_URL}/graphql`,
});
