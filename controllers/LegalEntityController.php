<?php

namespace app\controllers;

use app\models\LegalEntity;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class LegalEntityController extends Controller
{

    /**
     * {@inheritdoc}
     */
    public function actions(): array
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex(): string
    {
        $dataProvider = new ActiveDataProvider(['query' => LegalEntity::find()->with('sites')]);

        return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionView($slug): string
    {
        $model = LegalEntity::findOne(['slug' => $slug]);

        if (!$model) {
            throw new NotFoundHttpException("Entité non existante.");
        }

        return $this->render('view', [
            'model' => $model
        ]);
    }

}
