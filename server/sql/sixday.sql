create table users (
    id uuid primary key,
    nickname varchar,
    telephone varchar not null,
    password varchar not null,
    portrait varchar,
    gender varchar,
    birth varchar,
    interest text[],
    description text,
    created_at timestamp without time zone default (now() at time zone 'utc')
);
create table maps(
    id uuid primary key,
    longitude varchar not null,
    latitude varchar not null,
    created_at timestamp without time zone default (now() at time zone 'utc')
);
create table diaries(
    id uuid primary key,
    -- title varchar,
    context varchar,
    temperature varchar,
    mid uuid references maps,
    uid uuid not null references users on delete cascade,
    created_at timestamp without time zone default (now() at time zone 'utc')
);
create table photos(
    id uuid primary key,
    src varchar not null,
    did uuid not null references diaries on delete cascade,
    created_at timestamp without time zone default (now() at time zone 'utc')
);
alter table users add constrant unique phone_unique column phone;
alter table maps add column address varchar;