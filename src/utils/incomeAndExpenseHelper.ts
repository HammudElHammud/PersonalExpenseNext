export const calculateRemainingAmounts = (incomes: any[], expenses: any[]) => {
  const remainingAmounts: { [key: string]: number } = {};

  incomes.forEach((income) => {
    Object.keys(income.categoryAmounts).forEach((category) => {
      if (!(category in remainingAmounts)) {
        remainingAmounts[category] = 0;
      }
      remainingAmounts[category] += parseFloat(income.categoryAmounts[category]);
    });
  });

  expenses.forEach((expense) => {
    Object.keys(expense.categoryAmounts).forEach((category) => {
      if (!(category in remainingAmounts)) {
        remainingAmounts[category] = 0;
      }
      remainingAmounts[category] -= parseFloat(expense.categoryAmounts[category]);
    });
  });

  return remainingAmounts;
};

export const calculateTotalExpenses = (expenses: any[]) => {
  const totalExpenses : { [key: string]: number } = {};

  expenses?.forEach((expense) => {
    Object.keys(expense.categoryAmounts).forEach((category) => {
      if (!totalExpenses[category]) {
        totalExpenses[category] = 0;
      }
      totalExpenses[category] += parseFloat(expense.categoryAmounts[category]);
    });
  });

  return totalExpenses;
};

export const calculateRemainingInfoAmounts = (incomes: any[], totalExpenses: { [key: string]: number }) => {
  const remainingAmounts: { [key: string]: number } = {};
  const percentageSpent: { [key: string]: string } = {};

  incomes.forEach((income) => {
    Object.keys(income.categoryAmounts).forEach((category) => {
      if (!remainingAmounts[category]) {
        remainingAmounts[category] = 0;
      }
      remainingAmounts[category] += parseFloat(income.categoryAmounts[category]);
    });
  });

  Object.keys(totalExpenses).forEach((category) => {
    if (remainingAmounts[category]) {
      remainingAmounts[category] -= totalExpenses[category];
    }

    if (remainingAmounts[category] !== undefined && remainingAmounts[category] > 0) {
      percentageSpent[category] = ((totalExpenses[category] / (totalExpenses[category] + remainingAmounts[category])) * 100).toFixed(2);
    } else {
      percentageSpent[category] = totalExpenses[category] > 0 ? "100.00" : "0.00";
    }
  });

  return { remainingAmounts, percentageSpent };
};

// @ts-ignore
export const sumAmounts = (data) => {
  // @ts-ignore
  return data.reduce((total, item) => total + item.amount, 0);
};

interface IncomeItem {
  name: string;
  categoryPercentages: Record<string, number>;
  description: string;
  amount: number;
  date: string;
  categoryAmounts: Record<string, string>;
}

// @ts-ignore
export const sumIncomeForDateRange = (incomeData: IncomeItem[], startDate, endDate) => {
  // @ts-ignore
  return incomeData
      .filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      })
      .reduce((total, item) => total + item.amount, 0);
}
interface DataItem {
  date: string;
  amount: number;
}

export const groupByDay = (data: IncomeItem[]): number[] => {
  const dailyAmounts = Array(31).fill(0);

  data.sort((a: DataItem, b: DataItem) => new Date(a.date).getTime() - new Date(b.date).getTime());

  data.forEach((item: DataItem) => {
    const date = new Date(item.date);
    const day = date.getDate() - 1;
    if (day >= 0 && day < 31) {
      dailyAmounts[day] += item.amount;
    }
  });

  return dailyAmounts;
};

export const groupByWeekDay = (data: IncomeItem[]): number[] => {
  const weekDays = [0, 0, 0, 0, 0, 0, 0];

  data.forEach((item: DataItem) => {
    const date = new Date(item.date);
    const dayOfWeek = date.getDay();
    weekDays[dayOfWeek] += parseFloat(item.amount.toString());
  });

  return weekDays;
};




