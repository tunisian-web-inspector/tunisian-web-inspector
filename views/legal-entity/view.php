<?php

/* @var $this \yii\web\View */
/* @var $model \app\models\LegalEntity */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Entités', 'url' => ['legal-entity/index']];
$this->params['breadcrumbs'][] = $this->title;

?>

<h1><?= $model->name ?></h1>

<h2>Sites web</h2>
<div class="row">
    <?php foreach ($model->sites as $site): ?>
        <div class="col col-sd-6 col-md-3">
            <div class="card">
                <img src="<?= $site->screenshotUrl ?>" class="card-img-top img-fluid" alt="">
                <div class="card-body">
                    <h3 class="card-title text-center"><?= $site->domain ?></h3>
                </div>
                <div class="card-footer">
                    <?= \app\helpers\Html::a('Fiche', ['site/view', 'domain' => $site->domain], ['class' => 'btn btn-primary']) ?>
                </div>
            </div>
        </div>
    <?php endforeach ?>
</div>
