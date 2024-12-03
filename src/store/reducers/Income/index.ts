import {Dispatch} from 'redux';

export enum UserActionEnum {
    RETRIEVE_USER_INCOME = 'USER/RETRIEVE_USER_INCOME',
    CREATE_USER_INCOME = 'USER/CREATE_USER_INCOME',
}

interface IInitialState {
}

interface IRetrieveUser {
    type: UserActionEnum.RETRIEVE_USER_INCOME;
    payload: IInitialState[];
}

interface IUpdateUser {
    type: UserActionEnum.CREATE_USER_INCOME;
    payload: IInitialState;
}

type IAction = IRetrieveUser | IUpdateUser;

const initialState: IInitialState[] = [];

export default function reducer(state = initialState, action: IAction) {
    switch (action.type) {
        case UserActionEnum.RETRIEVE_USER_INCOME:
            return [...action.payload];
        case UserActionEnum.CREATE_USER_INCOME:
            return [...state, action.payload];
        default:
            return state;
    }
}

const retrieveUserFromBackendIncome = async () => {
    const storedExpenses = localStorage.getItem('userIncomes');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
};

export const retrieveUserInfoIncome =
    () => async (dispatch: Dispatch<{ type: string; payload: any }>) => {
        try {
            const expenses = await retrieveUserFromBackendIncome();
            dispatch({
                type: UserActionEnum.RETRIEVE_USER_INCOME,
                payload: expenses,
            });
        } catch (e) {
            console.error("Error retrieving user income:", e);
        }
    };

export const createUserInfoIncome =
    (values: IInitialState) => async (dispatch: Dispatch<{ type: string; payload: any }>) => {
        try {
            const existingExpenses = await retrieveUserFromBackendIncome();
            const updatedExpenses = [...existingExpenses, values];
            localStorage.setItem('userIncomes', JSON.stringify(updatedExpenses));
            dispatch({
                type: UserActionEnum.CREATE_USER_INCOME,
                payload: values,
            });
        } catch (e) {
            console.error("Error creating user incomes:", e);
        }
    };
