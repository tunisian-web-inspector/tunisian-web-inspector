<?php

namespace app\assets;

use yii\web\AssetBundle;

abstract class EnvironmentAwareAssetBundle extends AssetBundle
{
    public $basePath = '@web/prod';
    public $baseUrl = '@web/prod';

    public function init()
    {
        if (YII_DEBUG) {
            $this->basePath = '@web/dev';
            $this->baseUrl = '@web/dev';
        }
        parent::init();
    }
}