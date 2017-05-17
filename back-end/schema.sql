CREATE TABLE owner_info (
	id serial PRIMARY KEY,
	name varchar,
	email varchar, 
	phone integer,
	street varchar,
	zip integer
);

CREATE TABLE pet_info (
	id serial PRIMARY KEY,
	owner_id integer REFERENCES owner_info (id),
	name varchar,
	gender varchar,
	fixed boolean,
	age integer,
	size varchar,
	personality varchar,
	activities varchar
);