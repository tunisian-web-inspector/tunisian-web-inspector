<?php

namespace app\assets;

use yii\bootstrap5\BootstrapAsset;
use yii\bootstrap5\BootstrapPluginAsset;
use yii\web\YiiAsset;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends EnvironmentAwareAssetBundle
{
    public $css = [
        'css/vendor.css',
        'css/theme.tww.css',
    ];
    public $js = [
        'js/manifest.js',
        'js/vendor.js',
        'js/frontend.js',
    ];
    public $depends = [
        YiiAsset::class,
        BootstrapAsset::class,
        BootstrapPluginAsset::class,
    ];
}
