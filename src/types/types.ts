import { Maybe, ModelNameOrder } from '../graphql/generated';

export type SelectOptionType = {
  value: string;
  label: string;
  startIcon?: JSX.Element | JSX.Element[];
};

export enum SocialsTypes {
  facebook = 'facebook',
  google = 'google',
  instagram = 'instagram',
  twitter = 'twitter',
}

export enum SortType {
  asc = 'ASC',
  desc = 'DESC',
}

export type PromocodeInfoType = {
  id: number;
  discount: number;
};

export type SeatInfoType = {
  sector?: string;
  row?: number;
  place?: number;
  hall?: string;
  area?: string;
  table?: string;
};

export type OrderItemType = {
  id?: Maybe<number>;
  title?: Maybe<string>;
  date: string | null;
  image?: Maybe<string>;
  price?: Maybe<number>;
  address?: Maybe<string>;
  sector?: Maybe<string>;
  row?: number;
  place?: number;
  discount?: number | null;
  customerId?: number;
  orderId?: number;
  hall?: Maybe<string>;
  area?: Maybe<string>;
  table?: Maybe<string>;
  modelName?: ModelNameOrder;
  ticketType?: string | null;
  startTime?: string | null;
  description?: string | null;
};
