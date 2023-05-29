export const ProductType = {
  HANDMADE: "제조 음료",
  BOTTLE: "병 음료",
  BAKERY: "베이커리"
} as const;

export type ProductType = typeof ProductType[keyof typeof ProductType];
