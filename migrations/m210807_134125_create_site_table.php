<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%site}}`.
 */
class m210807_134125_create_site_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%legal_entity}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
            'slug' => $this->string()->unique()->notNull(),
            'email' => $this->string(),
            'contact' => $this->text(),
        ]);
        $this->createIndex('idx_legal_entity_slug', 'legal_entity', 'slug');

        $this->createTable('{{%site}}', [
            'id' => $this->primaryKey(),
            'domain' => $this->string(255)->unique()->notNull(),
            'ssl' => $this->boolean()->notNull(),
            'name' => $this->string(255),
            'legal_entity_id' => $this->integer()->notNull(),
            'aliases' => $this->text()->null(),
            'email' => $this->string(),
            'screenshot' => $this->string(),
            'created_at' => $this->dateTime()->notNull(),
            'updated_at' => $this->dateTime()->notNull(),
        ]);

        $this->createIndex('idx_site_legal_entity_id', 'site', 'legal_entity_id');
        $this->addForeignKey('fk_site_legal_entity_id', 'site', 'legal_entity_id', 'legal_entity', 'id');

        $this->createTable('{{%issue}}', [
            'id' => $this->primaryKey(),
            'site_id' => $this->integer()->notNull(),
            'title' => $this->string()->notNull(),
            'status' => 'ENUM("open", "reported", "fixed") NOT NULL DEFAULT "open"',
            'details' => $this->text()->null(),
            'inspection' => $this->text()->null(),
            'reported_by' => $this->string()->notNull(),
            'opened_at' => $this->dateTime()->notNull(),
            'reported_at' => $this->dateTime(),
            'fixed_at' => $this->dateTime(),
        ]);

      //  $this->createIndex('idx_site_legal_entity_id', 'site', 'legal_entity_id');
        //$this->addForeignKey('fk_site_legal_entity_id', 'site', 'legal_entity_id', 'legal_entity', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%issue}}');
        $this->dropTable('{{%site}}');
        $this->dropTable('{{%legal_entity}}');
    }
}
