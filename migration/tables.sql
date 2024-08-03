create table
  users (
    id uuid not null constraint users_pk primary key,
    name text not null,
    email text not null,
    password text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
  );

create table
  carts (
    id uuid not null constraint carts_pk primary key,
    user_id uuid not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
  );

create table
  products (
    id uuid not null constraint products_pk primary key,
    title text not null,
    description text not null,
    price numeric not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
  );

create table
  cart_items (
    id uuid not null constraint cart_items_pk primary key,
    cart_id uuid not null,
    product_id uuid not null,
    count integer not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
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
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
  );