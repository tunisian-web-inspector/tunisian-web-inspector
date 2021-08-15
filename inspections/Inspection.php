<?php

namespace app\inspections;

use app\models\Site;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use yii\base\Component;
use yii\helpers\Inflector;
use yii\helpers\StringHelper;

abstract class Inspection extends Component
{
    /** @var Site */
    public $site;

    /** @var string */
    public $error;

    /** @var HttpClientInterface */
    public $httpClient;

    public function __toString()
    {
        return Inflector::camel2words(StringHelper::basename(static::class), false);
    }

}