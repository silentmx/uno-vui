import type { ComputedRef, Ref } from 'vue';

type borderInfo = {
  hasBorder?: boolean;
  hasColor?: boolean;
  hasRadius?: boolean;
  size?: string;
  direction?: string[];
}

export type Condition = ComputedRef<boolean | string | undefined | null> |
  Ref<boolean | string | undefined | null> |
  boolean | string | undefined | null;

type BgInfo = {
  hasColor?: boolean,
  color?: string,
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