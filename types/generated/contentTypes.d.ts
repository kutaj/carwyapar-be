import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    userimage: Attribute.Media;
    reviews: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::review.review'
    >;
    used_cars: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::usedcar.usedcar'
    >;
    MobileNumber: Attribute.BigInteger;
    CityName: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerBanner extends Schema.CollectionType {
  collectionName: 'banners';
  info: {
    singularName: 'banner';
    pluralName: 'banners';
    displayName: 'Banner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Path: Attribute.String & Attribute.Private;
    BannerImage: Attribute.Media & Attribute.Required;
    PagePath: Attribute.Enumeration<
      [
        '/newcars',
        '/compare-cars',
        '/cars/slug',
        '/latestcars',
        '/usedCars',
        '/used-car-dealers',
        '/car-loan-emi-calculator',
        '/rto-information',
        '/car-value-calculator',
        '/news/car-collection',
        '/news/car-reviews'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerForMobBannerForMob extends Schema.CollectionType {
  collectionName: 'banner_for_mobs';
  info: {
    singularName: 'banner-for-mob';
    pluralName: 'banner-for-mobs';
    displayName: 'BannerForMob';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerimage: Attribute.Media & Attribute.Required;
    targetLink: Attribute.String;
    title: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner-for-mob.banner-for-mob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner-for-mob.banner-for-mob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerForWebBannerForWeb extends Schema.CollectionType {
  collectionName: 'banner_for_webs';
  info: {
    singularName: 'banner-for-web';
    pluralName: 'banner-for-webs';
    displayName: 'BannerForWeb';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    bannerimage: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner-for-web.banner-for-web',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner-for-web.banner-for-web',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarBrandCarBrand extends Schema.CollectionType {
  collectionName: 'car_brands';
  info: {
    singularName: 'car-brand';
    pluralName: 'car-brands';
    displayName: 'CarBrand';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    brandname: Attribute.String & Attribute.Required;
    carcollections: Attribute.Relation<
      'api::car-brand.car-brand',
      'manyToMany',
      'api::carcollection.carcollection'
    >;
    brandLogo: Attribute.Media;
    car_value_calculators: Attribute.Relation<
      'api::car-brand.car-brand',
      'manyToMany',
      'api::car-value-calculator.car-value-calculator'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car-brand.car-brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car-brand.car-brand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarCollectionNewsCarCollectionNews
  extends Schema.CollectionType {
  collectionName: 'car_collections_news';
  info: {
    singularName: 'car-collection-news';
    pluralName: 'car-collections-news';
    displayName: 'CarCollectionNews';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text;
    description: Attribute.Text;
    titleslug: Attribute.UID<
      'api::car-collection-news.car-collection-news',
      'title'
    >;
    thumbnail: Attribute.Media;
    uid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^\\d{6}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^\\d{6}$';
        }
      >;
    Tag: Attribute.Enumeration<['First Car', 'Luxury']>;
    editor: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car-collection-news.car-collection-news',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car-collection-news.car-collection-news',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarNewsCarNews extends Schema.CollectionType {
  collectionName: 'carnews';
  info: {
    singularName: 'car-news';
    pluralName: 'carnews';
    displayName: 'CarNews';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.Text;
    titleslug: Attribute.UID<'api::car-news.car-news', 'title'>;
    byname: Attribute.String;
    thumbnail: Attribute.Media;
    description: Attribute.Text;
    editor: Attribute.RichText & Attribute.Required;
    uid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^\\d{6}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^\\d{6}$';
        }
      >;
    Tag: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'Global Automotive News',
          'Automotive News India',
          'Electric Car News',
          'Car Design News',
          'Latest Car News',
          'Automotive Industry Trends'
        ]
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car-news.car-news',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car-news.car-news',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarValueCalculatorCarValueCalculator
  extends Schema.CollectionType {
  collectionName: 'car_value_calculators';
  info: {
    singularName: 'car-value-calculator';
    pluralName: 'car-value-calculators';
    displayName: 'CarValueCalculator';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    car_brands: Attribute.Relation<
      'api::car-value-calculator.car-value-calculator',
      'manyToMany',
      'api::car-brand.car-brand'
    >;
    PercievedReliability: Attribute.Decimal & Attribute.DefaultTo<0>;
    AfterSalesSupport: Attribute.Decimal & Attribute.DefaultTo<0>;
    YearlyMaintenance: Attribute.Decimal & Attribute.DefaultTo<0>;
    MarketDemand: Attribute.Decimal & Attribute.DefaultTo<0>;
    ConsumerTrust: Attribute.Decimal & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car-value-calculator.car-value-calculator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car-value-calculator.car-value-calculator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarVarinatPriceCarVarinatPrice
  extends Schema.CollectionType {
  collectionName: 'car_varinat_prices';
  info: {
    singularName: 'car-varinat-price';
    pluralName: 'car-varinat-prices';
    displayName: 'CarVarinatPrice';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    VarinatShortName: Attribute.String;
    Price: Attribute.JSON;
    car_variants: Attribute.Relation<
      'api::car-varinat-price.car-varinat-price',
      'manyToMany',
      'api::carmodel.carmodel'
    >;
    VarinatName: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car-varinat-price.car-varinat-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car-varinat-price.car-varinat-price',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarcollectionCarcollection extends Schema.CollectionType {
  collectionName: 'carcollections';
  info: {
    singularName: 'carcollection';
    pluralName: 'carcollections';
    displayName: 'CarCollection';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CarName: Attribute.String;
    car_brands: Attribute.Relation<
      'api::carcollection.carcollection',
      'manyToMany',
      'api::car-brand.car-brand'
    >;
    kmpl: Attribute.Decimal;
    CC: Attribute.Integer;
    Seater: Attribute.Integer;
    thumbnail: Attribute.Media;
    allimg: Attribute.Media;
    slug: Attribute.UID<'api::carcollection.carcollection', 'CarName'>;
    Showroomprice: Attribute.Integer;
    vehicletypes: Attribute.Enumeration<
      [
        'Hatchback',
        'Sedan',
        'SUV',
        'MUV',
        'Luxury',
        'Super Luxury',
        'Convertible',
        'Hybrid',
        'Coupe',
        'Pickup Truck',
        'Minivan',
        'Wagon',
        'Sport Utilitie',
        'Electric'
      ]
    >;
    car_models: Attribute.Relation<
      'api::carcollection.carcollection',
      'manyToMany',
      'api::carmodel.carmodel'
    >;
    Description: Attribute.RichText;
    priceRange: Attribute.String;
    trendingCar: Attribute.Enumeration<['Yes', 'No']> &
      Attribute.DefaultTo<'No'>;
    latestCar: Attribute.Enumeration<['Yes', 'No']> & Attribute.DefaultTo<'No'>;
    uid: Attribute.UID &
      Attribute.CustomField<'plugin::strapi-advanced-uuid.uuid'>;
    ElectricCars: Attribute.Enumeration<['Electric Cars']> &
      Attribute.Private &
      Attribute.DefaultTo<'Electric Cars'>;
    electricCar: Attribute.Enumeration<['Yes', 'No']> &
      Attribute.DefaultTo<'No'>;
    SelectValue: Attribute.Enumeration<
      ['Popular', 'Upcoming', 'Latest', 'Popular/Latest']
    >;
    CarColorImage: Attribute.Media;
    reviews: Attribute.Relation<
      'api::carcollection.carcollection',
      'manyToMany',
      'api::review.review'
    >;
    FuelType: Attribute.Enumeration<
      ['Diesel', 'Petrol', 'Electric', 'Hybrid', 'CNG']
    >;
    CarColorThumbnail: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::carcollection.carcollection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::carcollection.carcollection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCarmodelCarmodel extends Schema.CollectionType {
  collectionName: 'carmodels';
  info: {
    singularName: 'carmodel';
    pluralName: 'carmodels';
    displayName: 'CarVariant';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    modelname: Attribute.String;
    Length: Attribute.String;
    Width: Attribute.String;
    Height: Attribute.String;
    WheelBase: Attribute.String;
    GroundClearance: Attribute.String;
    Doors: Attribute.Integer;
    SeatingCapacity: Attribute.Integer;
    FuelType: Attribute.Enumeration<
      ['Diesel', 'Petrol', 'Electric', 'Hybrid', 'CNG']
    >;
    MileageKMPL: Attribute.String;
    Engine: Attribute.Enumeration<['Engine']> &
      Attribute.Private &
      Attribute.DefaultTo<'Engine'>;
    GeneralSpecifications: Attribute.Enumeration<['General Specifications']> &
      Attribute.Private &
      Attribute.DefaultTo<'General Specifications'>;
    EngineType: Attribute.String;
    Displacement: Attribute.String;
    MaxPower: Attribute.String;
    MaxTorque: Attribute.String;
    NoOfCylinder: Attribute.Integer;
    TurboCharger: Attribute.Enumeration<['Yes', 'No']>;
    TransmissionType: Attribute.Enumeration<['Automatic', 'Manual']>;
    GearBox: Attribute.Integer;
    SteeringAndSuspension: Attribute.Enumeration<['Steering And Suspension']> &
      Attribute.Private &
      Attribute.DefaultTo<'Steering And Suspension'>;
    PowerSteering: Attribute.Enumeration<['Yes', 'No']>;
    FrontSuspension: Attribute.String;
    RearSuspension: Attribute.String;
    Safety: Attribute.Enumeration<['Safety']> &
      Attribute.Private &
      Attribute.DefaultTo<'Safety'>;
    FrontBrakes: Attribute.Enumeration<
      ['Disc', 'Drum', 'Ventilated Disc', 'Solid Disc']
    >;
    RearBrakes: Attribute.Enumeration<
      ['Disc', 'Drum', 'Ventilated Disc', 'Solid Disc']
    >;
    ABS: Attribute.Enumeration<['Yes', 'No']>;
    BrakeAssist: Attribute.Enumeration<['Yes', 'No']>;
    Airbags: Attribute.Integer;
    RearSeatbelts: Attribute.Enumeration<['Yes', 'No']>;
    TyrePressureMonitor: Attribute.Enumeration<['Yes', 'No']>;
    SpeedAlert: Attribute.Enumeration<['Yes', 'No']>;
    ChildSeatMount: Attribute.Enumeration<['Yes', 'No']>;
    FollowMeHomeHeadlamps: Attribute.Enumeration<['Yes', 'No']>;
    CentralLocking: Attribute.Enumeration<['Yes', 'No']>;
    CrashSensor: Attribute.Enumeration<['Yes', 'No']>;
    HillAssist: Attribute.Enumeration<['Yes', 'No']>;
    AntitheftAlarm: Attribute.Enumeration<['Yes', 'No']>;
    SpeedSensingDoorLock: Attribute.Enumeration<['Yes', 'No']>;
    OtherFeatures: Attribute.String;
    Interior: Attribute.Enumeration<['Interior']> &
      Attribute.Private &
      Attribute.DefaultTo<'Interior'>;
    FrontPowerWindows: Attribute.Enumeration<['Yes', 'No']>;
    RearPowerWindows: Attribute.Enumeration<['Yes', 'No']>;
    Tachometer: Attribute.Enumeration<['Yes', 'No']>;
    ElectronicMultiTripmeter: Attribute.Enumeration<['Yes', 'No']>;
    FabricUpholstery: Attribute.Enumeration<['Yes', 'No']>;
    GloveCompartment: Attribute.Enumeration<['Yes', 'No']>;
    DigitalClock: Attribute.Enumeration<['Yes', 'No']>;
    DigitalOdometer: Attribute.Enumeration<['Yes', 'No']>;
    HeightAdjustableDriverSeat: Attribute.Enumeration<['Yes', 'No']>;
    AdditionalFeatures: Attribute.Text;
    RearSeatArmRest: Attribute.Enumeration<['Yes', 'No']>;
    Infotainment: Attribute.Enumeration<['Infotainment']> &
      Attribute.Private &
      Attribute.DefaultTo<'Infotainment'>;
    Radio: Attribute.Enumeration<['Yes', 'No']>;
    AudioSystemRemoteControl: Attribute.Enumeration<['Yes', 'No']>;
    SpeakersFront: Attribute.Enumeration<['Yes', 'No']>;
    SpeakersRear: Attribute.Enumeration<['Yes', 'No']>;
    Integrated2DINAudio: Attribute.Enumeration<['Yes', 'No']>;
    USBAuxiliaryInput: Attribute.Enumeration<['Yes', 'No']>;
    BluetoothConnectivity: Attribute.Enumeration<['Yes', 'No']>;
    TouchScreen: Attribute.Enumeration<['Yes', 'No']>;
    TouchScreenSize: Attribute.Decimal;
    Connectivity: Attribute.String;
    AndroidAuto: Attribute.Enumeration<['Yes', 'No']>;
    AppleCarPlay: Attribute.Enumeration<['Yes', 'No']>;
    NoofSpeakers: Attribute.Integer;
    car_collections: Attribute.Relation<
      'api::carmodel.carmodel',
      'manyToMany',
      'api::carcollection.carcollection'
    >;
    BrandName: Attribute.String;
    EmissionNorms: Attribute.String;
    DriveType: Attribute.String;
    TiltAdjust: Attribute.String;
    car_varinat_prices: Attribute.Relation<
      'api::carmodel.carmodel',
      'manyToMany',
      'api::car-varinat-price.car-varinat-price'
    >;
    Weight: Attribute.String;
    Exterior: Attribute.Enumeration<['Exterior']> &
      Attribute.Private &
      Attribute.DefaultTo<'Exterior'>;
    AdjustableHeadlight: Attribute.Enumeration<['Yes', 'No']>;
    FogLightsFront: Attribute.Enumeration<['Yes', 'No']>;
    PowerRearViewMirror: Attribute.Enumeration<['Yes', 'No']>;
    RearWindowDefogger: Attribute.Enumeration<['Yes', 'No']>;
    AlloyWheels: Attribute.Enumeration<['Yes', 'No']>;
    AdditionalFeaturesExterior: Attribute.Text;
    AdditionalFeaturesInfotainment: Attribute.Text;
    AlloyWheelSize: Attribute.String;
    uid: Attribute.UID &
      Attribute.CustomField<'plugin::strapi-advanced-uuid.uuid'>;
    modelnameslug: Attribute.UID<'api::carmodel.carmodel', 'modelname'>;
    ExShowRoomPrice: Attribute.BigInteger;
    DimensionsAndSeating: Attribute.Enumeration<['Dimensions & Seating']> &
      Attribute.Private &
      Attribute.DefaultTo<'Dimensions & Seating'>;
    Fuel: Attribute.Enumeration<['Fuel']> &
      Attribute.Private &
      Attribute.DefaultTo<'Fuel'>;
    Transmission: Attribute.Enumeration<['Transmission']> &
      Attribute.Private &
      Attribute.DefaultTo<'Transmission'>;
    SteeringSuspensionBrakes: Attribute.Enumeration<
      ['Steering, Suspension & Brakes']
    > &
      Attribute.Private &
      Attribute.DefaultTo<'Steering, Suspension & Brakes'>;
    SafetyAndSecurity: Attribute.Enumeration<['Safety & Security']> &
      Attribute.Private &
      Attribute.DefaultTo<'Safety & Security'>;
    ADAS: Attribute.Enumeration<['Yes', 'No']>;
    ComfortAndConvineience: Attribute.Enumeration<
      ['Comfort and Convineience ']
    > &
      Attribute.Private &
      Attribute.DefaultTo<'Comfort and Convineience '>;
    InfotainmentAndInstrumentCluster: Attribute.Enumeration<
      ['Infotainment & Instrument Cluster']
    > &
      Attribute.Private &
      Attribute.DefaultTo<'Infotainment & Instrument Cluster'>;
    ConnectivityAndTelematics: Attribute.Enumeration<
      ['Connectivity & Telematics']
    > &
      Attribute.Private &
      Attribute.DefaultTo<'Connectivity & Telematics'>;
    BootSpace: Attribute.BigInteger;
    FuelTankCapacity: Attribute.BigInteger;
    Range: Attribute.BigInteger;
    PowertrainAssistance: Attribute.Enumeration<
      ['Mild Hybrid', 'Strong Hybrid']
    >;
    MotorType: Attribute.String;
    BatteryType: Attribute.String;
    BatteryCapacity: Attribute.String;
    TopSpeed: Attribute.String;
    Drivetrain: Attribute.Enumeration<['FWD', 'RWD', 'AWD', 'FourXFour']>;
    TurningRadius: Attribute.String;
    RegenerativeBraking: Attribute.Enumeration<['Yes', 'No']>;
    SeatBeltWarning: Attribute.Enumeration<['Yes', 'No']>;
    ESP: Attribute.Enumeration<['Yes', 'No']>;
    HillDescentControl: Attribute.Enumeration<['Yes', 'No']>;
    ReverseCamera: Attribute.Enumeration<['Yes', 'No']>;
    OCamera: Attribute.Enumeration<['Yes', 'No']>;
    EngineImmobilizer: Attribute.Enumeration<['Yes', 'No']>;
    AdaptiveCruiseControl: Attribute.Enumeration<['Yes', 'No']>;
    ForwardCollisionWarning: Attribute.Enumeration<['Yes', 'No']>;
    DriverAttentionWarning: Attribute.Enumeration<['Yes', 'No']>;
    BlindSpotMonitor: Attribute.Enumeration<['Yes', 'No']>;
    AutomaticEmergencyBraking: Attribute.Enumeration<['Yes', 'No']>;
    LaneKeepAssistance: Attribute.Enumeration<['Yes', 'No']>;
    KeylessEntry: Attribute.Enumeration<['Yes', 'No']>;
    RequestSensors: Attribute.Enumeration<['Yes', 'No']>;
    PushButtonStart: Attribute.Enumeration<['Yes', 'No']>;
    AutomaticClimateControl: Attribute.Enumeration<['Yes', 'No']>;
    RearACVents: Attribute.Enumeration<['Yes', 'No']>;
    CruiseControl: Attribute.Enumeration<['Yes', 'No']>;
    SteeringMountedControl: Attribute.Enumeration<['Yes', 'No']>;
    TiltSteeringAdjust: Attribute.Enumeration<['Yes', 'No']>;
    TelescopicSteeringAdjust: Attribute.Enumeration<['Yes', 'No']>;
    DriverSeatAdjustment: Attribute.Enumeration<['Manual', 'Electric']>;
    DriverSeatHeightAdjustment: Attribute.Enumeration<['Yes', 'No']>;
    CoDriverSeatAdjustment: Attribute.Enumeration<['Manual', 'Electric']>;
    CoDriverSeatHeightAdjustment: Attribute.Enumeration<['Yes', 'No']>;
    VentilatedSeats: Attribute.Enumeration<['Yes', 'No']>;
    HeatedSeats: Attribute.Enumeration<['Yes', 'No']>;
    WirelessCharging: Attribute.Enumeration<['Yes', 'No']>;
    PowerOutlets: Attribute.Enumeration<['Yes', 'No']>;
    ChargingPorts: Attribute.Enumeration<['Yes', 'No']>;
    ORVMAdjustment: Attribute.Enumeration<['Manual', 'Electric']>;
    PaddleShifters: Attribute.Enumeration<['Yes', 'No', 'Not Compatible']>;
    Upholstery: Attribute.Enumeration<
      ['Fabric', 'Faux Leather', 'Leather', 'Suede/Alcantara']
    >;
    Sunroof: Attribute.Enumeration<
      ['Standard', 'Panoramic', 'Moonroof', 'No', 'Not Compatible']
    >;
    FrontSeatArmRest: Attribute.Enumeration<['Yes', 'No']>;
    CupHoldersFront: Attribute.Enumeration<['Yes', 'No']>;
    CupHoldersRear: Attribute.Enumeration<['Yes', 'No']>;
    RearReadingLights: Attribute.Enumeration<['Yes', 'No']>;
    RearParcelTray: Attribute.Enumeration<['Yes', 'No']>;
    CooledGlovebox: Attribute.Enumeration<['Yes', 'No']>;
    SeatPockets: Attribute.Enumeration<['Yes', 'No']>;
    SunglassHolder: Attribute.Enumeration<['Yes', 'No']>;
    RearSeatFolding: Attribute.Enumeration<['Full', 'Split', 'No']>;
    Wheels: Attribute.Enumeration<['Steel Rims', 'Alloy', 'Diamond Cut Alloy']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::carmodel.carmodel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::carmodel.carmodel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiColorColor extends Schema.CollectionType {
  collectionName: 'colors';
  info: {
    singularName: 'color';
    pluralName: 'colors';
    displayName: 'Color';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    rootbuttoncolor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    Key: Attribute.UID &
      Attribute.CustomField<'plugin::strapi-advanced-uuid.uuid'>;
    test: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::color.color',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::color.color',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDealerShipDealerShip extends Schema.CollectionType {
  collectionName: 'dealer_ships';
  info: {
    singularName: 'dealer-ship';
    pluralName: 'dealer-ships';
    displayName: 'NewCarDealerShip';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    uuid: Attribute.UID &
      Attribute.CustomField<'plugin::strapi-advanced-uuid.uuid'>;
    StateName: Attribute.Enumeration<
      [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
      ]
    >;
    CityName: Attribute.String;
    DealerName: Attribute.String;
    ShowroomName: Attribute.Text;
    Address: Attribute.Text;
    PhoneNumber: Attribute.Integer;
    BrandName: Attribute.Enumeration<
      [
        'Maruti',
        'Hyundai',
        'Tata',
        'Mahindra',
        'Kia',
        'Mercedes-Benz',
        'Renault',
        'Honda',
        'MG',
        'Nissan',
        'Toyota',
        'Aston Martin',
        'Audi',
        'Bajaj',
        'Bentley',
        'BMW',
        'BYD',
        'Citroen',
        'Ferrari',
        'Force',
        'Isuzu',
        'Jaguar',
        'Jeep',
        'Lamborghini',
        'Land Rover',
        'Lexus',
        'Maserati',
        'Mclaren',
        'Mini',
        'PMV',
        'Porsche',
        'Pravaig',
        'Rolls-Royce',
        'Skoda',
        'Strom Motors',
        'Volkswagen',
        'Volvo'
      ]
    >;
    ShowroomImage: Attribute.Media;
    Email: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dealer-ship.dealer-ship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dealer-ship.dealer-ship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOfferCardForMobOfferCardForMob
  extends Schema.CollectionType {
  collectionName: 'offer_card_for_mobs';
  info: {
    singularName: 'offer-card-for-mob';
    pluralName: 'offer-card-for-mobs';
    displayName: 'OfferCardForMob';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    paragraph: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    targetLink: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::offer-card-for-mob.offer-card-for-mob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::offer-card-for-mob.offer-card-for-mob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOfferMiniCardForMobOfferMiniCardForMob
  extends Schema.CollectionType {
  collectionName: 'offer_mini_card_for_mobs';
  info: {
    singularName: 'offer-mini-card-for-mob';
    pluralName: 'offer-mini-card-for-mobs';
    displayName: 'OfferMiniCardForMob';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::offer-mini-card-for-mob.offer-mini-card-for-mob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::offer-mini-card-for-mob.offer-mini-card-for-mob',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReviewReview extends Schema.CollectionType {
  collectionName: 'reviews';
  info: {
    singularName: 'review';
    pluralName: 'reviews';
    displayName: 'Review';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CarName: Attribute.String;
    rating: Attribute.Integer;
    Comment: Attribute.Text;
    car_collections: Attribute.Relation<
      'api::review.review',
      'manyToMany',
      'api::carcollection.carcollection'
    >;
    users_permissions_users: Attribute.Relation<
      'api::review.review',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    username: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSiteMapSiteMap extends Schema.SingleType {
  collectionName: 'site_maps';
  info: {
    singularName: 'site-map';
    pluralName: 'site-maps';
    displayName: 'SiteMap';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    condition: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::site-map.site-map',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::site-map.site-map',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestTest extends Schema.CollectionType {
  collectionName: 'tests';
  info: {
    singularName: 'test';
    pluralName: 'tests';
    displayName: 'Test';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Mytext: Attribute.String;
    used_cars: Attribute.Relation<
      'api::test.test',
      'manyToMany',
      'api::usedcar.usedcar'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiUsedCarDealerCityUsedCarDealerCity
  extends Schema.CollectionType {
  collectionName: 'used_car_dealer_cities';
  info: {
    singularName: 'used-car-dealer-city';
    pluralName: 'used-car-dealer-cities';
    displayName: 'UsedCarDealerCity';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CityName: Attribute.String;
    CityCode: Attribute.String;
    used_car_dealer_states: Attribute.Relation<
      'api::used-car-dealer-city.used-car-dealer-city',
      'manyToMany',
      'api::used-car-dealer-state.used-car-dealer-state'
    >;
    used_car_dealer_ships: Attribute.Relation<
      'api::used-car-dealer-city.used-car-dealer-city',
      'manyToMany',
      'api::used-car-dealer-ship.used-car-dealer-ship'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::used-car-dealer-city.used-car-dealer-city',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::used-car-dealer-city.used-car-dealer-city',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUsedCarDealerShipUsedCarDealerShip
  extends Schema.CollectionType {
  collectionName: 'used_car_dealer_ships';
  info: {
    singularName: 'used-car-dealer-ship';
    pluralName: 'used-car-dealer-ships';
    displayName: 'UsedCarDealerShip';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ShowroomName: Attribute.Text;
    Address: Attribute.Text;
    MapLink: Attribute.Text;
    uid: Attribute.UID &
      Attribute.CustomField<'plugin::strapi-advanced-uuid.uuid'>;
    PhoneNumber: Attribute.String;
    StateName: Attribute.String;
    CityName: Attribute.String;
    used_car_dealer_cities: Attribute.Relation<
      'api::used-car-dealer-ship.used-car-dealer-ship',
      'manyToMany',
      'api::used-car-dealer-city.used-car-dealer-city'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::used-car-dealer-ship.used-car-dealer-ship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::used-car-dealer-ship.used-car-dealer-ship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUsedCarDealerStateUsedCarDealerState
  extends Schema.CollectionType {
  collectionName: 'used_car_dealer_states';
  info: {
    singularName: 'used-car-dealer-state';
    pluralName: 'used-car-dealer-states';
    displayName: 'UsedCarDealerState';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    StateName: Attribute.String;
    StateCode: Attribute.String;
    used_car_dealer_cities: Attribute.Relation<
      'api::used-car-dealer-state.used-car-dealer-state',
      'manyToMany',
      'api::used-car-dealer-city.used-car-dealer-city'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::used-car-dealer-state.used-car-dealer-state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::used-car-dealer-state.used-car-dealer-state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUsedcarUsedcar extends Schema.CollectionType {
  collectionName: 'usedcars';
  info: {
    singularName: 'usedcar';
    pluralName: 'usedcars';
    displayName: 'UsedCar';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    brand: Attribute.String;
    carname: Attribute.String;
    variant: Attribute.String;
    year: Attribute.Integer;
    fueltype: Attribute.String;
    ownership: Attribute.String;
    registrationstate: Attribute.String;
    registrationcity: Attribute.String;
    carprice: Attribute.BigInteger;
    mobilenumber: Attribute.BigInteger;
    tests: Attribute.Relation<
      'api::usedcar.usedcar',
      'manyToMany',
      'api::test.test'
    >;
    uid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '';
        }
      >;
    frontImage: Attribute.Media;
    frontleftImage: Attribute.Media;
    backrightImage: Attribute.Media;
    backImage: Attribute.Media;
    interiorImage: Attribute.Media;
    odoreadingImage: Attribute.Media;
    kms: Attribute.Decimal;
    users: Attribute.Relation<
      'api::usedcar.usedcar',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    vehicletypes: Attribute.Enumeration<
      [
        'Hatchback',
        'Sedan',
        'SUV',
        'MUV',
        'Luxury',
        'Super Luxury',
        'Convertible',
        'Hybrid',
        'Coupe',
        'Pickup Truck',
        'Minivan',
        'Wagon',
        'Sport Utilitie',
        'Electric'
      ]
    >;
    AvailableinState: Attribute.String;
    AvailableinCity: Attribute.String;
    TransmissionType: Attribute.Enumeration<['Automatic', 'Manual']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::usedcar.usedcar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::usedcar.usedcar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebStoryWebStory extends Schema.CollectionType {
  collectionName: 'web_stories';
  info: {
    singularName: 'web-story';
    pluralName: 'web-stories';
    displayName: 'WebStory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    FirstLayer: Attribute.Enumeration<['First Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'First Layer'>;
    FirstLayerTitle: Attribute.String;
    FirstLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FirstLayerTitleAnimationDelay: Attribute.Decimal;
    FirstLayerTitleAnimationDuration: Attribute.Decimal;
    FirstLayerPara: Attribute.Text;
    FirstLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FirstLayerParaAnimationDelay: Attribute.Decimal;
    FirstLayerParaAnimationDuration: Attribute.Decimal;
    FirstLayerImage: Attribute.Media;
    FirstLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FirstLayerImageAnimationDelay: Attribute.Decimal;
    FirstLayerImageAnimationDuration: Attribute.Decimal;
    FirstLayerTargetLink: Attribute.String;
    FirstLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    SecondLayer: Attribute.Enumeration<['Second Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'Second Layer'>;
    SecondLayerTitle: Attribute.String;
    SecondLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SecondLayerTitleAnimationDuration: Attribute.Decimal;
    SecondLayerTitleAnimationDelay: Attribute.Decimal;
    SecondLayerPara: Attribute.Text;
    SecondLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SecondLayerParaAnimationDuration: Attribute.Decimal;
    SecondLayerParaAnimationDelay: Attribute.Decimal;
    SecondLayerImage: Attribute.Media;
    SecondLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SecondLayerImageAnimationDuration: Attribute.Decimal;
    SecondLayerImageAnimationDelay: Attribute.Decimal;
    SecondLayerTargetLink: Attribute.String;
    SecondLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    ThirdLayer: Attribute.Enumeration<['Third Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'Third Layer'>;
    ThirdLayerTitle: Attribute.String;
    ThirdLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    ThirdLayerTitleAnimationDuration: Attribute.Decimal;
    ThirdLayerTitleAnimationDelay: Attribute.Decimal;
    ThirdLayerPara: Attribute.Text;
    ThirdLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    ThirdLayerParaAnimationDuration: Attribute.Decimal;
    ThirdLayerParaAnimationDelay: Attribute.Decimal;
    ThirdLayerImage: Attribute.Media;
    ThirdLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    ThirdLayerImageAnimationDuration: Attribute.Decimal;
    ThirdLayerImageAnimationDelay: Attribute.Decimal;
    ThirdLayerTargetLink: Attribute.String;
    ThirdLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    FourthLayer: Attribute.Enumeration<['Fourth Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'Fourth Layer'>;
    FourthLayerTitle: Attribute.String;
    FourthLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FourthLayerTitleAnimationDuration: Attribute.Decimal;
    FourthLayerTitleAnimationDelay: Attribute.Decimal;
    FourthLayerPara: Attribute.Text;
    FourthLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FourthLayerParaAnimationDuration: Attribute.Decimal;
    FourthLayerParaAnimationDelay: Attribute.Decimal;
    FourthLayerImage: Attribute.Media;
    FourthLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FourthLayerImageAnimationDuration: Attribute.Decimal;
    FourthLayerImageAnimationDelay: Attribute.Decimal;
    FourthLayerTargetLink: Attribute.String;
    FourthLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    FifthLayer: Attribute.Enumeration<['Fifth Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'Fifth Layer'>;
    FifthLayerTitle: Attribute.String;
    FifthLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FifthLayerTitleAnimationDuration: Attribute.Decimal;
    FifthLayerTitleAnimationDelay: Attribute.Decimal;
    FifthLayerPara: Attribute.Text;
    FifthLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FifthLayerParaAnimationDuration: Attribute.Decimal;
    FifthLayerParaAnimationDelay: Attribute.Decimal;
    FifthLayerImage: Attribute.Media;
    FifthLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    FifthLayerImageAnimationDuration: Attribute.Decimal;
    FifthLayerImageAnimationDelay: Attribute.Decimal;
    FifthLayerTargetLink: Attribute.String;
    FifthLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    SixLayer: Attribute.Enumeration<['Sixth Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'Sixth Layer'>;
    SixthLayerTitle: Attribute.String;
    SixthLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SixthLayerTitleAnimationDuration: Attribute.Decimal;
    SixthLayerTitleAnimationDelay: Attribute.Decimal;
    SixthLayerPara: Attribute.Text;
    SixthLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SixthLayerParaAnimationDuration: Attribute.Decimal;
    SixthLayerParaAnimationDelay: Attribute.Decimal;
    SixthLayerImage: Attribute.Media;
    SixthLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SixthLayerImageAnimationDuration: Attribute.Decimal;
    SixthLayerImageAnimationDelay: Attribute.Decimal;
    SixthLayerTargetLink: Attribute.String;
    SixthLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    SeventhLayer: Attribute.Enumeration<['Seventh Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'Seventh Layer'>;
    SeventhLayerTitle: Attribute.String;
    SeventhLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SeventhLayerTitleAnimationDuration: Attribute.Decimal;
    SeventhLayerTitleAnimationDelay: Attribute.Decimal;
    SeventhLayerPara: Attribute.Text;
    SeventhLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SeventhLayerParaAnimationDuration: Attribute.Decimal;
    SeventhLayerParaAnimationDelay: Attribute.Decimal;
    SeventhLayerImage: Attribute.Media;
    SeventhLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    SeventhLayerImageAnimationDuration: Attribute.Decimal;
    SeventhLayerImageAnimationDelay: Attribute.Decimal;
    SeventhLayerTargetLink: Attribute.String;
    SeventhLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    EighthLayer: Attribute.Enumeration<['Eighth Layer']> &
      Attribute.Private &
      Attribute.DefaultTo<'Eighth Layer'>;
    EighthLayerTitle: Attribute.String;
    EighthLayerTitleAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    EighthLayerTitleAnimationDuration: Attribute.Decimal;
    EighthLayerTitleAnimationDelay: Attribute.Decimal;
    EighthLayerPara: Attribute.Text;
    EighthLayerParaAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    EighthLayerParaAnimationDuration: Attribute.Decimal;
    EighthLayerParaAnimationDelay: Attribute.Decimal;
    EighthLayerImage: Attribute.Media;
    EighthLayerImageAnimation: Attribute.Enumeration<
      [
        'drop',
        'fade-in',
        'fly-in-bottom',
        'fly-in-left',
        'fly-in-right',
        'fly-in-top',
        'pulse',
        'rotate-in-left',
        'rotate-in-right',
        'twirl-in',
        'whoosh-in-left',
        'whoosh-in-right',
        'pan-left',
        'pan-right',
        'pan-down',
        'pan-up',
        'zoom-in',
        'zoom-out'
      ]
    >;
    EighthLayerImageAnimationDuration: Attribute.Decimal;
    EighthLayerImageAnimationDelay: Attribute.Decimal;
    EighthLayerTargetLink: Attribute.String;
    EighthLayerAllTextColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    StoryTitle: Attribute.Text;
    storytitleslug: Attribute.UID<'api::web-story.web-story', 'StoryTitle'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::web-story.web-story',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::web-story.web-story',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::banner.banner': ApiBannerBanner;
      'api::banner-for-mob.banner-for-mob': ApiBannerForMobBannerForMob;
      'api::banner-for-web.banner-for-web': ApiBannerForWebBannerForWeb;
      'api::car-brand.car-brand': ApiCarBrandCarBrand;
      'api::car-collection-news.car-collection-news': ApiCarCollectionNewsCarCollectionNews;
      'api::car-news.car-news': ApiCarNewsCarNews;
      'api::car-value-calculator.car-value-calculator': ApiCarValueCalculatorCarValueCalculator;
      'api::car-varinat-price.car-varinat-price': ApiCarVarinatPriceCarVarinatPrice;
      'api::carcollection.carcollection': ApiCarcollectionCarcollection;
      'api::carmodel.carmodel': ApiCarmodelCarmodel;
      'api::color.color': ApiColorColor;
      'api::dealer-ship.dealer-ship': ApiDealerShipDealerShip;
      'api::offer-card-for-mob.offer-card-for-mob': ApiOfferCardForMobOfferCardForMob;
      'api::offer-mini-card-for-mob.offer-mini-card-for-mob': ApiOfferMiniCardForMobOfferMiniCardForMob;
      'api::review.review': ApiReviewReview;
      'api::site-map.site-map': ApiSiteMapSiteMap;
      'api::test.test': ApiTestTest;
      'api::used-car-dealer-city.used-car-dealer-city': ApiUsedCarDealerCityUsedCarDealerCity;
      'api::used-car-dealer-ship.used-car-dealer-ship': ApiUsedCarDealerShipUsedCarDealerShip;
      'api::used-car-dealer-state.used-car-dealer-state': ApiUsedCarDealerStateUsedCarDealerState;
      'api::usedcar.usedcar': ApiUsedcarUsedcar;
      'api::web-story.web-story': ApiWebStoryWebStory;
    }
  }
}
