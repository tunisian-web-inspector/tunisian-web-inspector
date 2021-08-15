<?php

namespace app\inspections;

use Spatie\SslCertificate\Downloader;

class IsSslCertificateValid extends Inspection
{
    public function run(): bool
    {
        $certificate = (new Downloader())
            ->withVerifyPeer(false)
            ->withVerifyPeerName(false)
            ->forHost($this->site->domain);

        return $certificate->isValid();
    }
}