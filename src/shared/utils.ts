export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error("Expected an array");
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const getPreviousMonthYear = (month: string, year: number) => {
  const date = new Date(`${month} 1, ${year}`);
  date.setMonth(date.getMonth() - 1);
  const prevMonth = date.toLocaleString("default", { month: "long" });
  const prevYear = date.getFullYear();
  return { prevMonth, prevYear };
};
