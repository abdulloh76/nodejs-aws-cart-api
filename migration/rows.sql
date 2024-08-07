insert into
  users (id, name, email, password)
values
  (
    'fd0ad7e4-f1cf-47bd-9ebc-29e865d61a3c',
    'admin',
    'admin@mail.com',
    'admin'
  );

insert into
  users (id, name, email, password)
values
  (
    'ac3e8519-c329-49a9-a6b4-e966a505bf57',
    'user',
    'user@mail.com',
    'user'
  );

insert into
  carts (id, user_id)
values
  (
    'a7ff0467-c961-41bb-af73-461dcf63ab78',
    'fd0ad7e4-f1cf-47bd-9ebc-29e865d61a3c'
  );

insert into
  carts (id, user_id)
values
  (
    'abf9e30c-d064-455e-aefb-a50854c71f62',
    'ac3e8519-c329-49a9-a6b4-e966a505bf57'
  );

insert into
  products (id, title, description, price)
values
  (
    '364a6661-a67f-47db-a61d-5b50891c36d3',
    'T-Shirt',
    'A white t-shirt',
    10
  );

insert into
  products (id, title, description, price)
values
  (
    '72c88883-5948-4f68-b32a-c3c3ba987ebb',
    'T-Shirt',
    'A black t-shirt',
    30
  );

insert into
  products (id, title, description, price)
values
  (
    'c782c1d6-bc3e-4f5e-a7a6-60c9f8569b02',
    'T-Shirt',
    'A green t-shirt',
    40
  );

insert into
  cart_items (id, cart_id, product_id, count)
values
  (
    '86a4375c-1fe6-46ca-9a56-a319d8a5da90',
    'a7ff0467-c961-41bb-af73-461dcf63ab78',
    '364a6661-a67f-47db-a61d-5b50891c36d3',
    1
  );

insert into
  cart_items (id, cart_id, product_id, count)
values
  (
    'a9ac04d7-aa09-4a1b-8ff6-ef35eaa96a86',
    'a7ff0467-c961-41bb-af73-461dcf63ab78',
    '72c88883-5948-4f68-b32a-c3c3ba987ebb',
    1
  );

insert into
  cart_items (id, cart_id, product_id, count)
values
  (
    '43446bac-b1fa-4479-bb9f-105a13e25f00',
    'abf9e30c-d064-455e-aefb-a50854c71f62',
    'c782c1d6-bc3e-4f5e-a7a6-60c9f8569b02',
    1
  );

insert into
  cart_items (id, cart_id, product_id, count)
values
  (
    '3f6c383a-96df-4764-be5c-a990156a25ed',
    'abf9e30c-d064-455e-aefb-a50854c71f62',
    '364a6661-a67f-47db-a61d-5b50891c36d3',
    1
  );

insert into
  orders (
    id,
    user_id,
    cart_id,
    payment,
    delivery,
    comments,
    status,
    status_history,
    total
  )
values
  (
    '265b4ef5-09e6-40cd-bf27-418b1bd14172',
    'fd0ad7e4-f1cf-47bd-9ebc-29e865d61a3c',
    'a7ff0467-c961-41bb-af73-461dcf63ab78',
    '{"method": "cash", "amount": 100}',
    '{"method": "pickup", "address": "123 Main St, Anytown, USA"}',
    'Test order',
    'OPEN',
    '{}',
    100
  );

insert into
  orders (
    id,
    user_id,
    cart_id,
    payment,
    delivery,
    comments,
    status,
    status_history,
    total
  )
values
  (
    '492ca87a-7b66-45f1-9718-d076473eaf83',
    'ac3e8519-c329-49a9-a6b4-e966a505bf57',
    'abf9e30c-d064-455e-aefb-a50854c71f62',
    '{"method": "cash", "amount": 100}',
    '{"method": "pickup", "address": "123 Main St, Anytown, USA"}',
    'Test order',
    'OPEN',
    '{}',
    100
  );