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

insert into photos (id, src, did) values ('00000000-0000-0000-0000-000000000000', 'http://a1.qpic.cn/psb?/V14QQRlh1TxXJi/vq*Kge7XXBQCpcEOjJDwO1zQk95Q3w2SrVMMnKMpSNM!/b/dGgBAAAAAAAA&bo=4AEbAQAAAAARAMw!&rf=viewer_4&t=5', '0b6a2e80-411b-11e7-b1c0-ef475fa6521d');
insert into photos (id, src, did) values ('00000000-0000-0000-0000-000000000001', 'http://a2.qpic.cn/psb?/V14QQRlh1TxXJi/jdg9lIiJnVfDy2a88aLLur70d8flQOmzi0HF47n0mG4!/b/dGkBAAAAAAAA&bo=4AEDAQAAAAARANQ!&rf=viewer_4&t=5', '4dc07370-411b-11e7-b1c0-ef475fa6521d');
insert into photos (id, src, did) values ('00000000-0000-0000-0000-000000000003', 'http://a3.qpic.cn/psb?/V14QQRlh1TxXJi/5TKWelLyWyqZF06LbTLmMpvnpMza7prAb8qVFPB9dWs!/b/dGoBAAAAAAAA&bo=4AEsAQAAAAARAPs!&rf=viewer_4&t=5', '9e23d3c0-411b-11e7-b1c0-ef475fa6521d');
insert into photos (id, src, did) values ('00000000-0000-0000-0000-000000000004', 'http://a2.qpic.cn/psb?/V14QQRlh1TxXJi/TZhzT9HLc04d2bHEUY.LbiVfygp10xr6gpK7C3kWnKs!/b/dGkBAAAAAAAA&bo=FgIsAQAAAAARAA4!&rf=viewer_4&t=5', '024d2770-411c-11e7-b1c0-ef475fa6521d');
insert into photos (id, src, did) values ('00000000-0000-0000-0000-000000000005', 'http://a1.qpic.cn/psb?/V14QQRlh1TxXJi/xjk9lCkPsMdePJmeXmCqQnHWLyYgSTajkfJBHdpTz6s!/b/dGsBAAAAAAAA&bo=AASAAgAAAAARALE!&rf=viewer_4&t=5', '40d77040-411c-11e7-b1c0-ef475fa6521d');
insert into photos (id, src, did) values ('00000000-0000-0000-0000-000000000006', 'http://a1.qpic.cn/psb?/V14QQRlh1TxXJi/ot1G09FCz6v8pQNOwP0hrNNC2Wp4fLJXZNeMklJ3ntE!/b/dGsBAAAAAAAA&bo=qgaAAgAAAAARABk!&rf=viewer_4&t=5', '76949c30-411c-11e7-b1c0-ef475fa6521d');
insert into photos (id, src, did) values ('00000000-0000-0000-0000-000000000007', 'http://a1.qpic.cn/psb?/V14QQRlh1TxXJi/IiZM41t*FlfiJkdtL335.yJmC4bZwu5JPr*9Gcri.JU!/b/dGsBAAAAAAAA&bo=cQSAAgAAAAARAMA!&rf=viewer_4&t=5', 'd140e3f0-411c-11e7-b1c0-ef475fa6521d');