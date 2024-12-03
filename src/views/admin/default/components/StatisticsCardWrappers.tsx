import {SimpleGrid, useColorModeValue} from '@chakra-ui/react';

import React, {useEffect} from "react";
import StatisticsCard from "./StatisticsCard";
import {MdAddTask, MdAttachMoney, MdBarChart} from "react-icons/md";

export default function StatisticsCardWrappers(props: {
    isUseLastMonth: boolean
    totalIncome: any
    totalExpenses: any
}) {
    const {...rest} = props;
    const brandColor = useColorModeValue('brand.500', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');



    return (
        <SimpleGrid
            columns={{base: 1, md: 2, lg: 3, '2xl': 4}}
            gap="20px"
            mb="20px"
            mt={5}
        >

            <StatisticsCard
                boxBg={boxBg}
                brandColor={brandColor}
                cardIcon={MdBarChart}
                total={props.totalIncome}
                title={"Incomes"}
            />
            <StatisticsCard
                boxBg={boxBg}
                brandColor={brandColor}
                cardIcon={MdAttachMoney}
                total={props.totalExpenses}
                title={"Spend this month"}
            />
            <StatisticsCard
                boxBg={boxBg}
                brandColor={brandColor}
                cardIcon={MdAttachMoney}
                total={props.totalIncome - props.totalExpenses}
                title={"Your balance"}
            />
            <StatisticsCard
                boxBg={boxBg}
                brandColor={brandColor}
                cardIcon={MdAddTask}
                total={props.totalIncome - props.totalExpenses}
                title={"Savings"}
            />

        </SimpleGrid>
    );
}
