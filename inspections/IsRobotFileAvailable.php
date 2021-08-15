<?php

namespace app\inspections;

use app\exceptions\InspectionException;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class IsRobotFileAvailable extends Inspection
{
    /**
     * @throws InspectionException
     * @throws TransportExceptionInterface
     */
    public function run(): bool
    {
        $url = $this->site->mainUrl . '/robots.txt';

        $response = $this->httpClient->request('GET', $url);
        $code = $response->getStatusCode();

        if ($code === 200) {
            return true;
        }

        throw new InspectionException('HTTP Status code: ' . $code);
    }
}