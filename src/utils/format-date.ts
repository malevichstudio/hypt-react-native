/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, formatDistanceToNowStrict, toDate } from 'date-fns';

export const formatDate = (
  date: Date | string | number | null,
  formatType: string,
  locale?: any,
): string | null => {
  if (!date) return null;
  return format(new Date(date), formatType, { locale });
};

export const getDate = (str: string | number): Date => {
  return toDate(new Date(str));
};

export const formatDistanceToNow = (str: string | number): string => {
  return formatDistanceToNowStrict(new Date(str || Date.now()), {
    addSuffix: true,
  });
};
