CREATE TABLE IF NOT EXISTS checkins (
    space_layer integer,
    time_layer integer,
    tile_x bigint,
    tile_y bigint,
    "time" integer,
    cnt bigint,
    cnt_log double precision
);

--COPY checkins FROM '/var/lib/postgress/checkins-little.csv' WITH DELIMITER E'\t' CSV HEADER;
COPY checkins FROM '/var/lib/postgress/checkins-postgresql-dump.csv' WITH DELIMITER E'\t' CSV HEADER;
