export const paymentSearchAbleFields = [
  "name",
  "createdAt",
  "method",
  "paymentDate",
  "roomNo",
];
export const paymentFilterableFields: string[] = [
  "name",
  "createdAt",
  "method",
  "paymentDate",
  "roomNo",
  "searchTerm",
];

export const roomSearchAbleFields = ["roomRent", "roomNo", "floorNo"];
export const roomFilterableFields: string[] = [
  "floorNo",
  "dueAmount",
  "isAvailable",
];
export const electricitySearchAbleFields = ["reading", "reading", "year"];
export const electricityFilterableFields: string[] = ["year", "monthName"];
export const tenantFilterableFields = ["name", "roomNo", "floorNo"];
export const tenantSearchAbleFields = ["name", "roomNo", "floorNo"];
