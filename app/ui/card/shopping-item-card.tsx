import { ShoppingItemInterface } from "@app/(main)/(homepage)/page";

type DefaultCardProps = {
  item: ShoppingItemInterface;
  onItemChange: () => void;
};
const ShoppingItemCard = ({ item, onItemChange }: DefaultCardProps) => {
  return (
    <button
      className="border border-gray-300 p-4 shadow-sm w-full text-center cursor-pointer hover:shadow-xl duration-200"
      onClick={onItemChange}
      type="button"
    >
      <p className="text-base font-semibold">{item.name}</p>
    </button>
  );
};

export default ShoppingItemCard;
