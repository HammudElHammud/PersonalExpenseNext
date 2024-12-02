'use client';
import {
    Box,
    Text,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/react";
import React, {useEffect, useState} from 'react';


// Assets
import Card from "../../../components/card/Card";

import Expense from "../../../views/admin/transaction/components/Expense";
import Income from "../../../views/admin/transaction/components/Income";


export default function Default() {
    const [index, setIndex] = useState(0);

    const handleTabsChange = (index: number) => {
        setIndex(index);
    };

    return (
        <Box pt={{base: '130px', md: '80px', xl: '80px'}}
             gap="20px"
             mb="20px"
             mt={5}>
            <Card p={5}>
                <Tabs index={index} onChange={handleTabsChange}>
                    <TabList display="flex" width="100%">
                        <Tab flex="1" textAlign="center"><Text fontWeight='bold' fontSize='25px'>Expense</Text> </Tab>
                        <Tab flex="1" textAlign="center"> <Text fontWeight='bold' fontSize='25px'>Income</Text></Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Expense/>
                        </TabPanel>
                        <TabPanel>
                            <Income/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Card>
        </Box>
    );
}
