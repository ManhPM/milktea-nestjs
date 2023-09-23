import { MigrationInterface, QueryRunner } from 'typeorm';

export class Database1695412266967 implements MigrationInterface {
  name = 'Database1695412266967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`description\` varchar(3000) NOT NULL, \`paymentDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`bookingId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, \`description\` varchar(3000) NOT NULL, UNIQUE INDEX \`IDX_cb776c7d842f8375b60273320d\` (\`categoryName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`guide\` (\`id\` int NOT NULL AUTO_INCREMENT, \`guideName\` varchar(255) NOT NULL, \`photo\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`languages\` varchar(255) NOT NULL, \`description\` varchar(3000) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wishlist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`tourId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(255) NOT NULL, \`photo\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`rating\` int NOT NULL, \`userId\` int NULL, \`tourId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tour\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tourName\` varchar(255) NOT NULL, \`itineraries\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`photo\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`price\` int NOT NULL, \`discount\` int NOT NULL, \`description\` varchar(3000) NOT NULL, \`availableSeats\` int NOT NULL, \`maxSeats\` int NOT NULL, \`status\` int NOT NULL, \`featured\` tinyint NOT NULL, \`categoryId\` int NULL, \`guideId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`booking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`guestSize\` int NOT NULL, \`total\` int NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`tourId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`feedback\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(3000) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`verifyID\` int NOT NULL, \`photo\` varchar(255) NOT NULL, \`roleId\` int NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_coupon\` (\`id\` int NOT NULL AUTO_INCREMENT, \`expireDate\` datetime NOT NULL, \`quantity\` int NOT NULL, \`userId\` int NULL, \`couponId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`coupon\` (\`id\` int NOT NULL AUTO_INCREMENT, \`couponCode\` varchar(255) NOT NULL, \`discountPercentage\` int NOT NULL, \`description\` varchar(3000) NOT NULL, UNIQUE INDEX \`IDX_8c53e91ce72dd424a812e77113\` (\`couponCode\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_b046318e0b341a7f72110b75857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_5738278c92c15e1ec9d27e3a098\` FOREIGN KEY (\`bookingId\`) REFERENCES \`booking\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_f6eeb74a295e2aad03b76b0ba87\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_7d7eba3880d07402ac3b36b4f89\` FOREIGN KEY (\`tourId\`) REFERENCES \`tour\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` ADD CONSTRAINT \`FK_de57b596937c3f0ee832dc2372a\` FOREIGN KEY (\`tourId\`) REFERENCES \`tour\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour\` ADD CONSTRAINT \`FK_f8ca29b2c218abd8aa1e0e1c4da\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour\` ADD CONSTRAINT \`FK_110c5c3c68a047a899ace93a60e\` FOREIGN KEY (\`guideId\`) REFERENCES \`guide\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_336b3f4a235460dc93645fbf222\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_c7cbbc825f4a9eb63d6fa130f56\` FOREIGN KEY (\`tourId\`) REFERENCES \`tour\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_4a39e6ac0cecdf18307a365cf3c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_coupon\` ADD CONSTRAINT \`FK_a0c3ed423523473ee2cc9c479ba\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_coupon\` ADD CONSTRAINT \`FK_183c6f34705a20750f83ea4e999\` FOREIGN KEY (\`couponId\`) REFERENCES \`coupon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_coupon\` DROP FOREIGN KEY \`FK_183c6f34705a20750f83ea4e999\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_coupon\` DROP FOREIGN KEY \`FK_a0c3ed423523473ee2cc9c479ba\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_4a39e6ac0cecdf18307a365cf3c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_c7cbbc825f4a9eb63d6fa130f56\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_336b3f4a235460dc93645fbf222\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour\` DROP FOREIGN KEY \`FK_110c5c3c68a047a899ace93a60e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tour\` DROP FOREIGN KEY \`FK_f8ca29b2c218abd8aa1e0e1c4da\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_de57b596937c3f0ee832dc2372a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_7d7eba3880d07402ac3b36b4f89\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_f6eeb74a295e2aad03b76b0ba87\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_5738278c92c15e1ec9d27e3a098\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_b046318e0b341a7f72110b75857\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8c53e91ce72dd424a812e77113\` ON \`coupon\``,
    );
    await queryRunner.query(`DROP TABLE \`coupon\``);
    await queryRunner.query(`DROP TABLE \`user_coupon\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(`DROP TABLE \`feedback\``);
    await queryRunner.query(`DROP TABLE \`booking\``);
    await queryRunner.query(`DROP TABLE \`tour\``);
    await queryRunner.query(`DROP TABLE \`review\``);
    await queryRunner.query(`DROP TABLE \`wishlist\``);
    await queryRunner.query(`DROP TABLE \`guide\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_cb776c7d842f8375b60273320d\` ON \`category\``,
    );
    await queryRunner.query(`DROP TABLE \`category\``);
    await queryRunner.query(`DROP TABLE \`payment\``);
  }
}
