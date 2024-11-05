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
-- Table structure for table `insurance`
--

DROP TABLE IF EXISTS `insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `premium` double NOT NULL,
  `insurance_type_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhl6mk0tpk98odeq9ghm0ffgnx` (`insurance_type_id`),
  KEY `FKfrkdtioooy0910stx9s8vudyi` (`user_id`),
  CONSTRAINT `FKfrkdtioooy0910stx9s8vudyi` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKhl6mk0tpk98odeq9ghm0ffgnx` FOREIGN KEY (`insurance_type_id`) REFERENCES `insurance_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance`
--

LOCK TABLES `insurance` WRITE;
/*!40000 ALTER TABLE `insurance` DISABLE KEYS */;
INSERT INTO `insurance` VALUES (1,'PRUShield is a medical insurance plan that provides comprehensive coverage for hospital and surgical expenses.','PRUShield',500,1,NULL),(2,'PRUExtra provides additional coverage for medical expenses.','PRUExtra',200,1,NULL),(3,'PRUActive Protect is designed for active individuals.','PRUActive Protect',150,1,NULL),(4,'PRUCancer 360 covers cancer treatment expenses.','PRUCancer 360',300,1,NULL),(5,'Early stage crisis cover for critical illnesses.','PRU Early Stage Crisis Cover',250,1,NULL),(6,'Coverage for dengue fever treatment.','PRU Safe Dengue',100,1,NULL),(7,'Coverage for COVID-19 treatment.','PRU Safe COVIDCover',100,1,NULL),(8,'Life insurance for long-term financial security.','PRULife Vantage Achiever Prime Series',600,2,NULL),(9,'Legacy planning with life insurance benefits.','PRUVantage Legacy Index',700,2,NULL),(10,'Life insurance with income benefits in USD.','PRULifetime Income Premier (USD)',650,2,NULL),(11,'Enhanced lifetime income benefits.','PRULifetime Income Plus',620,2,NULL),(12,'Investment-linked plan for flexible growth.','PRULink FlexGrowth',550,3,NULL),(13,'Wealth accumulation plan in SGD.','PRUWealth Plus (SGD)',580,3,NULL),(14,'Comprehensive wealth accumulation plan.','PRUVantage Wealth',600,3,NULL),(15,'Legacy planning with investment benefits.','PRUVantage Legacy Index',750,4,NULL),(16,'Microinsurance for hospital and surgical expenses.','PruShield',50,5,NULL),(17,'Coverage for sports-related injuries.','PRUSafe Sports',30,5,NULL),(18,'Comprehensive microinsurance\n\nplan.','PruSafe Guard 22',40,5,NULL),(19,'Microinsurance for COVID-19 treatment.','PRUSafe COVIDCover',25,5,NULL),(20,'Microinsurance for dengue treatment.','PRUSafe Dengue',25,5,NULL),(21,'Coverage for prostate cancer treatment.','PRUSafe Prostate Cancer',35,5,NULL),(22,'Coverage for breast cancer treatment.','PRUSafe Breast Cancer',35,5,NULL);
/*!40000 ALTER TABLE `insurance` ENABLE KEYS */;
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
