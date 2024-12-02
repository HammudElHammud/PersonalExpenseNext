'use client';

import {
    Box,
    useColorModeValue,
    Text, Flex,
} from "@chakra-ui/react";
import React, {useEffect} from 'react';
import {MdAdd} from "react-icons/md";
import {calculateTotalExpenses, calculateRemainingInfoAmounts} from "../../../utils/incomeAndExpenseHelper"

import {useDispatch, useSelector} from 'react-redux'
import {IReducer} from "store/store";
import { retrieveUserInfoCategory} from "store/reducers/Category";
// Assets
import Card from "../../../components/card/Card";

import BudgetItem from "../../../views/admin/budgets/components/BudgetItem";
import {retrieveUserInfoExpense} from "../../../store/reducers/Expense";
import {retrieveUserInfoIncome} from "../../../store/reducers/Income";


export default function Default() {
    const Category = useSelector((state: IReducer) => state.Category);
    const stateIncome = useSelector((state: IReducer) => state.Income);
    const stateExpense = useSelector((state: IReducer) => state.Expense);


    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(retrieveUserInfoCategory())
        // @ts-ignore
        dispatch(retrieveUserInfoExpense())
        // @ts-ignore
        dispatch(retrieveUserInfoIncome())

    }, [dispatch]);

    const textColor = useColorModeValue('secondaryGray.900', 'white');

    const totalExpenses = calculateTotalExpenses(stateExpense);
    const { remainingAmounts, percentageSpent } = calculateRemainingInfoAmounts(stateIncome, totalExpenses);

// @ts-ignore
    return (
        // @ts-ignore
        <Box pt={{base: '130px', md: '80px', xl: '80px'}}  gap="20px"
             mb="20px"
             mt='5'>
            <Card p="0px" mt={4} mb={3}>
                <Flex
                    align={{sm: 'flex-start', lg: 'center'}}
                    justify="space-between"
                    w="100%"
                    px="22px"
                    py="18px"
                >
                    <Text color={textColor} fontSize="xl" fontWeight="600">
                        Add Budgets
                    </Text>
                </Flex>

                <BudgetItem
                    name={'Create a custom budget'}
                    description={'Set a budget for a specific category'}
                    image={MdAdd}
                    isAdd={true}
                    totalExpense={0}
                    remainingAmount={0}
                    percentageSpent={0}
                />
            </Card>

            <Card p="0px">
                <Flex
                    align={{sm: 'flex-start', lg: 'center'}}
                    justify="space-between"
                    w="100%"
                    px="22px"
                    py="18px"
                >
                    <Text color={textColor} fontSize="xl" fontWeight="600">
                        Your Budgets
                    </Text>
                </Flex>
                {Object.values(Category)?.map((budget, index) => {
                    const percentage = percentageSpent[budget?.label] || 0;
                    return (
                        <BudgetItem
                            key={index}
                            name={budget?.label}
                            description={budget?.description}
                            image={budget?.BGicon}
                            totalExpense={totalExpenses[budget?.label] || 0}
                            remainingAmount={remainingAmounts[budget?.label] || 0}
                            percentageSpent={percentage}
                            isAdd={false}
                        />
                    );
                })}
            </Card>

        </Box>
    );
}
