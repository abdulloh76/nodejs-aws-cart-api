create table
  users (
    id uuid not null constraint users_pk primary key,
    login text not null,
    password text not null,
    created_at timestamp
    with
      time zone not null,
      updated_at timestamp
    with
      time zone not null
  );

create table
  carts (
    id uuid not null constraint carts_pk primary key,
    user_id uuid not null,
    created_at timestamp
    with
      time zone not null,
      updated_at timestamp
    with
      time zone not null
  );

create table
  cart_items (
    id uuid not null constraint cart_items_pk primary key,
    cart_id uuid not null,
    product_id uuid not null,
    quantity integer not null,
    created_at timestamp
    with
      time zone not null,
      updated_at timestamp
    with
      time zone not null
  );

create table
  orders (
    id uuid not null constraint orders_pk primary key,
    user_id uuid not null,
    cart_id uuid not null,
    payment jsonb not null,
    delivery jsonb not null,
    comments text not null,
    status text not null,
    status_history jsonb not null,
    total numeric not null,
    created_at timestamp
    with
      time zone not null,
      updated_at timestamp
    with
      time zone not null
  );