interface Route {
  PATH: string;
  isAuth: boolean;
  COMPONENT: () => JSX.Element;
}

export type Routes = Record<string, Route>;
