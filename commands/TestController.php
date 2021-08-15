<?php

namespace app\commands;

use app\inspections\IsRobotFileAvailable;
use app\inspections\IsSiteAvailable;
use app\inspections\IsSslCertificateValid;
use app\models\Site;
use Symfony\Component\HttpClient\HttpClient;
use yii\console\Controller;
use yii\console\ExitCode;
use yii\helpers\Console;

class TestController extends Controller
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
        $httpClient = HttpClient::create(['verify_peer' => false, 'headers' => [
            'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        ]]);

        $inspections = [
            IsSiteAvailable::class,
            IsSslCertificateValid::class,
            IsRobotFileAvailable::class,
        ];

        foreach (Site::find()->all() as $site) {
            $this->stdout("Testing $site\n", Console::BOLD, Console::UNDERLINE);

            foreach ($inspections as $inspection) {
                $test = new $inspection(['httpClient' => $httpClient, 'site' => $site]);
                $this->stdout(" - $test : ");

                $error = null;

                try {
                    $result = $test->run();
                } catch (\Exception $e) {
                    $error = $e->getMessage();
                    $result = false;
                }

                $this->stdout(($result ? "✅" : "❌") . "\n");

                if ($error && $this->verbose) {
                    $this->stdout("   error was: " . $error . "\n", Console::ITALIC, Console::FG_GREY);
                }
            }

            $this->stdout("\n");
        }

        return ExitCode::OK;
    }
}
