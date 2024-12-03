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

import {Field, FieldProps, Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {IReducer} from "../../../../store/store";
import {IInitialState, retrieveUserInfoCategory} from "../../../../store/reducers/Category";
import {retrieveUserInfoIncome} from "../../../../store/reducers/Income";
import {createUserInfoExpense, retrieveUserInfoExpense} from "../../../../store/reducers/Expense";

export default function Expense() {
    const Category = useSelector((state: IReducer) => state.Category as IInitialState);
    const stateIncome = useSelector((state: IReducer) => state.Income);
    const stateExpense = useSelector((state: IReducer) => state.Expense);
    const [alertMessage, setAlertMessage] = useState("");


    const textColor = useColorModeValue('brands.900', 'white');


    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(retrieveUserInfoCategory())
        // @ts-ignore
        dispatch(retrieveUserInfoExpense())
        // @ts-ignore
        dispatch(retrieveUserInfoIncome())
    }, [dispatch]);


    const remainingAmounts = calculateRemainingAmounts(stateIncome, stateExpense);
    // @ts-ignore
    const canAllowExpense = (newExpense: any) => {
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
                            // @ts-ignore
                            dispatch(createUserInfoExpense(updatedData));
                            setAlertMessage(`Successfully Processed`);
                            setTimeout(() => {
                                setAlertMessage("");
                            }, 2000);
                            actions.resetForm();
                            actions.setSubmitting(false);
                        }, 1000);
                    } else {
                        setAlertMessage(`Amount exceeds the remaining allowance for ${category}`);
                        actions.setSubmitting(false);
                        setTimeout(() => {
                            setAlertMessage("");
                        }, 2000);
                        console.log("Expense exceeds the remaining amount in the category");
                    }
                }}
            >
                {(props) => (
                    <Form>
                        <Field name="name">
                            {({ field, form }: FieldProps) => (
                                <FormControl isInvalid={Boolean(form.errors.name) && Boolean(form.touched.name)}>
                                    <FormLabel htmlFor="name">First name</FormLabel>
                                    <Input
                                        {...field}
                                        color={textColor}
                                        id="name"
                                        placeholder="name"
                                        borderRadius="16px"
                                    />
                                    <FormErrorMessage>
                                        {typeof form.errors.name === 'string' ? form.errors.name : null}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="category">
                            {({ field, form }: FieldProps) => (
                                <FormControl
                                    isInvalid={Boolean(form.errors.category) && Boolean(form.touched.category)}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="category">Category</FormLabel>
                                    <Select
                                        {...field}
                                        id="category"
                                        color={textColor}
                                        placeholder="Select category"
                                        borderRadius="16px"
                                    >
                                        {Object.values(Category).map((cat, index) => (
                                            <option key={cat?.label} value={cat?.label}>
                                                {cat?.label}
                                            </option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>
                                        {typeof form.errors.category === 'string' ? form.errors.category : null}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="description">
                            {({ field, form }: FieldProps) => (
                                <FormControl
                                    isInvalid={Boolean(form.errors.description) && Boolean(form.touched.description)}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <Input
                                        color={textColor}
                                        {...field}
                                        id="description"
                                        placeholder="description"
                                        borderRadius="16px"
                                    />
                                    <FormErrorMessage>
                                        {typeof form.errors.description === 'string' ? form.errors.description : null}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="amount">
                            {({ field, form }: FieldProps) => (
                                <FormControl
                                    isInvalid={Boolean(form.errors.amount) && Boolean(form.touched.amount)}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="amount">Amount</FormLabel>
                                    <Input
                                        color={textColor}
                                        {...field}
                                        id="amount"
                                        placeholder="amount"
                                        type="number"
                                        borderRadius="16px"
                                    />
                                    <FormErrorMessage>
                                        {typeof form.errors.amount === 'string' ? form.errors.amount : null}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="date">
                            {({ field, form }: FieldProps) => (
                                <FormControl
                                    isInvalid={Boolean(form.errors.date) && Boolean(form.touched.date)}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="date">Date</FormLabel>
                                    <Input
                                        color={textColor}
                                        {...field}
                                        id="date"
                                        placeholder="date"
                                        type="date"
                                        borderRadius="16px"
                                    />
                                    <FormErrorMessage>
                                        {typeof form.errors.date === 'string' ? form.errors.date : null}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="brand"
                            isLoading={props.isSubmitting}
                            type="submit"
                            color={"white"}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>

        </>
    );
}
