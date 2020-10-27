drop table if exists symptom_assessment;
create table symptom_assessment(
    id serial,
    symptom_id int,
    lcm_user_id int,
    assessment int,
    date_time timestamp,
    primary key(id),
    constraint fk_symptom
        foreign key (symptom_id)
        references symptom(id),
    constraint fk_lcm_user
        foreign key (lcm_user_id)
        references lcm_user(id)
);