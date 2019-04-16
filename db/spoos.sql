/*
 Navicat MySQL Data Transfer

 Source Server         : mac
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : spoos

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 31/03/2019 15:01:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application` (
  `appId` int(11) NOT NULL AUTO_INCREMENT,
  `appKey` varchar(100) NOT NULL,
  `appName` varchar(100) NOT NULL,
  `appInfo` varchar(100) DEFAULT NULL,
  `appSecret` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `updateTime` bigint(20) DEFAULT NULL,
  `createTime` bigint(20) NOT NULL,
  PRIMARY KEY (`appId`),
  UNIQUE KEY `application_appKey_uindex` (`appKey`),
  UNIQUE KEY `application_appName_uindex` (`appName`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for object
-- ----------------------------
DROP TABLE IF EXISTS `object`;
CREATE TABLE `object` (
  `objectId` int(11) NOT NULL AUTO_INCREMENT,
  `appKey` varchar(100) NOT NULL,
  `objectKey` varchar(100) NOT NULL,
  `objectName` varchar(100) NOT NULL,
  `sourceName` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `size` int(11) NOT NULL,
  `hash` varchar(32) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createTime` bigint(20) NOT NULL,
  `updateTime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`objectId`),
  UNIQUE KEY `object_objectKey_uindex` (`objectKey`),
  KEY `object_application_appKey_fk` (`appKey`),
  CONSTRAINT `object_application_appKey_fk` FOREIGN KEY (`appKey`) REFERENCES `application` (`appKey`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
