import {Dispatch} from 'redux'
import {MdFastfood, MdMovie, MdShoppingCart, MdSpa} from "react-icons/md";

export enum UserActionEnum {
    RETRIEVE_USER_CATEGORY = 'USER/RETRIEVE_USER_CATEGORY',
    UPDATE_USER_CATEGORY = 'USER/UPDATE_USER_CATEGORY',
}


export interface IInitialState {
    BGicon: any
    label: string
    description: string
}

interface IRetrieveUserCategory {
    type: UserActionEnum.RETRIEVE_USER_CATEGORY
    payload: IInitialState[]
}

interface IUpdateUserCategory {
    type: UserActionEnum.UPDATE_USER_CATEGORY
    payload: IInitialState[]
}


type IAction = IRetrieveUserCategory | IUpdateUserCategory

const initialState: {} = [
    {
        BGicon: null,
        label: "",
        description: ""
    },
]

export default function reducer(state = initialState, action: IAction) {
    switch (action.type) {
        case UserActionEnum.RETRIEVE_USER_CATEGORY:
            return {
                ...state,
                ...action.payload,
            }
        case UserActionEnum.UPDATE_USER_CATEGORY:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}


const retrieveUserFromBackend = async () => {
    return [
        {
            BGicon: MdShoppingCart,
            label: "Groceries",
            description: "this is about Groceries"
        },
        {
            BGicon: MdFastfood,
            label: "Dining out",
            description: "this is about Dining out"
        },
        {
            BGicon: MdMovie,
            label: "Entertainment",
            description: "this is about Entertainment"
        },
        {
            BGicon: MdSpa,
            label: "Personal care",
            description: "this is about des Personal care"
        },

    ]
}
export const retrieveUserInfoCategory =
    () => async (dispatch: Dispatch<{ type: string; payload: IAction }>) => {
        try {
            // @ts-ignore
            return dispatch({
                type: UserActionEnum.RETRIEVE_USER_CATEGORY,
                // @ts-ignore
                payload: await retrieveUserFromBackend(),
            })
        } catch (e) {
        }
    }


