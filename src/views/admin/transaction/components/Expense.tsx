import React, {useEffect, useState} from 'react';
import {
    Button,
    useColorModeValue, FormControl, FormLabel, Input, FormErrorMessage, Select,
} from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react"

import {calculateRemainingAmounts} from "../../../../utils/incomeAndExpenseHelper"

import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {IReducer} from "../../../../store/store";
import {retrieveUserInfoCategory} from "../../../../store/reducers/Category";
import {retrieveUserInfoIncome} from "../../../../store/reducers/Income";
import {createUserInfoExpense, retrieveUserInfoExpense} from "../../../../store/reducers/Expense";

export default function Expense(props) {
    const Category = useSelector((state: IReducer) => state.Category);
    const stateIncome = useSelector((state: IReducer) => state.Income);
    const stateExpense = useSelector((state: IReducer) => state.Expense);
    const [alertMessage, setAlertMessage] = useState("");


    const {...rest} = props;
    const textColor = useColorModeValue('brands.900', 'white');


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveUserInfoCategory())
        dispatch(retrieveUserInfoExpense())
        dispatch(retrieveUserInfoIncome())
    }, [dispatch]);


    const remainingAmounts = calculateRemainingAmounts(stateIncome, stateExpense);

    const canAllowExpense = (newExpense) => {
        const remaining = remainingAmounts[newExpense.category];
        return remaining >= newExpense.amount;
    };


    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required'),
        category: Yup.string()
            .required('Category is required'),
        description: Yup.string()
            .required('Description is required'),
        amount: Yup.number()
            .required('Amount is required')
            .positive('Amount must be positive'),
        date: Yup.date()
            .required('Date is required')
            .max(new Date(), 'Date cannot be in the future'),
    });


    return (
        <>
            {alertMessage && (
                <Alert status="error" borderRadius="8px" mt={4}>
                    <AlertIcon/>
                    <AlertTitle mr={2}>Alert</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
            )}

            <Formik
                initialValues={{
                    name: "",
                    category: "",
                    description: "",
                    amount: "",
                    date: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    const amount = parseFloat(values.amount);
                    const category = values.category;
                    const updatedData = {
                        ...values,
                        categoryAmounts: {
                            [category]: amount.toFixed(2),
                        },
                    };
                    if (canAllowExpense(updatedData)) {
                        console.log("Expense allowed");
                        setTimeout(() => {
                            dispatch(createUserInfoExpense(updatedData))
                            setAlertMessage(`Successfully Processed`);
                            setTimeout(() => {
                                setAlertMessage("")
                            }, 2000)
                            actions.resetForm();
                            actions.setSubmitting(false);
                        }, 1000);
                    } else {
                        setAlertMessage(`Amount exceeds the remaining allowance for ${category}`);
                        actions.setSubmitting(false);
                        setTimeout(() => {
                            setAlertMessage("")
                        }, 2000)
                        return;
                        console.log("Expense exceeds the remaining amount in the category");
                    }

                }}
            >
                {(props) => (
                    <Form>
                        <Field name="name">
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel htmlFor="name">First name</FormLabel>
                                    <Input
                                        {...field}
                                        color={textColor}
                                        id="name" placeholder="name" borderRadius="16px"/>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="category">
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.category && form.touched.category} mt={4}>
                                    <FormLabel htmlFor="category">Category</FormLabel>
                                    <Select {...field} id="category" color={textColor} placeholder="Select category"
                                            borderRadius="16px">
                                        {
                                            Object.values(Category).map((cat, indes) => {
                                                return <option key={cat?.label} value={cat?.label}>{cat?.label}</option>
                                            })
                                        }
                                    </Select>
                                    <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="description">
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.description && form.touched.description} mt={4}>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <Input color={textColor} {...field} id="description" placeholder="description"
                                           borderRadius="16px"/>
                                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="amount">
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.amount && form.touched.amount} mt={4}>
                                    <FormLabel htmlFor="amount">Amount</FormLabel>
                                    <Input color={textColor} {...field} id="amount" placeholder="amount" type="number"
                                           borderRadius="16px"/>
                                    <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="date">
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.date && form.touched.date} mt={4}>
                                    <FormLabel htmlFor="date">Date</FormLabel>
                                    <Input color={textColor} {...field} id="date" placeholder="date" type="date"
                                           borderRadius="16px"/>
                                    <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="brand"
                            isLoading={props.isSubmitting}
                            type="submit"
                            color={'white'}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
