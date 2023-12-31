export const checkExistTableQuery = "SELECT to_regclass('products');";

export const checkExistDataQuery = "SELECT * FROM products LIMIT 1;";

export const addTableQuery = `CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "salePrice" NUMERIC(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" VARCHAR(255) NOT NULL,
    "imageAlt" VARCHAR(255) NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "costPrice" NUMERIC(10,2) NOT NULL,
    supplier VARCHAR(255) NOT NULL,
    "createdBy" VARCHAR(255) NOT NULL DEFAULT 'admin',
    
    CHECK (quantity >= 0)
);`;

export const addLogsTable = `CREATE TABLE quantity_logs (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  action VARCHAR(40) NOT NULL,
  quantity_changed INT NOT NULL,
  current_quantity INT NOT NULL,
  changed_on TIMESTAMP(6) NOT NULL
);`

export const addTrigger = `
CREATE OR REPLACE FUNCTION log_quantity_changes()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
  $body$
    BEGIN
    IF NEW.quantity < OLD.quantity THEN
      INSERT INTO quantity_logs(product_id, action, quantity_changed, current_quantity, changed_on)
      VALUES(OLD.id, 'subtract',(OLD.quantity - NEW.quantity), NEW.quantity, now());
    ELSEIF NEW.quantity > OLD.quantity THEN
      INSERT INTO quantity_logs(product_id, action, quantity_changed, current_quantity, changed_on)
      VALUES(OLD.id, 'add', (NEW.quantity - OLD.quantity), NEW.quantity, now());
    END IF;
    RETURN NEW;
    END;
  $body$
`;

export const activateTrigger = `
CREATE TRIGGER log_quantity_changes
  BEFORE UPDATE
  ON products
  FOR EACH ROW
  EXECUTE PROCEDURE log_quantity_changes();
`;

