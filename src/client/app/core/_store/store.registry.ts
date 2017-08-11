export interface StoreRegistry {
  reducers: {};
  actions: any[];
}
export interface StoreReducerPackage {
  reducer: {};
  actions: any;
}

export const storeRegistry: StoreRegistry = {
  reducers: {},
  actions: []
};

export function registerReducers(reducersRegisters: StoreReducerPackage[]): StoreRegistry {
  reducersRegisters.forEach(reducerRegistry => registerReducer(reducerRegistry));
  return storeRegistry;
}

export function registerReducer(reducerPackage: StoreReducerPackage) {
  addReducer(reducerPackage.reducer);
  addActions(reducerPackage.actions);
}

export function addReducer(reducer) {
  Object.assign(storeRegistry.reducers, reducer);
  return storeRegistry.reducers;
}

export function addActions(actionsClass) {
  storeRegistry.actions.push(actionsClass);
  return storeRegistry.actions;
}
