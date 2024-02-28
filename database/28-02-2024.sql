-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: 127.0.0.1    Database: nodejs
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apiKeys`
--

DROP TABLE IF EXISTS `apiKeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apiKeys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `permissions` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apiKeys`
--

LOCK TABLES `apiKeys` WRITE;
/*!40000 ALTER TABLE `apiKeys` DISABLE KEYS */;
/*!40000 ALTER TABLE `apiKeys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartDetails`
--

DROP TABLE IF EXISTS `CartDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` float NOT NULL,
  `total` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartDetails`
--

LOCK TABLES `CartDetails` WRITE;
/*!40000 ALTER TABLE `CartDetails` DISABLE KEYS */;
INSERT INTO `CartDetails` VALUES (1,1,1,6,50000000,300000000,'2024-01-31 04:25:02','2024-01-31 04:25:02'),(2,2,1,3,50000000,150000000,'2024-01-31 04:25:08','2024-01-31 04:25:08'),(3,4,2,2,50000000,100000000,'2024-02-05 08:33:04','2024-02-05 08:33:04'),(4,1,2,3,50000000,150000000,'2024-02-05 15:02:37','2024-02-05 15:02:37');
/*!40000 ALTER TABLE `CartDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carts`
--

DROP TABLE IF EXISTS `Carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_state` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'active',
  `cart_count_prod` int DEFAULT NULL,
  `cart_user_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carts`
--

LOCK TABLES `Carts` WRITE;
/*!40000 ALTER TABLE `Carts` DISABLE KEYS */;
INSERT INTO `Carts` VALUES (1,'active',NULL,1,'2024-01-30 16:01:03','2024-02-20 09:06:25'),(2,'active',NULL,2,'2024-02-05 08:33:04','2024-02-05 15:02:37');
/*!40000 ALTER TABLE `Carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clothings`
--

DROP TABLE IF EXISTS `Clothings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clothings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` json DEFAULT NULL,
  `material` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `color` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clothings`
--

LOCK TABLES `Clothings` WRITE;
/*!40000 ALTER TABLE `Clothings` DISABLE KEYS */;
INSERT INTO `Clothings` VALUES (2,3,'Jeans','[\"32\", \"31\", \"22\"]','đây là model của máy Quần jean ống xuông 222','[\"Đen\", \"Trắng\", \"RED\"]','2024-01-25 09:03:21','2024-01-31 04:24:19'),(3,4,'Jeans','[\"32\", \"31\", \"22\"]','đây là model của máy Quần jean ống xuông 1111111','[\"Đen\", \"Trắng\", \"RED\"]','2024-01-25 13:08:44','2024-01-25 13:08:44'),(4,1,'Jeans','[\"32\", \"31\", \"22\"]','đây là model của máy Quần jean ống xuông 1111111','[\"Đen\", \"Trắng\", \"RED\"]','2024-01-31 04:21:45','2024-01-31 04:21:45'),(5,2,'Jeans','[\"32\", \"31\", \"22\"]','đây là model của máy Quần jean ống xuông 222','[\"Đen\", \"Trắng\", \"RED\"]','2024-01-31 04:21:53','2024-01-31 04:21:53'),(24,52,'Jeans','[\"32\", \"31\", \"22\"]','đây là model của máy Quần jean ống xuông 222','[\"Đen\", \"Trắng\", \"RED\"]','2024-02-25 03:18:49','2024-02-25 03:18:49'),(25,53,'Jeans','[\"32\", \"31\", \"22\"]','đây là model của máy Quần jean ống xuông 111111','[\"Đen\", \"Trắng\", \"RED\"]','2024-02-25 03:19:19','2024-02-25 03:19:19');
/*!40000 ALTER TABLE `Clothings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_productId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment_userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `comment_left` decimal(10,0) DEFAULT NULL,
  `comment_right` decimal(10,0) DEFAULT NULL,
  `comment_parentId` decimal(10,0) DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,'1','4','comment 1',1,16,NULL,0,'2024-02-24 14:05:55','2024-02-24 14:15:43'),(2,'1','4','comment 1.1',2,3,1,0,'2024-02-24 14:06:25','2024-02-24 14:15:43'),(6,'1','4','comment 1.2',4,15,1,0,'2024-02-24 14:07:17','2024-02-24 14:15:43'),(7,'1','4','comment 1.2.1',5,10,6,0,'2024-02-24 14:07:38','2024-02-24 14:15:43'),(8,'1','4','comment 1.2.2',14,12,6,0,'2024-02-24 14:07:49','2024-02-24 14:15:43'),(9,'1','4','comment 1.2.3',16,14,6,0,'2024-02-24 14:07:53','2024-02-24 14:15:43'),(10,'1','4','comment 1.2.1.1',6,7,7,0,'2024-02-24 14:08:12','2024-02-24 14:15:43'),(11,'1','4','comment 1.2.1.2',8,9,7,0,'2024-02-24 14:08:17','2024-02-24 14:15:43');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Discount_Deletes`
--

DROP TABLE IF EXISTS `Discount_Deletes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Discount_Deletes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discount_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `discount_shopId` int NOT NULL,
  `discount_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `discount_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'fixed_amount',
  `discount_value` int NOT NULL,
  `discount_max_value` int NOT NULL,
  `discount_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `discount_start_date` datetime NOT NULL,
  `discount_end_date` datetime NOT NULL,
  `discount_max_uses` json DEFAULT NULL,
  `discount_use_count` int DEFAULT NULL,
  `discount_users_used` int DEFAULT NULL,
  `discount_max_uses_per_user` int DEFAULT NULL,
  `discount_min_order_value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount_is_active` tinyint(1) DEFAULT '1',
  `discount_product_id` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Discount_Deletes`
--

LOCK TABLES `Discount_Deletes` WRITE;
/*!40000 ALTER TABLE `Discount_Deletes` DISABLE KEYS */;
INSERT INTO `Discount_Deletes` VALUES (4,'name percentage discount',1,'description discount','percentage',20000,30000,'SHOP-101','2024-01-30 02:00:00','2024-01-23 02:00:00','100',0,NULL,1,200000.00,1,'[]','2024-01-25 14:53:05','2024-01-25 15:14:01'),(5,'name percentage discount',1,'description discount','percentage',20000,30000,'SHOP-101','2024-01-30 02:00:00','2024-01-23 02:00:00','100',0,NULL,1,200000.00,1,'[]','2024-01-25 15:18:46','2024-01-25 15:19:04'),(7,'name percentage discount',1,'description discount','percentage',10,30000,'SHOP-107','2024-01-30 02:00:00','2024-01-23 02:00:00','100',0,NULL,1,200000.00,1,'[]','2024-01-26 13:08:04','2024-02-19 08:43:51');
/*!40000 ALTER TABLE `Discount_Deletes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Discounts`
--

DROP TABLE IF EXISTS `Discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Discounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discount_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `discount_shopId` int NOT NULL,
  `discount_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `discount_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'fixed_amount',
  `discount_value` int NOT NULL,
  `discount_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `discount_start_date` datetime NOT NULL,
  `discount_end_date` datetime NOT NULL,
  `discount_max_uses` int DEFAULT NULL,
  `discount_use_count` int DEFAULT NULL,
  `discount_users_used` json DEFAULT NULL,
  `discount_max_uses_per_user` int NOT NULL,
  `discount_min_order_value` decimal(10,2) NOT NULL,
  `discount_max_value` decimal(10,2) NOT NULL,
  `discount_is_active` tinyint(1) DEFAULT '1',
  `discount_applies_to` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `discount_product_id` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Discounts`
--

LOCK TABLES `Discounts` WRITE;
/*!40000 ALTER TABLE `Discounts` DISABLE KEYS */;
INSERT INTO `Discounts` VALUES (1,'name percentage discount',1,'description discount','percentage',10,'SHOP-109','2024-01-30 02:00:00','2024-01-23 02:00:00',100,0,NULL,1,200000.00,30000.00,1,'all','[]','2024-01-25 09:16:51','2024-01-26 13:08:20'),(2,'name percentage discount',2,'description discount','fixed_amount',20000,'SHOP-104','2024-01-30 02:00:00','2024-01-23 02:00:00',100,0,NULL,1,200000.00,100000.00,1,'all','[]','2024-01-25 09:17:24','2024-01-25 09:17:24'),(6,'name percentage discount',1,'description discount','percentage',10,'SHOP-105','2024-01-30 02:00:00','2024-01-23 02:00:00',100,0,NULL,1,200000.00,30000.00,1,'specific','[1]','2024-01-26 13:02:39','2024-01-26 13:02:39'),(8,'name percentage discount',2,'description discount','percentage',20,'SHOP-102','2024-01-30 02:00:00','2024-01-23 02:00:00',100,0,NULL,1,200000.00,30000.00,1,'all','[]','2024-02-05 08:34:18','2024-02-05 08:34:18'),(9,'name percentage discount',2,'description discount','percentage',20,'SHOP-1011','2024-01-30 02:00:00','2024-01-23 02:00:00',100,0,NULL,1,200000.00,3000000.00,1,'all','[4]','2024-02-05 08:39:27','2024-02-05 08:39:27');
/*!40000 ALTER TABLE `Discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Electronics`
--

DROP TABLE IF EXISTS `Electronics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Electronics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `manufacturer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `color` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Electronics`
--

LOCK TABLES `Electronics` WRITE;
/*!40000 ALTER TABLE `Electronics` DISABLE KEYS */;
INSERT INTO `Electronics` VALUES (1,1,'Apple','y là model của macbook-pro-m1 32gb ,1T , chip M1 2025','[\"Black\", \"White\", \"Gold\"]','2024-01-25 08:58:05','2024-01-31 04:23:59'),(2,2,'Apple','y là model của macbook-pro-m1 32gb ,1T , chip M1 2025','[\"Black\", \"White\", \"Gold\"]','2024-01-25 09:02:32','2024-01-31 04:24:09'),(3,3,'Apple','y là model của macbook-pro-m1 32gb ,1T , chip M1 20211111','[\"Black\", \"White\", \"Gold\"]','2024-01-31 04:22:23','2024-01-31 04:22:23'),(4,4,'Apple','y là model của macbook-pro-m1 32gb ,1T , chip M1 2025 shop2','[\"Black\", \"White\", \"Gold\"]','2024-01-31 04:22:38','2024-02-05 08:32:30'),(5,28,'Apple','y là model của macbook-pro-m1 32gb ,1T , chip M1 2025 shop222222','[\"Black\", \"White\", \"Gold\"]','2024-02-17 03:40:45','2024-02-17 03:40:45');
/*!40000 ALTER TABLE `Electronics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inventories`
--

DROP TABLE IF EXISTS `Inventories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `inven_product_id` int NOT NULL,
  `inven_location` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'unKnow',
  `inven_stock` int NOT NULL,
  `inven_shopId` int DEFAULT NULL,
  `inven_temporary_order` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inven_product_id` (`inven_product_id`),
  KEY `inven_shopId` (`inven_shopId`),
  CONSTRAINT `inventories_ibfk_1` FOREIGN KEY (`inven_product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `inventories_ibfk_2` FOREIGN KEY (`inven_shopId`) REFERENCES `Shops` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventories`
--

LOCK TABLES `Inventories` WRITE;
/*!40000 ALTER TABLE `Inventories` DISABLE KEYS */;
INSERT INTO `Inventories` VALUES (4,28,'unKnow',215,1,'5','2024-02-17 03:40:45','2024-02-20 09:07:28'),(28,52,'unknown',100,4,'[]','2024-02-25 03:18:49','2024-02-25 03:18:49'),(29,53,'unknown',100,4,'[]','2024-02-25 03:19:19','2024-02-25 03:19:19');
/*!40000 ALTER TABLE `Inventories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Keytokens`
--

DROP TABLE IF EXISTS `Keytokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Keytokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `publicKey` json NOT NULL,
  `privateKey` json NOT NULL,
  `refreshTokensUsed` json DEFAULT NULL,
  `refreshToken` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `keytokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Shops` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Keytokens`
--

LOCK TABLES `Keytokens` WRITE;
/*!40000 ALTER TABLE `Keytokens` DISABLE KEYS */;
INSERT INTO `Keytokens` VALUES (1,1,'\"ac195d38de90a6cad0ce7ecbbe3378001d1eab7c257ea3219fb7a36e2f8aec8ef384e99aa5ad5a70d702f830e81b48eb7288824e73b33810793c999e905df4ef\"','\"c02c2c97fbd4b9078bbd52a93e5829278c7f4a1e66ad70d7c30f773bbd4bb3c1b6ce4da80f2973ed25a2088bea69f3ed524771cce2fd818c65af589dddecd456\"',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaHV5MTIzQGdtYWlsLmNvbSIsImlhdCI6MTcwODQ3ODUyNCwiZXhwIjoxNzA5MDgzMzI0fQ.27l8smNHjddxv1M2u-dciKzX9dRcTq2BjUeJhOjkWcY','2024-01-23 03:07:05','2024-02-21 01:22:04'),(2,2,'\"f1c7cf2d6f42adb3cc9e18a9d14c9ca200bb16283aedf81aa722e46732ae32103530b766f96aee0fecf8680f39a276da6b29aa8f16f9722a3e68db7c997d0707\"','\"6879867541f1498e8e172e92b6f9c00b97f93278d055abbfa099d9234d4cf064017ba41a6c2e36b5c43bfd36c42d6fc6077fe0c68d06231515a04f65a9d558cf\"',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHV5MUBnbWFpbC5jb20iLCJpYXQiOjE3MDkwOTMyNDgsImV4cCI6MTcwOTY5ODA0OH0.4dyltgFpfqySts0Z3Srud-2lFK7EJtOrziC7iNWGkXg','2024-01-23 03:07:18','2024-02-28 04:07:28'),(3,4,'\"fd2abe28bd8276b4890e95b6b87a5c3897cfcab4085850247e8d953ba7241d64ea921eeb56bc4476d93b063cd4cee0055f2f0e78007dae9539f8403b2e95e608\"','\"e0464899c32ff2c9b48d717dc859eba2fda073ff65a9fe503d33650b8e8b01dee3165a76755baa0b1270b6653186355b259e38f0d39b3ac7c5b5a3bdd578383f\"',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiaHV5MTExQGdtYWlsLmNvbSIsImlhdCI6MTcwODc4MjA5NywiZXhwIjoxNzA5Mzg2ODk3fQ.IDirf49SXxhD8lwnVMiTNkcsEha3wbHau6Psxa3396s','2024-02-23 12:25:29','2024-02-24 13:41:37');
/*!40000 ALTER TABLE `Keytokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_userId` int NOT NULL,
  `order_shopId` int DEFAULT NULL,
  `order_total_price` decimal(10,0) NOT NULL,
  `order_total_discount` decimal(10,0) NOT NULL,
  `order_freeShip` decimal(10,0) NOT NULL,
  `order_ship_street` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_ship_wards` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_ship_district` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_ship_city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_ship_country` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `order_payment` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'afterReceiver',
  `order_tracking_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'pendding',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,2,1,135000000,15000000,0,'thôn 22','earok','easuop','Đắk Lắk','Việt Nam','afterReceiver','','canceled','2024-02-20 08:15:13','2024-02-21 01:16:48'),(2,1,1,225000000,25000000,0,'thôn 22','earok','easuop','Đắk Lắk','Việt Nam','afterReceiver','','successed','2024-02-20 09:07:28','2024-02-21 01:23:31');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrdersDetails`
--

DROP TABLE IF EXISTS `OrdersDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrdersDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrdersDetails`
--

LOCK TABLES `OrdersDetails` WRITE;
/*!40000 ALTER TABLE `OrdersDetails` DISABLE KEYS */;
INSERT INTO `OrdersDetails` VALUES (1,1,28,3,135000000,'2024-02-20 08:15:13','2024-02-20 08:15:13'),(2,2,28,5,250000000,'2024-02-20 09:07:28','2024-02-20 09:07:28');
/*!40000 ALTER TABLE `OrdersDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_slug` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_thumb` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `product_price` double DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `product_type` int DEFAULT NULL,
  `product_shop` int DEFAULT NULL,
  `product_start` int DEFAULT NULL,
  `isDraft` tinyint(1) DEFAULT '1',
  `isPublished` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'Macbook Pro M2 ','','macbook-pro-m2.png','Macbook Pro M2',50000000,223,2,1,4,0,1,'2024-01-31 04:23:59','2024-01-31 04:23:59'),(2,'Macbook Pro M1 ','','macbook-pro-m1.png','Macbook Pro M1',50000000,223,2,1,4,0,1,'2024-01-31 04:24:09','2024-01-31 04:24:09'),(3,'Quấn Áo Nam Nữ 222','','macbook-pro-m1.png','Quấn Áo Nam Nữ222',50000000,223,1,1,4,0,1,'2024-01-31 04:24:19','2024-01-31 04:24:19'),(4,'Macbook Pro M2 shop2','','macbook-pro-m2.png','Macbook Pro M2 shop2',50000000,223,2,2,4,0,1,'2024-02-05 08:32:30','2024-02-05 08:37:30'),(28,'Macbook Pro M2 shop2222','','macbook-pro-m2.png','Macbook Pro M2 shop222222',50000000,215,2,1,4,0,1,'2024-02-17 03:40:45','2024-02-20 09:07:28'),(52,'Giay Da bong ToniKroos','','Giay Da bong ToniKroos.png','Giay Da bong ToniKroos- bền bỉ , thoải mãi . ôm chân',600000,100,1,4,4,1,0,'2024-02-25 03:18:49','2024-02-25 03:18:49'),(53,'Giay Da bong ToniKroos11111','','Giay Da bong ToniKroos.png','Giay Da bong ToniKroos- bền bỉ , thoải mãi . ôm chân1111',600000,100,1,4,4,1,0,'2024-02-25 03:19:19','2024-02-25 03:19:19');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductsTypes`
--

DROP TABLE IF EXISTS `ProductsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductsTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductsTypes`
--

LOCK TABLES `ProductsTypes` WRITE;
/*!40000 ALTER TABLE `ProductsTypes` DISABLE KEYS */;
INSERT INTO `ProductsTypes` VALUES (1,'clothings','2024-01-23 16:33:42','2024-01-23 16:33:42'),(2,'electronic','2024-01-23 16:33:57','2024-01-23 16:33:57');
/*!40000 ALTER TABLE `ProductsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pushnotifications`
--

DROP TABLE IF EXISTS `Pushnotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pushnotifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `noti_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `noti_senderId` int DEFAULT NULL,
  `noti_receivedId` json DEFAULT NULL,
  `noti_content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `noti_product_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `noti_shop_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pushnotifications`
--

LOCK TABLES `Pushnotifications` WRITE;
/*!40000 ALTER TABLE `Pushnotifications` DISABLE KEYS */;
INSERT INTO `Pushnotifications` VALUES (1,'ADD_PRODUCT_SHOP',4,'[4]','Shop- huy111@gmail.com vừa thêm 1 sản phẩm mới: Giay Da bong ToniKroos','Giay Da bong ToniKroos',NULL,'','2024-02-25 03:18:49','2024-02-25 03:18:49'),(2,'ADD_PRODUCT_SHOP',4,'[1]','Shop- huy111@gmail.com vừa thêm 1 sản phẩm mới: Giay Da bong ToniKroos11111','Giay Da bong ToniKroos11111',NULL,'','2024-02-25 03:19:19','2024-02-25 03:19:19');
/*!40000 ALTER TABLE `Pushnotifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20231127070927-Shops.js'),('20231127071015-KeyToken.js'),('20231129132928-create-api-key.js'),('20240103130114-create-products.js'),('20240103131419-create-products-type.js'),('20240103132710-create-type-clothings.js'),('20240217030246-create-inventorys.js'),('20240219082515-create-orders.js'),('20240219082531-create-orders-details.js'),('20240221015522-create-comment.js'),('20240225020752-create-notifications.js'),('create_discounts_delete.js'),('create-cart-details.js'),('create-cart.js'),('discount_table.js'),('type-electronic.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shops`
--

DROP TABLE IF EXISTS `Shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shops` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` json DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'inactive',
  `verify` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shops`
--

LOCK TABLES `Shops` WRITE;
/*!40000 ALTER TABLE `Shops` DISABLE KEYS */;
INSERT INTO `Shops` VALUES (1,'Quoc','Huy','$2b$10$2f8COe9eU/VUKlqKy7kluudZu6iZ8k5BXqlMalVKvN7CLvyLnNL4S','huy123@gmail.com','[\"ADMIN\", \"SHOP\"]','inactive',NULL,'2024-01-23 03:07:05','2024-01-23 03:07:05'),(2,'Quoc','Huy','$2b$10$.ObWT4eTcnu/DYfMkUgC2OqgEGhZrI5DGyoFeLmff5wxxIkOh/PoW','huy1@gmail.com','[\"ADMIN\", \"SHOP\"]','inactive',NULL,'2024-01-23 03:07:18','2024-01-23 03:07:18'),(3,'John','Doe',NULL,'example@example.com','[\"admin\"]','active',NULL,'2024-02-19 07:08:19','2024-02-19 07:08:19'),(4,'Quoc','Huy','$2b$10$U.pW0u1ocm9a4.A8IuEuMe1P7kDEnngNtYIIoK.HFQfnfVsLeLWVO','huy111@gmail.com','[\"ADMIN\", \"SHOP\"]','inactive',NULL,'2024-02-23 12:25:29','2024-02-23 12:25:29');
/*!40000 ALTER TABLE `Shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_insert_data`
--

DROP TABLE IF EXISTS `test_insert_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_insert_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_insert_data`
--

LOCK TABLES `test_insert_data` WRITE;
/*!40000 ALTER TABLE `test_insert_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_insert_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-28 11:11:24
