'use client';
import {
    Box,
    Text,
    SimpleGrid,
    useColorModeValue, Select, Flex,
    Button,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});
import React, {useState, useRef, useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import TotalSpent from "../../../views/admin/default/components/TotalSpent";
import StatisticsCardWrappers from "../../../views/admin/default/components/StatisticsCardWrappers";
import {IReducer} from "../../../store/store";
import {expensesAndIncomeData} from "../../../utils/dateHelper";
import {groupByDay} from "../../../utils/incomeAndExpenseHelper";
import PieCard from "../../../views/admin/default/components/PieCard";
import {retrieveUserInfoExpense} from "../../../store/reducers/Expense";
import {retrieveUserInfoIncome} from "../../../store/reducers/Income";


export default function Default() {
    const expenses = useSelector((state: IReducer) => state.Expense)
    const incomes = useSelector((state: IReducer) => state.Income)
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(retrieveUserInfoExpense())
        // @ts-ignore
        dispatch(retrieveUserInfoIncome())

    }, [dispatch]);
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
    const [isUseLastMonth, setIsUseLastMonth] = useState(false)
    const [isDownload, setIsDownload] = useState(false)
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    let bgButton = useColorModeValue(
        "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)",
        "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)",
    )

    const reportTemplateRef = useRef(null);

    const handleGeneratePdf = async () => {
        setIsDownload(true);
        const doc = new jsPDF({
            format: 'a4', // You can choose 'a4' or any format like 'letter'
            unit: 'px',   // Using px as unit
        });

        const element = reportTemplateRef.current;

        await html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const scaleX = pageWidth / imgWidth;
            const scaleY = pageHeight / imgHeight;
            const scale = Math.min(scaleX, scaleY);

            const scaledWidth = imgWidth * scale;
            const scaledHeight = imgHeight * scale;

            const x = (pageWidth - scaledWidth) / 2;
            const y = (pageHeight - scaledHeight) / 2;

            doc.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
            doc.save('expenseAndIncome.pdf');
        });

        setTimeout(() => {
            setIsDownload(false);
        }, 1000);
    };



    return (
        <Box pt={{base: '130px', md: '80px', xl: '80px'}} gap="20px"
             mb="20px"
             mt={5}>
            <Flex
                px={{base: '0px', '2xl': '10px'}}
                justifyContent='space-between'
                alignItems='center'
                w='100%'
                mb='8px'>
                <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
                    Report
                </Text>
                <Flex
                    px={{base: '0px', '2xl': '10px'}}
                    justifyContent='end'
                    alignItems='center'
                    w='100%'
                    mb='8px'>
                    {
                        isDownload ?  <Button
                            isLoading
                            loadingText="Downloading"
                            variant="brand"
                            spinnerPlacement="start"
                            bg={bgButton}
                        >
                            DOWNLOAD
                        </Button> :  <Button
                            leftIcon={<DownloadIcon w={19}/>}
                            variant="brand"
                            onClick={handleGeneratePdf}
                        >
                            PDF DOWNLOAD
                        </Button>
                    }

                    <Select fontSize='sm' variant='subtle' defaultValue='monthly' width='unset'
                            onChange={(e)=>{
                                e.target.value === 'lastmonth' ?
                                    setIsUseLastMonth(true)
                                    : setIsUseLastMonth(false)
                            }}
                            fontWeight='700'>
                        <option value='thismonth'>This Month</option>
                        <option value='lastmonth'>Last Month</option>
                    </Select>
                </Flex>
            </Flex>
            <div ref={reportTemplateRef} className='p-4'>
                <StatisticsCardWrappers
                    totalIncome={isUseLastMonth ? lastMonthTotalIncome : totalIncome}
                    totalExpenses={isUseLastMonth ? lastMonthTotalExpenses : totalExpenses}
                    isUseLastMonth={isUseLastMonth}/>
                <Box mt={8}>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                        Income and Expenses
                    </Text>
                    <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap="20px" mb="20px">
                        <TotalSpent
                            monthExpenses={groupByDay(lastMonthExpenses)}
                            monthIncome={groupByDay(lastMonthIncome)}
                            totalExpenses={lastMonthTotalExpenses}
                            totalIncomes={lastMonthTotalIncome}
                            title={isUseLastMonth ? "Last month" : "This month"}
                        />
                        <PieCard
                            monthExpenses={groupByDay(monthExpenses)}
                            monthIncome={groupByDay(monthIncome)}
                            totalExpenses={totalExpenses}
                            totalIncomes={totalIncome}
                        />
                    </SimpleGrid>

                </Box>
            </div>
        </Box>
    );
}
