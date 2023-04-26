import { PresetConfig } from "./types";

export const prefix = "--unovui";
export const defaultConfig: Required<PresetConfig> = {
  themes: [{
    primary: "blue",
    accent: "purple",
    default: "gray",
    success: "green",
    warn: "yellow",
    error: "red"
  }],
  icons: {
    loading: "i-eos-icons:loading"
  }
}