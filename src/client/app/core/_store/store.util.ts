import { Action } from '@ngrx/store';

/* Action Creator Factory
 * ======================
 * Creates typed action creators functions
 *
 * const addTodo = ActionCreatorFactory.create<string>('ADD_TODO')
 *
 **/
export class ActionPayload<T> implements Action {
  constructor(
    public type: string,
    public payload: T
  ) { }
}

export class ActionCreatorFactory {
  static CreateActionPayload<T>(type: string, defaultPayloadValue?: any) {
    return (payload: T) => new ActionPayload<T>(type, payload || defaultPayloadValue);
  }
  static CreateAction(type: string, defaultPayloadValue?: any) {
    return () => <Action>{ type: type };
  }
}


/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
const typeCache: { [label: string]: boolean } = {};
export function actionType<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}
