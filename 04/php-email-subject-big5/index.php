<?php
$subject = "=?BIG-5?Q?=B2=C4=A4Q=A4=AD=B4=C1=AC=E3=B5o=B9q=A4l=B3=F8?=";

echo iconv_mime_decode($subject);