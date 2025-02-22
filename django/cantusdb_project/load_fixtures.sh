#!/bin/bash

# generate tables in the database (optional)
# python manage.py makemigrations
# python manage.py migrate

# load initial data to populate the database
# these fixtures need to be loaded in a certain order due to foreign key dependance
# before running this, make sure you put the 'fixtures' folder under 'main_app'
FIXTURES_LIST=(
   flatpage_fixture.json
   indexer_fixture.json
   office_fixture.json
   genre_fixture.json
   feast_fixture.json
   notation_fixture.json
   century_fixture.json
   provenance_fixture.json
   rism_siglum_fixture.json
   segment_fixture.json
   source_fixture.json
   sequence_fixture.json
)

for fixture in ${FIXTURES_LIST[*]}
do
   echo $fixture
   python manage.py loaddata $fixture
done

# load all the chants, this takes a few hours as we have half a million chants
FILES=./main_app/fixtures/chant_fixtures/*
for f in $FILES
do
   python manage.py loaddata $f -v 2
done

# now you can runserver and expect things to work properly