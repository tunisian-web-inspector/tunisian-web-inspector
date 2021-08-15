<?php

namespace app\models;

/**
 * This is the model class for table "site".
 *
 * @property int $id
 * @property string $domain
 * @property int $ssl
 * @property string|null $name
 * @property int $legal_entity_id
 * @property string|null $aliases
 * @property string $created_at
 * @property string $updated_at
 * @property string $screenshot
 *
 * @property-read string $screenshotUrl
 *
 * @property LegalEntity $legalEntity
 */
class Site extends \yii\db\ActiveRecord
{
    public static function tableName(): string
    {
        return 'site';
    }

    public function __toString()
    {
        return $this->domain;
    }

    public function getMainUrl(): string
    {
        return ($this->ssl ? 'https://' : 'http://') . $this->domain;
    }

    public function rules(): array
    {
        return [
            [['domain', 'ssl', 'legal_entity_id', 'created_at', 'updated_at'], 'required'],
            [['ssl', 'legal_entity_id'], 'integer'],
            [['aliases', 'screenshot'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['domain', 'name'], 'string', 'max' => 255],
            [['domain'], 'unique'],
            [['legal_entity_id'], 'exist', 'skipOnError' => true, 'targetClass' => LegalEntity::className(), 'targetAttribute' => ['legal_entity_id' => 'id']],
        ];
    }

    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'domain' => 'Domain',
            'ssl' => 'Ssl',
            'name' => 'Name',
            'screenshot' => 'Aperçu',
            'legalEntity' => 'Responsable',
            'aliases' => 'Aliases',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function getLegalEntity(): \yii\db\ActiveQuery
    {
        return $this->hasOne(LegalEntity::className(), ['id' => 'legal_entity_id']);
    }

    public function getScreenshotUrl($size = false): string
    {
        return str_replace('@app', '', $this->screenshot);
    }
}
