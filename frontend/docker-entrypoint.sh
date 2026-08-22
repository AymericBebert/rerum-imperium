#!/usr/bin/env sh

set -eu

echo "window['APP_CONFIG'] = {" >/config.js
echo "  \"version\": \"$(cat /version.txt)\"," >>/config.js

env | while IFS= read -r line; do
  name=${line%%=*}
  value=${line#*=}
  case $name in NGX_*)
    echo "  \"$(echo "$name" | cut -c5-)\": $value," >>/config.js
    ;;
  esac
done

echo "};" >>/config.js

# Insert config object in index.html
CONFIG_BLOCK="<!--APP_CONFIG INSERTED-->
<script>
$(cat /config.js)
</script>"
INDEX_SHA1_OLD=$(sha1sum /usr/share/nginx/html/index.html | cut -d '  ' -f 1)
# shellcheck disable=SC2005
echo "$(awk -v r="$CONFIG_BLOCK" '{gsub(/<!--APP_CONFIG-->/,r)}1' /usr/share/nginx/html/index.html)" >/usr/share/nginx/html/index.html
INDEX_SHA1_NEW=$(sha1sum /usr/share/nginx/html/index.html | cut -d '  ' -f 1)
sed -i "s/\"$INDEX_SHA1_OLD\"/\"$INDEX_SHA1_NEW\"/" /usr/share/nginx/html/ngsw.json

if [ -n "${APP_SHORT_NAME:-}" ]; then
  MANIFEST_SHA1_OLD=$(sha1sum /usr/share/nginx/html/manifest.webmanifest | cut -d '  ' -f 1)
  sed -i "s/\"short_name\": \"Rerum\"/\"short_name\": \"$APP_SHORT_NAME\"/" /usr/share/nginx/html/manifest.webmanifest
  MANIFEST_SHA1_NEW=$(sha1sum /usr/share/nginx/html/manifest.webmanifest | cut -d '  ' -f 1)
  sed -i "s/\"$MANIFEST_SHA1_OLD\"/\"$MANIFEST_SHA1_NEW\"/" /usr/share/nginx/html/ngsw.json
fi

exec "$@"
