<?php

/* @var $this yii\web\View */
/* @var $dataProvider ActiveDataProvider */

use app\helpers\Html;
use app\models\LegalEntity;
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
    <div class="col-md-9">
    {pager}
    </div>
</div>

HTML,
        'columns' => [
            [
                'format' => 'raw',
                'value' => function (LegalEntity $entity) {
                    return Html::a(Html::fa('eye'), Url::to(['legal-entity/view', 'slug' => $entity->slug]), ['data-pjax' => 0]);
                },
            ],
            'name',
            'sites' => [
                'attribute' => 'sites',
                'value' => function (LegalEntity $entity) {
                    return count($entity->sites);
                },
            ],
        ],
    ]) ?>
    <?php Pjax::end() ?>
</div>
