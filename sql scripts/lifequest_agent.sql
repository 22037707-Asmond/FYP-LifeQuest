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
-- Table structure for table `agent`
--

DROP TABLE IF EXISTS `agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent` (
  `bio` varchar(255) DEFAULT NULL,
  `license` varchar(255) DEFAULT NULL,
  `mr_ms` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `salary` double NOT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `years_of_experience` int NOT NULL,
  `id` bigint NOT NULL,
  `about` text,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKjl3hmt7iw16qt9dmvujqhc08e` FOREIGN KEY (`id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent`
--

LOCK TABLES `agent` WRITE;
/*!40000 ALTER TABLE `agent` DISABLE KEYS */;
INSERT INTO `agent` VALUES ('5 years experienced Insurance agent with expertise in retirement planning and life insurance','TK123P',NULL,'92287068',7900,'92287068',5,2,NULL),('8 years experienced Insurance agent specializing in health and wellness insurance plans','TC87456L',NULL,'92287068',8700,'92287068',8,102,'With eight years of experience in the insurance industry, I specialize in health and wellness insurance plans. My focus is on helping individuals and families secure their health and financial well-being through comprehensive and affordable insurance options. I work closely with clients to understand their needs and provide personalized plans that offer peace of mind and financial security. My passion for health and wellness drives my commitment to delivering exceptional service and ensuring client satisfaction.'),('7 years experienced Insurance agent with a focus on corporate insurance solutions','TC99887Z',NULL,'92287068',8500,'92287068',7,103,'A dedicated insurance agent with seven years of experience, specializing in corporate insurance solutions. I assist businesses in protecting their assets, employees, and operations through tailored insurance plans. My approach involves a deep understanding of each company\'s unique risks and challenges, enabling me to deliver comprehensive coverage that aligns with their strategic goals. My commitment to exceptional service and my expertise in the corporate sector have made me a trusted partner for businesses seeking reliable insurance solutions.'),('6 years experienced Insurance agent with a focus on life insurance and financial planning','TC56342Q',NULL,'92287068',8300,'92287068',6,104,'A highly experienced insurance agent with six years in the field, specializing in life insurance and financial planning. I help clients protect their loved ones and secure their financial future through strategic insurance solutions. My approach is client-centered, ensuring that each plan is tailored to meet the specific needs and goals of the individual or family. I am dedicated to providing the highest level of service, building long-term relationships, and helping clients achieve peace of mind.'),('6 years experienced Insurance agent specializing in life insurance and estate planning','TC32145C',NULL,NULL,8200,NULL,6,105,'With six years of experience, I specialize in life insurance and estate planning, providing clients with the tools they need to protect their legacy and ensure their family\'s financial well-being. My approach is comprehensive and detail-oriented, focusing on creating customized solutions that reflect each client\'s unique circumstances. I am dedicated to helping clients navigate the complexities of insurance and estate planning, providing peace of mind and security for the future.'),('3 years experienced Insurance agent with expertise in retirement planning and wealth management','TC65432A',NULL,NULL,7000,NULL,3,106,'An experienced insurance agent with three years in the industry, specializing in retirement planning and wealth management. My goal is to help clients achieve a secure and comfortable retirement by providing strategic insurance solutions that align with their long-term financial objectives. I take pride in offering personalized guidance and support, ensuring that each client feels confident and well-prepared for their future. My dedication to client success is reflected in my consistent ability to deliver results that exceed expectations.'),('5 years experienced Insurance agent with a passion for helping families achieve financial security','TC98765B',NULL,NULL,7800,NULL,5,107,'A seasoned insurance agent with five years of experience, specializing in providing tailored solutions that help families secure their financial future. I focus on understanding each client\'s unique needs and delivering comprehensive insurance plans that protect their loved ones and assets. My approach is rooted in empathy and a deep commitment to client satisfaction, which has enabled me to build strong, lasting relationships with the families I serve.'),('4 years experienced Insurance agent with a strong expertise in risk management and wealth preservation','TC45789H',NULL,NULL,7200,NULL,4,108,'An accomplished insurance agent with four years of experience, specializing in risk management and wealth preservation strategies. I focus on helping clients protect their assets and ensure their financial security through comprehensive insurance solutions. My client-centric approach involves understanding individual needs and crafting customized plans that provide peace of mind and financial stability. My dedication to maintaining the highest standards of service has earned me a reputation for reliability and trustworthiness among my clients.'),('5 years experienced Insurance agent specializing in health and life insurance solutions','TL98765B',NULL,NULL,8500,NULL,5,152,'A dedicated insurance agent with five years of experience, focusing on providing clients with comprehensive health and life insurance solutions. My mission is to support individuals and families in securing their future through tailored policies that meet their unique needs. I believe in a client-centered approach and strive to build long-lasting relationships based on trust and transparency. My extensive knowledge in health and life insurance enables me to guide clients through complex decisions with clarity and confidence.'),('5 years experienced Insurance agent specializing in health and life insurance solutions','TL98765B',NULL,NULL,8500,NULL,5,153,'A dedicated insurance agent with five years of experience, focusing on providing clients with comprehensive health and life insurance solutions. My mission is to support individuals and families in securing their future through tailored policies that meet their unique needs. I believe in a client-centered approach and strive to build long-lasting relationships based on trust and transparency. My extensive knowledge in health and life insurance enables me to guide clients through complex decisions with clarity and confidence.');
/*!40000 ALTER TABLE `agent` ENABLE KEYS */;
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
