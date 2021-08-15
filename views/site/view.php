<?php

/* @var $this \yii\web\View */
/* @var $model \app\models\Site */

$this->title = $model->domain;
$this->params['breadcrumbs'][] = ['label' => 'Sites', 'url' => ['site/index']];
$this->params['breadcrumbs'][] = $this->title;

?>

<h1><?= $model->name ?></h1>
<p>
    <b>Responsable</b>: <?= $model->legalEntity ?>
</p>
<?php if ($model->screenshot): ?>
    <img src="<?= $model->screenshotUrl ?>" class="img-fluid" alt="Capture d'écran de <?= $model->domain ?>">
<?php endif ?>
