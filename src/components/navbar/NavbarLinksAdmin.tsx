'use client';
// Chakra Imports
import {
    Box,
    Button,
    Center,
    Flex,
    Icon,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
// Custom Components
import {ItemContent} from 'components/menu/ItemContent';
import {SearchBar} from 'components/navbar/searchBar/SearchBar';
import {SidebarResponsive} from 'components/sidebar/Sidebar';
// Assets
import {IoMdMoon, IoMdSunny} from 'react-icons/io';
import { MdNotificationAdd, MdNotificationsNone} from 'react-icons/md';
import routes from 'routes';
import {useDispatch, useSelector} from "react-redux";
import {IReducer} from "../../store/store";
import {useEffect, useState} from "react";
import {retrieveUserInfoExpense} from "../../store/reducers/Expense";
import {retrieveUserInfoIncome} from "../../store/reducers/Income";
import {calculateRemainingInfoAmounts, calculateTotalExpenses} from "../../utils/incomeAndExpenseHelper";

export default function HeaderLinks(props: {
    secondary: boolean;
    onOpen: boolean | any;
    fixed: boolean | any;
}) {
    const {secondary} = props;
    const {colorMode, toggleColorMode} = useColorMode();
    const stateIncome = useSelector((state: IReducer) => state.Income);
    const stateExpense = useSelector((state: IReducer) => state.Expense);

    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(retrieveUserInfoExpense())
        // @ts-ignore
        dispatch(retrieveUserInfoIncome())

    }, [dispatch]);

    const [totalExpenses, setTotalExpenses] = useState(calculateTotalExpenses(stateExpense));
    const [remainingAmounts, setRemainingAmounts] = useState({});
    const [percentageSpent, setPercentageSpent] = useState({});
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {

        const calculateAmounts = () => {
            const totalExpenses = calculateTotalExpenses(stateExpense);
            const { remainingAmounts, percentageSpent } = calculateRemainingInfoAmounts(stateIncome, totalExpenses);

            setTotalExpenses(totalExpenses);
            setRemainingAmounts(remainingAmounts);
            setPercentageSpent(percentageSpent);

            // Check for percentages greater than 80% and update notifications
            const newNotifications = Object.keys(percentageSpent).reduce((acc, category) => {
                const percentage = parseFloat(percentageSpent[category]); // Convert to number
                if (percentage > 80) {
                    acc.push(`${category} has reached ${percentage}% of its limit.`);
                }
                return acc;
            }, []);

            setNotifications(newNotifications);
        };


        calculateAmounts();

        const intervalId = setInterval(calculateAmounts, 120000);


        return () => clearInterval(intervalId);
    }, [stateExpense, stateIncome]);



    // Chakra Color Mode
    const navbarIcon = useColorModeValue('gray.400', 'white');
    let menuBg = useColorModeValue('white', 'navy.800');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorBrand = useColorModeValue('brand.700', 'brand.400');
    const ethColor = useColorModeValue('gray.700', 'white');
    const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
    const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
    const ethBox = useColorModeValue('white', 'navy.800');
    const shadow = useColorModeValue(
        '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
        '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
    );
    const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');

    return (
        <Flex
            w={{sm: '100%', md: 'auto'}}
            alignItems="center"
            flexDirection="row"
            bg={menuBg}
            flexWrap={secondary ? {base: 'wrap', md: 'nowrap'} : 'unset'}
            p="10px"
            borderRadius="30px"
            boxShadow={shadow}
        >
            <SearchBar
                mb={() => {
                    if (secondary) {
                        return {base: '10px', md: 'unset'};
                    }
                    return 'unset';
                }}
                me="10px"
                borderRadius="30px"
            />

            <SidebarResponsive routes={routes}/>
            <Menu>
                <MenuButton p="0px">
                    <Icon
                        mt="6px"
                        as={notifications?.length > 0 ? MdNotificationAdd : MdNotificationsNone}
                        color={navbarIcon}
                        w="18px"
                        h="18px"
                        me="10px"
                    />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p="20px"
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                    mt="22px"
                    me={{ base: '30px', md: 'unset' }}
                    minW={{ base: 'unset', md: '400px', xl: '450px' }}
                    maxW={{ base: '360px', md: 'unset' }}
                >
                    <Flex w="100%" mb="20px">
                        <Text fontSize="md" fontWeight="600" color={textColor}>
                            Notifications
                        </Text>
                        <Text
                            fontSize="sm"
                            fontWeight="500"
                            color={textColorBrand}
                            ms="auto"
                            cursor="pointer"
                            onClick={() => setNotifications([])} // Clear notifications on click
                        >
                            Mark all read
                        </Text>
                    </Flex>
                    <Flex flexDirection="column">
                        {notifications.map((notification, index) => (
                            <MenuItem
                                key={index}
                                _hover={{ bg: 'none' }}
                                _focus={{ bg: 'none' }}
                                px="0"
                                borderRadius="8px"
                                mb="10px"
                            >
                                <ItemContent info={notification} description={''} />
                            </MenuItem>
                        ))}
                    </Flex>
                </MenuList>
            </Menu>


            <Button
                variant="no-hover"
                bg="transparent"
                p="0px"
                minW="unset"
                minH="unset"
                h="18px"
                w="max-content"
                onClick={toggleColorMode}
            >
                <Icon
                    me="10px"
                    h="18px"
                    w="18px"
                    color={navbarIcon}
                    as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
                />
            </Button>
            <Menu>
                <MenuButton p="0px" style={{position: 'relative'}}>
                    <Box
                        _hover={{cursor: 'pointer'}}
                        color="white"
                        bg="#11047A"
                        w="40px"
                        h="40px"
                        borderRadius={'50%'}
                    />
                    <Center top={0} left={0} position={'absolute'} w={'100%'} h={'100%'}>
                        <Text fontSize={'xs'} fontWeight="bold" color={'white'}>
                            AP
                        </Text>
                    </Center>
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p="0px"
                    mt="10px"
                    borderRadius="20px"
                    bg={menuBg}
                    border="none"
                >
                    <Flex w="100%" mb="0px">
                        <Text
                            ps="20px"
                            pt="16px"
                            pb="10px"
                            w="100%"
                            borderBottom="1px solid"
                            borderColor={borderColor}
                            fontSize="sm"
                            fontWeight="700"
                            color={textColor}
                        >
                            👋&nbsp; Hey, Adela
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" p="10px">
                        <MenuItem
                            _hover={{bg: 'none'}}
                            _focus={{bg: 'none'}}
                            borderRadius="8px"
                            px="14px"
                        >
                            <Text fontSize="sm">Profile Settings</Text>
                        </MenuItem>
                        <MenuItem
                            _hover={{bg: 'none'}}
                            _focus={{bg: 'none'}}
                            borderRadius="8px"
                            px="14px"
                        >
                            <Text fontSize="sm">Newsletter Settings</Text>
                        </MenuItem>
                        <MenuItem
                            _hover={{bg: 'none'}}
                            _focus={{bg: 'none'}}
                            color="red.400"
                            borderRadius="8px"
                            px="14px"
                        >
                            <Text fontSize="sm">Log out</Text>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}
