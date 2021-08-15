<?php

namespace app\inspections;

use app\exceptions\InspectionException;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class IsSiteAvailable extends Inspection
{
    /**
     * @throws InspectionException
     * @throws TransportExceptionInterface
     */
    public function run(): bool
    {
        $url = $this->site->mainUrl . '/';

        // Some sites does not allow HEAD request, so GET
        $response = $this->httpClient->request('GET', $url);
        $code = $response->getStatusCode();

        if (in_array($code, [200, 301, 302])) {
            return true;
        }


        throw new InspectionException('HTTP Status code: ' . $code);
    }
}