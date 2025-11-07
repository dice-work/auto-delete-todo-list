"use client";

import ShoppingItemCard from "@app/ui/card/shopping-item-card";
import { useEffect, useRef, useState } from "react";
import ShoppingListMock from "./mock/shopping-list-mock.json";

interface ShoppingItemInterface {
  name: string;
  type: ShoppingItemTypeEnum;
}

export enum ShoppingItemTypeEnum {
  Fruit = "Fruit",
  Vegetable = "Vegetable",
}

enum ShoppingStatusTypeEnum {
  UnClassify = "UnClassify",
  Classify = "Classify",
}

const ShoppingItemTypeInfo = {
  [ShoppingItemTypeEnum.Fruit]: {
    title: "Fruit",
  },
  [ShoppingItemTypeEnum.Vegetable]: {
    title: "Vegetable",
  },
};

export default function HomePageClient() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingItemInterface[]>(
    ShoppingListMock as ShoppingItemInterface[]
  );
  const [separatedList, setSeparatedList] = useState<ShoppingItemInterface[]>(
    []
  );

  const shiftTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isProcessing && separatedList.length > 0) {
      const timer = setTimeout(() => {
        const shiftItem = separatedList[0];
          setSeparatedList((prev) => prev.slice(1));
          setShoppingList((prev) => [...prev, shiftItem]);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isProcessing && separatedList.length === 0) {
      setIsProcessing(false);
    }
  }, [separatedList, isProcessing]);

  const onItemChange = (
    item: ShoppingItemInterface,
    type: ShoppingStatusTypeEnum
  ) => {
    if (shiftTimerRef.current) {
      clearTimeout(shiftTimerRef.current);
    }

    if (type === ShoppingStatusTypeEnum.Classify) {
      onItemClassify(item);
    } else {
      onItemUnClassify(item);
    }

    if (!isProcessing) {
      shiftTimerRef.current = setTimeout(async () => {
        shiftTimerRef.current = null;
        setIsProcessing(true);
      }, 5000) as unknown as number;
    }
  };

  const onItemClassify = (item: ShoppingItemInterface) => {
    setSeparatedList((prev) => [...prev, item]);
    setShoppingList((prev) => prev.filter((i) => i.name !== item.name));
  };

  const onItemUnClassify = (item: ShoppingItemInterface) => {
    setShoppingList((prev) => [...prev, item]);
    setSeparatedList((prev) => prev.filter((i) => i.name !== item.name));
  };

  return (
      <div className="flex flex-col gap-y-4 w-full">
        <h1 className="max-w-xs text-3xl font-semibold leading-10">
          Fruit/ Vegetable List
        </h1>
        <div className="grid grid-cols-3 gap-4 min-h-[834px]">
          {/* Div for list of fruits and veggies */}
          <div className="flex flex-col gap-4 w-full">
            {shoppingList.map((item) => (
                <ShoppingItemCard
                    key={item.name}
                    item={item}
                    onItemChange={() =>
                        onItemChange(item, ShoppingStatusTypeEnum.Classify)
                    }
                />
            ))}
          </div>
          {/* Div for list of fruits and veggies separated by a department */}
          {Object.entries(ShoppingItemTypeInfo).map(([key, value]) => (
              <div className="border border-gray-300 shadow-sm w-full" key={key}>
                <div className="bg-gray-100 p-4 text-center">
                  <p className="font-semibold text-lg">{value.title}</p>
                </div>
                <div className="flex flex-col gap-4 w-full p-4">
                  {separatedList?.map((item) =>
                      item.type === key ? (
                          <ShoppingItemCard
                              key={item.name}
                              item={item}
                              onItemChange={() =>
                                  onItemChange(item, ShoppingStatusTypeEnum.UnClassify)
                              }
                          />
                      ) : null
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
