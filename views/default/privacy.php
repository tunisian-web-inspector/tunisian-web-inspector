<?php

/* @var $this yii\web\View */


$this->title = 'Vie privée';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-privacy">
    <h1>Vie privée</h1>

    <p>
        Ce site utilise les cookies suivants essentiels à son fonctionnement :
    </p>
    <ul>
        <li><code>_csrf</code> : Permet de protéger les formulaires contre les <a href="https://fr.wikipedia.org/wiki/Cross-site_request_forgery" target="_blank" rel="noreferrer">Cross-site request forgery</a> </li>
        <li><code>PHPSESSID</code> : Utilisé par le framework Yii pour relier votre navigateur à la session sur le serveur, pour émettre des notices suite au remplissage d'un formulaire</li>
    </ul>
</div>
