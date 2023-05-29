export const ProductSellingType = {
  SELLING: '판매중',
  HOLD: '판매보류',
  STOP_SELLING: '판매중지',
} as const;

export type ProductSellingType =
  (typeof ProductSellingType)[keyof typeof ProductSellingType];
