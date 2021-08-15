<?php

namespace app\helpers;

class Html extends \yii\bootstrap5\Html
{
    public static function fa($icon): string
    {
        return self::tag('i', null, ['class' => 'fa fa-' . $icon]);
    }
}