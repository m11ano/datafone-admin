import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    // oginForm: loginReducer,
    // profile: profileReducer,
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers: ReducersList = {}) =>
    (StoryComponent: StoryFn) => (
        <StoreProvider
            initialState={state}
            asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
            <StoryComponent />
        </StoreProvider>
    );
