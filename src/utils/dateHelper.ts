import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import {sumAmounts, sumIncomeForDateRange} from "./incomeAndExpenseHelper";

export const getWeekDays = () => {
  const today = new Date();
  const weekDays = [];

  for (let i = 6; i >= 0; i--) {
    const day = subDays(today, i);
    weekDays.push(format(day, 'd'));
  }

  return weekDays;
};

export const getMonthDays = () => {
  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);


  const monthDays = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate
  }).map(day => format(day, 'd'));

  return monthDays;
};

export const generateRandomDataForMonth = () => {
  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);

  const monthDays = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });

  const randomData = monthDays.map(() => Math.floor(Math.random() * (100 - 30 + 1)) + 30);

  return  randomData
};



// @ts-ignore
export const filterExpensesByMonth = (data, year, month) => {
  // @ts-ignore
  return data.filter(item => {
    const date = new Date(item.date);
    return date.getFullYear() === year && date.getMonth() === month;
  });
};

// @ts-ignore
export const filterByWeek = (data, startDate, endDate) => {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
// @ts-ignore
  return data.filter(item => {
    const date = new Date(item.date);
    date.setHours(0, 0, 0, 0);
    return date >= startDate && date <= endDate;
  });
};


// @ts-ignore
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
// @ts-ignore
export const getStartOfWeek = (date) => {
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}
// @ts-ignore
export const getEndOfWeek = (date) => {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}

// @ts-ignore
export const getStartOfMonth = (date) => {
  const startOfMonth = new Date(date);
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  return startOfMonth;
}
// @ts-ignore
export const getEndOfMonth = (date) => {
  const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  // @ts-ignore
  const endOfMonth = new Date(startOfNextMonth - 1);
  endOfMonth.setHours(23, 59, 59, 999);
  return endOfMonth;
}

// @ts-ignore
export const isInLastWeek = (date, lastWeekStart, lastWeekEnd) => {
  const expenseDate = new Date(date);
  return expenseDate >= lastWeekStart && expenseDate <= lastWeekEnd;
};

// @ts-ignore
export const getLastMonthData = (date) => {
  const lastMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
  const lastMonthYear = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
  return { lastMonth, lastMonthYear };
};

// @ts-ignore
export const expensesAndIncomeData = (expenses, incomes) => {

  const today = new Date();

  const startOfWeekDate = getStartOfWeek(today);
  const endOfWeekDate = getEndOfWeek(today);
  const startOfMonthDate = getStartOfMonth(today);
  const endOfMonthDate = getEndOfMonth(today);

  const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
  const lastMonthYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();

  const monthExpenses = filterExpensesByMonth(expenses, today.getFullYear(), today.getMonth());
  const lastMonthExpenses = filterExpensesByMonth(expenses, lastMonthYear, lastMonth);
  const monthIncome = filterExpensesByMonth(incomes, today.getFullYear(), today.getMonth());
  const lastMonthIncome = filterExpensesByMonth(incomes, lastMonthYear, lastMonth);
  const totalIncome = sumIncomeForDateRange(incomes, startOfMonthDate, endOfMonthDate);
  const lastMonthTotalExpenses = sumAmounts(lastMonthExpenses);
  const lastMonthTotalIncome = sumAmounts(lastMonthIncome);
  const totalExpenses = sumAmounts(monthExpenses);

  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
  const lastWeekEnd = new Date(lastWeekStart);
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6);

// @ts-ignore
  const lastWeekExpenses = expenses.filter(expense => isInLastWeek(expense.date, lastWeekStart, lastWeekEnd));
  // @ts-ignore
  const lastWeekIncomes = incomes.filter(income => isInLastWeek(income.date, lastWeekStart, lastWeekEnd));

  return {
    lastWeekExpenses,
    lastWeekIncomes,
    totalExpenses,
    lastMonthTotalIncome,
    lastMonthTotalExpenses,
    totalIncome,
    lastMonthIncome,
    lastMonthExpenses,
    monthExpenses,
    monthIncome
  }
}


