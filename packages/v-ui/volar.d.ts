/** 
 * Auto genrator
 */
declare module 'vue' {
  export interface GlobalComponents {
    VBtn: typeof import('@silentmx/v-ui')['VBtn']
    VThemePick: typeof import('@silentmx/v-ui')['VThemePick']
  }

  // for vue template auto import
  interface ComponentCustomProperties {
    $VMessage: typeof import('@silentmx/v-ui')['VMessage']
  }
  
}

export { }
