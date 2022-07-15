/**
 * [v1] - Mapear as instâncias das classes pelo nome da classe
 *
 * Problemas:
 * - não funciona com mais de uma instância da mesma classe
 * - não escala bem
 * - não é dinâmico
 */
// const instances = new Map<string, any>();
// export function HandlesActions() {
//   return function <T extends { new (...args: any[]): {} }>(c: T) {
//     return class extends c {
//       constructor(...args: any[]) {
//         super(...args);
//         instances.set(c.name, this);
//       }
//     };
//   };
// }

// export function Subscribe<T extends ActionCreator>(value: T) {
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     const interval = setInterval(() => {
//       try {
//         App.store.addReducer(
//           'yzModel',
//           createReducer(
//             {},
//             on(value, (...args) => {
//               return (
//                 instances
//                   .get(target.constructor.name)
//                   ?.[propertyKey]?.(...args) ?? args[0]
//               );
//             })
//           )
//         );
//         clearInterval(interval);
//       } catch (e) {}
//     }, 1);

//     return descriptor;
//   };
// }

// export function HandlesActionsV3(storeKey: string) {
//   return function <T extends { new (...args: any[]): {} }>(c: T) {
//     return class extends c {
//       constructor(...args: any[]) {
//         super(...args);
//         const actionsConfigs: ActionConfig[] = Reflect.getOwnMetadata(
//           ACTIONS_TO_LISTEN,
//           c
//         );

//         actionsConfigs.forEach(({ action, propertyKey }) => {
//           const currentHandlers: {
//             klass: any;
//             handlerKey: string;
//           }[] = HANDLERS.get(action.type) ?? [];

//           HANDLERS.set(
//             action.type,
//             currentHandlers.concat({
//               klass: new WeakRef(this),
//               handlerKey: propertyKey,
//             })
//           );
//         });
//       }
//     };
//   };
// }

// export function SubscribeV3<T extends ActionCreator>(action: T) {
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     const existingMetadata: ActionConfig[] =
//       Reflect.getOwnMetadata(ACTIONS_TO_LISTEN, target.constructor) || [];

//     const actionConfig: ActionConfig = {
//       propertyKey,
//       action,
//     };

//     existingMetadata.push(actionConfig);

//     Reflect.defineMetadata(
//       ACTIONS_TO_LISTEN,
//       existingMetadata,
//       target.constructor
//     );
//     return descriptor;
//   };
// }

// import { createReducer, on } from '@ngrx/store';
// import { pipChange } from './dice';

// export const HANDLERS = new Map<string, { klass: any; handlerKey: string }[]>();
// export const yzModelReducer = createReducer(
//   {},
//   on(pipChange, (state, payload) => {
//     const handlers = HANDLERS.get(payload.type) ?? [];

//     handlers.forEach((h) => {
//       const instance = h.klass.deref();

//       if (instance) {
//         instance[h.handlerKey]?.(state, payload);
//       }
//     });

//     // console.log(payload, HANDLERS.get(payload.type));
//     return state;
//   })
// );
