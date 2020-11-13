
BASE_DIR=$( (cd "$(dirname "$0")/.."; pwd) )
cd "$BASE_DIR"

eval "docker-compose -f $BASE_DIR/docker-compose.yml up -d"
eval docker logs -f magistry-backend
