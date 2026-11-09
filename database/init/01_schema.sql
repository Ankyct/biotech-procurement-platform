CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    vendor_name VARCHAR(255) NOT NULL
);

INSERT INTO products (name, description, price, vendor_name)
VALUES
    ('PCR Kit', 'PCR laboratory kit', 120.00, 'BioSupplier A'),
    ('Pipette Tips', 'Sterile pipette tips', 35.00, 'BioSupplier B');
