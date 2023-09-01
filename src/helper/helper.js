import { useState, useRef, useEffect } from "react";

export const TYPE = "type";
export const OPERATOR = "operator";
export const NAME = "name";
export const CREATED_AT = "created_at";
export const DESCRIPTION = "description";
export const DISCOUNT_AMOUNT = "discount_amount";
export const IMAGES = "images ";
export const MIN_ORDER = "min_order";
export const PRICE = "price";
export const PRODUCT_TYPE = "product_type";
export const AND_OR = "and_or";
export const AND = "and";
export const OR = "or";
export const BEFORE = "before";
export const AFTER = "after";
export const CONTAINS = "contains";
export const IS_NOT_CONTAINS = "is_not_contains";
export const IS = "is";
export const IS_NOT = "is_not";
export const MORE_THAN_EQUAL = "more_than_equal";
export const LESS_THAN_EQUAL = "less_than_equal";
export const EMAIL = "email";
export const PASSWORD = "password";
export const KONFIRMASI_PASSWORD = "konfirmasiPassword";
export const TLP = "tlp";
export const NAMA_DEPAN = "namaDepan";
export const NAMA_BELAKANG = "namaBelakang";
export const BASE_URL = "https://dummyapi.io/data/v1/";
export const APP_ID = "62996cb2689bf0731cb00285";
export const typeOptions = [
  { value: NAME, label: "Name" },
  { value: CREATED_AT, label: "Created At" },
  { value: DESCRIPTION, label: "Description" },
  { value: IMAGES, label: "Images" },
  { value: MIN_ORDER, label: "Min Order" },
  { value: PRICE, label: "Price" },
  { value: PRODUCT_TYPE, label: "Product Type" },
];
// export const operatorOptions = [
//   { value: CONTAINS, label: "Contains" },
//   { value: IS_NOT_CONTAINS, label: "Is Not Contains" },
//   { value: IS, label: "Is" },
//   { value: IS_NOT, label: "Is Not" },
// ];
export const operatorOptions = (type) => {
  let operatorResult = [
    { value: CONTAINS, label: "Contains" },
    { value: IS_NOT_CONTAINS, label: "Is Not Contains" },
    { value: IS, label: "Is" },
    { value: IS_NOT, label: "Is Not" },
  ];

  if (type === PRICE || type === MIN_ORDER)
    operatorResult = [
      { value: IS, label: "Is" },
      { value: IS_NOT, label: "Is Not" },
      { value: MORE_THAN_EQUAL, label: "More Than Equal" },
      { value: LESS_THAN_EQUAL, label: "Less Than Equal" },
    ];

  if (type === CREATED_AT)
    operatorResult = [
      { value: BEFORE, label: "Before" },
      { value: AFTER, label: "After" },
    ];

  if (type === IMAGES)
    operatorResult = [
      { value: IS, label: type === IMAGES ? "Is Available" : "Is" },
      { value: IS_NOT, label: type === IMAGES ? "Is NOT Available" : "Is Not" },
    ];
  return operatorResult;
};

export const andOrOptions = [
  { value: AND, label: "AND" },
  { value: OR, label: "OR" },
];

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);
  return debouncedValue;
};

export const convertDate = (dateData) => {
  const date = new Date(dateData);
  const displayDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

  return displayDate;
};

export const filterGroup = (filters) => {
  let tempResult = "";

  for (let index = 0; index < filters.length; index++) {
    let operator = "";
    let value = "";
    let andOr = "";

    if (index !== 0) {
      if (filters[index].and_or === AND) andOr = "&& ";
      if (filters[index].and_or === OR) andOr = "|| ";

      tempResult += andOr;
    }

    //OPERATOR SELECTION
    if (filters[index].operator === BEFORE) {
      let dateHelper = dateToISO(filters[index].value);
      operator = " <";
      value = ` '${dateHelper}'`;
    }
    if (filters[index].operator === AFTER) {
      let dateHelper = dateToISO(filters[index].value);
      operator = " >";
      value = ` '${dateHelper}'`;
    }
    if (filters[index].operator === MORE_THAN_EQUAL) {
      operator = " >=";
      value = ` Number('${filters[index].value}')`;
    }
    if (filters[index].operator === LESS_THAN_EQUAL) {
      operator = " <=";
      value = ` Number('${filters[index].value}')`;
    }
    if (filters[index].operator === CONTAINS) {
      operator = ".includes";
      value = `('${filters[index].value}')`;
    }
    if (filters[index].operator === IS_NOT) {
      operator = " !=";
      value = ` '${filters[index].value}'`;
    }
    if (filters[index].operator === IS) {
      operator = " ==";
      value = ` '${filters[index].value}'`;
    }
    if (filters[index].operator === IS_NOT_CONTAINS) {
      operator = ".includes";
      value = `('${filters[index].value}')`;
      tempResult += "!";
    }

    //PRODUCT TYPE FILTER
    if (filters[index].type === PRODUCT_TYPE) {
      tempResult += `product.${filters[index].type}.name${operator}${value} `;
    }
    if (filters[index].type === IMAGES) {
      if (filters[index].operator === IS) {
        tempResult += `product.images.length > 0 `;
      } else {
        tempResult += `product.images.length <= 0 `;
      }
    }
    if (
      filters[index].type === NAME ||
      filters[index].type === DESCRIPTION ||
      filters[index].type === CREATED_AT ||
      filters[index].type === MIN_ORDER ||
      filters[index].type === PRICE
    ) {
      tempResult += `product.${filters[index].type}${operator}${value} `;
    }
  }

  return `(${tempResult})`;
};

export const dateToISO = (date) => {
  let parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
};
