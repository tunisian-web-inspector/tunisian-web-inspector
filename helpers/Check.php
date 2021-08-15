<?php

namespace app\helpers;

use Nesk\Puphpeteer\Puppeteer;
use Nesk\Puphpeteer\Resources\Browser;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use yii\helpers\Inflector;


class Check
{
    public static function robots($rootUrl): bool
    {
        $client = HttpClient::create();
        try {
            $response = $client->request('GET', $rootUrl . '/robots.txt');
            return $response->getStatusCode() === 200;
        } catch (TransportExceptionInterface $e) {
            return false;
        }
    }

    public static function getDomain($url): ?string
    {
        return self::parseUrl($url)['host'] ?? null;
    }

    public static function parseUrl($url): array
    {
        return parse_url($url);
    }

    public static function screenshot(string $url, string $alias, string $device = 'iPhone X')
    {
        $path = \Yii::getAlias($alias);

        $puppeteer = new Puppeteer;

        /** @var Browser $browser */
        /** @noinspection PhpUndefinedMethodInspection */
        $browser = $puppeteer->launch();

        $page = $browser->newPage();
        $page->goto($url);
        $page->screenshot(['path' => $path]);

        $browser->close();

        return file_exists($path) ? $alias : false;
    }
}