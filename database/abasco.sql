-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: abasco
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Casa'),(2,'Campo'),(3,'Lote'),(4,'Oficina'),(5,'Departamento'),(6,'Local'),(7,'Quinta'),(8,'Edificio'),(9,'Galpon/Deposito'),(10,'Emprendimiento');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datos_tecnicos`
--

DROP TABLE IF EXISTS `datos_tecnicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datos_tecnicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCasa` int(11) NOT NULL,
  `dormitorios` int(2) NOT NULL,
  `s_terreno` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `s_cubierta` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `s_semicubierta` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cochera` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `pileta` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCasa` (`idCasa`),
  CONSTRAINT `datos_tecnicos_ibfk_1` FOREIGN KEY (`idCasa`) REFERENCES `inmuebles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_tecnicos`
--

LOCK TABLES `datos_tecnicos` WRITE;
/*!40000 ALTER TABLE `datos_tecnicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `datos_tecnicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCasa` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `header` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCasa` (`idCasa`) USING BTREE,
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`idCasa`) REFERENCES `inmuebles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inmuebles`
--

DROP TABLE IF EXISTS `inmuebles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inmuebles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idOperacion` int(11) NOT NULL,
  `precio` int(8) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `direccion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(1500) COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idOperacion` (`idOperacion`),
  KEY `idLocalidad` (`idLocalidad`),
  KEY `idCategoria` (`idCategoria`),
  CONSTRAINT `inmuebles_ibfk_1` FOREIGN KEY (`idOperacion`) REFERENCES `tipo_operacion` (`id`),
  CONSTRAINT `inmuebles_ibfk_2` FOREIGN KEY (`idLocalidad`) REFERENCES `ubicacion` (`id`),
  CONSTRAINT `inmuebles_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inmuebles`
--

LOCK TABLES `inmuebles` WRITE;
/*!40000 ALTER TABLE `inmuebles` DISABLE KEYS */;
INSERT INTO `inmuebles` VALUES (1,1,0,7,'Calle Azcuenaga',7,'Casa-Quinta en Barrio Los Pinos sobre terreno de 2560 m2. Calle Azcuenaga. A tan solo dos cuadras de colectora ruta 8 km 73 Descripción interior: Planta alta: 2 baños/1 baño con jacuzzi/1 con bañera 3 habitaciones Planta baja: 1 cocina 1 comedor 1 living 1 lavadero 2 habitaciones Descripción exterior: parrilla pileta de 10×5 con solarium Molino de viento funcionando y abasteciendo toda la quinta con agua Alambre tejido en todo el perimetro Pergola Portón Todos los servicios!!','Disponible');
/*!40000 ALTER TABLE `inmuebles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCasa` int(11) NOT NULL,
  `luz` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `agua` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `calefaccion` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCasa` (`idCasa`),
  CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`idCasa`) REFERENCES `inmuebles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_operacion`
--

DROP TABLE IF EXISTS `tipo_operacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_operacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operacion` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_operacion`
--

LOCK TABLES `tipo_operacion` WRITE;
/*!40000 ALTER TABLE `tipo_operacion` DISABLE KEYS */;
INSERT INTO `tipo_operacion` VALUES (1,'Venta'),(2,'Alquiler'),(3,'Alquiler Temporada');
/*!40000 ALTER TABLE `tipo_operacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ubicacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partido` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `localidad` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'Exaltacion de la Cruz','Capilla del Señor'),(2,'Exaltacion de la Cruz','Los Cardales'),(3,'Exaltacion de la Cruz','Parada Robles'),(4,'Exaltacion de la Cruz','Diego Gaynor'),(5,'Exaltacion de la Cruz','La Lata'),(6,'Exaltacion de la Cruz','Est. Chenaut'),(7,'Exaltacion de la Cruz','Los Pinos'),(8,'Exaltacion de la Cruz','Pavon'),(9,'Exaltacion de la Cruz','Pque. Sakura'),(10,'Exaltacion de la Cruz','El Remanso'),(11,'Exaltacion de la Cruz','Arroyo de la Cruz'),(12,'Pilar','Pilar'),(13,'Pilar','Villa Astolfi'),(14,'Pilar','Manuel Alberti'),(15,'Pilar','Lagomarsino'),(16,'Pilar','Del Viso'),(17,'Pilar','Zelaya'),(18,'Pilar','La Lonja'),(19,'Pilar','Manzanares'),(20,'Pilar','Derqui'),(21,'Pilar','Villa Rosa'),(22,'Pilar','Fátima');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-03 21:13:11
