<?php

/* @var $this yii\web\View */
/* @var $dataProvider ActiveDataProvider */

use app\helpers\Html;
use app\models\Site;
use yii\data\ActiveDataProvider;
use yii\grid\GridView;
use yii\helpers\Url;
use yii\widgets\Pjax;

$this->title = 'Sites';
$this->params['breadcrumbs'][] = $this->title;

?>
<div class="site-index">
    <?php Pjax::begin() ?>
    <?= \yii\widgets\ListView::widget([
        'dataProvider' => $dataProvider,
        'itemView' => '_site-list-view',
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

    ]) ?>
    <?php Pjax::end() ?>
</div>
