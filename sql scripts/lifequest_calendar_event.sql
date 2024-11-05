-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lifequest
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `calendar_event`
--

DROP TABLE IF EXISTS `calendar_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar_event` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `accepted` bit(1) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `agent_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd6vfttvpc783x21h61urjlbc9` (`agent_id`),
  KEY `FKbacfttv2921opgo9htv1qmhi9` (`user_id`),
  CONSTRAINT `FKbacfttv2921opgo9htv1qmhi9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKd6vfttvpc783x21h61urjlbc9` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_event`
--

LOCK TABLES `calendar_event` WRITE;
/*!40000 ALTER TABLE `calendar_event` DISABLE KEYS */;
INSERT INTO `calendar_event` VALUES (1,_binary '\0','2024-08-17','Upcoming','14:00:00','Meeting With ---',103,1),(3,_binary '\0','2024-08-04','Upcoming','14:00:00','Meet w Aziz',103,111),(4,_binary '\0','2024-08-12','Upcoming','14:00:00','Meeting With ---',NULL,NULL);
/*!40000 ALTER TABLE `calendar_event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-05 20:54:48
