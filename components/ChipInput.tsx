import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";

interface Chip {
  name: string;
  img: string;
  email: string;
}

interface ChipInputProps {
  items: Chip[];
  setItems: (items: Chip[]) => void;
}

const ChipInput: React.FC<ChipInputProps> = ({ items, setItems }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<Chip | null>(null);
  const [chips, setChips] = useState<Chip[]>([]);
  const [showList, setShowList] = useState(false);

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
     if (event.key === "Backspace" && inputValue === "") {
       if (chips.length > 0) {
         // If no chip is selected, highlight the last chip
         if (!selectedItem) {
           const lastChip = chips[chips.length - 1];
           setSelectedItem(lastChip);
         } else {
           // If a chip is already selected, remove it and add it back to items if not already present
           removeChip(selectedItem.email);
           if (!items.find((item) => item.email === selectedItem.email)) {
             setItems((prevItems: Chip[]) => [...prevItems, selectedItem]);
           }
           setSelectedItem(null);
           setShowList(false)
         }
       }
     }
   };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSelectedItem(filteredItems.length > 0 ? filteredItems[0] : null);
  };

  const handleItemClick = (item: Chip) => {
    const filteredItems = items.filter((data) => data.email !== item.email);
    setItems(filteredItems);
    addChip(item);
  };

  const handleChipRemove = (chip: Chip) => {
    removeChip(chip.email);
    setItems((prevItems: Chip[]) => [...prevItems, chip]);
    setSelectedItem(null);
  };

  const addChip = (chip: Chip) => {
    setChips((prevChips) => [...prevChips, chip]);
    setInputValue("");
    setSelectedItem(null);
  };

  const removeChip = (chipEmail: string) => {
    setChips((prevChips) =>
      prevChips.filter((chip) => chip.email !== chipEmail)
    );
  };

  return (
    <div className="flex flex-col w-full border-b-2 border-blue-600">
      <div className="flex flex-wrap">
        {chips.map((chip, i) => (
          <div
            key={i}
            className={`${
              selectedItem === chip ? "border border-blue-600" : "bg-gray-300"
            } flex gap-2 items-center px-1 py-1 rounded-full pr-4 m-2`}
          >
            <Image
              src={chip.img}
              alt={chip.name}
              width={200}
              height={200}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-sm font-bold text-gray-800">{chip.name}</span>
            <button
              className="hover:text-gray-600 hover:bg-gray-200 rounded-r-full w-3 h-3"
              onClick={() => handleChipRemove(chip)}
            >
              <Image
                src="/cancel.svg"
                alt="cancel"
                width={200}
                height={200}
                className="w-full h-full"
              />
            </button>
          </div>
        ))}

        <div className="relative w-full sm:w-auto">
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onClick={() => setShowList(true)}
              onKeyDown={handleKeyDown}
              className="outline-none m-1 p-2 text-black placeholder:text-gray-600 placeholder:font-medium bg-transparent"
              placeholder="Add new users..."
            />
          </div>
          {showList && items?.length > 0 && (
            <div
              className="mt-2 px-4 py-2 rounded-lg flex flex-col gap-3 absolute z-50 bg-white top-[65%] max-h-[70vh] overflow-y-scroll"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
            >
              {items?.filter((item) =>
                  item.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item.email}
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer py-1 w-full flex gap-2 items-center hover:bg-gray-300 px-1 rounded-lg sm:pr-20"
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-md font-bold text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-400">{item.email}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
