<?php

/* @var $this yii\web\View */

use app\helpers\Html;

$this->title = 'A propos';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        Je suis un passionné de développement Web, qui en a marre du grand n'importe quoi des sites étatiques Tunisiens :
    </p>

    <ul>
        <li>Sites non adaptés au mobile</li>
        <li>Sites non ou mal sécurisés par HTTPS</li>
        <li>Sites dupliqués sur plusieurs noms de domaines (sans redirections)</li>
        <li>Contenus non désirables</li>
        <li>Sites vecteurs de spams SEO</li>
        <li>Sites de ministères dissolus encore en activité</li>
        <li>Sites cassés</li>
        <li>Sites avec mauvaise ergonomie</li>
        <li>Sites non mis à jour, publications des annonces sur Facebook uniquement</li>
    </ul>

    <p>
        Il m'arrive de reporter ces problèmes aux webmasters des sites concernés, par e-mail ou twitter, mais les mesures
        correctives sont rarement prises (et très souvent on ne répond même pas).
    </p>

    <p>
        J'ai donc décidé de lancer ce site web qui recensera l'ensemble des sites étatiques, leurs problèmes, et en fera
        l'analyse.
    </p>

    <p>
        Voici les phases envisagées pour cette initiative :
    </p>

    <ol>
        <li><b>Recenser les sites webs</b> <i>(en cours)</i></li>
        <li>Mise en place de tests automatisés & revues manuelles</li>
        <li>Mise en place de l'envoi des rapports d'analyses aux entitées concernées</li>
        <li>Elaboration d'un manifeste pour une meilleure gestion des sites webs étatiques</li>
        <li>Devenir ministre des internets</li>
    </ol>

    <hr />

    <div class="small">
        Template modifié à partir de <a href="https://github.com/StartBootstrap/startbootstrap-resume" target="_blank" rel="noreferrer">startbootstrap-resume</a>
    </div>
</div>
