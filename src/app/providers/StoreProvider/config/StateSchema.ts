import { AnyAction, CombinedState, EnhancedStore, ReducersMapObject, Reducer, Dispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
    // counter: CounterSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // // Асинхронные редюсеры
    // loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    dispatch?: Dispatch;
    state: StateSchema;
}
