'use client';

import {
    Box,
    SimpleGrid,
} from '@chakra-ui/react';
import React, {useEffect} from 'react';

import PieCard from 'views/admin/default/components/PieCard';

import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';


import {groupByDay, groupByWeekDay} from "../../../utils/incomeAndExpenseHelper";
import {
    expensesAndIncomeData,
} from "../../../utils/dateHelper";
import {useDispatch, useSelector} from "react-redux";
import {IReducer} from "../../../store/store";
import StatisticsCardWrappers from "../../../views/admin/default/components/StatisticsCardWrappers";
import {retrieveUserInfoExpense} from "../../../store/reducers/Expense";
import {retrieveUserInfoIncome} from "../../../store/reducers/Income";

export default function Default() {
    const expenses = useSelector((state: IReducer) => state.Expense)
    const incomes = useSelector((state: IReducer) => state.Income)
    const {
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
    } = expensesAndIncomeData(expenses, incomes)

    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(retrieveUserInfoExpense())
        // @ts-ignore
        dispatch(retrieveUserInfoIncome())

    }, [dispatch]);
    // this is demo data for use if its needed
    // localStorage.setItem('userExpenses', JSON.stringify([
    //         {
    //             "name": "Alpha",
    //             "category": "Groceries",
    //             "description": "Purchase at local store",
    //             "amount": 35,
    //             "date": "2024-11-15",
    //             "categoryAmounts": {
    //                 "Groceries": "35.00"
    //             }
    //         },
    //         {
    //             "name": "Beta",
    //             "category": "Dining out",
    //             "description": "Lunch with friends",
    //             "amount": 45,
    //             "date": "2024-11-12",
    //             "categoryAmounts": {
    //                 "Dining out": "45.00"
    //             }
    //         },
    //         {
    //             "name": "Gamma",
    //             "category": "Entertainment",
    //             "description": "Movie night",
    //             "amount": 50,
    //             "date": "2024-10-25",
    //             "categoryAmounts": {
    //                 "Entertainment": "50.00"
    //             }
    //         },
    //         {
    //             "name": "Delta",
    //             "category": "Groceries",
    //             "description": "Supermarket trip",
    //             "amount": 60,
    //             "date": "2024-10-30",
    //             "categoryAmounts": {
    //                 "Groceries": "60.00"
    //             }
    //         },
    //         {
    //             "name": "Epsilon",
    //             "category": "Dining out",
    //             "description": "Dinner date",
    //             "amount": 70,
    //             "date": "2024-10-18",
    //             "categoryAmounts": {
    //                 "Dining out": "70.00"
    //             }
    //         },
    //         {
    //             "name": "Zeta",
    //             "category": "Entertainment",
    //             "description": "Concert tickets",
    //             "amount": 120,
    //             "date": "2024-10-20",
    //             "categoryAmounts": {
    //                 "Entertainment": "120.00"
    //             }
    //         },
    //         {
    //             "name": "Eta",
    //             "category": "Groceries",
    //             "description": "Weekly shopping",
    //             "amount": 55,
    //             "date": "2024-11-01",
    //             "categoryAmounts": {
    //                 "Groceries": "55.00"
    //             }
    //         },
    //         {
    //             "name": "Theta",
    //             "category": "Dining out",
    //             "description": "Business lunch",
    //             "amount": 85,
    //             "date": "2024-11-10",
    //             "categoryAmounts": {
    //                 "Dining out": "85.00"
    //             }
    //         },
    //         {
    //             "name": "Iota",
    //             "category": "Entertainment",
    //             "description": "Amusement park",
    //             "amount": 90,
    //             "date": "2024-11-05",
    //             "categoryAmounts": {
    //                 "Entertainment": "90.00"
    //             }
    //         },
    //         {
    //             "name": "Kappa",
    //             "category": "Groceries",
    //             "description": "Organic market",
    //             "amount": 30,
    //             "date": "2024-11-08",
    //             "categoryAmounts": {
    //                 "Groceries": "30.00"
    //             }
    //         },
    //         {
    //             "name": "Lambda",
    //             "category": "Dining out",
    //             "description": "Coffee and snacks",
    //             "amount": 15,
    //             "date": "2024-11-06",
    //             "categoryAmounts": {
    //                 "Dining out": "15.00"
    //             }
    //         },
    //         {
    //             "name": "Mu",
    //             "category": "Entertainment",
    //             "description": "Streaming service",
    //             "amount": 20,
    //             "date": "2024-10-22",
    //             "categoryAmounts": {
    //                 "Entertainment": "20.00"
    //             }
    //         },
    //         {
    //             "name": "Nu",
    //             "category": "Groceries",
    //             "description": "Bulk purchase",
    //             "amount": 75,
    //             "date": "2024-10-28",
    //             "categoryAmounts": {
    //                 "Groceries": "75.00"
    //             }
    //         },
    //         {
    //             "name": "Xi",
    //             "category": "Dining out",
    //             "description": "Family dinner",
    //             "amount": 95,
    //             "date": "2024-10-15",
    //             "categoryAmounts": {
    //                 "Dining out": "95.00"
    //             }
    //         },
    //         {
    //             "name": "Omicron",
    //             "category": "Entertainment",
    //             "description": "Theater play",
    //             "amount": 110,
    //             "date": "2024-10-17",
    //             "categoryAmounts": {
    //                 "Entertainment": "110.00"
    //             }
    //         },
    //         {
    //             "name": "Pi",
    //             "category": "Groceries",
    //             "description": "Fresh produce",
    //             "amount": 40,
    //             "date": "2024-11-03",
    //             "categoryAmounts": {
    //                 "Groceries": "40.00"
    //             }
    //         },
    //         {
    //             "name": "Rho",
    //             "category": "Dining out",
    //             "description": "Quick bite",
    //             "amount": 25,
    //             "date": "2024-11-07",
    //             "categoryAmounts": {
    //                 "Dining out": "25.00"
    //             }
    //         },
    //         {
    //             "name": "Sigma",
    //             "category": "Entertainment",
    //             "description": "Museum entry",
    //             "amount": 12,
    //             "date": "2024-10-10",
    //             "categoryAmounts": {
    //                 "Entertainment": "12.00"
    //             }
    //         },
    //         {
    //             "name": "Tau",
    //             "category": "Groceries",
    //             "description": "Monthly supplies",
    //             "amount": 100,
    //             "date": "2024-10-05",
    //             "categoryAmounts": {
    //                 "Groceries": "100.00"
    //             }
    //         },
    //         {
    //             "name": "Upsilon",
    //             "category": "Dining out",
    //             "description": "Brunch",
    //             "amount": 35,
    //             "date": "2024-10-12",
    //             "categoryAmounts": {
    //                 "Dining out": "35.00"
    //             }
    //         },
    //         {
    //             "name": "Phi",
    //             "category": "Entertainment",
    //             "description": "Arcade games",
    //             "amount": 25,
    //             "date": "2024-10-08",
    //             "categoryAmounts": {
    //                 "Entertainment": "25.00"
    //             }
    //         },
    //         {
    //             "name": "Chi",
    //             "category": "Groceries",
    //             "description": "Farmers market",
    //             "amount": 60,
    //             "date": "2024-11-04",
    //             "categoryAmounts": {
    //                 "Groceries": "60.00"
    //             }
    //         },
    //         {
    //             "name": "Psi",
    //             "category": "Dining out",
    //             "description": "Sushi dinner",
    //             "amount": 55,
    //             "date": "2024-10-11",
    //             "categoryAmounts": {
    //                 "Dining out": "55.00"
    //             }
    //         },
    //         {
    //             "name": "Omega",
    //             "category": "Entertainment",
    //             "description": "Concert",
    //             "amount": 150,
    //             "date": "2024-11-18",
    //             "categoryAmounts": {
    //                 "Entertainment": "150.00"
    //             }
    //         },
    //         {
    //             "name": "Alpha1",
    //             "category": "Groceries",
    //             "description": "Weekly essentials",
    //             "amount": 45,
    //             "date": "2024-11-20",
    //             "categoryAmounts": {
    //                 "Groceries": "45.00"
    //             }
    //         },
    //         {
    //             "name": "Beta1",
    //             "category": "Dining out",
    //             "description": "Cafe visit",
    //             "amount": 30,
    //             "date": "2024-10-19",
    //             "categoryAmounts": {
    //                 "Dining out": "30.00"
    //             }
    //         },
    //         {
    //             "name": "Gamma1",
    //             "category": "Entertainment",
    //             "description": "Bowling night",
    //             "amount": 35,
    //             "date": "2024-10-26",
    //             "categoryAmounts": {
    //                 "Entertainment": "35.00"
    //             }
    //         },
    //         {
    //             "name": "Delta1",
    //             "category": "Groceries",
    //             "description": "Supermarket haul",
    //             "amount": 80,
    //             "date": "2024-11-02",
    //             "categoryAmounts": {
    //                 "Groceries": "80.00"
    //             }
    //         },
    //         {
    //             "name": "Epsilon1",
    //             "category": "Dining out",
    //             "description": "Restaurant dinner",
    //             "amount": 65,
    //             "date": "2024-10-16",
    //             "categoryAmounts": {
    //                 "Dining out": "65.00"
    //             }
    //         },
    //         {
    //             "name": "Zeta1",
    //             "category": "Entertainment",
    //             "description": "Comedy show",
    //             "amount": 75,
    //             "date": "2024-11-13",
    //             "categoryAmounts": {
    //                 "Entertainment": "75.00"
    //             }
    //         },
    //         {
    //             "name": "Eta1",
    //             "category": "Groceries",
    //             "description": "Local market",
    //             "amount": 50,
    //             "date": "2024-11-09",
    //             "categoryAmounts": {
    //                 "Groceries": "50.00"
    //             }
    //         },
    //         {
    //             "name": "Theta1",
    //             "category": "Dining out",
    //             "description": "Fine dining",
    //             "amount": 120,
    //             "date": "2024-11-14",
    //             "categoryAmounts": {
    //                 "Dining out": "120.00"
    //             }
    //         },
    //         {
    //             "name": "Iota1",
    //             "category": "Entertainment",
    //             "description": "Theater tickets",
    //             "amount": 85,
    //             "date": "2024-11-11",
    //             "categoryAmounts": {
    //                 "Entertainment": "85.00"
    //             }
    //         },
    //         {
    //             "name": "Kappa1",
    //             "category": "Groceries",
    //             "description": "Monthly shopping",
    //             "amount": 70,
    //             "date": "2024-10-23",
    //             "categoryAmounts": {
    //                 "Groceries": "70.00"
    //             }
    //         },
    //         {
    //             "name": "Lambda1",
    //             "category": "Dining out",
    //             "description": "Fast food",
    //             "amount": 20,
    //             "date": "2024-10-27",
    //             "categoryAmounts": {
    //                 "Dining out": "20.00"
    //             }
    //         },
    //         {
    //             "name": "Mu1",
    //             "category": "Entertainment",
    //             "description": "Live performance",
    //             "amount": 130,
    //             "date": "2024-11-16",
    //             "categoryAmounts": {
    //                 "Entertainment": "130.00"
    //             }
    //         },
    //         {
    //             "name": "Nu1",
    //             "category": "Groceries",
    //             "description": "Grocery run",
    //             "amount": 55,
    //             "date": "2024-11-19",
    //             "categoryAmounts": {
    //                 "Groceries": "55.00"
    //             }
    //         },
    //         {
    //             "name": "Xi1",
    //             "category": "Dining out",
    //             "description": "Lunch",
    //             "amount": 25,
    //             "date": "2024-10-21",
    //             "categoryAmounts": {
    //                 "Dining out": "25.00"
    //             }
    //         },
    //         {
    //             "name": "Omicron1",
    //             "category": "Entertainment",
    //             "description": "Sports event",
    //             "amount": 140,
    //             "date": "2024-10-24",
    //             "categoryAmounts": {
    //                 "Entertainment": "140.00"
    //             }
    //         },
    //         {
    //             "name": "Pi1",
    //             "category": "Groceries",
    //             "description": "Weekend shopping",
    //             "amount": 35,
    //             "date": "2024-11-21",
    //             "categoryAmounts": {
    //                 "Groceries": "35.00"
    //             }
    //         },
    //         {
    //             "name": "Rho1",
    //             "category": "Dining out",
    //             "description": "Buffet",
    //             "amount": 60,
    //             "date": "2024-11-17",
    //             "categoryAmounts": {
    //                 "Dining out": "60.00"
    //             }
    //         },
    //         {
    //             "name": "Sigma1",
    //             "category": "Entertainment",
    //             "description": "Movie tickets",
    //             "amount": 40,
    //             "date": "2024-10-31",
    //             "categoryAmounts": {
    //                 "Entertainment": "40.00"
    //             }
    //         },
    //         {
    //             "name": "Tau1",
    //             "category": "Groceries",
    //             "description": "General supplies",
    //             "amount": 85,
    //             "date": "2024-10-29",
    //             "categoryAmounts": {
    //                 "Groceries": "85.00"
    //             }
    //         },
    //         {
    //             "name": "Upsilon1",
    //             "category": "Dining out",
    //             "description": "Breakfast",
    //             "amount": 18,
    //             "date": "2024-11-23",
    //             "categoryAmounts": {
    //                 "Dining out": "18.00"
    //             }
    //         },
    //         {
    //             "name": "Phi1",
    //             "category": "Entertainment",
    //             "description": "Theme park",
    //             "amount": 95,
    //             "date": "2024-10-09",
    //             "categoryAmounts": {
    //                 "Entertainment": "95.00"
    //             }
    //         },
    //         {
    //             "name": "Chi1",
    //             "category": "Groceries",
    //             "description": "Discount store",
    //             "amount": 20,
    //             "date": "2024-10-13",
    //             "categoryAmounts": {
    //                 "Groceries": "20.00"
    //             }
    //         },
    //         {
    //             "name": "Psi1",
    //             "category": "Dining out",
    //             "description": "Casual dining",
    //             "amount": 45,
    //             "date": "2024-10-14",
    //             "categoryAmounts": {
    //                 "Dining out": "45.00"
    //             }
    //         },
    //         {
    //             "name": "Omega1",
    //             "category": "Entertainment",
    //             "description": "Festival",
    //             "amount": 160,
    //             "date": "2024-11-22",
    //             "categoryAmounts": {
    //                 "Entertainment": "160.00"
    //             }
    //         }
    //     ]
    // ))
    //
    // localStorage.setItem('userIncomes', JSON.stringify([
    //     {
    //         "name": "item1",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 1",
    //         "amount": 250,
    //         "date": "2024-11-01",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "50.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "25.00"
    //         }
    //     },
    //     {
    //         "name": "item2",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 25,
    //             "Entertainment": 35,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 2",
    //         "amount": 300,
    //         "date": "2024-11-02",
    //         "categoryAmounts": {
    //             "Groceries": "30.00",
    //             "Dining out": "75.00",
    //             "Entertainment": "105.00",
    //             "Personal care": "60.00"
    //         }
    //     },
    //     {
    //         "name": "item3",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 3",
    //         "amount": 400,
    //         "date": "2024-11-03",
    //         "categoryAmounts": {
    //             "Groceries": "80.00",
    //             "Dining out": "80.00",
    //             "Entertainment": "120.00",
    //             "Personal care": "60.00"
    //         }
    //     },
    //     {
    //         "name": "item4",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 25,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 4",
    //         "amount": 150,
    //         "date": "2024-11-04",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "37.50",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item5",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 20,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 5",
    //         "amount": 500,
    //         "date": "2024-11-05",
    //         "categoryAmounts": {
    //             "Groceries": "100.00",
    //             "Dining out": "100.00",
    //             "Entertainment": "100.00",
    //             "Personal care": "100.00"
    //         }
    //     },
    //     {
    //         "name": "item6",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 20,
    //             "Entertainment": 25,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 6",
    //         "amount": 600,
    //         "date": "2024-11-06",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "120.00",
    //             "Entertainment": "150.00",
    //             "Personal care": "90.00"
    //         }
    //     },
    //     {
    //         "name": "item7",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 25,
    //             "Entertainment": 10,
    //             "Personal care": 30
    //         },
    //         "description": "description for item 7",
    //         "amount": 200,
    //         "date": "2024-11-07",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "50.00",
    //             "Entertainment": "20.00",
    //             "Personal care": "60.00"
    //         }
    //     },
    //     {
    //         "name": "item8",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 20,
    //             "Entertainment": 35,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 8",
    //         "amount": 700,
    //         "date": "2024-11-08",
    //         "categoryAmounts": {
    //             "Groceries": "70.00",
    //             "Dining out": "140.00",
    //             "Entertainment": "245.00",
    //             "Personal care": "140.00"
    //         }
    //     },
    //     {
    //         "name": "item9",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 10,
    //             "Entertainment": 25,
    //             "Personal care": 30
    //         },
    //         "description": "description for item 9",
    //         "amount": 300,
    //         "date": "2024-11-09",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "30.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "90.00"
    //         }
    //     },
    //     {
    //         "name": "item10",
    //         "categoryPercentages": {
    //             "Groceries": 30,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 10",
    //         "amount": 350,
    //         "date": "2024-11-10",
    //         "categoryAmounts": {
    //             "Groceries": "105.00",
    //             "Dining out": "70.00",
    //             "Entertainment": "105.00",
    //             "Personal care": "52.50"
    //         }
    //     },
    //     {
    //         "name": "item11",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 15,
    //             "Entertainment": 15,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 11",
    //         "amount": 100,
    //         "date": "2024-11-11",
    //         "categoryAmounts": {
    //             "Groceries": "15.00",
    //             "Dining out": "15.00",
    //             "Entertainment": "15.00",
    //             "Personal care": "10.00"
    //         }
    //     },
    //     {
    //         "name": "item12",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 12",
    //         "amount": 150,
    //         "date": "2024-11-12",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item13",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 13",
    //         "amount": 250,
    //         "date": "2024-11-13",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "50.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "25.00"
    //         }
    //     },
    //     {
    //         "name": "item14",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 20,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 14",
    //         "amount": 300,
    //         "date": "2024-11-14",
    //         "categoryAmounts": {
    //             "Groceries": "45.00",
    //             "Dining out": "60.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item15",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 10,
    //             "Entertainment": 10,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 15",
    //         "amount": 400,
    //         "date": "2024-11-15",
    //         "categoryAmounts": {
    //             "Groceries": "40.00",
    //             "Dining out": "40.00",
    //             "Entertainment": "40.00",
    //             "Personal care": "40.00"
    //         }
    //     },
    //     {
    //         "name": "item16",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 25,
    //             "Entertainment": 15,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 16",
    //         "amount": 500,
    //         "date": "2024-11-16",
    //         "categoryAmounts": {
    //             "Groceries": "100.00",
    //             "Dining out": "125.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "100.00"
    //         }
    //     },
    //     {
    //         "name": "item17",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 20,
    //             "Entertainment": 20,
    //             "Personal care": 25
    //         },
    //         "description": "description for item 17",
    //         "amount": 200,
    //         "date": "2024-11-17",
    //         "categoryAmounts": {
    //             "Groceries": "30.00",
    //             "Dining out": "40.00",
    //             "Entertainment": "40.00",
    //             "Personal care": "50.00"
    //         }
    //     },
    //     {
    //         "name": "item18",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 20,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 18",
    //         "amount": 300,
    //         "date": "2024-11-18",
    //         "categoryAmounts": {
    //             "Groceries": "75.00",
    //             "Dining out": "60.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item19",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 25,
    //             "Entertainment": 15,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 19",
    //         "amount": 350,
    //         "date": "2024-11-19",
    //         "categoryAmounts": {
    //             "Groceries": "70.00",
    //             "Dining out": "87.50",
    //             "Entertainment": "52.50",
    //             "Personal care": "70.00"
    //         }
    //     },
    //     {
    //         "name": "item20",
    //         "categoryPercentages": {
    //             "Groceries": 30,
    //             "Dining out": 20,
    //             "Entertainment": 10,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 20",
    //         "amount": 400,
    //         "date": "2024-11-20",
    //         "categoryAmounts": {
    //             "Groceries": "120.00",
    //             "Dining out": "80.00",
    //             "Entertainment": "40.00",
    //             "Personal care": "40.00"
    //         }
    //     },
    //     {
    //         "name": "item21",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 15,
    //             "Entertainment": 10,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 21",
    //         "amount": 500,
    //         "date": "2024-11-21",
    //         "categoryAmounts": {
    //             "Groceries": "75.00",
    //             "Dining out": "75.00",
    //             "Entertainment": "50.00",
    //             "Personal care": "50.00"
    //         }
    //     },
    //     {
    //         "name": "item22",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 22",
    //         "amount": 250,
    //         "date": "2024-11-22",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "50.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "37.50"
    //         }
    //     },
    //     {
    //         "name": "item23",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 10,
    //             "Entertainment": 10,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 23",
    //         "amount": 400,
    //         "date": "2024-11-23",
    //         "categoryAmounts": {
    //             "Groceries": "40.00",
    //             "Dining out": "40.00",
    //             "Entertainment": "40.00",
    //             "Personal care": "40.00"
    //         }
    //     },
    //     {
    //         "name": "item24",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 24",
    //         "amount": 150,
    //         "date": "2024-11-24",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item25",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 25",
    //         "amount": 250,
    //         "date": "2024-11-25",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "50.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "25.00"
    //         }
    //     },
    //     {
    //         "name": "item26",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 20,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 26",
    //         "amount": 300,
    //         "date": "2024-10-01",
    //         "categoryAmounts": {
    //             "Groceries": "45.00",
    //             "Dining out": "60.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item27",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 27",
    //         "amount": 150,
    //         "date": "2024-10-02",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item28",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 20,
    //             "Entertainment": 35,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 28",
    //         "amount": 700,
    //         "date": "2024-10-03",
    //         "categoryAmounts": {
    //             "Groceries": "70.00",
    //             "Dining out": "140.00",
    //             "Entertainment": "245.00",
    //             "Personal care": "140.00"
    //         }
    //     },
    //     {
    //         "name": "item29",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 10,
    //             "Entertainment": 25,
    //             "Personal care": 30
    //         },
    //         "description": "description for item 29",
    //         "amount": 300,
    //         "date": "2024-10-04",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "30.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "90.00"
    //         }
    //     },
    //     {
    //         "name": "item30",
    //         "categoryPercentages": {
    //             "Groceries": 30,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 30",
    //         "amount": 350,
    //         "date": "2024-10-05",
    //         "categoryAmounts": {
    //             "Groceries": "105.00",
    //             "Dining out": "70.00",
    //             "Entertainment": "105.00",
    //             "Personal care": "52.50"
    //         }
    //     },
    //     {
    //         "name": "item31",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 15,
    //             "Entertainment": 15,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 31",
    //         "amount": 100,
    //         "date": "2024-10-06",
    //         "categoryAmounts": {
    //             "Groceries": "15.00",
    //             "Dining out": "15.00",
    //             "Entertainment": "15.00",
    //             "Personal care": "10.00"
    //         }
    //     },
    //     {
    //         "name": "item32",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 32",
    //         "amount": 150,
    //         "date": "2024-10-07",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item33",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 25
    //         },
    //         "description": "description for item 33",
    //         "amount": 600,
    //         "date": "2024-10-08",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "90.00",
    //             "Entertainment": "120.00",
    //             "Personal care": "150.00"
    //         }
    //     },
    //     {
    //         "name": "item34",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 30,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 34",
    //         "amount": 250,
    //         "date": "2024-10-09",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "75.00",
    //             "Entertainment": "62.50",
    //             "Personal care": "25.00"
    //         }
    //     },
    //     {
    //         "name": "item35",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 20,
    //             "Entertainment": 35,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 35",
    //         "amount": 700,
    //         "date": "2024-10-10",
    //         "categoryAmounts": {
    //             "Groceries": "70.00",
    //             "Dining out": "140.00",
    //             "Entertainment": "245.00",
    //             "Personal care": "140.00"
    //         }
    //     },
    //     {
    //         "name": "item36",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 10,
    //             "Entertainment": 25,
    //             "Personal care": 30
    //         },
    //         "description": "description for item 36",
    //         "amount": 300,
    //         "date": "2024-10-11",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "30.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "90.00"
    //         }
    //     },
    //     {
    //         "name": "item37",
    //         "categoryPercentages": {
    //             "Groceries": 30,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 37",
    //         "amount": 350,
    //         "date": "2024-10-12",
    //         "categoryAmounts": {
    //             "Groceries": "105.00",
    //             "Dining out": "70.00",
    //             "Entertainment": "105.00",
    //             "Personal care": "52.50"
    //         }
    //     },
    //     {
    //         "name": "item38",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 15,
    //             "Entertainment": 15,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 38",
    //         "amount": 100,
    //         "date": "2024-10-13",
    //         "categoryAmounts": {
    //             "Groceries": "15.00",
    //             "Dining out": "15.00",
    //             "Entertainment": "15.00",
    //             "Personal care": "10.00"
    //         }
    //     },
    //     {
    //         "name": "item39",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 39",
    //         "amount": 150,
    //         "date": "2024-10-14",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item40",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 25
    //         },
    //         "description": "description for item 40",
    //         "amount": 600,
    //         "date": "2024-10-15",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "90.00",
    //             "Entertainment": "120.00",
    //             "Personal care": "150.00"
    //         }
    //     },
    //     {
    //         "name": "item41",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 30,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 41",
    //         "amount": 250,
    //         "date": "2024-10-16",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "75.00",
    //             "Entertainment": "62.50",
    //             "Personal care": "25.00"
    //         }
    //     },
    //     {
    //         "name": "item42",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 20,
    //             "Entertainment": 35,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 42",
    //         "amount": 700,
    //         "date": "2024-10-17",
    //         "categoryAmounts": {
    //             "Groceries": "70.00",
    //             "Dining out": "140.00",
    //             "Entertainment": "245.00",
    //             "Personal care": "140.00"
    //         }
    //     },
    //     {
    //         "name": "item43",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 10,
    //             "Entertainment": 25,
    //             "Personal care": 30
    //         },
    //         "description": "description for item 43",
    //         "amount": 300,
    //         "date": "2024-10-18",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "30.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "90.00"
    //         }
    //     },
    //     {
    //         "name": "item44",
    //         "categoryPercentages": {
    //             "Groceries": 30,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 44",
    //         "amount": 350,
    //         "date": "2024-10-19",
    //         "categoryAmounts": {
    //             "Groceries": "105.00",
    //             "Dining out": "70.00",
    //             "Entertainment": "105.00",
    //             "Personal care": "52.50"
    //         }
    //     },
    //     {
    //         "name": "item45",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 15,
    //             "Entertainment": 15,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 45",
    //         "amount": 100,
    //         "date": "2024-10-20",
    //         "categoryAmounts": {
    //             "Groceries": "15.00",
    //             "Dining out": "15.00",
    //             "Entertainment": "15.00",
    //             "Personal care": "10.00"
    //         }
    //     },
    //     {
    //         "name": "item46",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 46",
    //         "amount": 150,
    //         "date": "2024-10-21",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item47",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 25
    //         },
    //         "description": "description for item 47",
    //         "amount": 600,
    //         "date": "2024-10-22",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "90.00",
    //             "Entertainment": "120.00",
    //             "Personal care": "150.00"
    //         }
    //     },
    //     {
    //         "name": "item48",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 30,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 48",
    //         "amount": 250,
    //         "date": "2024-10-23",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "75.00",
    //             "Entertainment": "62.50",
    //             "Personal care": "25.00"
    //         }
    //     },
    //     {
    //         "name": "item49",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 20,
    //             "Entertainment": 35,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 49",
    //         "amount": 700,
    //         "date": "2024-10-24",
    //         "categoryAmounts": {
    //             "Groceries": "70.00",
    //             "Dining out": "140.00",
    //             "Entertainment": "245.00",
    //             "Personal care": "140.00"
    //         }
    //     },
    //     {
    //         "name": "item50",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 10,
    //             "Entertainment": 25,
    //             "Personal care": 30
    //         },
    //         "description": "description for item 50",
    //         "amount": 300,
    //         "date": "2024-10-25",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "30.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "90.00"
    //         }
    //     },
    //     {
    //         "name": "item51",
    //         "categoryPercentages": {
    //             "Groceries": 30,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 51",
    //         "amount": 350,
    //         "date": "2024-10-26",
    //         "categoryAmounts": {
    //             "Groceries": "105.00",
    //             "Dining out": "70.00",
    //             "Entertainment": "105.00",
    //             "Personal care": "52.50"
    //         }
    //     },
    //     {
    //         "name": "item52",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 15,
    //             "Entertainment": 15,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 52",
    //         "amount": 100,
    //         "date": "2024-10-27",
    //         "categoryAmounts": {
    //             "Groceries": "15.00",
    //             "Dining out": "15.00",
    //             "Entertainment": "15.00",
    //             "Personal care": "10.00"
    //         }
    //     },
    //     {
    //         "name": "item53",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 53",
    //         "amount": 150,
    //         "date": "2024-10-28",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item54",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 25
    //         },
    //         "description": "description for item 54",
    //         "amount": 600,
    //         "date": "2024-10-29",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "90.00",
    //             "Entertainment": "120.00",
    //             "Personal care": "150.00"
    //         }
    //     },
    //     {
    //         "name": "item55",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 30,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 55",
    //         "amount": 250,
    //         "date": "2024-10-30",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "75.00",
    //             "Entertainment": "62.50",
    //             "Personal care": "25.00"
    //         }
    //     },
    //     {
    //         "name": "item56",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 20,
    //             "Entertainment": 35,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 56",
    //         "amount": 700,
    //         "date": "2024-10-31",
    //         "categoryAmounts": {
    //             "Groceries": "70.00",
    //             "Dining out": "140.00",
    //             "Entertainment": "245.00",
    //             "Personal care": "140.00"
    //         }
    //     },
    //     {
    //         "name": "item57",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 10,
    //             "Entertainment": 25,
    //             "Personal care": 30
    //         },
    //         "description": "description for item 57",
    //         "amount": 300,
    //         "date": "2024-11-01",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "30.00",
    //             "Entertainment": "75.00",
    //             "Personal care": "90.00"
    //         }
    //     },
    //     {
    //         "name": "item58",
    //         "categoryPercentages": {
    //             "Groceries": 30,
    //             "Dining out": 20,
    //             "Entertainment": 30,
    //             "Personal care": 15
    //         },
    //         "description": "description for item 58",
    //         "amount": 350,
    //         "date": "2024-11-02",
    //         "categoryAmounts": {
    //             "Groceries": "105.00",
    //             "Dining out": "70.00",
    //             "Entertainment": "105.00",
    //             "Personal care": "52.50"
    //         }
    //     },
    //     {
    //         "name": "item59",
    //         "categoryPercentages": {
    //             "Groceries": 15,
    //             "Dining out": 15,
    //             "Entertainment": 15,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 59",
    //         "amount": 100,
    //         "date": "2024-11-03",
    //         "categoryAmounts": {
    //             "Groceries": "15.00",
    //             "Dining out": "15.00",
    //             "Entertainment": "15.00",
    //             "Personal care": "10.00"
    //         }
    //     },
    //     {
    //         "name": "item60",
    //         "categoryPercentages": {
    //             "Groceries": 25,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 20
    //         },
    //         "description": "description for item 60",
    //         "amount": 150,
    //         "date": "2024-11-04",
    //         "categoryAmounts": {
    //             "Groceries": "37.50",
    //             "Dining out": "22.50",
    //             "Entertainment": "30.00",
    //             "Personal care": "30.00"
    //         }
    //     },
    //     {
    //         "name": "item61",
    //         "categoryPercentages": {
    //             "Groceries": 10,
    //             "Dining out": 15,
    //             "Entertainment": 20,
    //             "Personal care": 25
    //         },
    //         "description": "description for item 61",
    //         "amount": 600,
    //         "date": "2024-11-05",
    //         "categoryAmounts": {
    //             "Groceries": "60.00",
    //             "Dining out": "90.00",
    //             "Entertainment": "120.00",
    //             "Personal care": "150.00"
    //         }
    //     },
    //     {
    //         "name": "item62",
    //         "categoryPercentages": {
    //             "Groceries": 20,
    //             "Dining out": 30,
    //             "Entertainment": 25,
    //             "Personal care": 10
    //         },
    //         "description": "description for item 62",
    //         "amount": 250,
    //         "date": "2024-11-06",
    //         "categoryAmounts": {
    //             "Groceries": "50.00",
    //             "Dining out": "75.00",
    //             "Entertainment": "62.50",
    //             "Personal care": "25.00"
    //         }
    //     },
    // ]))


    return (
        <Box pt={{base: '130px', md: '80px', xl: '80px'}}>
            <StatisticsCardWrappers
                totalExpenses={totalExpenses}
                totalIncome={totalIncome}
                isUseLastMonth={false}
            />

            <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap="20px" mb="20px">
                <TotalSpent
                    monthExpenses={groupByDay(monthExpenses)}
                    monthIncome={groupByDay(monthIncome)}
                    totalExpenses={totalExpenses}
                    totalIncomes={totalIncome}
                    title={"This month"}
                />
                <WeeklyRevenue
                    lastWeekIncomes={groupByWeekDay(lastWeekIncomes)}
                    lastWeekExpenses={groupByWeekDay(lastWeekExpenses)}
                />
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap="20px" mb="20px">
                <TotalSpent
                    monthExpenses={groupByDay(lastMonthExpenses)}
                    monthIncome={groupByDay(lastMonthIncome)}
                    totalExpenses={lastMonthTotalExpenses}
                    totalIncomes={lastMonthTotalIncome}
                    title={'Last month'}
                />
                <PieCard
                    monthExpenses={groupByDay(monthExpenses)}
                    monthIncome={groupByDay(monthIncome)}
                    totalExpenses={totalExpenses}
                    totalIncomes={totalIncome}
                />
            </SimpleGrid>
        </Box>
    );
}
