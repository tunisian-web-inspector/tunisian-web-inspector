<?php

/* @var $this yii\web\View */
/* @var $counts int[] */
/* @var $entities \app\models\LegalEntity[] */

use app\helpers\Html;

$this->title = 'Bienvenue sur Tunisian Web Inspector';

$this->params['description'] = 'Site visant à améliorer la qualité des sites web gouvernementaux en Tunisie';

?>

<h1 class="mb-3">Tunisian Web <span class="text-primary">Inspector</span></h1>

<p>
    Bienvenue, ce site vise à <?= Html::a('améliorer la qualité des sites web', ['default/about']) ?> gouvernementaux tunisiens.
</p>

<div class="alert alert-warning">

    <h2 class="mb-3"><?= Html::fa('bullhorn', ['class' => 'me-2']) ?> Phase 1: Collecte de données</h2>
    <p>
        N'hésitez pas à contribuer un site web si vous ne le trouvez pas listé ici. Vous pouvez
        <?= Html::a('remplir ce formulaire', ['default/contact']) ?> ou <?= Html::a('me contacter sur Twitter', 'https://twitter.com/mac_hour') ?>
    </p>
    <p class="mb-0"><i><b><?= $counts['sites'] - 62 ?></b> sites contribués à cette liste depuis le lancement ! Merci</i></p>
</div>

<p>
    Actuellement <?= Html::tag('span', $counts['sites'], ['class' => 'display-6'])  ?> sites,
    répartis sur <?= Html::tag('span', $counts['legalEntities'], ['class' => 'display-6'])  ?> entités, ont été recensés:
</p>


<?php foreach ($entities as $entity): ?>
    <h2><?= $entity ?></h2>

    <ul>
        <?php foreach ($entity->sites as $site): ?>
            <li class="mb-1">
                <a href="<?= $site->getMainUrl() ?>" rel="noopener" target="_blank"><?= $site->domain ?></a>
                <?php if ($site->name) : ?>
                <span class="d-block d-md-inline text-muted"><?= $site->name ?></span>
                <?php endif ?>
                <?php if ($site->aliases) : ?>
                <small class="text-muted">(Alias connus: <?= $site->aliases ?>)</small>
                <?php endif ?>
            </li>
        <?php endforeach ?>
    </ul>
<?php endforeach ?>

