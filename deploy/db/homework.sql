/*
 Navicat Premium Data Transfer

 Source Server         : Miracle
 Source Server Type    : PostgreSQL
 Source Server Version : 110003 (110003)
 Source Host           : localhost:5432
 Source Catalog        : homework
 Source Schema         : homework

 Target Server Type    : PostgreSQL
 Target Server Version : 110003 (110003)
 File Encoding         : 65001

 Date: 02/08/2024 21:48:52
*/


-- ----------------------------
-- Type structure for OrderStatus
-- ----------------------------
DROP TYPE IF EXISTS "homework"."OrderStatus";
CREATE TYPE "homework"."OrderStatus" AS ENUM (
  'PENDING',
  'SHIPPED',
  'DELIVERY'
);
ALTER TYPE "homework"."OrderStatus" OWNER TO "irin-devstart";

-- ----------------------------
-- Type structure for UserRole
-- ----------------------------
DROP TYPE IF EXISTS "homework"."UserRole";
CREATE TYPE "homework"."UserRole" AS ENUM (
  'ADMIN',
  'MANAGER'
);
ALTER TYPE "homework"."UserRole" OWNER TO "irin-devstart";

-- ----------------------------
-- Sequence structure for Customer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "homework"."Customer_id_seq";
CREATE SEQUENCE "homework"."Customer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for OrderItem_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "homework"."OrderItem_id_seq";
CREATE SEQUENCE "homework"."OrderItem_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Order_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "homework"."Order_id_seq";
CREATE SEQUENCE "homework"."Order_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Product_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "homework"."Product_id_seq";
CREATE SEQUENCE "homework"."Product_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for User_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "homework"."User_id_seq";
CREATE SEQUENCE "homework"."User_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Customer
-- ----------------------------
DROP TABLE IF EXISTS "homework"."Customer";
CREATE TABLE "homework"."Customer" (
  "id" int4 NOT NULL DEFAULT nextval('"homework"."Customer_id_seq"'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL,
  "isDeleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of Customer
-- ----------------------------
INSERT INTO "homework"."Customer" VALUES (1, 'Irin Saputra', '123456789012', 'irin@gmail.com', 'memberikan nama yang deskriptif seperti truncateString atau truncateWithEllipsis. Berikut adalah contoh bagaimana Anda bisa mem', '2024-07-30 15:22:59.829', '2024-07-30 15:40:16.308', 'f');
INSERT INTO "homework"."Customer" VALUES (2, 'Miracle', '44440984623', 'miracle@gmail.com', 'Jl. Karya Indah ', '2024-08-02 07:47:15.003', '2024-08-02 07:47:15.003', 'f');
INSERT INTO "homework"."Customer" VALUES (3, 'Mika', '98646857632', 'mira@gmail.com', 'Jl, Indah Wangso', '2024-08-02 07:48:37.573', '2024-08-02 07:48:37.573', 'f');

-- ----------------------------
-- Table structure for Order
-- ----------------------------
DROP TABLE IF EXISTS "homework"."Order";
CREATE TABLE "homework"."Order" (
  "id" int4 NOT NULL DEFAULT nextval('"homework"."Order_id_seq"'::regclass),
  "customerId" int4,
  "orderDate" timestamp(3),
  "totalPrice" int4 NOT NULL,
  "createdBy" int4,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL,
  "isDeleted" bool NOT NULL DEFAULT false,
  "status" "homework"."OrderStatus" NOT NULL DEFAULT 'PENDING'::homework."OrderStatus"
)
;

-- ----------------------------
-- Records of Order
-- ----------------------------
INSERT INTO "homework"."Order" VALUES (8, 1, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (11, 1, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (9, 1, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'PENDING');
INSERT INTO "homework"."Order" VALUES (10, 1, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'PENDING');
INSERT INTO "homework"."Order" VALUES (12, 1, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'PENDING');
INSERT INTO "homework"."Order" VALUES (1, 2, '2024-07-31 17:45:21.308', 460000, 1, '2024-07-31 17:45:35.827', '2024-07-31 18:22:24.845', 't', 'PENDING');
INSERT INTO "homework"."Order" VALUES (3, 2, '2024-07-31 17:53:58.218', 460000, 1, '2024-07-31 17:54:10.605', '2024-08-01 18:48:55.696', 'f', 'SHIPPED');
INSERT INTO "homework"."Order" VALUES (2, 2, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (4, 2, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'SHIPPED');
INSERT INTO "homework"."Order" VALUES (5, 2, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (6, 2, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'SHIPPED');
INSERT INTO "homework"."Order" VALUES (7, 2, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (13, 3, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (14, 3, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (15, 3, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (16, 3, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');
INSERT INTO "homework"."Order" VALUES (17, 3, '2024-07-31 17:51:24.683', 480000, 1, '2024-07-31 17:52:27.358', '2024-08-01 19:01:50.043', 'f', 'DELIVERY');

-- ----------------------------
-- Table structure for OrderItem
-- ----------------------------
DROP TABLE IF EXISTS "homework"."OrderItem";
CREATE TABLE "homework"."OrderItem" (
  "id" int4 NOT NULL DEFAULT nextval('"homework"."OrderItem_id_seq"'::regclass),
  "qty" int4 NOT NULL,
  "price" int4 NOT NULL,
  "totalPrice" int4 NOT NULL,
  "orderId" int4,
  "productId" int4,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL,
  "isDeleted" bool NOT NULL DEFAULT false,
  "customerId" int4
)
;

-- ----------------------------
-- Records of OrderItem
-- ----------------------------
INSERT INTO "homework"."OrderItem" VALUES (1, 23, 20000, 460000, 1, 1, '2024-07-31 17:45:35.827', '2024-07-31 17:45:35.827', 'f', NULL);
INSERT INTO "homework"."OrderItem" VALUES (2, 12, 20000, 240000, 2, 1, '2024-07-31 17:52:27.358', '2024-07-31 17:52:27.358', 'f', NULL);
INSERT INTO "homework"."OrderItem" VALUES (3, 23, 20000, 460000, 3, 1, '2024-07-31 17:54:10.605', '2024-07-31 17:54:10.605', 'f', NULL);
INSERT INTO "homework"."OrderItem" VALUES (4, 12, 20000, 240000, 2, 1, '2024-07-31 18:52:06.253', '2024-07-31 18:52:06.253', 'f', NULL);
INSERT INTO "homework"."OrderItem" VALUES (5, 12, 20000, 240000, 2, 1, '2024-07-31 18:52:21.613', '2024-07-31 18:52:21.613', 'f', NULL);
INSERT INTO "homework"."OrderItem" VALUES (6, 12, 20000, 240000, 2, 1, '2024-07-31 18:53:06.449', '2024-07-31 18:53:06.449', 'f', NULL);
INSERT INTO "homework"."OrderItem" VALUES (7, 12, 20000, 240000, 2, 1, '2024-07-31 18:53:06.449', '2024-07-31 18:53:06.449', 'f', NULL);

-- ----------------------------
-- Table structure for Product
-- ----------------------------
DROP TABLE IF EXISTS "homework"."Product";
CREATE TABLE "homework"."Product" (
  "id" int4 NOT NULL DEFAULT nextval('"homework"."Product_id_seq"'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "price" float8 NOT NULL,
  "stock" int4 NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL,
  "isDeleted" bool NOT NULL DEFAULT false,
  "code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of Product
-- ----------------------------
INSERT INTO "homework"."Product" VALUES (5, 'ads', 323, 2, '2024-07-30 04:09:57.317', '2024-07-30 14:04:17.716', 't', 'ads');
INSERT INTO "homework"."Product" VALUES (4, 'aasdad', 123123, 12, '2024-07-30 04:09:42.925', '2024-07-30 14:05:06.046', 't', 'Kipas');
INSERT INTO "homework"."Product" VALUES (3, 'MAGICOM', 20000, 10, '2024-07-30 04:06:40.213', '2024-07-30 14:12:44.401', 't', 'MGC');
INSERT INTO "homework"."Product" VALUES (2, 'Laptop Acer', 200000, 20, '2024-07-30 03:57:39.164', '2024-07-30 14:22:37.373', 't', 'LTP');
INSERT INTO "homework"."Product" VALUES (1, 'MIC', 20000, 12, '2024-07-29 17:19:41.11', '2024-07-30 15:04:02.587', 'f', 'MS');

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "homework"."User";
CREATE TABLE "homework"."User" (
  "id" int4 NOT NULL DEFAULT nextval('"homework"."User_id_seq"'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "isActive" bool NOT NULL DEFAULT true,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL,
  "isDeleted" bool NOT NULL DEFAULT false,
  "role" "homework"."UserRole" NOT NULL DEFAULT 'ADMIN'::homework."UserRole"
)
;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO "homework"."User" VALUES (1, 'admin', 'admin@email.com', '$argon2id$v=19$m=65536,t=3,p=4$QGTKQvJFzYWMCB+oViDwZA$gpwkgzLkyFpBVWRNOlck+JwYWxojvY/QgOqj3ym0xGQ', 't', '2024-07-27 06:38:25.128', '2024-07-27 06:38:25.128', 'f', 'ADMIN');
INSERT INTO "homework"."User" VALUES (2, 'Irin Saputra', 'irin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$QGTKQvJFzYWMCB+oViDwZA$gpwkgzLkyFpBVWRNOlck+JwYWxojvY/QgOqj3ym0xGQ', 'f', '2024-08-01 14:56:20.17', '2024-08-01 14:56:33.26', 'f', 'ADMIN');
INSERT INTO "homework"."User" VALUES (4, 'Irin', 'email@gmg.com', '$argon2id$v=19$m=65536,t=3,p=4$QGTKQvJFzYWMCB+oViDwZA$gpwkgzLkyFpBVWRNOlck+JwYWxojvY/QgOqj3ym0xGQ', 't', '2024-08-01 15:00:52.75', '2024-08-01 15:53:54.894', 'f', 'ADMIN');
INSERT INTO "homework"."User" VALUES (3, 'Miralce', 'miracle@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$QGTKQvJFzYWMCB+oViDwZA$gpwkgzLkyFpBVWRNOlck+JwYWxojvY/QgOqj3ym0xGQ', 't', '2024-08-01 14:56:50.612', '2024-08-01 15:53:41.535', 'f', 'ADMIN');
INSERT INTO "homework"."User" VALUES (5, 'Manager', 'manager@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$QGTKQvJFzYWMCB+oViDwZA$gpwkgzLkyFpBVWRNOlck+JwYWxojvY/QgOqj3ym0xGQ', 't', '2024-08-01 15:07:19.922', '2024-08-01 15:54:59.913', 'f', 'MANAGER');

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS "homework"."_prisma_migrations";
CREATE TABLE "homework"."_prisma_migrations" (
  "id" varchar(36) COLLATE "pg_catalog"."default" NOT NULL,
  "checksum" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "finished_at" timestamptz(6),
  "migration_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "logs" text COLLATE "pg_catalog"."default",
  "rolled_back_at" timestamptz(6),
  "started_at" timestamptz(6) NOT NULL DEFAULT now(),
  "applied_steps_count" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
INSERT INTO "homework"."_prisma_migrations" VALUES ('122df5d4-6868-437b-b870-933f2585ccca', 'c11f278c8ed0ce7c8c2b3a34acc4b38ffb462506a5a176a08feaa06f8d05bafa', '2024-07-27 13:23:18.380483+07', '20240727062318_setup_db', NULL, NULL, '2024-07-27 13:23:18.306625+07', 1);
INSERT INTO "homework"."_prisma_migrations" VALUES ('434e055c-06e6-45c2-99c5-a76c61e693e9', '8df865f44f0bf624f3c2761ce82b6511ee16dab06b82b8c152f749cceb1db910', '2024-07-28 13:38:11.951548+07', '20240728063811_change_field_delete_to_is_delete', NULL, NULL, '2024-07-28 13:38:11.929731+07', 1);
INSERT INTO "homework"."_prisma_migrations" VALUES ('2365e3c6-40a5-4741-be5c-d27a820e709a', 'd2c048bd13f5a78389102b0f1401608ff0cd333461028ff279a67806f9e65e06', '2024-07-29 13:20:43.092643+07', '20240729062042_add_status_field_and_remove_viewer_role', NULL, NULL, '2024-07-29 13:20:42.999005+07', 1);
INSERT INTO "homework"."_prisma_migrations" VALUES ('c7305b8c-1869-482b-b0bf-305e24bc6612', '118adbe0587e979ea32866760b3d5fee1ead41750edf7d3fda3f695ed276fdf0', '2024-07-29 13:30:35.183144+07', '20240729063033_change_variable_name', NULL, NULL, '2024-07-29 13:30:35.165011+07', 1);
INSERT INTO "homework"."_prisma_migrations" VALUES ('2915cfde-4d16-4011-9f9f-c0d2967ddf9e', 'c71598e51f70698d16f4dad3eb8fe1e0d5778c2508d2348764e082da3cf7473b', '2024-07-30 00:18:56.660362+07', '20240729171856_add_field_product_code', NULL, NULL, '2024-07-30 00:18:56.570407+07', 1);
INSERT INTO "homework"."_prisma_migrations" VALUES ('b85f14ad-9a85-4d07-b030-67d051578de6', '4e68b17ecd35bae287c59ac6e45197e1fe33cdfd6160aff07bd2008dd261da9d', '2024-07-31 23:58:22.503886+07', '20240731165822_remove_field_no_need', NULL, NULL, '2024-07-31 23:58:22.485973+07', 1);
INSERT INTO "homework"."_prisma_migrations" VALUES ('874f17cb-f8a7-464b-8fb6-a0372ae343d0', '1841161c3f3a6d323ee3ff6d0da819cbda839440e788bb966f34c064129cc795', '2024-08-01 22:25:43.807976+07', '20240801152543_change_isactive_value', NULL, NULL, '2024-08-01 22:25:43.785762+07', 1);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "homework"."Customer_id_seq"
OWNED BY "homework"."Customer"."id";
SELECT setval('"homework"."Customer_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "homework"."OrderItem_id_seq"
OWNED BY "homework"."OrderItem"."id";
SELECT setval('"homework"."OrderItem_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "homework"."Order_id_seq"
OWNED BY "homework"."Order"."id";
SELECT setval('"homework"."Order_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "homework"."Product_id_seq"
OWNED BY "homework"."Product"."id";
SELECT setval('"homework"."Product_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "homework"."User_id_seq"
OWNED BY "homework"."User"."id";
SELECT setval('"homework"."User_id_seq"', 5, true);

-- ----------------------------
-- Primary Key structure for table Customer
-- ----------------------------
ALTER TABLE "homework"."Customer" ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Order
-- ----------------------------
ALTER TABLE "homework"."Order" ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table OrderItem
-- ----------------------------
ALTER TABLE "homework"."OrderItem" ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Product
-- ----------------------------
ALTER TABLE "homework"."Product" ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE "homework"."User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table _prisma_migrations
-- ----------------------------
ALTER TABLE "homework"."_prisma_migrations" ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table Order
-- ----------------------------
ALTER TABLE "homework"."Order" ADD CONSTRAINT "Order_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "homework"."User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "homework"."Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "homework"."Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table OrderItem
-- ----------------------------
ALTER TABLE "homework"."OrderItem" ADD CONSTRAINT "OrderItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "homework"."Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "homework"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "homework"."Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "homework"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "homework"."Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
