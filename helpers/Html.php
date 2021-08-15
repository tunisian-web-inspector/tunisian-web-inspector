<?php

namespace app\helpers;

use app\models\Site;
use yii\helpers\ArrayHelper;

class Html extends \yii\bootstrap5\Html
{
    public static function fa($icon, $options = []): string
    {
        $class = ArrayHelper::remove($options, 'class', '');
        $class .= ' fa fa-' . $icon;

        $options['class'] = $class;

        return self::tag('i', null, $options);
    }

    public static function logo($options): string
    {
        if (!isset($options['width'])) {
            $options['width'] = $options['height'] = 128;
        }

        $options['viewBox'] = '0 0 128 128';
        return self::tag('svg', self::tag('use', null, ['href' => '#svgLogo']), $options);
    }

    public static function siteLink(Site $site)
    {
        return self::a($site, $site->mainUrl, ['rel' => 'nofollow', 'target' => '_blank']);
    }
}