declare module 'AppTypes' {
  import { ActionType } from 'typesafe-actions'
  export type RootAction = ActionType<typeof import('./actions/rootAction').default>
}
