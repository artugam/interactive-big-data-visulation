
BASE_DIR=$( (cd "$(dirname "$0")/.."; pwd) )

cd "$BASE_DIR"

eval "$BASE_DIR/scripts/docker-stop.sh"
eval "$BASE_DIR/scripts/docker-start.sh"
