import { ShoppingItemTypeEnum } from "../page.client";

export const groupShoppingList = (items: string[]) => {
  const fruits = items.filter((item) =>
    item.toLowerCase().includes(ShoppingItemTypeEnum.Fruit)
  );
  const vegetables = items.filter((item) =>
    item.toLowerCase().includes(ShoppingItemTypeEnum.Vegetable)
  );
  return { fruits, vegetables };
};
