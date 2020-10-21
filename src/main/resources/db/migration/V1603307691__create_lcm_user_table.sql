create table lcm_user(
    id serial,
    alias varchar (100),
    constraint constraint_alias unique (alias)
);
