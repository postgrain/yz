import { ActionCreator, createReducer, on } from '@ngrx/store';
import { App } from './app';

/**
 * Problema:
 * - O ngrx não permite mais de um reducer para a mesma action
 * por isso não será possível adicionar mais de um listener para uma action.
 */

/**
 * [v2] - Definir metadata no construtor da classe
 * Para cada `SubscribeV2` nós incrementamos a metadata ACTIONS_TO_LISTEN da classe,
 * então, quando a classe é instanciada nós criamos os reducers com base nessa metadata.
 *
 * # Possíveis problemas:
 * - Memory leak pois o reducer não é removido automaticamente quando o objeto é destruído.
 */

interface ActionConfig<T = ActionCreator> {
  propertyKey: string;
  action: T;
}

export const ACTIONS_TO_LISTEN: unique symbol = Symbol('__actionsToListen');
export function HandlesActions(storeKey: string) {
  return function <T extends { new (...args: any[]): {} }>(c: T) {
    return class extends c {
      constructor(...args: any[]) {
        super(...args);
        const actionsConfigs: ActionConfig[] = Reflect.getOwnMetadata(
          ACTIONS_TO_LISTEN,
          c
        );

        const ons = actionsConfigs.map((v: any) =>
          on(
            v.action,
            (...args) => (this as any)[v.propertyKey]?.(...args) || args[0]
          )
        );
        const reducer = createReducer({}, ...ons);
        const interval = setInterval(() => {
          try {
            // CHECK IF STORE IS ALREADY ON THE INJECTOR
            if (App.store) {
              App.store.addReducer(storeKey, reducer);

              clearInterval(interval);
              return;
            }
          } catch (e) {}
        }, 1);
      }
    };
  };
}

export function Subscribe<T extends ActionCreator>(action: T) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const existingMetadata: ActionConfig[] =
      Reflect.getOwnMetadata(ACTIONS_TO_LISTEN, target.constructor) || [];

    const actionConfig: ActionConfig = {
      propertyKey,
      action,
    };

    existingMetadata.push(actionConfig);

    Reflect.defineMetadata(
      ACTIONS_TO_LISTEN,
      existingMetadata,
      target.constructor
    );
    return descriptor;
  };
}
