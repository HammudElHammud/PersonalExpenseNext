import React, { useEffect, useState } from 'react';
// Chakra imports
import {
    Box,
    Button,
    Textarea,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';

// Assets
import { Field, Form, Formik, FieldProps, FieldInputProps, FormikProps } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { IReducer } from "../../../../store/store";
import { IInitialState, retrieveUserInfoCategory } from "../../../../store/reducers/Category";
import { createUserInfoIncome, retrieveUserInfoIncome } from "../../../../store/reducers/Income";

interface IncomeFormValues {
    name: string;
    categoryPercentages: Record<string, string>;
    description: string;
    amount: string;
    date: string;
    totalPercentage?: string;
}

export default function Income() {
    const stateCategories = useSelector((state: IReducer) => state.Category as IInitialState);
    const [alertMessage, setAlertMessage] = useState("");

    const categories = Object.values(stateCategories).map((cat) => {
        return cat.label;
    });

    const textColor = useColorModeValue('brands.900', 'white');
    const bgItem = useColorModeValue(
        { bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
        { bg: 'navy.700', boxShadow: 'unset' },
    );

    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(retrieveUserInfoCategory());
        // @ts-ignore
        dispatch(retrieveUserInfoIncome());
    }, [dispatch]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        amount: Yup.number()
            .min(0, "Amount must be at least 0")
            .required("Amount is required"),
        date: Yup.date().required("Date is required"),
    });

    const validatePercentages = (values: IncomeFormValues) => {
        let errors: any = {};

        const totalPercentage = Object.values(values.categoryPercentages).reduce<number>((acc, value) => {
            const parsedValue = parseFloat(value) || 0;
            return acc + parsedValue;
        }, 0);

        if (totalPercentage > 100) {
            errors.totalPercentage = "Total percentage cannot exceed 100%";
        }

        return errors;
    };

    const updateIncomeData = (newIncomeData: any) => {
        // @ts-ignore
        dispatch(createUserInfoIncome(newIncomeData));
        setAlertMessage(`Successfully Processed`);
        setTimeout(() => {
            setAlertMessage("");
        }, 2000);
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            {alertMessage && (
                <Alert status="error" borderRadius="8px" mt={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Alert</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
            )}

            <Formik<IncomeFormValues>
                initialValues={{
                    name: "",
                    categoryPercentages: categories.reduce((acc, category) => {
                        acc[category] = "0";
                        return acc;
                    }, {} as Record<string, string>),
                    description: "",
                    amount: "",
                    date: "",
                    totalPercentage: "",
                }}
                validationSchema={validationSchema}
                validate={validatePercentages}
                onSubmit={(values, actions) => {
                    const amount = parseFloat(values.amount);
                    const categoryAmounts: Record<string, string> = {};

                    Object.keys(values.categoryPercentages).forEach((category) => {
                        const percentage = parseFloat(values.categoryPercentages[category]) / 100;
                        categoryAmounts[category] = (amount * percentage).toFixed(2);
                    });

                    const updatedValues = {
                        ...values,
                        categoryAmounts,
                    };

                    updateIncomeData(updatedValues);
                    setTimeout(() => {
                        actions.resetForm();
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props: FormikProps<IncomeFormValues>) => (
                    <Form>
                        <Field name="name">
                            {({ field, form }: FieldProps<string>) => (
                                <FormControl isInvalid={Boolean(form.errors.name) && Boolean(form.touched.name)}>
                                    <FormLabel htmlFor="name">First name</FormLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        placeholder="name"
                                        borderRadius="16px"
                                        color={textColor}
                                    />
                                    <FormErrorMessage>
                                        {typeof form.errors.name === 'string' && form.errors.name}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        {categories.map((category) => (
                            <Field name={`categoryPercentages.${category}`} key={category}>
                                {({ field, form }: { field: FieldInputProps<any>; form: FormikProps<IncomeFormValues> }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.categoryPercentages &&
                                            form.touched.categoryPercentages &&
                                            Boolean(form.errors.categoryPercentages[category]) &&
                                            Boolean(form.touched.categoryPercentages[category])
                                        }
                                        mt={4}
                                    >
                                        <FormLabel htmlFor={`categoryPercentages.${category}`}>
                                            {category} Percentage
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id={`categoryPercentages.${category}`}
                                            placeholder={`${category} percentage`}
                                            type="number"
                                            color={textColor}
                                            min="0"
                                            max="100"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const newPercentages = {
                                                    ...props.values.categoryPercentages,
                                                    [category]: value,
                                                };
                                                props.setFieldValue("categoryPercentages", newPercentages);
                                                props.validateForm();
                                            }}
                                            borderRadius="16px"
                                        />
                                        <FormErrorMessage>
                                            {form?.errors?.categoryPercentages &&
                                                form?.errors?.categoryPercentages[category]}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        ))}
                        {props?.errors?.totalPercentage && (
                            <Box color="red.500" mt={4}>
                                {props?.errors?.totalPercentage}
                            </Box>
                        )}
                        <Field name="description">
                            {({ field, form }: FieldProps<string>) => (
                                <FormControl
                                    isInvalid={Boolean(form?.errors?.description) && Boolean(form?.touched?.description)}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <Textarea
                                        {...field}
                                        color={textColor}
                                        id="description"
                                        placeholder="description"
                                        borderRadius="16px"
                                    />
                                    <FormErrorMessage>{ form?.errors?.description}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="amount">
                            {({ field, form }: FieldProps<string>) => (
                                <FormControl
                                    isInvalid={Boolean(form.errors.amount) && Boolean(form.touched.amount)}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="amount">Amount</FormLabel>
                                    <Input
                                        {...field}
                                        id="amount"
                                        color={textColor}
                                        placeholder="amount"
                                        type="number"
                                        borderRadius="16px"
                                    />
                                    <FormErrorMessage>{form?.errors?.amount}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="date">
                            {({ field, form }: FieldProps<string>) => (
                                <FormControl
                                    isInvalid={Boolean(form.errors.date) && Boolean(form.touched.date)}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="date">Date</FormLabel>
                                    <Input
                                        {...field}
                                        id="date"
                                        color={textColor}
                                        placeholder="date"
                                        type="date"
                                        borderRadius="16px"
                                    />
                                    <FormErrorMessage>{form?.errors?.date}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="brand"
                            isLoading={props.isSubmitting}
                            type="submit"
                            color={"white"}
                            isDisabled={Boolean(props?.errors?.totalPercentage)}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
