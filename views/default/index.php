<?php

/* @var $this yii\web\View */
/* @var $counts int[] */

use app\helpers\Html;

$this->title = 'Website Checker';

?>
<div class="site-index">

    Ce site inspecte <?= Html::a($counts['sites'] . ' sites web', ['site/index']) ?> gouvernementaux tunisiens, répartis sur <?= Html::a($counts['legalEntities'] . ' entités', ['legal-entity/index']) ?>.
</div>
