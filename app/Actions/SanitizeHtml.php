<?php

namespace App\Actions;

use Stevebauman\Purify\Facades\Purify;

class SanitizeHtml
{
    public function __invoke(string $html): string
    {
        return Purify::clean($html, [
            'HTML.Allowed' => implode(',', [
                'p',
                'br',
                'strong',
                'em',
                'u',
                'a[href|target|rel]',
                'ul',
                'ol',
                'li',
                'blockquote',
                'h2',
                'h3',
                'h4',
            ]),
            'Attr.AllowedFrameTargets' => ['_blank'],
            'AutoFormat.RemoveEmpty' => true,
        ]);
    }
}
