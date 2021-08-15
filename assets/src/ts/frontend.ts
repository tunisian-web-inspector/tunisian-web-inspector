import $ from "jquery";
window.$ = window.jQuery = $;

import "bootstrap/dist/js/bootstrap";
import "yii2-pjax";
import "../../../vendor/yiisoft/yii2/assets/yii";
import "../../../vendor/yiisoft/yii2/assets/yii.gridView";
import "../../../vendor/yiisoft/yii2/assets/yii.validation";
import "../../../vendor/yiisoft/yii2/assets/yii.activeForm";


$(() => {

});

declare global {
  interface Window {
    jQuery: JQueryStatic;
    $: JQueryStatic;
    yii: Yii;
  }
}
