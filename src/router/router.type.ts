interface Route {
  PATH: string;
  COMPONENT: () => JSX.Element;
}

export type Routes = Record<string, Route>;
