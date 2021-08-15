<?php

/* @var $this yii\web\View */
/* @var $dataProvider ActiveDataProvider */

use app\helpers\Html;
use app\models\Site;
use yii\data\ActiveDataProvider;
use yii\grid\GridView;
use yii\helpers\Url;
use yii\widgets\Pjax;

$this->title = 'Website Checker';

?>
<div class="site-index">
    <?php Pjax::begin() ?>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'tableOptions' => ['class' => 'table table-striped table-bordered table-sm'],
        'layout' => <<<HTML
<div class="table-responsive" style="background: none;border:none;">
    {items}
</div>
<div class="row">
    <div class="col-md-3">
    {summary}
    </div>
    <div class="col-md-9 d-flex justify-content-end">
    {pager}
    </div>
</div>

HTML,
        'columns' => [
            [
                'format' => 'raw',
                'value' => function (Site $site) {
                    return Html::a(Html::fa('eye'), Url::to(['site/view', 'domain' => $site->domain]), ['data-pjax' => 0]);
                },
            ],
            [
                'format' => 'raw',
                'value' => function (Site $site) {
        if ($site->screenshot) {
            return Html::img($site->screenshotUrl, ['alt' => 'Capture d\'écran de ' . $site->domain, 'class' => 'img-fluid', 'style' => 'width: 100px']);
        }
                    return null;
                },
            ],
            'domain',
            'legalEntity',
        ],
    ]) ?>
    <?php Pjax::end() ?>
</div>
