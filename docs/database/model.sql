CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    preferences TEXT, -- 嗜好情報をJSON形式などのテキストで格納
    role VARCHAR(255) NOT NULL DEFAULT '利用者', -- ユーザの役割
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE subcategories (
    subcategory_id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO categories (name, description) VALUES ('レストラン', '食事を提供する場所');

INSERT INTO subcategories (category_id, name, description) VALUES 
((SELECT category_id FROM categories WHERE name = 'レストラン'), '中華料理', '中華風の料理を提供するレストラン'),
((SELECT category_id FROM categories WHERE name = 'レストラン'), 'イタリア料理', 'イタリア風の料理を提供するレストラン'),
((SELECT category_id FROM categories WHERE name = 'レストラン'), '日本料理', '日本の伝統的な料理を提供するレストラン');


CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    category_id INTEGER,
    subcategory_id INTEGER,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(subcategory_id)
);
