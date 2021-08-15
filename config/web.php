<?php

$params = array_merge(
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php',
);

$config = [
    'id' => 'tn-web-inspector',
    'name' => 'TN Web Inspector',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'defaultRoute' => 'default',
    'language' => 'fr',
    'homeUrl' => ['default/index'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
        '@web'   => '@app/web',
    ],
    'container' => [
        'definitions' => [
            \yii\widgets\LinkPager::class => \yii\bootstrap5\LinkPager::class,
            \yii\data\Pagination::class => [
                'defaultPageSize' => 50,
            ],
        ],
    ],
    'components' => [
        'assetManager' => [
            'bundles' => [
                \yii\web\JqueryAsset::class => false,
                \yii\web\YiiAsset::class => false,
                \yii\bootstrap5\BootstrapAsset::class => false,
                \yii\bootstrap5\BootstrapPluginAsset::class => false,
                \yii\grid\GridViewAsset::class => false,
                \yii\widgets\PjaxAsset::class => false,
                \yii\validators\ValidationAsset::class => false,
                \yii\widgets\ActiveFormAsset::class => false,
                \yii\widgets\MaskedInputAsset::class => false,
            ],
        ],
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'yhHIxC8wBku2KRsFiTJWMkyz9DCMjr3d',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'default/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => false,
            'transport' => [
                'class' => Swift_SmtpTransport::class,
                'host' => $params['smtp.host'],
                'username' => $params['smtp.user'],
                'password' => $params['smtp.password'],
                'port' => $params['smtp.port'],
                'encryption' => 'ssl', // It is often used, check your provider or mail server specs
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => $params['db.dsn'],
            'username' => $params['db.username'],
            'password' => $params['db.password'],
            'charset' => 'utf8',

            // Schema cache options (for production environment)
            //'enableSchemaCache' => true,
            //'schemaCacheDuration' => 60,
            //'schemaCache' => 'cache',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                '' => 'default/index',
                'contact' => 'default/contact',
                'a-propos' => 'default/about',
                'entite/<slug>' => 'legal-entity/view',
                'entite' => 'legal-entity/index',
                'site/<domain>' => 'site/view',
                'site' => 'site/index',
            ],
        ],
    ],
    'params' => $params,
];

/*
if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}*/

return $config;
