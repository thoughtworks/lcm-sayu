drop table if exists lcm_user;
create table lcm_user(
    id serial,
    alias varchar (100),
    primary key (id),
    constraint constraint_alias unique (alias)
);
