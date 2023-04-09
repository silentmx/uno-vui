type borderInfo = {
  hasBorder?: boolean;
  hasColor?: boolean;
  hasRadius?: boolean;
  size?: string;
  direction?: string[];
}

type BgInfo = {
  hasColor?: boolean,
  op?: string,
}

type TextInfo = {
  hasColor?: boolean
}

type AfterShadowInfo = {
  hasColor?: boolean
}

export type UnoClassInfo = {
  border: {
    [prefix: string]: borderInfo
  },
  bg: {
    [prefix: string]: BgInfo,
  }
  text: {
    [prefix: string]: TextInfo
  },
  afterShadow: {
    [prefix: string]: AfterShadowInfo,
  }
}