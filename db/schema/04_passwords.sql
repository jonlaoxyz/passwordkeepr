
DROP TABLE IF EXISTS passwords CASCADE;

CREATE TABLE passwords (
    id SERIAL PRIMARY KEY,
    website_name VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id)
);