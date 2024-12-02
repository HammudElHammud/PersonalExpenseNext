import React from 'react';
import {
    Box,
    Flex,
    Icon,
    Text,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
// Assets
import {FaDollarSign} from 'react-icons/fa';

export default function BudgetItem(props: any) {
    const {image, name, description, totalExpense, remainingAmount, isAdd, percentageSpent} = props;
    const textColor = useColorModeValue('brands.900', 'white');
    const bgItem = useColorModeValue(
        {bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)'},
        {bg: 'navy.700', boxShadow: 'unset'},
    );
    const textColorDate = useColorModeValue('secondaryGray.600', 'white');
    const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
    const bgHover = useColorModeValue(
        {bg: 'secondaryGray.400'},
        {bg: 'whiteAlpha.50'}
    )
    const bgFocus = useColorModeValue(
        {bg: 'secondaryGray.300'},
        {bg: 'whiteAlpha.100'}
    )
    return (
        <Card
            _hover={!isAdd ? bgItem : null}
            bg="transparent"
            boxShadow="unset"
            px="24px"
            py="21px"
            transition="0.2s linear"
        >
            <Flex direction={{base: 'column'}} justify="center">
                <Flex position="relative" align="center">
                    <Box>
                        <Button
                            alignItems='center'
                            justifyContent='center'
                            bg={bgButton}
                            _hover={bgHover}
                            _focus={bgFocus}
                            _active={bgFocus}
                            w='37px'
                            h='37px'
                            lineHeight='100%'
                            borderRadius='10px'
                            mx={2}
                        >
                            <Icon as={image} color={textColorDate} w='24px' h='24px'/>
                        </Button>
                    </Box>
                    <Flex
                        direction="column"
                        w={{base: '80%', md: '75%'}}
                        me={{base: '4px', md: '32px', xl: '10px', '3xl': '32px'}}
                    >
                        <Text
                            color={textColor}
                            fontSize={{
                                base: 'md',
                            }}
                            mb="5px"
                            fontWeight="bold"
                            me="14px"
                        >
                            {name}
                        </Text>
                        <Text
                            color="secondaryGray.600"
                            fontSize={{
                                base: 'sm',
                            }}
                            fontWeight="400"
                            me="14px"
                        >
                            {description}
                        </Text>
                    </Flex>


                    {!isAdd && (
                        <>
                            <Flex
                                w="max-content"
                                me={{base: '4px', md: '32px', xl: '10px', '3xl': '32px'}}
                                align="center"
                            >
                                <Icon as={FaDollarSign} color={textColor} width="9px" me="7px"/>
                                <Text
                                    w="max-content"
                                    fontWeight="700"
                                    fontSize="md"
                                    color={textColor}
                                >
                                    S: {totalExpense}
                                </Text>
                                <Icon as={FaDollarSign} color={textColor} width="9px" me="7px" mx={1}/>
                                <Text ms="auto" mx={0} fontWeight="700" fontSize="sm"
                                      title={'if its red its use more 80%'}
                                      color={percentageSpent >= 80 ? 'red.500' : textColorDate}
                                >
                                    R: {parseFloat(remainingAmount).toFixed(1)}
                                </Text>
                            </Flex>
                        </>
                    )}
                </Flex>
            </Flex>
        </Card>
    );
}