export const addDataToTableQuery = `INSERT INTO products (name, "salePrice", quantity, description, category, "discountPercentage", "imageUrl", "imageAlt", "isForSale", "costPrice", supplier)
VALUES
  ('Blue T-Shirt', 19.99, 50, 'Cotton short sleeve t-shirt', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175870410601009272/meir_asulin_Cotton_short_sleeve_t-shirt_blue_71fa9687-e15c-4961-ba15-eac5122b3c51.png', 'Blue t-shirt', true, 15.00, 'T-Shirts Inc.'),
  ('Yoga Mat', 29.99, 30, '6mm thick yoga and exercise mat', 'Fitness', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175870681997660352/meir_asulin_6mm_thick_yoga_and_exercise_mat._yoga_mat_d9619d02-199c-448d-8b54-255f760e5a3e.png', 'Yoga mat', true, 20.00, 'Active Lifestyle Co.'),
  ('Wireless Headphones', 99.99, 12, 'Bluetooth over-ear headphones', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175872330061316229/meir_asulin_Wireless_Headphones._Bluetooth_over-ear_headphones._400d5722-da66-4549-8017-9de6650b5a2f.png', 'Wireless headphones', true, 70.00, 'Audio Shop'),
  ('Coffee Maker', 79.99, 8, 'Programmable coffee maker with 12 cup capacity', 'Home', 20, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175872947689369650/meir_asulin_Programmable_coffee_machine_and_coffee_cup_b3a96e0d-dafe-4906-969a-80406be67d00.png', 'Coffee maker', true, 60.00, 'Home Goods'),
  ('Digital Camera', 399.99, 5, 'DSLR camera with 18-55mm lens', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873302359703655/meir_asulin_digital_camera__._DSLR_camera_with_18-55mm_lens_6e80d73b-6bd0-4a7c-b614-51c286a50c1d.png', 'Digital camera', true, 320.00, 'Cameras & Co.'),
  ('Leather Belt', 49.99, 23, 'Genuine leather belt', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873274731839699/meir_asulin_Genuine_leather_belt_fc788609-20f9-47d0-8a00-131f8793a8c4.png', 'Leather belt', true, 30.00, 'Belts & More'),
  ('Phone Case', 19.99, 40, 'Protective case for iPhone 12', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873553091022889/meir_asulin_phone_case__._Protective_case_for_iPhone_12_10d77e32-9445-4e40-bee0-5233d2eff0bc.png', 'Phone case', true, 10.00, 'Mobile Accessories'),
  ('Smart Watch', 249.99, 15, 'Fitness tracker with heart rate monitor', 'Electronics', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873865373728908/meir_asulin_smart_watch__._Fitness_tracker_with_heart_rate_moni_59b2c259-c8bb-4f24-ab12-b199531b3efc.png', 'Smart watch', true, 200.00, 'Wearable Devices'),
  ('Backpack', 69.99, 12, 'Water-resistant backpack for school or travel', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175874137189793852/meir_asulin_Backpack__._Water-resistant_backpack_for_school_or__4dd2fba8-15d4-414e-964c-dc7c9ec85d9e.png', 'Backpack', true, 50.00, 'Bags & Luggage'),
  ('Office Chair', 199.99, 3, 'Ergonomic desk chair with lumbar support', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175874274834251877/meir_asulin_office_chair__Ergonomic_desk_chair_with_lumbar_supp_fa4e7522-179a-4ada-9440-d8c521fb85f2.png', 'Office chair', true, 150.00, 'Furniture Shop'),
  ('Running Shoes', 89.99, 25, 'Lightweight mesh running shoes', 'Apparel', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177216392982970388/meir_asulin_Running_Shoes_0f1e5fce-8aaf-4d49-8ccb-27a9368ae036.png', 'Running shoes', true, 75.00, 'Shoes & More'),
  ('Flannel Shirt', 39.99, 22, 'Plaid flannel button up shirt', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177216701025226752/meir_asulin_Flannel_Shirt_0cf0e97f-d824-4ca5-b7c1-abde13a932e9.png', 'Flannel shirt', true, 30.00, 'Casual Wear'),
  ('Skinny Jeans', 49.99, 18, 'Stretchy skinny jeans', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177218870679978104/meir_asulin_man_Skinny_Jeans_017cc9fd-48ec-427b-838b-30e7451c9f10.png', 'Skinny jeans', true, 40.00, 'Denim Depot'),
  ('Resistance Bands', 19.99, 40, 'Set of 4 stretchy resistance bands', 'Fitness', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177219057137745991/meir_asulin_Set_of_4_stretchy_resistance_bands_for_sale_23b1a8ae-e5b3-4ed3-8ec6-5d8afe44dad6.png', 'Resistance bands', true, 15.00, 'Home Gym'),
  ('Kettlebell', 49.99, 25, '15 lb cast iron kettlebell', 'Fitness', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177218906088288288/meir_asulin_Kettlebell_for_sale_7b86aa5f-f9a2-4bb0-8607-84f2d12aa25f.png', 'Kettlebell', true, 40.00, 'Home Gym'),
  ('Rowing Machine', 299.99, 5, 'Magnetic rowing machine with LCD display', 'Fitness', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177220261259526154/meir_asulin_Magnetic_rowing_machine_with_LCD_display_for_sale_d2bd0ddf-b6ba-4d51-ac7f-343b0cf7ce51.png', 'Rowing machine', true, 250.00, 'Home Gym'),
  ('Yoga Blocks', 14.99, 40, 'Set of 2 high density foam yoga blocks', 'Fitness', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177220296416174130/meir_asulin_Set_of_2_high_density_foam_yoga_blocks_for_sale_f6084876-2c90-4e8f-96e5-32f55a4bae42.png', 'Yoga blocks', true, 10.00, 'Yoga Gear'),
  ('Jump Rope', 12.99, 55, 'Adjustable speed jump rope', 'Fitness', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177220907928924161/meir_asulin_Jump_Rope__for_sale_a371d213-2a85-4e0f-87a5-ef9b83e9ff6b.png', 'Jump rope', true, 10.00, 'Home Gym'),
  ('Surge Protector', 24.99, 55, '6 outlet surge protecting power strip', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177222282939220118/meir_asulin_outlet_surge_protecting_power_strip_ebb7e798-039b-4148-aaff-38df8a679d5f.png', 'Surge protector', true, 20.00, 'Electronix & More'),
  ('Portable Speaker', 79.99, 22, 'Rechargeable Bluetooth speaker', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177222269945254018/meir_asulin_Rechargeable_Bluetooth_speaker_4154b4e9-8178-4a45-a937-8e30829fbdce.png', 'Portable speaker', true, 60.00, 'Audio Shop'),
  ('Webcam', 59.99, 15, 'HD video recording webcam', 'Electronics', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177222515488210974/meir_asulin_HD_video_recording_webcam_62e26892-0412-4583-a017-5d133324cda9.png', 'Webcam', true, 45.00, 'Electronix & More'),
  ('Printer', 129.99, 12, 'Wireless all-in-one color printer', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177222417433759785/meir_asulin_Wireless_all-in-one_color_printer_b4c30a45-d3d0-4fbc-bb32-19586ae34dc5.png', 'Printer', true, 100.00, 'Electronix & More'),
  ('Smart Plug', 19.99, 45, 'WiFi enabled smart plug', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177223923557990400/meir_asulin_A_smart_plug_that_supports_digital_WiFi_2d029677-ed0c-4262-ac5e-5bcd19e01b45.png', 'Smart plug', true, 15.00, 'Smart Devices'),
  ('Cutlery Set', 39.99, 28, '24 piece stainless steel cutlery set', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177223857061507123/meir_asulin_Cutlery_Set_minimalistic__for_sale_ff720474-bf16-4977-bb83-be557b6ee521.png', 'Cutlery set', true, 30.00, 'Kitchen Goods'),
  ('Pressure Cooker', 99.99, 12, '6 quart electric pressure cooker', 'Home', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177223818444541983/meir_asulin_quart_electric_pressure_cooker_4a5f8080-17fc-41b7-a7fe-c1601d946974.png', 'Pressure cooker', true, 80.00, 'Kitchen Goods'),
  ('Towel Set', 29.99, 25, '4 piece cotton bath towel set', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177223705177374740/meir_asulin_Towel_Set_961b5786-ef7d-4895-b5fb-53e4817ac90b.png', 'Towel set', true, 20.00, 'Home Goods'),
  ('Area Rug', 99.99, 6, '5 x 8 reversible shag area rug', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177227462212595772/meir_asulin_Area_Rug_home_product_for_sale_227d889c-dd8d-42a8-87ec-40eb78c2504a.png', 'Area rug', true, 80.00, 'Rugs & More'),
  ('Desk Lamp', 39.99, 22, 'Adjustable LED desk lamp', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177227241474764830/meir_asulin_Desk_Lamp__home_product_for_sale_ad9bb43b-11a3-4e39-b7a1-31d499278163.png', 'Desk lamp', true, 30.00, 'Lighting Shop'),
  ('Tent', 129.99, 8, '4 person dome camping tent', 'Outdoors', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177227313998467072/meir_asulin_Tent__home_product_for_sale_dcce7435-436b-4490-959f-fb4d6befaf9b.png', 'Tent', true, 100.00, 'Camping Gear'),
  ('Hiking Boots', 89.99, 12, 'Waterproof leather hiking boots', 'Outdoors', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177227385473597480/meir_asulin_Hiking_Boots_555e53ba-cf5d-4241-8c9f-ff34fa1f2c81.png', 'Hiking boots', true, 70.00, 'Outfitters'),
  ('Fishing Pole', 49.99, 15, 'Medium action spinning fishing rod', 'Outdoors', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177228479088033842/meir_asulin_Fishing_Pole_0542fd44-2f3b-46ed-9d73-a0e9a02c8a4d.png', 'Fishing pole', true, 35.00, 'Outfitters'),
  ('Sleeping Bag', 69.99, 10, '0 degree Fahrenheit mummy sleeping bag', 'Outdoors', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177228463489425570/meir_asulin_Sleeping_Bag_b3adc8d4-b947-4d14-bfe5-50d0180857f7.png', 'Sleeping bag', true, 55.00, 'Camping Gear'),
  ('Cooler', 99.99, 6, '75 quart wheeled performance cooler', 'Outdoors', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177228438428459128/meir_asulin_Cooler_75315cdc-f2c6-44b1-a277-f25ceaed5c7b.png', 'Cooler', true, 75.00, 'Outfitters'),
  ('Baseball Glove', 69.99, 10, 'Outfielder baseball glove', 'Sports', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177228977040003153/meir_asulin_new_Baseball_Glove_for_sale_88ceba40-a0cb-43c0-aa4e-8371546251bb.png', 'Baseball glove', true, 55.00, 'Sports Zone'),
  ('Basketball', 24.99, 20, 'Indoor/outdoor composite leather basketball', 'Sports', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177229330162651207/meir_asulin_Indooroutdoor_composite_leather_basketball_for_sale_c6483b9c-e26a-4e22-a3cd-070232e4c05f.png', 'Basketball', true, 20.00, 'Sports Zone'),
  ('Soccer Cleats', 59.99, 15, 'Firm ground soccer cleats', 'Sports', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177229608379220028/meir_asulin_Soccer_Cleats_7f794f97-801a-4b89-8de1-1a361900cbca.png', 'Soccer cleats', true, 50.00, 'Sports Zone'),
  ('Tennis Racket', 99.99, 8, 'Pre-strung lightweight tennis racket', 'Sports', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177230162140598352/meir_asulin_Tennis_Racket_new_for_sale_fd19aff0-206a-41c6-8c5e-20a4eb53de1b.png', 'Tennis racket', true, 75.00, 'Sports Zone'),
  ('Golf Clubs', 399.99, 3, 'Complete set of golf clubs with bag', 'Sports', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177229961946468352/meir_asulin_Complete_set_of_golf_clubs_with_bag_189ada80-07d8-4745-a6a3-6bd025e34c29.png', 'Golf clubs', true, 350.00, 'Sports Zone'),
  ('Alarm Clock', 19.99, 30, 'Digital LED alarm clock with USB charger', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177230799133745182/meir_asulin_Digital_LED_alarm_clock_with_USB_charger_d61debad-1463-40ed-9525-1c9ea6b7b60a.png', 'Alarm clock', true, 15.00, 'Home Goods'),
  ('Picture Frames', 29.99, 20, 'Set of 3 rustic inspired wood picture frames', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177231177657110619/meir_asulin_Set_of_3_rustic_inspired_wood_picture_frames_00a97889-7c7b-41ec-a513-f0cefa10c154.png', 'Picture frames', true, 25.00, 'Home Goods'),
  ('Welcome Mat', 24.99, 25, '30" x 18" coir bristle door mat', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177231333169320047/meir_asulin_coir_bristle_door_mat_47ba268a-ce57-4d60-8c62-92f4d19b6fa1.png', 'Welcome mat', true, 20.00, 'Home Goods'),
  ('Storage Bins', 16.99, 36, 'Set of 6 plastic storage bins with lids', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177231491340709918/meir_asulin_Set_of_6_plastic_storage_bins_with_lids_fd9de314-ae9b-4b62-9587-02e0c35b9e4c.png', 'Storage bins', true, 12.00, 'Organisation'),
  ('Garbage Can', 29.99, 15, '13 gallon stainless steel step garbage can', 'Home', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177232619285512342/meir_asulin_13_gallon_stainless_steel_step_garbage_can_8d2357d0-0977-4a88-b6ff-0d74730420a2.png', 'Garbage can', true, 25.00, 'Organisation'),
  ('Dog Bed', 54.99, 12, 'Orthopedic memory foam dog bed', 'Pets', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177233353083207700/meir_asulin_Orthopedic_memory_foam_dog_bed_8412382d-cd40-4ec1-b8de-04b5d866e039.png', 'Dog bed', true, 45.00, 'Pet Goods'),
  ('Cat Tree', 69.99, 8, 'Multi-level sisal wrapped cat tree', 'Pets', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177233439368417301/meir_asulin_Cat_Tree_11e61857-1fd5-40a1-b11c-6ba213428a9c.png', 'Cat tree', true, 55.00, 'Pet Goods'),
  ('Fish Tank', 99.99, 6, '20 gallon glass aquarium tank kit', 'Pets', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177234093222662224/meir_asulin_Fish_Tank_for_sale_8161856f-4c28-47c8-850d-54c8da6d275c.png', 'Fish tank', true, 80.00, 'Pet Goods'),
  ('Dog Collar', 14.99, 25, 'Nylon dog collar with buckle', 'Pets', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177234138395332659/meir_asulin_Dog_Collar_with_cute_dog_for_sale_195fdf6b-bbc0-4b19-9324-230bd3bb8f33.png', 'Dog collar', true, 10.00, 'Pet Goods'),
  ('Cat Scratcher', 19.99, 20, 'Corrugated cardboard cat scratcher', 'Pets', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177234471569866923/meir_asulin_Cat_Scratcher__for_sale_c61383e1-7953-4de3-88c4-f3bd572a803a.png', 'Cat scratcher', true, 15.00, 'Pet Goods'),
  ('Rain Coat', 59.99, 20, 'Hooded waterproof rain jacket', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177235378181255248/meir_asulin_child_Raincoat_10efc30a-41c5-4d20-a1a1-6d7c0704e5ec.png', 'Rain coat', true, 45.00, 'Outwear Shop'),
  ('Slippers', 34.99, 25, 'Faux fur lined indoor/outdoor slippers', 'Apparel', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177235448691703818/meir_asulin_cute_Slippers_86681d09-b54c-48f7-872f-85899cde6be5.png', 'Slippers', true, 30.00, 'Cozy & Comfort'),
  ('Handbag', 99.99, 12, 'Faux leather dome shaped handbag', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177235195435438090/meir_asulin_Faux_leather_dome_shaped_handbag_8c840f8b-1a3b-457b-a9e1-ef1012000337.png', 'Handbag', true, 80.00, 'Premiere Handbags'),
  ('Sunglasses', 54.99, 15, 'Polarized lens / UV protection sunglasses', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177236613441519666/meir_asulin_cute_man_Sunglasses_f58a153d-76a6-4a5c-85e8-dafee7d24b5d.png', 'Sunglasses', true, 45.00, 'Style Eyeware'),
  ('Hammock', 89.99, 8, 'Double wide color striped hammock', 'Outdoors', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177236699089219654/meir_asulin_Hammock_dace9c11-9d1e-4faa-a3db-7a744283a569.png', 'Hammock', true, 70.00, 'Outfitters'),
  ('Kayak', 499.99, 3, '2 person inflatable kayak package', 'Outdoors', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177236663538294804/meir_asulin_2_person_inflatable_kayak_package_f0abc837-1c76-4323-941a-e29736bfb01f.png', 'Kayak', true, 400.00, 'Water Sports'),
  ('Life Jacket', 49.99, 12, 'US Coast Guard approved life jacket', 'Outdoors', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1177236859982721145/meir_asulin_US_Coast_Guard_approved_life_jacket_85cb7842-41f1-40a7-9b6a-2fd4e66daf7f.png', 'Life jacket', true, 40.00, 'Water Sports'),
  ('Smart Watch', 199.99, 30, 'Fitness tracker watch', 'Electronics', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1178629759488495626/meir_asulin_Fitness_tracker_watch_minimalistic._realistic._cute_f4c96cfc-7373-4e0e-96c5-b3cc7af82314.png', 'Smart Watch', true, 150.00, 'Gadgets R Us'),
('Wireless Earbuds', 99.99, 40, 'Bluetooth earbuds with charging case', 'Electronics', 0 , 'https://cdn.discordapp.com/attachments/1061944547246088242/1178629808285036614/meir_asulin_Bluetooth_earbuds_with_charging_case_minimalistic.__440aebae-87bd-48b4-b75c-89ab832b8ba0.png', 'Wireless earbuds', true, 70.00, 'Gadgets R Us'),
('Digital Camera', 349.99, 20, 'DSLR camera with 18MP sensor', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1178629939247988827/meir_asulin_DSLR_camera_with_18MP_sensor_minimalistic._realisti_1aaf8a72-5111-4085-8de1-b6989ecd2fe3.png', 'Camera', true, 250.00, 'Gadgets R Us'), 
('Tablet', 499.99, 12 , '10 inch tablet with wi-fi+cellular', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1178630767983734784/meir_asulin_Tablet_minimalistic._realistic._cute._349fc733-02d8-4146-9d43-7c6bfdf744a5.png', 'Tablet', true, 300.00, 'Gadgets R Us'),
('Laptop', 1099.99, 8 , '15 inch laptop with 16GB RAM', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1178630738896224306/meir_asulin_Laptop_minimalistic._realistic._cute._824405be-98e3-4c36-9af1-28a6fc4cb19b.png', 'Laptop', true , 850.00, 'Gadgets R Us'),  
('Smart Phone', 799.99, 22, 'Flagship smartphone with triple camera', 'Electronics', 5, 'https://cdn.discordapp.com/attachments/1061944547246088242/1178630858610049084/meir_asulin_Smart_Phone_minimalistic._realistic._cute._b9e1a4cc-fec3-415a-88a3-2c7278a94b1c.png', 'Smart phone', true, 600.00, 'Gadgets R Us'),
('Wireless Headphones', 149.99, 18, 'Over-ear bluetooth headphones', 'Electronics', 0,  'https://cdn.discordapp.com/attachments/1061944547246088242/1178632246224232488/meir_asulin_Wireless_Headphones__cute_5e4fa5a0-7f7d-4d18-9c86-29cde4b20543.png', 'Headphones', true, 100.00, 'Gadgets R Us'),
('Video Game Console', 399.99, 8, 'Home gaming console with 1TB SSD', 'Electronics', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1178633229952102420/meir_asulin_Video_Game_Console_new_for_sale_02b3255b-a684-41fc-9d89-985cfebe31b2.png', 'Gaming console', true, 300.00, 'Gadgets R Us'), 
('VR Headset', 199.99, 12, 'Virtual reality headset for immersive gaming','Electronics', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1178632659547734137/meir_asulin_Virtual_reality_headset_for_immersive_gaming__Conte_db631e3e-5b1b-43f3-b14b-0a04c5b14fb6.png', 'VR Headset', true, 170.00, 'Gadgets R Us'),
('Smart Speaker', 99.99, 24, 'Wireless speaker with virtual assistant','Electronics', 0,  'https://cdn.discordapp.com/attachments/1061944547246088242/1178633255621247026/meir_asulin_Smart_Speaker__Contemporary._The_latest_version._Co_78770e5d-f94f-4486-90e3-e936f230c41f.png','Smart Speaker', true , 70.00, 'Gadgets R Us'),
('Fitness Tracker', 79.99, 26 ,'Heart rate monitoring fitness band','Electronics', 5 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178635192110428180/meir_asulin_Fitness_Tracker__Apple_style._The_latest_version._3b947ebd-4048-4c44-8689-96163c338fa0.png','Fitness Tracker', true ,40.00 ,'Gadgets R Us'), 
('Smart Light Bulb', 29.99 ,50,'RGB WiFi multicolor smart bulb','Electronics', 10,'https://cdn.discordapp.com/attachments/1061944547246088242/1178635245222907994/meir_asulin_Smart_Light_Bulb__Apple_style._The_latest_version._673b85af-ecfc-476a-9358-16965846e7d9.png','Smart Light Bulb',true ,12.00,'Gadgets R Us'),
('Video Doorbell', 249.99, 15 ,'WiFi video doorbell with motion alerts','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178635293264445470/meir_asulin_Video_Doorbell__Apple_style._The_latest_version._4bb25d66-6f9f-47f0-84db-42148ff855eb.png','Video Doorbell',true ,170.00,'Gadgets R Us'),
('Smart Thermostat', 199.99, 18,'Programmable wi-fi thermostat','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178635365087715358/meir_asulin_Smart_Thermostat__Apple_style._The_latest_version._fd5048ef-7efe-4210-af75-ca36e247fb33.png' ,'Thermostat',true ,120.00,'Gadgets R Us'),
('HD Webcam', 99.99, 22 ,'1080p webcam for video conferencing','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178635429084405811/meir_asulin_HD_Webcam__Apple_style._The_latest_version._76e06424-3675-4e5f-844b-b82fca76fd5b.png' ,'HD Webcam',true ,75.00 ,'Gadgets R Us'),
('Smart Lock', 249.99 ,12,'Keyless entry smart lock for doors','Electronics', 10 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178638616528957480/meir_asulin_Smart_Lock__Apple_style._The_latest_version._094e9ad1-5b6d-4c08-b9a5-9cd74753f434.png','Smart Lock',true ,190.00 ,'Gadgets R Us'),
('Security Camera ', 199.99, 16,'WiFi surveillance security camera','Electronics', 5,'https://cdn.discordapp.com/attachments/1061944547246088242/1178638648556650516/meir_asulin_Security_Camera__Apple_style._The_latest_version._f97f7bed-45d5-4e96-af02-a7fb8ba4bff6.png' ,'Security Camera', true ,150.00,'Gadgets R Us'),  
('Laser Printer', 299.99, 6 ,'Wireless monochrome laser printer','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178638804714790922/meir_asulin_Laser_Printer__Apple_style._The_latest_version._cf8e474a-55eb-4e94-a536-9e74d383cbf2.png','Printer', true ,220.00 ,'Gadgets R Us'),
('Photo Printer', 199.99 ,10 ,'Compact wireless photo printer ','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178638999104012318/meir_asulin_Photo_Printer__Apple_style._The_latest_version._06984265-7210-4b57-a3c4-7490c13e8d98.png','Photo Printer',true,150.00,'Gadgets R Us '),
('Dash Cam', 109.99 ,20,'1080P car dash camera ', 'Electronics', 10 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178638933907751002/meir_asulin_Dash_Cam__Apple_style._The_latest_version._c3b9fc40-e455-4bf5-9f97-928e7b07e9db.png','Dash Cam', true ,75.00,'Gadgets R Us'),
('Smart Pet Feeder', 199.99, 14 ,'App-controlled automatic pet feeder ','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178745753779310733/meir_asulin_Smart_Pet_Feeder_Product_image_for_the_Gadgets_web__80f3f297-f22a-4aeb-9c80-9353123265f2.png','Smart Pet Feeder ', true ,120.00,'Gadgets R Us '), 
('Gaming Mouse', 49.99, 34,'Precision optical gaming mouse','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178745770636234893/meir_asulin_Gaming_Mouse_Product_image_for_the_Gadgets_web_stor_807e55c0-a71e-4adc-ba79-e5620db42efc.png','Gaming Mouse',true ,30.00 ,'Gadgets R Us'),
('Gaming Keyboard', 99.99 ,26 ,'RGB mechanical gaming keyboard ','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178745791133794425/meir_asulin_Gaming_Keyboard_Product_image_for_the_Gadgets_web_s_d92bd7d4-965c-4789-81ae-af55f4fb301f.png','Gaming Keyboard', true ,70.00,'Gadgets R Us'),  
('Kitchen Weighing Scale', 24.99, 44 ,'Digital kitchen food scale ','Electronics', 5,'https://cdn.discordapp.com/attachments/1061944547246088242/1178745831105511434/meir_asulin_Kitchen_Weighing_Scale_Product_image_for_the_Gadget_04cdca3f-c731-4ae5-b2e7-761c068695c1.png','Kitchen scale',true ,15.00 ,'Gadgets R Us'),
('Body Weight Scale ', 49.99, 36,'Bluetooth body weight scale ','Electronics', 5 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178745936671952956/meir_asulin_Body_Weight_Scale_Product_image_for_the_Gadgets_web_11e6a97c-fed4-40c5-af8f-b4c93fe35396.png','Body Weight Scale',true ,30.00,'Gadgets R Us'),
('Baby Monitor', 149.99 ,22 ,'Video+Audio wifi baby monitor','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746029085032458/meir_asulin_Baby_Monitor_Product_image_for_the_Gadgets_web_stor_b1338fdb-50bd-4cf9-9949-0ac9bdee53d6.png','Baby Monitor', true ,100.00 ,'Gadgets R Us'), 
('VoIP Phone', 199.99 ,18 ,'Voice-Over-IP phone for internet calls ','Electronics', 10 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746126191579257/meir_asulin_Voice-Over-IP_phone_for_internet_calls_Product_imag_376000ea-38e4-45df-bda9-3fe68c263823.png','VoIP Phone ',true ,100.00 ,'Gadgets R Us'),
('Weather Station', 99.99, 20 ,'Wireless indoor/outdoor weather station ','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746197364723733/meir_asulin_Weather_Station_Product_image_for_the_Gadgets_web_s_a3946348-860b-434e-8222-acd60010765d.png','Weather Station ',true ,70.00,'Gadgets R Us'),
('Microphone', 129.99, 25,'Professional studio condenser microphone','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746226397696158/meir_asulin_Professional_studio_condenser_microphone_Product_im_e1c1cd73-45a4-4374-b1f4-6f3f3c8789aa.png','Microphone', true ,100.00 ,'Gadgets R Us'),
('Projector ', 449.99, 5 ,'1080P Full HD home projector ','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746255837515899/meir_asulin_1080P_Full_HD_home_projector_Product_image_for_the__170732fe-0f0e-4161-ab7d-261d4f1dec19.png','Projector', true ,350.00 ,'Gadgets R Us'),
('Outdoor Security Camera ', 229.99 ,10 ,'1080p outdoor wi-fi security camera ','Electronics', 10,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746281598914670/meir_asulin_1080p_outdoor_wi-fi_security_camera_Product_image_f_d93dee63-a03c-4cfb-838a-ba18df2af83d.png','Outdoor Security Camera',true ,150.00 ,'Gadgets R Us'),
('Portable SSD', 179.99 ,16 ,'500GB external portable SSD ','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746336712073318/meir_asulin_500GB_external_portable_SSD_Product_image_for_the_G_24e76765-1d70-42ca-aa3d-cb17659e3032.png','Portable SSD ',true ,120.00 ,'Gadgets R Us'),
('Solar Panel Charger', 39.99 ,54,'20W solar power phone charger','Electronics', 10 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746415896342598/meir_asulin_20W_solar_power_phone_charger_Product_image_for_the_f0a13634-f298-428a-a759-b8beb3ee6904.png','Solar Panel Charger ',true ,25.00 ,'Gadgets R Us'),
('Noise Cancelling Headphones ', 349.99 ,4 ,'Bluetooth noise cancelling headphones ','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746459814887474/meir_asulin_Bluetooth_noise_cancelling_headphones_Product_image_f9bf0025-6a46-4b56-bff8-dd1130f260f7.png' ,'Noise Cancelling Headphones ',true ,250.00 ,'Gadgets R Us'),
('WiFi Extender ',79.99 ,28,'AC1200 dual band wireless range extender ','Electronics',10 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746512835096606/meir_asulin_AC1200_dual_band_wireless_range_extender_AC1200_dua_624d2ff8-53e8-45d2-a9c7-2f3f91a2bb71.png','WiFi Extender ',true ,50.00 ,'Gadgets R Us'), 
('Car Vacuum', 59.99 ,26,'12V 120W car handheld vacuum cleaner ','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746571026862120/meir_asulin_12V_120W_car_handheld_vacuum_cleaner_Product_image__481c8c8f-4494-424b-bf2d-2b0622cec70f.png','Car Vacuum', true ,40.00,'Gadgets R Us'),
('Wireless Earphones ',129.99, 22,'Bluetooth 5.1 wireless earphones ','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746612659531786/meir_asulin_Bluetooth_5.1_wireless_earphones_Product_image_for__a495727f-cd14-4640-9529-8786e1a28df6.png','Wireless Earphones',true ,80.00 ,'Gadgets R Us'),
('Portable Printer', 279.99, 6 ,'Dye sublimation wireless portable printer ','Electronics', 10,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746641335992370/meir_asulin_Dye_sublimation_wireless_portable_printer_Product_i_5416791c-5f41-4b0c-b8ea-f90aff54452b.png','Portable Printer',true ,200.00 ,'Gadgets R Us'),  
('LED Video Light ', 149.99, 12,'Camera LED video light for smartphones','Electronics', 0,'https://cdn.discordapp.com/attachments/1061944547246088242/1178954259992166430/meir_asulin_LED_Video_Light_Product_image_for_the_Gadgets_web_s_66faa746-eb5a-4888-adfa-28fa9f134599.png','LED Video Light', true ,90.00,'Gadgets R Us'),
('Battery Pack ', 99.99, 18,'50000mAh fast charging power bank','Electronics', 10 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746788568641577/meir_asulin_Battery_Pack_Product_image_for_the_Gadgets_web_stor_2100e880-8625-4726-9449-2ae167bba8a1.png' ,'Battery Pack',true ,50.00,'Gadgets R Us'),
('Wake Up Light', 89.99, 30 ,'App-controlled sunrise alarm clock','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746759074295889/meir_asulin_Wake_Up_Light_Product_image_for_the_Gadgets_web_sto_b2e34e7b-8ef2-4189-9efe-7dfa0ed68f31.png','Wake-up Light ',true ,60.00 ,'Gadgets R Us'),
('Security Alarm System', 299.99 ,2 ,'WiFi wireless home security alarm system ','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178746842624839752/meir_asulin_WiFi_wireless_home_security_alarm_system_Product_im_4a320a38-c2cf-4aae-9759-fe037ff659d5.png','Security Alarm System',true ,220.00,'Gadgets R Us'),
('Robot Vacuum', 499.99,4 ,'Self-charging robot vacuum cleaner ','Electronics', 5 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178931219405209650/meir_asulin_Self-charging_robot_vacuum_cleaner__Product_image_f_0c02eb98-7350-4a47-ad44-fe6e0dc0e274.png','Robot Vacuum ',true ,350.00,'Gadgets R Us'),
('3D Printer ',399.99 ,6 ,'Dual extruder 3D printer for beginners ','Electronics', 0 ,'https://cdn.discordapp.com/attachments/1061944547246088242/1178931261067231302/meir_asulin_Dual_extruder_3D_printer_for_beginners__Product_ima_0122bbec-7020-40c9-bec2-4bdbf9c50237.png','3D Printer ', true ,300.00,'Gadgets R Us');`;
