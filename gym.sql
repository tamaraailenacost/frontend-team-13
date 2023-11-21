CREATE DATABASE  IF NOT EXISTS `gym` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gym`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: gym
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `clase`
--

DROP TABLE IF EXISTS `clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clase` (
  `clase_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `instructor` varchar(255) DEFAULT NULL,
  `capacidad_maxima` int DEFAULT NULL,
  `horario_id` int DEFAULT NULL,
  PRIMARY KEY (`clase_id`),
  KEY `fk_horario_idx` (`horario_id`),
  CONSTRAINT `fk_horario` FOREIGN KEY (`horario_id`) REFERENCES `horario` (`horario_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clase`
--

LOCK TABLES `clase` WRITE;
/*!40000 ALTER TABLE `clase` DISABLE KEYS */;
INSERT INTO `clase` VALUES (1,'gimnasia rítmica','Occupant of animal-drawn vehicle injured in collision with pedal cycle, subsequent encounter','Aaren Schwier',28,7),(2,'gimnasia artística','Infective myositis, forearm','Sherline Maystone',12,10),(3,'gimnasia acrobática','Nondisplaced fracture of epiphysis (separation) (upper) of right femur, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with routine healing','Coreen Aves',30,10),(4,'gimnasia aeróbica','Short Achilles tendon (acquired)','Hugibert Goldsack',20,7),(5,'gimnasia de trampolín','Postauricular fistula, unspecified ear','Fanchette Birtley',17,3),(6,'gimnasia rítmica','Unspecified displaced fracture of surgical neck of left humerus, initial encounter for closed fracture','Viva Doddemeade',17,1),(7,'gimnasia artística','Wear of articular bearing surface of internal prosthetic right knee joint, subsequent encounter','Valerie Pobjoy',23,2),(8,'gimnasia acrobática','Muscle wasting and atrophy, not elsewhere classified, unspecified forearm','Phil Goacher',23,5),(9,'gimnasia aeróbica','Nondisplaced avulsion fracture of tuberosity of left calcaneus, sequela','Delinda Bricket',14,10),(10,'gimnasia de trampolín','Displaced fracture of lateral condyle of left femur, initial encounter for open fracture type I or II','Marin Schultze',17,10);
/*!40000 ALTER TABLE `clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `cliente_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cliente_id`),
  KEY `fk_usuario_idx` (`usuario_id`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,1,'Chiarra Rand','353-145-4489'),(2,2,'Gal Kiessel','665-246-2167'),(3,3,'Herman Pocklington','884-373-8052'),(4,4,'Jodi Ingre','219-901-3285'),(5,5,'Egan Adami','874-216-9697'),(6,6,'Eran Willshear','804-416-9483'),(7,7,'Bing Pentin','221-320-7689'),(8,8,'Elena Nunes Nabarro','415-971-1707'),(9,9,'Mechelle Joyce','134-152-7838'),(10,10,'Ilka Pealing','370-398-1089');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia_semana`
--

DROP TABLE IF EXISTS `dia_semana`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia_semana` (
  `dia_semana_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`dia_semana_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_semana`
--

LOCK TABLES `dia_semana` WRITE;
/*!40000 ALTER TABLE `dia_semana` DISABLE KEYS */;
INSERT INTO `dia_semana` VALUES (1,'lunes'),(2,'martes'),(3,'miércoles'),(4,'jueves'),(5,'viernes'),(6,'sábado'),(7,'domingo');
/*!40000 ALTER TABLE `dia_semana` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `horario_id` int NOT NULL AUTO_INCREMENT,
  `dia_semana_id` int NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  PRIMARY KEY (`horario_id`,`hora_fin`),
  KEY `fk_dia_semana_idx` (`dia_semana_id`),
  CONSTRAINT `fk_dia_semana` FOREIGN KEY (`dia_semana_id`) REFERENCES `dia_semana` (`dia_semana_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` VALUES (1,1,'06:55:00','04:28:00'),(2,1,'22:29:00','14:55:00'),(3,6,'12:49:00','09:57:00'),(4,4,'18:33:00','06:33:00'),(5,2,'16:51:00','00:47:00'),(6,7,'01:21:00','03:59:00'),(7,2,'17:10:00','09:22:00'),(8,1,'16:08:00','13:26:00'),(9,7,'21:34:00','20:46:00'),(10,7,'18:03:00','00:36:00');
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `reserva_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `clase_id` int DEFAULT NULL,
  `fecha_reserva` date NOT NULL,
  PRIMARY KEY (`reserva_id`),
  KEY `fk_cliente_idx` (`cliente_id`),
  KEY `fk_clase_idx` (`clase_id`),
  CONSTRAINT `fk_clase` FOREIGN KEY (`clase_id`) REFERENCES `clase` (`clase_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`cliente_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,8,7,'2023-09-11'),(2,7,2,'2023-06-28'),(3,4,7,'2022-11-21'),(4,7,1,'2022-12-14'),(5,4,8,'2023-10-24'),(6,8,1,'2023-08-27'),(7,5,1,'2023-07-29'),(8,6,5,'2023-02-09'),(9,5,5,'2023-06-10'),(10,2,10,'2023-07-19'),(11,3,2,'2023-11-01'),(12,5,8,'2023-01-21'),(13,10,6,'2023-04-19'),(14,4,3,'2023-11-14'),(15,5,2,'2023-07-03'),(16,7,8,'2023-08-15'),(17,6,2,'2023-08-04'),(18,4,2,'2023-04-29'),(19,8,8,'2023-04-01'),(20,5,7,'2023-08-05');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `tipo_usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`tipo_usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'admin'),(2,'personal'),(3,'cliente');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `tipo_usuario_id` int NOT NULL,
  PRIMARY KEY (`usuario_id`),
  KEY `fk_tipo_usuario_idx` (`tipo_usuario_id`),
  CONSTRAINT `fk_tipo_usuario` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`tipo_usuario_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'gshailer0','cmcgarahan0@feedburner.com','pW1.QO04dIIm',3),(2,'gbranca1','adecaville1@techcrunch.com','cT5)TsHu0{s',3),(3,'gbarenski2','mabrahamoff2@comcast.net','uB0}XWX`~/|F!',2),(4,'ubothram3','gpraundl3@dot.gov','rP5|5C>g>}WF<',2),(5,'ljurisic4','fwimsett4@livejournal.com','yP8/gg?0akyLG?',1),(6,'jillston5','skrojn5@multiply.com','nT5/.jh9',3),(7,'jjillett6','cmedlicott6@plala.or.jp','wA3{1v5%3S?mH7',2),(8,'callcroft7','abirkett7@yahoo.co.jp','oN5>d_j}zC1}AE\"1',3),(9,'lmccard8','egodthaab8@comcast.net','zP1<}fPwRvuO%',1),(10,'bgood9','wthomsen9@bandcamp.com','nA0~Y|}8i9s',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-19 16:33:51
