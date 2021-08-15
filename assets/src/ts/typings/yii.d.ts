/// <reference types="jquery"/>

declare interface Yii {
  getCsrfToken(): string;
  getCsrfParam(): string;
  /**
   * Displays a confirmation dialog.
   * The default implementation simply displays a js confirmation dialog.
   * You may override this by setting `yii.confirm`.
   * @param message the confirmation message.
   * @param ok a callback to be called when the user confirms the message
   * @param cancel a callback to be called when the user cancels the confirmation
   */
  confirm: (message: string, ok: any, cancel: any) => void;
}
