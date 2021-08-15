<?php

namespace app\commands;

use app\helpers\Check;
use app\models\Site;
use yii\console\Controller;
use yii\console\ExitCode;
use yii\helpers\Console;

class ScreenshotController extends Controller
{
    public $verbose = false;

    public function options($actionID): array
    {
        $options = parent::options($actionID);
        $options[] = 'verbose';

        return $options;
    }

    public function actionIndex(): int
    {
        foreach (Site::find()->all() as $site) {
            if ($site->screenshot) {
                continue;
            }
            $this->stdout("Screenshoting $site\n", Console::BOLD, Console::UNDERLINE);

            try {

                $alias = '@app/web/screenshots/' . $site->domain . '.png';
                $file = \Yii::getAlias($alias);
                if (!file_exists($file)) {
                    $file = Check::screenshot($site->getMainUrl(), $alias);
                }
            } catch (\Exception $e) {
                $file = false;
            }
            $this->stdout(($file ? "✅" : "❌") . "\n");

            if ($file) {
                $site->screenshot = $file;
                $site->save();
            }

        }

        return ExitCode::OK;
    }
}
