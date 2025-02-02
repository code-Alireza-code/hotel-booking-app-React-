import { useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";
import useOutsideClick from "../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

type OptionsType = {
  adult: number;
  children: number;
  room: number;
};
type handleOptionsType = (
  name: string,
  operation: "increase" | "decrease"
) => void;

const optionItemData = [
  {
    id: 1,
    type: "adult",
    minLimit: 1,
  },
  {
    id: 2,
    type: "children",
    minLimit: 0,
  },
  {
    id: 3,
    type: "room",
    minLimit: 1,
  },
];

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState<OptionsType>({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "travelDate",
  });
  const [openDate, setOpenDate] = useState(false);

  const handleOptions: handleOptionsType = (name, operation) => {
    switch (operation) {
      case "increase":
        setOptions((prev) => {
          return { ...prev, [name]: prev[name as keyof OptionsType] + 1 };
        });
        break;
      case "decrease":
        setOptions((prev) => {
          return { ...prev, [name]: prev[name as keyof OptionsType] - 1 };
        });
        break;
      default:
        throw new Error("unknown case !");
    }
  };
  const ref = useOutsideClick(() => setOpenDate(false), "datePicker");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <div className=" flex w-full  justify-between items-center gap-4 border border-[#ebe9e9] rounded-3xl p-4">
        <div className="flex items-center relative">
          <MdLocationPin className="text-rose-500 w-6 h-6 inline-block" />
          <input
            type="text"
            placeholder="where to go...?"
            className=" px-3 py-2 outline-none"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="separator" />
        </div>
        <div className="flex items-center relative">
          <HiCalendar className="w-6 h-6 inline-block text-primary-dark" />
          <div
            className="ml-2 text-sm cursor-pointer"
            data-id="datePicker"
            onClick={() => setOpenDate(true)}
          >
            {`${format(date.startDate, "MM/dd/yyyy")} to ${format(
              date.endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <div ref={ref as React.RefObject<HTMLDivElement>}>
              <DateRange
                className="absolute z-20 top-10 right-5"
                ranges={[date]}
                onChange={(item) =>
                  setDate({
                    startDate: item.travelDate.startDate || new Date(),
                    endDate: item.travelDate.endDate || new Date(),
                    key: "travelDate",
                  })
                }
                minDate={new Date()}
                moveRangeOnFirstSelection={false}
              />
            </div>
          )}
          <span className="separator" />
        </div>
        <div className="flex items-center relative">
          <div
            data-id="optionDropDown"
            className="cursor-pointer"
            onClick={() => setOpenOptions(true)}
          >
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              options={options}
              handleOptions={handleOptions}
              closeOptions={() => setOpenOptions(false)}
            />
          )}
          <span className="separator" />
        </div>
        <div className="flex items-center relative">
          <button
            onClick={handleSearch}
            className="flex items-center justify-center bg-primary-light text-white p-2 rounded-2xl"
          >
            <HiSearch className="w-6 h-6 " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({
  options,
  handleOptions,
  closeOptions,
}: {
  options: OptionsType;
  handleOptions: handleOptionsType;
  closeOptions: () => void;
}) {
  const ref = useOutsideClick(closeOptions, "optionDropDown");
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-white shadow-2xs space-y-3 p-2 shadow-[#efefef] rounded-xl border border-secondary-200 absolute top-8 w-56 z-50"
    >
      {optionItemData.map((item) => (
        <GuestOptionItem
          key={item.id}
          type={item.type}
          options={options}
          handleOptions={handleOptions}
          minLimit={item.minLimit}
        />
      ))}
    </div>
  );
}

type GuestOptionItemType = {
  type: string;
  minLimit: number;
  options: OptionsType;
  handleOptions: handleOptionsType;
};

function GuestOptionItem({
  type,
  minLimit,
  options,
  handleOptions,
}: GuestOptionItemType) {
  return (
    <div className="flex items-center gap-4 justify-between">
      <span className="flex text-base ml-2">{type}</span>
      <div className="flex items-center gap-4 justify-between w-28">
        <button
          disabled={options[type as keyof OptionsType] <= minLimit}
          className="p-2 rounded-lg text-black bg-primary-light/10"
          onClick={() => handleOptions(type, "decrease")}
        >
          <HiMinus />
        </button>
        <div className="">{options[type as keyof OptionsType]}</div>
        <button
          className="p-2 rounded-lg text-black bg-primary-light/10"
          onClick={() => handleOptions(type, "increase")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
