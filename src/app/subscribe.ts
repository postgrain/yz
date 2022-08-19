import { Actions, ofType } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { App } from './app';

/**
 * [v2] - Definir metadata no construtor da classe
 * Para cada `SubscribeV2` nós incrementamos a metadata ACTIONS_TO_LISTEN da classe,
 * então, quando a classe é instanciada nós criamos os reducers com base nessa metadata.
 *
 * # Possíveis problemas:
 * - Memory leak pois o a inscrição do observable não é removida automaticamente quando o objeto é destruído.
 */

interface ActionConfig<T = ActionCreator> {
  propertyKey: string;
  action: T;
}
type ClassConstructor = new (...args: any[]) => {}

export const ACTIONS_TO_LISTEN: unique symbol = Symbol('__actionsToListen');
//TODO: implementar onDestroy
export function HandleActions() {
  return function <T extends ClassConstructor>(klass: T) {
    return class extends klass {
      constructor(...args: any[]) {
        super(...args);
        const handler = new ActionHandler(this, klass)
        handler.listenTo()
      }
    };
  };
}

class ActionHandler{
  constructor(private target: any, private klass: any){}

  get actionsConfigs(){
    const actionsConfigs: ActionConfig[] = Reflect.getOwnMetadata(
      ACTIONS_TO_LISTEN,
      this.klass
    );
    return actionsConfigs
  }

  listenTo(){
    const actions$ = App.injector.get(Actions)
    this.actionsConfigs.forEach((item) => {
      actions$
          .pipe( ofType(item.action))
          .subscribe({
            next: (action) => {
              this.target[item.propertyKey]?.(action);
            },
        });
    });
  }
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
