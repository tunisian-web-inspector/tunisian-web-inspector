<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "legal_entity".
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $email
 * @property string|null $contact
 *
 * @property Site[] $sites
 */
class LegalEntity extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'legal_entity';
    }

    public function __toString()
    {
        return $this->name;
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['name', 'slug'], 'required'],
            [['contact'], 'string'],
            [['name', 'slug', 'email'], 'string', 'max' => 255],
            [['slug'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'slug' => 'Slug',
            'email' => 'Email',
            'contact' => 'Contact',
        ];
    }

    /**
     * Gets query for [[Sites]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSites(): \yii\db\ActiveQuery
    {
        return $this->hasMany(Site::className(), ['legal_entity_id' => 'id']);
    }
}
